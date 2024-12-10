import { Day } from "../day";
import { tokenizeAs2dArrayByRow } from "../utils";

type Node = {
	id: string;
	x: number;
	y: number;
	value: number;
	neighbors: string[];
}

class Day10 extends Day {
	nodes: Map<Node[`id`], Node> = new Map();
	trailheads: Array<string> = [];

	constructor () {
		super(10);
	}

	solveForPartOne (input: string): string {
		this.createNodeNetwork(input);
		let totalTrails = 0;
		this.trailheads.forEach((id) => {
			const result = this.followTrail(id);
			totalTrails += (new Set(result)).size;
		});
		return totalTrails.toString();
	}

	solveForPartTwo (input: string): string {
		this.createNodeNetwork(input);
		let totalTrails = 0;
		this.trailheads.forEach((id) => {
			const result = this.followTrail(id);
			totalTrails += result.length;
		});
		return totalTrails.toString();
	}

	createNodeNetwork (input: string): void {
		this.nodes.clear();
		this.trailheads = [];
		const tokens = tokenizeAs2dArrayByRow(input, (x) => parseInt(x), ``);
		tokens.forEach((row, y) => {
			row.forEach((value, x) => {
				const id = `${x},${y}`;
				const neighbors = [];
				if (x - 1 >= 0) {
					neighbors.push(`${x - 1},${y}`);
				}
				if (x + 1 < row.length) {
					neighbors.push(`${x + 1},${y}`);
				}
				if (y + 1 < tokens.length) {
					neighbors.push(`${x},${y + 1}`);
				}
				if (y - 1 >= 0) {
					neighbors.push(`${x},${y - 1}`);
				}
				this.nodes.set(id, {
					id,
					x,
					y,
					value,
					neighbors
				});
				if (value === 0) {
					this.trailheads.push(id);
				}
			});
		});
	}

	followTrail (currentId: string): Array<string> {
		// console.log(`checking node:`, currentId);
		const currentNode = this.nodes.get(currentId);
		if (currentNode === undefined) {
			return [];
		} else if (currentNode.value === 9) {
			// console.log(`found terminus`);
			return [currentId];
		}
		// let sumOfBranches = 0;
		let terminuses: string[] = [];
		currentNode.neighbors.forEach((nextId) => {
			const nextNode = this.nodes.get(nextId);
			// console.log(`current node`, currentNode, `next node`, nextNode)
			if (nextNode !== undefined && nextNode.value === currentNode.value + 1) {
				// console.log(`recursing on`, currentId, nextNode.id);
				// sumOfBranches += this.followTrail(nextNode.id, pathSoFar?.concat(currentId) ?? undefined);
				terminuses = terminuses.concat(this.followTrail(nextId));
			}
		});
		return terminuses;
	}
}

export default new Day10();
