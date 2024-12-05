
export function tokenize<T = string> (input: string, parser?: (token: string) => T, separator?: string | RegExp): T[] {
	return input.split(separator ?? /\s+/).map(parser ?? (token => token as unknown as T));
}

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
