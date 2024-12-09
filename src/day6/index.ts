import { Day } from "../day";
import { tokenizeAs2dArrayByRow } from "../utils";

type Coordinate = {
	x: number,
	y: number
}

const directionIcons = {
	0: `>`,
	90: `v`,
	180: `<`,
	270: `^`
} as Record<string, string>;

class Day6 extends Day {
	currentRotation: number = 270; // 270 = North, 0 = East, 90 = South, 180 = West (since -y is "up")
	foundEnd: boolean = false;
	map: string[][] = [];
	rotationIncrement: number = +90; // clockwise
	steps: number = 0;
	visited: Map<string, number> = new Map<string, number>();

	constructor () {
		super(6);
	}

	get direction (): Coordinate {
		return {
			x: Math.round(Math.cos(this.currentRotation * Math.PI / 180)),
			y: Math.round(Math.sin(this.currentRotation * Math.PI / 180))
		};
	}

	solveForPartOne (input: string): string {
		this.map = tokenizeAs2dArrayByRow(input, (x) => x, ``);
		const start = this.identifyStartingLocation();
		this.visited.set(`${start.x},${start.y}`, 1);
		return this.navigate(start).toString();
	}

	solveForPartTwo (input: string): string {
		return input;
	}

	identifyStartingLocation (): Coordinate {
		let start: Coordinate = { x: 0, y: 0 };
		this.map.forEach(
			(row, y) => {
				row.forEach(
					(cell, x) => {
						if (cell === `^`) {
							console.log(`Found starting location at ${x}, ${y}`);
							start = { x, y };
						}
					}
				);
			}
		);
		return start;
	}

	rotate (): void {
		this.currentRotation = (this.currentRotation + this.rotationIncrement) % 360;
	}

	navigate (location: Coordinate): number {
		while (!this.foundEnd) {
			location = this.navigateInDirection(location);
		}
		return this.visited.size;
	}

	navigateInDirection (location: Coordinate): Coordinate {
		let { x, y } = location;
		x += this.direction.x;
		y += this.direction.y;
		const nextValue = this.map[y]?.[x];
		if (nextValue === undefined) {
			this.foundEnd = true;
			return location;
		}
		if (nextValue === `#`) {
			this.rotate();
			return location;
		}
		const coordString = `${x},${y}`;
		const visitedCount = this.visited.get(coordString) ?? 0;
		this.visited.set(coordString, visitedCount + 1);
		this.map[y][x] = directionIcons[this.currentRotation.toString()];
		this.map[location.y][location.x] = `X`;
		// this.updateMap({ x, y });
		this.steps++;
		return this.navigateInDirection({ x, y });
	}

	updateMap (location: Coordinate): void {
		const viewWindowHeight = 20;
		const viewWindowWidth = 42;
		const upperLeft = {
			x: location.x - Math.floor(viewWindowWidth / 2),
			y: location.y - Math.floor(viewWindowHeight / 2)
		};
		console.clear();
		for (let i = 0; i < viewWindowHeight; i++) {
			let row = ``;
			for (let j = 0; j < viewWindowWidth; j++) {
				const val = this.map[upperLeft.y + i]?.[upperLeft.x + j] ?? ` `;
				row += val;
			}
			console.log(row);
		}
	}
}

export default new Day6();
