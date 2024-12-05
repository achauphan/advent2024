import { describe, expect, it } from '@jest/globals';
import day3 from './index';

describe(`On Day 3`, () => {
	it(
		`part1 sums up all mul(x,y) instructions within the given string`,
		() => {
			expect(day3.solveForPartOne(
				`xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`
			)).toBe(
				`161`
			);
		});
	it(
		`part2 sums up all mul(x,y) instructions within the given string - except those disabled by do() and don't() commands`,
		() => {
			expect(day3.solveForPartTwo(
				`xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`
			)).toBe(
				`48`
			);
		})
});
