import { Day } from "../day";

type Vector = {
	x: number;
	y: number;
};

type PrizeMachine = {
	buttonA: Vector;
	buttonB: Vector;
	target: Vector;
};

class Day13 extends Day {
	constructor () {
		super(13);
	}

	solveForPartOne (input: string): string {
		const machines = parseInput(input);
		let sumTokens = 0;
		for (const machine of machines) {
			sumTokens += calculateTokenCost(machine.buttonA, machine.buttonB, machine.target, 100);
		}
		return sumTokens.toString();
	}

	solveForPartTwo (input: string): string {
		const machines = parseInput(input, 10000000000000);
		let sumTokens = 0;
		for (const machine of machines) {
			sumTokens += calculateTokenCost(machine.buttonA, machine.buttonB, machine.target);
		}
		return sumTokens.toString();
	}
}

function parseInput (input: string, modValue?: number): PrizeMachine[] {
	const machines: PrizeMachine[] = [];
	const regex = /\d+/g;
	const chunks = input.split(/[\n\r]{4}|\n{2}/); // the test file strips the \r but the input file has both \n and \r - is dumb.
	chunks.forEach(chunk => {
		const lines = chunk.split(`\n`);
		const buttonA = Array.from(lines[0].matchAll(regex)).map(x => parseInt(x[0]));
		const buttonB = Array.from(lines[1].matchAll(regex)).map(x => parseInt(x[0]));
		const target = Array.from(lines[2].matchAll(regex)).map(x => parseInt(x[0]));
		machines.push({
			buttonA: {
				x: buttonA[0],
				y: buttonA[1]
			},
			buttonB: {
				x: buttonB[0],
				y: buttonB[1]
			},
			target: {
				x: modValue !== undefined ? modValue + target[0] : target[0],
				y: modValue !== undefined ? modValue + target[1] : target[1],
			}
		});
	});

	return machines;
}

/**
 * Linear algebra *shudders*.
 * Using the determinant of the matrix formed by the button vectors and the target vector, determine the cost in tokens to reach the target (if possible).
 * @param buttonA
 * @param buttonB
 * @param target
 * @param maxPresses
 * @returns
 */
function calculateTokenCost (buttonA: Vector, buttonB: Vector, target: Vector, maxPresses?: number): number {
	const determinant = buttonA.x * buttonB.y - buttonA.y * buttonB.x;
	if (determinant === 0) { // All values provided are invertible but leaving for posterity
		return 0;
	}
	const b = (target.y * buttonA.x - target.x * buttonA.y) / determinant;
	const a = (target.x - b * buttonB.x) / buttonA.x;
	if (maxPresses !== undefined && (a > maxPresses || b > maxPresses)) {
		return 0;
	} else if (!Number.isInteger(a) || !Number.isInteger(b)) {
		return 0;
	}
	return 3 * a + b;
}

export default new Day13();
