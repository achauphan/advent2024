import { Day } from "../day";
import { tokenizeAs2dArrayByRow } from "../utils";

type Operator = {
	equation: (left: number, right: number) => number;
	symbol: string;
}

class Day7 extends Day {
	constructor () {
		super(7);
	}

	solveForPartOne (input: string): string {
		const operators: Operator[] = [
			{
				equation: (left, right) => left + right,
				symbol: `+`
			},
			{
				equation: (left, right) => left * right,
				symbol: `*`
			}
		];
		return this.equationWrapper(input, operators).toString();
	}

	solveForPartTwo (input: string): string {
		const operators: Operator[] = [
			{
				equation: (left, right) => left + right,
				symbol: `+`
			},
			{
				equation: (left, right) => left * right,
				symbol: `*`
			},
			{
				equation: (left, right) => parseInt(left.toString() + right.toString()),
				symbol: `||`
			}
		];
		return this.equationWrapper(input, operators).toString();
	}

	equationWrapper (input: string, operators: Operator[]): number {
		const rows = tokenizeAs2dArrayByRow(input, (x) => x, `: `);
		let sumOfValidRows = 0;
		rows.forEach((row) => {
			const result = parseInt(row[0])
			const values = row[1].split(` `).map((x) => parseInt(x));
			if (this.testEquation(operators, result, values)) {
				sumOfValidRows += result;
			}
		});
		return sumOfValidRows;
	}

	/**
	 * Given a list of operators, a mask of which operators to use, and a list of values, evaluate the equation.
	 * @param equationMask
	 * @param values
	 * @returns
	 */
	evaluateEquation (operators: Operator[], equationMask: number[], values: number[]): number {
		let result = values[0];
		for (let i = 0; i < equationMask.length; i++) {
			result = operators[equationMask[i]].equation(result, values[i + 1]);
		}
		return result;
	}

	/**
	 * Given a list of operators, an end result and a list of values, test if the equation can be made valid.
	 * @param operators
	 * @param result
	 * @param values
	 * @returns
	 */
	testEquation (operators: Operator[], result: number, values: number[]) {
		const numOfOperands = values.length - 1;
		const numOfEquations = operators.length ** numOfOperands;
		for (let i = 0; i < numOfEquations; i++) {
			// Use the toString function to turn a base 10 integer into a binary string (when radix 2)
			// which is used as a mask of what operators to use.
			const binary = i.toString(operators.length).padStart(numOfOperands, `0`);
			const equationMask = binary.split(``).map((x) => parseInt(x));
			const equationResult = this.evaluateEquation(operators, equationMask, values);
			if (equationResult === result) {
				return true;
			}
		}
	}
}

export default new Day7();
