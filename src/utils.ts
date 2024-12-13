
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

// Bidirectional linked list supporting generics
export class Node<T> {
	static createNodesFromArray<T> (arr: T[]): Node<T> {
		const head = new Node(arr[0]);
		let current = head;
		let previous: Node<T> | undefined;
		for (let i = 1; i < arr.length; i++) {
			current.next = new Node(arr[i]);
			if (previous !== undefined) {
				current.previous = previous;
			}
			previous = current;
			current = current.next;
		}
		current.previous = previous;
		return head;
	}

	static getArrayFromNode<T> (head: Node<T>): T[] { // forward only
		const arr: T[] = [];
		let current: Node<T> | undefined = head;
		while (current !== undefined) {
			arr.push(current.value);
			current = current.next;
		}
		return arr;
	}

	value: T;
	next: Node<T> | undefined;
	previous: Node<T> | undefined;

	constructor (value: T) {
		this.value = value;
	}

	forEach (callback: (node: Node<T>, index?: number) => void, updateBeforeCallback: boolean = false) {
		let current: Node<T> | undefined = this;
		let index = 0;
		while (current !== undefined) {
			const nextNode: Node<T> | undefined = current.next;
			callback(current, index);
			current = updateBeforeCallback ? nextNode : current.next;
			index++;
		}
	}

	getNext (steps: number = 1): Node<T> {
		let current: Node<T> = this;
		for (let i = 0; i < steps; i++) {
			current = current.next ?? this;
		}
		return current;
	}

	getPrevious (steps: number = 1): Node<T> {
		let current: Node<T> = this;
		for (let i = 0; i < steps; i++) {
			current = current.previous ?? this;
		}
		return current;
	}

	getLast (): Node<T> {
		let current: Node<T> = this;
		while (current.next !== undefined) {
			current = current.next;
		}
		return current;
	}

	getFirst (): Node<T> {
		let current: Node<T> = this;
		while (current.previous !== undefined) {
			current = current.previous;
		}
		return current;
	}

	getForwardLength (): number {
		let current: Node<T> | undefined = this;
		let count = 0;
		while (current !== undefined) {
			count++;
			current = current.next;
		}
		return count;
	}

	getBackwardLength (): number {
		let current: Node<T> | undefined = this;
		let count = 0;
		while (current !== undefined) {
			count++;
			current = current.previous;
		}
		return count;
	}

	toString (): string {
		let current: Node<T> | undefined = this;
		let str = ``;
		let index = 0;
		while (current !== undefined) {
			const next = current.next !== undefined ? current.next.value : undefined;
			const previous = current.previous !== undefined ? current.previous.value : undefined;
			str += `${index}: ${previous} <- ${current.value} -> ${next}\n`;
			current = current.next;
			index++;
		}
		return str;
	}

	insertBefore (node: Node<T> | T): void {
		if (!(node instanceof Node)) {
			node = new Node(node);
		}
		if (node.previous !== undefined) {
			node.previous.next = node.next;
		}
		if (node.next !== undefined) {
			node.next.previous = node.previous;
		}
		if (this.previous !== undefined) {
			this.previous.next = node;
		}
		node.previous = this.previous;
		this.previous = node;
		node.next = this;
	}

	insertAfter (node: Node<T> | T): void {
		if (!(node instanceof Node)) {
			node = new Node(node);
		}
		if (node.previous !== undefined) {
			node.previous.next = node.next;
		}
		if (node.next !== undefined) {
			node.next.previous = node.previous;
		}
		if (this.next !== undefined) {
			this.next.previous = node;
		}
		node.previous = this;
		node.next = this.next;
		this.next = node;
	}
}
