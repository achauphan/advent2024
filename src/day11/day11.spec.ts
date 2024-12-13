import { describe, expect, it } from '@jest/globals';
import day11 from './index';

describe(`On Day 11`, () => {
	it(
		`part1 is number of stones after 25 steps`,
		() => {
			expect(day11.solveForPartOne(
				`125 17`
			)).toBe(
				`55312`
			);
		}
	);
	it(`part2 is number of stones after 75 steps`,
		() => {
			expect(day11.solveForPartTwo(
				`125 17`
			)).toBe(
				`65601038650482`
			);
		}
	);
}
);
