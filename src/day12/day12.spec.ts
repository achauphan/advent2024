import { describe, expect, it } from '@jest/globals';
import day12 from './index';

describe(`On Day 12`, () => {
	it(
		`part1 is identity function`,
		() => {
			expect(day12.solveForPartOne(
				`RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`
			)).toBe(
				`1930`
			);
		}
	);
	it(`part2 is identity function`,
		() => {
			expect(day12.solveForPartTwo(
				`RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`
			)).toBe(
				`1206`
			);
		}
	);
}
);
