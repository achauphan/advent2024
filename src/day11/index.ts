import { Day } from "../day";
import { Node } from "../utils";

class Day11 extends Day {
	stoneMap = new Map<number, Map<number, number>>();

	constructor () {
		super(11);
	}

	solveForPartOne (input: string): string { // linked list is lightning fast compared to arrays here
		const row = input.split(` `).map(Number);
		const steps = 25;
		const head = Node.createNodesFromArray(row);
		for (let i = 0; i < steps; i++) {
			head.forEach(blink, true);
		}
		return head.getForwardLength().toString();
	}

	solveForPartTwo (input: string): string {
		this.stoneMap.clear();
		const row = input.split(` `).map(Number);
		const steps = 75;
		let numStones = row.length;
		for (const stone of row) {
			numStones += this.recurse(stone, 0, steps);
		}
		return numStones.toString();
	}

	recurse (stoneVal: number, currentStep: number, stepsRemaining: number): number {
		const cache = this.stoneMap.get(stoneVal) ?? new Map<number, number>();

		if (cache.has(stepsRemaining)) {
			return cache.get(stepsRemaining)!;
		}

		let numNewStones = 0;
		const newStones = blinkArray(stoneVal);
		numNewStones += newStones.length - 1;
		if (stepsRemaining - 1 > 0) {
			for (const newStone of newStones) {
				numNewStones += this.recurse(newStone, currentStep + 1, stepsRemaining - 1);
			}
		}
		cache.set(stepsRemaining, numNewStones);
		this.stoneMap.set(stoneVal, cache);

		return numNewStones;
	}
}

function blink (node: Node<number>): void {
	if (node.value === 0) {
		node.value = 1;
		return;
	}

	const places = numOfPlaces(node.value);
	if (places % 2 === 0) {
		node.insertAfter(node.value % Math.pow(10, places / 2));
		node.value = Math.floor(node.value / Math.pow(10, places / 2));
		return;
	}

	node.value *= 2024;
}

function blinkArray (stoneVal: number): number[] {
	if (stoneVal === 0) {
		return [1];
	}

	const places = numOfPlaces(stoneVal);
	if (places % 2 === 0) {
		const left = stoneVal % Math.pow(10, places / 2);
		const right = Math.floor(stoneVal / Math.pow(10, places / 2));
		return [left, right];
	}

	return [stoneVal * 2024];
}

function numOfPlaces (input: number) {
	let count = 0;
	while (input > 0) {
		input = Math.floor(input / 10);
		count++;
	}
	return count;
}

export default new Day11();
