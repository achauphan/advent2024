import { describe, expect, it } from '@jest/globals';
import day9 from './index';

describe(`On Day 9`, () => {
	it(
		`part1 compresses file blocks across free space`,
		() => {
			expect(day9.solveForPartOne(
				`2333133121414131402`
			)).toBe(
				`1928`
			);
		}
	);
	it(`part2 moves whole file chunks`,
		() => {
			expect(day9.solveForPartTwo(
				`2333133121414131402`
			)).toBe(
				`2858`
			);
		}
	);
}
);
