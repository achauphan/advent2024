import { describe, expect, it } from '@jest/globals';
import day6 from './index';

describe(`On Day 6`, () => {
	it(
		`part1 is the number of unique cells visited`,
		() => {
			expect(day6.solveForPartOne(
				`....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`
			)).toBe(
				`41`
			);
		}
	);
	it(`part2 is identity function`,
		() => {
			expect(day6.solveForPartTwo(
				`hello`
			)).toBe(
				`hello`
			);
		}
	);
}
);
