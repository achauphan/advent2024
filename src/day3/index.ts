import { Day } from "../day";

class Day3 extends Day {
	constructor () {
		super(3);
	}

	solveForPartOne (input: string): string {
		const regex = /mul\((\d+),(\d+)\)/g;
		let sum = 0;
		const matches = input.matchAll(regex);
		for (const match of matches) {
			sum += parseInt(match[1]) * parseInt(match[2]);
		}
		return sum.toString();
	}

	solveForPartTwo (input: string): string {
		const regex = /mul\((\d+),(\d+)\)|do\(\)|don't\(\)/g;
		let sum = 0;
		let shouldMultiply = true;
		const matches = input.matchAll(regex);
		for (const match of matches) {
			if (match[0] === `do()`) {
				shouldMultiply = true;
				continue;
			} else if (match[0] === `don't()`) {
				shouldMultiply = false;
				continue;
			}
			sum += shouldMultiply ? parseInt(match[1]) * parseInt(match[2]) : 0;
		}
		return sum.toString();
	}
}

export default new Day3();
