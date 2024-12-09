import { describe, expect, it } from '@jest/globals';
import day8 from './index';

describe(`On Day 8`, () => {
	it(
		`part1 is number of antipodes, when a pair of antenna only have 2 other antipodes`,
		() => {
			expect(day8.solveForPartOne(
				`............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`
			)).toBe(
				`14`
			);
		}
	);
	it(`part2 is number of antipodes, when a pair of antenna has as many antipodes as possible in a line`,
		() => {
			expect(day8.solveForPartTwo(
				`............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`
			)).toBe(
				`34`
			);
		}
	);
}
);
