import { Day } from "../day";
import { tokenizeAs2dArrayByRow } from "../utils";

let _uid = 0;
const uid = () => _uid++;
type Coordinate = [number, number];
// trying a new way to get a unique id for a coordinate rather than using a string since converting those can be slow
const getCoordId = (coord: Coordinate, width: number) => coord[0] * width + coord[1];

class Day12 extends Day {
	regions: Map<number, number> = new Map();
	regionMap: number[][] = [];
	map: string[][] = [];
	mapped: Map<number, number> = new Map();

	constructor () {
		super(12);
	}

	solveForPartOne (input: string): string {
		this.map = tokenizeAs2dArrayByRow(input, x => x, ``);
		let totalCost = 0;
		this.regionMap = this.map.map((row, y) => {
			return row.map((cell, x) => {
				let regionId = this.mapped.get(getCoordId([x, y], this.map[0].length));
				if (regionId !== undefined) {
					return regionId;
				}
				regionId = uid();
				const totalPerimeter = this.mapRegion(regionId, [x, y]);
				totalCost += totalPerimeter * this.regions.get(regionId)!;
				return regionId;
			});
		});
		return totalCost.toString();
	}

	solveForPartTwo (input: string): string {
		this.map = [];
		this.regionMap = [];
		this.regions = new Map();
		this.mapped = new Map();
		_uid = 0;
		this.map = tokenizeAs2dArrayByRow(input, x => x, ``);
		let totalCost = 0;
		this.regionMap = this.map.map((row, y) => {
			return row.map((cell, x) => {
				let regionId = this.mapped.get(getCoordId([x, y], this.map[0].length));
				if (regionId !== undefined) {
					return regionId;
				}
				regionId = uid();
				this.mapRegion(regionId, [x, y]);
				return regionId;
			});
		});
		this.regions.forEach((area, regionId) => {
			const xSides = findSides(createGradient(this.regionMap, regionId));
			const ySides = findSides(createGradient(transpose(this.regionMap), regionId));
			// console.log(`Region ${regionId} has ${area} area, ${xSides} x-sides, and ${ySides} y-sides - for a total of ${area * (xSides + ySides)}\n`);
			totalCost += area * (xSides + ySides);
		});
		return totalCost.toString();
	}

	// aka flood fill
	mapRegion (regionId: number, coord: Coordinate): number {
		if (this.mapped.get(getCoordId(coord, this.map[0].length)) !== undefined) {
			return 0;
		}
		const neighbors = this.getNeighbors(coord);
		let remainingPerimeter = 0;
		let matchingNeighbors = 0;
		const value = this.map[coord[1]][coord[0]];
		this.mapped.set(getCoordId(coord, this.map[0].length), regionId);
		this.regions.set(regionId, (this.regions.get(regionId) ?? 0) + 1);
		for (const neighbor of neighbors) { // order is left, up, right, down
			const neighborValue = this.map[neighbor[1]][neighbor[0]];
			const neighborRegionId = this.mapped.get(getCoordId(neighbor, this.map[0].length));
			if (neighborValue === value) {
				matchingNeighbors += 1;
				if (neighborRegionId === undefined) {
					remainingPerimeter += this.mapRegion(regionId, neighbor);
				}
			}
		}
		return (4 - matchingNeighbors) + remainingPerimeter;
	}

	// get ordinal neighbors
	getNeighbors (coord: Coordinate): Coordinate[] {
		const [x, y] = coord;
		const neighbors: Coordinate[] = [];
		if (x > 0) {
			neighbors.push([x - 1, y]);
		}
		if (y > 0) {
			neighbors.push([x, y - 1]);
		}
		if (x < this.map[0].length - 1) {
			neighbors.push([x + 1, y]);
		}
		if (y < this.map.length - 1) {
			neighbors.push([x, y + 1]);
		}
		return neighbors;
	}
}

// To make the createGradient function more generic, we can transpose the matrix and then apply the same logic to find the y-sides as the x-sides.
function transpose (matrix: number[][]): number[][] {
	return matrix[0].map((col, i) => matrix.map(row => row[i]));
}

/**
 * *inhales deeply* - okay. so. If we create a binary map of the regions (based on their ids) we can then use that to create a gradient map.
 * The gradient map will have 1 when it switches from 0 to 1, -1 when it switches from 1 to 0, and 0 when it stays the same (whether 1 or 0).
 * This will show us where the walls of the region are. HOWEVER, we're still not done. We need to then determine how many *sides* there are (aka continuous spans of wall).
 * @param regionMap
 * @param regionId
 * @returns
 */
function createGradient (regionMap: number[][], regionId: number): number[][] {
	// Use these to determine the region's bounding box, which will allow the gradient map to be much smaller than the whole region map.
	let minX = Number.MAX_SAFE_INTEGER;
	let minY = Number.MAX_SAFE_INTEGER;
	let maxX = 0;
	let maxY = 0;
	// Create a binary map of the region (1s for the region that matches the id, 0s for everything else)
	// In the process, determine the bounding box of the region.
	const binaryMap = regionMap.map(
		(row, y) => row.map(
			(cell, x) => {
				if (cell !== regionId) {
					return 0;
				}
				if (x < minX) {
					minX = x;
				}
				if (y < minY) {
					minY = y;
				}
				if (x > maxX) {
					maxX = x;
				}
				if (y > maxY) {
					maxY = y;
				}
				return 1;
			}
		)
	);
	maxX += 1; // pad the max values to include the last row and column (will make extra col/row of 0s if needed)
	maxY += 1;
	// Identify the walls of the region by creating a gradient map.
	// 1 when it switches from 0 to 1, -1 when it switches from 1 to 0, and 0 when it stays the same (whether 1 or 0).
	const gradient: number[][] = [];
	for (let y = 0; y <= maxY - minY; y++) {
		gradient.push([]);
		for (let x = 0; x <= maxX - minX; x++) {
			if (isEqualsUndefAsZero(binaryMap[minY + y]?.[minX + x], binaryMap[minY + y]?.[minX + x - 1])) {
				gradient[y].push(0);
			} else if (binaryMap[minY + y]?.[minX + x] === 1) {
				gradient[y].push(1);
			} else {
				gradient[y].push(-1);
			}
		}
	}
	// console.log(`Region ${regionId}`);
	// console.log(`MinX: ${minX}, MinY: ${minY}, MaxX: ${maxX}, MaxY: ${maxY}`);
	// console.log(regionMap.map(row => row.join(` `)).join(`\n`), `\n`);
	// console.log(binaryMap.map(row => row.join(` `)).join(`\n`), `\n`);
	// console.log(gradient.map(row => row.join(` `)).join(`\n`), `\n`);
	// console.log(findSides(gradient));
	return gradient;
}

/**
 * Use a gradient map to determine the number of sides in a region.
 * By working down and then across, we can determine when how many continuous spans of wall there are (eg sides).
 * @param gradientMap
 * @returns
 */
function findSides (gradientMap: number[][]): number {
	let sides = 0;
	for (let x = 0; x < gradientMap[0].length; x++) {
		let isSpan = false;
		for (let y = 0; y < gradientMap.length; y++) {
			if (isEqualsUndefAsZero(gradientMap[y][x], gradientMap[y - 1]?.[x])) {
				continue;
			}
			if (!isSpan) {
				sides++;
			}
			isSpan = !isSpan;
		}
	}
	return sides;
}

/**
 * Helper function to determine if two numbers are equal, treating undefined as 0.
 * @param left
 * @param right
 * @returns
 */
function isEqualsUndefAsZero (left: number | undefined, right: number | undefined): boolean {
	return (left === 0 || left === undefined) && (right === 0 || right === undefined) ? true : left === right;
}

export default new Day12();
