import { describe, expect, it } from '@jest/globals';
import day7 from './index';

describe(`On Day 7`, () => {
	it(
		`part1 is identity function`,
		() => {
			expect(day7.solveForPartOne(
				`hello`
			)).toBe(
				`hello`
			);
		}
	);
	it(`part2 is identity function`,
		() => {
			expect(day7.solveForPartTwo(
				`hello`
			)).toBe(
				`hello`
			);
		}
	);
}
);
