import { Day } from "../day";
import { tokenizeAs2dArrayByRow } from "../utils";

type Coordinate = {
	x: number;
	y: number;
};

class Day8 extends Day {
	frequencies: Map<string, Coordinate[]> = new Map();
	visited: Set<string> = new Set();

	constructor () {
		super(8);
	}

	solveForPartOne (input: string): string {
		this.frequencies.clear();
		this.visited.clear();
		const rows = tokenizeAs2dArrayByRow(input, (x) => x, ``);
		for (let i = 0; i < rows.length; i++) {
			const row = rows[i];
			for (let j = 0; j < row.length; j++) {
				const char = row[j];
				if (char === `.`) {
					continue;
				}
				const coordinate: Coordinate = { x: j, y: i };
				const freqArray = this.frequencies.get(char) ?? [];
				freqArray.push(coordinate);
				this.frequencies.set(char, freqArray);
			}
		}
		let numberOfAntipodes = 0;
		this.frequencies.forEach((coordinates) => {
			numberOfAntipodes += this.findAntipodes(coordinates, rows[0].length - 1, rows.length - 1);
		});
		return numberOfAntipodes.toString();
	}

	solveForPartTwo (input: string): string {
		this.frequencies.clear();
		this.visited.clear();
		const rows = tokenizeAs2dArrayByRow(input, (x) => x, ``);
		for (let i = 0; i < rows.length; i++) {
			const row = rows[i];
			for (let j = 0; j < row.length; j++) {
				const char = row[j];
				if (char === `.`) {
					continue;
				}
				const coordinate: Coordinate = { x: j, y: i };
				const freqArray = this.frequencies.get(char) ?? [];
				freqArray.push(coordinate);
				this.frequencies.set(char, freqArray);
			}
		}
		let numberOfAntipodes = 0;
		this.frequencies.forEach((coordinates) => {
			numberOfAntipodes += this.findAllAntipodes(coordinates, rows[0].length - 1, rows.length - 1);
		});
		return numberOfAntipodes.toString();
	}

	checkAntipode (coordinate: Coordinate): number {
		const hasAntipode = this.visited.has(`${coordinate.x},${coordinate.y}`);
		if (!hasAntipode) {
			this.visited.add(`${coordinate.x},${coordinate.y}`);
			return 1;
		}
		return 0;
	}

	checkBounds (coordinate: Coordinate, maxX: number, maxY: number): boolean {
		return coordinate.x >= 0 && coordinate.y >= 0 && coordinate.x <= maxX && coordinate.y <= maxY;
	}

	findAntipodes (coordinates: Coordinate[], maxX: number, maxY: number): number {
		let antipodes = 0;
		for (let i = 0; i < coordinates.length; i++) {
			const coordinate = coordinates[i];
			const otherCoordinates = coordinates.slice(i + 1);
			for (let j = 0; j < otherCoordinates.length; j++) {
				const otherCoordinate = otherCoordinates[j];
				const xChange = coordinate.x - otherCoordinate.x;
				const yChange = coordinate.y - otherCoordinate.y;
				const nearAntipode = { x: coordinate.x + xChange, y: coordinate.y + yChange };
				const farAntipode = { x: coordinate.x - (xChange * 2), y: coordinate.y - (yChange * 2) };
				antipodes += this.checkBounds(nearAntipode, maxX, maxY) ? this.checkAntipode(nearAntipode) : 0;
				antipodes += this.checkBounds(farAntipode, maxX, maxY) ? this.checkAntipode(farAntipode) : 0;
			}
		}
		return antipodes;
	}

	findAllAntipodes (coordinates: Coordinate[], maxX: number, maxY: number): number {
		let antipodes = 0;
		for (let i = 0; i < coordinates.length; i++) {
			const coordinate = coordinates[i];
			// slice the array to avoid double counting combinations that have already been checked
			const otherCoordinates = coordinates.slice(i + 1);
			for (let j = 0; j < otherCoordinates.length; j++) {
				const otherCoordinate = otherCoordinates[j];
				const xChange = coordinate.x - otherCoordinate.x;
				const yChange = coordinate.y - otherCoordinate.y;
				let posOutOfBounds = false;
				let negOutOfBounds = false;
				let step = 0;
				// increments successively away from the first coordinate in both directions, checking for antipodes at each step
				while (!posOutOfBounds || !negOutOfBounds) { // combine the two loops into one - might be a bit harder to read but less redundant
					if (!posOutOfBounds) {
						const curPos = { x: xChange * step + coordinate.x, y: yChange * step + coordinate.y };
						if (this.checkBounds(curPos, maxX, maxY)) {
							antipodes += this.checkAntipode(curPos) ? 1 : 0;
						} else {
							posOutOfBounds = true;
						}
					}
					if (!negOutOfBounds) {
						const curNeg = { x: coordinate.x - xChange * step, y: coordinate.y - yChange * step };
						if (this.checkBounds(curNeg, maxX, maxY)) {
							antipodes += this.checkAntipode(curNeg) ? 1 : 0;
						} else {
							negOutOfBounds = true;
						}
					}
					step++;
				}
			}
		}
		return antipodes;
	}
}

export default new Day8();
