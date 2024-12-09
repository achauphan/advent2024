
export function tokenize<T = string> (input: string, parser?: (token: string) => T, separator?: string | RegExp): T[] {
	return input.split(separator ?? /\s+/).map(parser ?? (token => token as unknown as T));
}

/**
 * Generic function to tokenize a string into a 2D array.
 * Each row is assumed to be separated by a newline character, and each column is separated by a provided separator.
 * The values are parsed using the provided parser function.
 *
 * @param input The input string to tokenize - each row is separated by a newline character
 * @param parser A parser function can be provided to convert the token into a different type (e.g. integer, float, etc). The default parser is the identity function (string => string)
 * @param separator The default separator which will be used if none is provided is a regex matching 1+ whitespace characters.
 * @returns
 */
export function tokenizeAs2dArrayByRow<T = string> (input: string, parser?: (token: string) => T, separator?: string | RegExp): T[][] {
	const tokens = input.split(`\n`);
	const arr: T[][] = [];
	tokens.forEach(
		token => {
			arr.push(tokenize(token.trim(), parser, separator));
		}
	);
	return arr;
}

/**
 * Generic function to tokenize a string into a 2D array.
 * This will also transpose the array so that the columns become rows and vice versa.
 * Each row is assumed to be separated by a newline character, and each column is separated by a provided separator.
 * The values are parsed using the provided parser function.
 *
 * @param input
 * @param parser
 * @param separator
 * @returns
 */
export function tokenizeAs2dArrayByColumn<T = string> (input: string, parser?: (token: string) => T, separator?: string | RegExp): T[][] {
	const tokens = input.split(`\n`);
	const arr: T[][] = [];
	tokens.forEach(
		token => {
			const row = tokenize(token.trim(), parser, separator);
			for (let i = 0; i < row.length; i++) {
				if (arr[i] === undefined) {
					arr[i] = [];
				}
				arr[i].push(row[i]);
			}
		}
	);
	return arr;
}
