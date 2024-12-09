import { describe, expect, it } from '@jest/globals';
import day7 from './index';

describe(`On Day 7`, () => {
	it(
		`part1 is sum of all operation results that can be made valid`,
		() => {
			expect(day7.solveForPartOne(
				`190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`
			)).toBe(
				`3749`
			);
		}
	);
	it(`part2 is the sum of valid expressions with 3 operands`,
		() => {
			expect(day7.solveForPartTwo(
				`190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`
			)).toBe(
				`11387`
			);
		}
	);
}
);
