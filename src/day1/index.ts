import { Day } from "../day";
import { tokenizeAs2dArrayByColumn } from "../utils";

class Day1 extends Day {
	constructor () {
		super(1);
	}

	solveForPartOne (input: string): string {
		const tokens = tokenizeAs2dArrayByColumn(input, (x) => parseInt(x, 10));
		const left = tokens[0];
		const right = tokens[1];
		left.sort((a, b) => a - b);
		right.sort((a, b) => a - b);
		// assume both arrays are same length
		let sumOfDiffs = 0;
		for (let i = 0; i < left.length; i++) {
			sumOfDiffs += Math.abs(left[i] - right[i]);
		}
		return sumOfDiffs.toString();
	}

	solveForPartTwo (input: string): string {
		const tokens = tokenizeAs2dArrayByColumn(input, (x) => parseInt(x, 10));
		const left = tokens[0];
		const right = tokens[1];
		left.sort((a, b) => a - b);
		right.sort((a, b) => a - b);
		let sum = 0;
		for (let i = 0; i < left.length; i++) {
			sum += left[i] * right.filter(x => x === left[i]).length;
		}
		return sum.toString();
	}
}

export default new Day1();
