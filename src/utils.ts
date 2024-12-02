
export function tokenize<T>(input: string, separator: string | RegExp, parser: (token: string) => T): T[] {
    return input.split(separator).map(parser);
}

export function tokenizeAsInt2dArrayByRow(input: string): number[][] {
    const tokens = input.split(`\n`);
    const arr = new Array<number[]>();
    tokens.forEach(
        token => {
            arr.push(tokenize(token.trim(), /\s+/, (x) => parseInt(x, 10)));
        }
    );
    return arr;
}

export function tokenizeAsInt2dArrayByColumn(input: string): number[][] {
    const tokens = input.split(`\n`);
    const arr = new Array<number[]>();
    tokens.forEach(
        token => {
            const row = tokenize(token.trim(), /\s+/, (x) => parseInt(x, 10));
            for (let i = 0; i < row.length; i++) {
                if (arr[i] === undefined) {
                    arr[i] = new Array<number>();
                }
                arr[i].push(row[i]);
            }
        }
    );
    return arr;
}