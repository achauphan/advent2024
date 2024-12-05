import { Day } from "../day";

type Coordinate = {
	x: number,
	y: number
}

class Day4 extends Day {
	tokens: Array<string>[] = []; // didn't want to pass in as parameter to the recursive function

	constructor () {
		super(4);
	}

	solveForPartOne (input: string): string {
		this.tokens = input.split(`\n`).map(row => row.trim().split(``));
		const searchTerm = `XMAS`;
		let totalMatches = 0;
		for (let j = 0; j < this.tokens.length; j++) { // first pass, begin search at all X's
			for (let i = 0; i < this.tokens[j].length; i++) {
				if (this.tokens[j][i] === searchTerm[0]) {
					totalMatches += this.search(searchTerm, { x: i, y: j }); // will return between 0 and 8 for each X
				}
			}
		}
		return totalMatches.toString();
	}

	solveForPartTwo (input: string): string {
		this.tokens = input.split(`\n`).map(row => row.trim().split(``));
		const searchTerm = `MAS`;
		let totalMatches = 0;
		for (let j = 0; j < this.tokens.length; j++) {
			for (let i = 0; i < this.tokens[j].length; i++) {
				if (this.tokens[j][i] === searchTerm[1]) { // start at A's
					const upperLeft = this.tokens[j - 1]?.[i - 1];
					const upperRight = this.tokens[j - 1]?.[i + 1];
					const lowerLeft = this.tokens[j + 1]?.[i - 1];
					const lowerRight = this.tokens[j + 1]?.[i + 1];
					const isLeftDiag =
						(upperLeft === searchTerm[0] && lowerRight === searchTerm[2]) ||
						(upperLeft === searchTerm[2] && lowerRight === searchTerm[0]);
					const isRightDiag =
						(upperRight === searchTerm[0] && lowerLeft === searchTerm[2]) ||
						(upperRight === searchTerm[2] && lowerLeft === searchTerm[0]);
					totalMatches += isLeftDiag && isRightDiag ? 1 : 0;
				}
			}
		}
		return totalMatches.toString();
	}

	/**
	 * Wrapper function to search for a word in a grid. First letter can go in any direction, so run between 0-8 searches.
	 *
	 * @param searchTerm
	 * @param current
	 * @returns
	 */
	search (searchTerm: string, current: Coordinate): number {
		const remainingSearchTerm = searchTerm.slice(1); // first letter is current letter
		const nextLetter = remainingSearchTerm[0];
		if (nextLetter === undefined) {
			return 1; // if the search term is only 1 letter long, then this is a complete match
		}
		let matches = 0;
		for (let j = current.y - 1; j <= current.y + 1; j++) {
			for (let i = current.x - 1; i <= current.x + 1; i++) {
				if (this.tokens[j]?.[i] === undefined || (i === current.x && j === current.y)) { // skip checking center
					continue;
				}
				if (this.tokens[j][i] === nextLetter) {
					matches += this.searchInDirection(remainingSearchTerm, { x: i, y: j }, current);
				}
			}
		}
		return matches;
	}

	/**
	 * Recursive search function to find all matches of a word in a grid in a line.
	 *
	 * Cases:
	 * 1. If the next letter is undefined, then we have found a complete match, return 1.
	 * 2. If there are no matches in a direction, return 0.
	 * 3. If there are matches in a direction, continue searching in that direction. Return a call to this function with the remaining search term and new coordinate.
	 *
	 * @param searchTerm
	 * @param current
	 * @param last
	 * @returns
	 */
	searchInDirection (searchTerm: string, current: Coordinate, last: Coordinate): number {
		const remainingSearchTerm = searchTerm.slice(1); // first letter is current letter
		const nextLetter = remainingSearchTerm[0];
		if (nextLetter === undefined) { // Case 1: if undefined, there's no more terms to be searched, meaning complete match
			return 1;
		}
		const diffX = current.x - last.x; // determine direction of search, continue in same direction
		const diffY = current.y - last.y;
		const isMatch = this.tokens[current.y + diffY]?.[current.x + diffX] === nextLetter;
		if (!isMatch) { // Case 2: if no match, return 0
			return 0;
		}
		return this.searchInDirection(remainingSearchTerm, { x: current.x + diffX, y: current.y + diffY }, current); // Case 3: continue in same direction if match
	}
}

export default new Day4();
