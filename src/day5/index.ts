import { Day } from "../day";
import { tokenizeAs2dArrayByRow } from "../utils";

class Day5 extends Day {
	rules = new Map<number, Array<number>>();
	updates: Array<number>[] = [];

	constructor () {
		super(5);
	}

	solveForPartOne (input: string): string {
		this.createRulesAndUpdates(input);
		let sumOfMiddles = 0;
		for (const update of this.updates) {
			// assuming the updates are always odd, but just in case, round
			sumOfMiddles += this.isValid(update) ? update[Math.floor((update.length - 1) / 2)] : 0;
		}
		return sumOfMiddles.toString();
	}

	solveForPartTwo (input: string): string {
		this.createRulesAndUpdates(input);
		let sumOfMiddles = 0;
		this.updates.forEach(update => {
			if (this.isValid(update)) {
				return;
			}
			const reordered = this.reorderUpdate(update);
			sumOfMiddles += reordered[Math.floor((reordered.length - 1) / 2)]
		});
		return sumOfMiddles.toString();
	}

	/**
	 * Wrapper function to create the rules and updates from the input
	 * @param input
	 */
	createRulesAndUpdates (input: string): void {
		this.rules.clear();
		this.updates = [];
		const inputs = input.split(/[\n\r]{4}|\n{2}/); // input has both a \n and \r at the end of each line - so double means 4 - tests strips \r though
		const ruleTokens = tokenizeAs2dArrayByRow(inputs[0], (x) => parseInt(x, 10), `|`);
		this.updates = tokenizeAs2dArrayByRow(inputs[1], (x) => parseInt(x, 10), `,`);
		for (const ruleToken of ruleTokens) {
			const rule = this.rules.get(ruleToken[0]) ?? [];
			if (rule.length === 0) {
				this.rules.set(ruleToken[0], rule);
			}
			rule.push(ruleToken[1]);
		}
	}

	/**
	 * Recursive function to determine if the update is in a valid order based on the rules
	 * @param update
	 * @param index
	 * @returns
	 */
	isValid (update: number[], index: number = 0): boolean {
		const current = update[index];
		if (index === update.length) {
			return true;
		}
		const rules = this.rules.get(current);
		if (rules === undefined) { // if number has no rules then all rules are valid
			return this.isValid(update, index + 1);
		}
		const soFar = update.slice(0, index);
		for (const rule of rules) {
			// if something in the list soFar is in the rules for the current value, the update must be out of order
			if (soFar.find(x => x === rule) !== undefined) {
				return false;
			}
		}
		return this.isValid(update, index + 1);
	}

	/**
	 * Wrapper function around a custom sort function that uses the rules given to reorder an update to a valid state.
	 * @param update
	 * @returns
	 */
	reorderUpdate (update: number[]): number[] {
		// This requires 1 assumption to work - it assumes that all updates will have at least 1 valid order
		// e.g. if x requires y after it, and y requires z after it, z must not require y or x before it.
		// 3 cases are then determined as we compare a value to add against each value in the reordered list.
		// 1. If the value to add requires the target value to be after it, then the value to add must be inserted to the left of the target value
		// 2. If the target value requires the value to add to be after it, then the value to add must be inserted to the right of the target value
		// 3. If neither the value to add nor the target value specifies a rule for the other value, then the value to add must be inserted to the right of the target value
		// This ensures that as the reordered list is built it is *always* correct
		update.sort((a, b) => {
			if (a === b) {
				return 0; // Technically case 3 - there shouldn't be any rules to apply when a === b
			}
			const currentRules = this.rules.get(a);
			if (currentRules !== undefined && currentRules.find(x => x === b) !== undefined) {
				return -1; // case 1
			}
			return 1; // case 2 + 3
		});
		// Were we unsure if the given rules + the update created contradictions, this is where we would call isValid again to ensure accuracy
		// But since we are assuming all data is correct, there's no reason to waste time on it
		return update;
	}
}

export default new Day5();
