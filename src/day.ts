import fs from 'fs';
import { performance } from 'perf_hooks';

abstract class Day {
	id: number;

	constructor (id: number) {
		this.id = id;
	}

	async partOne (): Promise<string> {
		const content = await fs.promises.readFile(`./inputs/day${this.id}/part1.txt`);
		const start = performance.now();
		const result = this.solveForPartOne(content.toString());
		console.log(`Part 1 took: ${performance.now() - start}ms`);
		return result;
	}

	abstract solveForPartOne(input: string) : string;

	async partTwo (): Promise<string> {
		const content = await fs.promises.readFile(`./inputs/day${this.id}/part2.txt`);
		const start = performance.now();
		const result = this.solveForPartTwo(content.toString());
		console.log(`Part 2 took: ${performance.now() - start}ms`);
		return result;
	}

	abstract solveForPartTwo(input: string) : string;
}

export { Day };
