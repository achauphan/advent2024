import { describe, expect, it } from '@jest/globals';
import day8 from './index';

describe(`On Day 8`, () => {
	it(
		`part1 is identity function`,
		() => {
			expect(day8.solveForPartOne(
				`hello`
			)).toBe(
				`hello`
			);
		}
	);
	it(`part2 is identity function`,
		() => {
			expect(day8.solveForPartTwo(
				`hello`
			)).toBe(
				`hello`
			);
		}
	);
}
);
