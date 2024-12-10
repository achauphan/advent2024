import { describe, expect, it } from '@jest/globals';
import day10 from './index';

describe(`On Day 10`, () => {
	it(
		`part1 is sum of unique terminus points reachable from each trailhead`,
		() => {
			expect(day10.solveForPartOne(
				`89010123
				78121874
				87430965
				96549874
				45678903
				32019012
				01329801
				10456732`
			)).toBe(
				`36`
			);
		}
	);
	it(`part2 is sum of unique paths to reachable terminus points from each trailhead`,
		() => {
			expect(day10.solveForPartTwo(
				`89010123
				78121874
				87430965
				96549874
				45678903
				32019012
				01329801
				10456732`
			)).toBe(
				`81`
			);
		}
	);
}
);
