import { Day } from "../day";
import { Node } from "../utils";

class Block {
	dataLength: number;
	freeSpace: number;
	hasChecked: boolean;
	id: number;

	constructor (dataLength: number, freeSpace: number, id: number) {
		this.dataLength = dataLength;
		this.freeSpace = freeSpace;
		this.id = id;
		this.hasChecked = false;
	}

	toString (): string {
		return this.id.toString();
	}
}

class Day9 extends Day {
	blocks: Block[] = [];

	constructor () {
		super(9);
	}

	solveForPartOne (input: string): string {
		const blocks = this.createBlocks(input);
		const compressed = this.fileCompressor(blocks);
		return this.computeChecksum(compressed).toString();
	}

	solveForPartTwo (input: string): string {
		const blocks = this.createBlocks(input);
		return this.linkedListFileCompressor(blocks).toString();
	}

	createBlocks (input: string): Block[] {
		const blocks: Block[] = [];
		for (let i = 0; i < input.length - 1; i += 2) {
			const dataBlock = input[i];
			const lengthBlock = input[i + 1];
			const dataLength = parseInt(dataBlock, 10);
			const freeSpace = parseInt(lengthBlock, 10);
			blocks.push(new Block(dataLength, freeSpace, i / 2));
		}
		if (input.length % 2 === 1) {
			const lastBlock = input[input.length - 1];
			const dataLength = parseInt(lastBlock, 10);
			const freeSpace = 0;
			blocks.push(new Block(dataLength, freeSpace, blocks.length));
		}
		return blocks;
	}

	fileCompressor (blocks: Block[]): number[] {
		let tailIndex = blocks.length - 1;
		let remainingDataInBlock = blocks[tailIndex].dataLength;
		const compressed: number[] = [];
		for (let headIndex = 0; headIndex < tailIndex; headIndex++) {
			const dataChunk: number[] = [];
			const activeBlock = blocks[headIndex];
			for (let k = 0; k < activeBlock.dataLength; k++) {
				dataChunk.push(activeBlock.id);
			}
			for (let k = 0; k < activeBlock.freeSpace; k++) {
				if (remainingDataInBlock === 0) {
					tailIndex--;
					remainingDataInBlock = blocks[tailIndex].dataLength;
				}
				dataChunk.push(blocks[tailIndex].id);
				remainingDataInBlock--;
			}
			compressed.push(...dataChunk);
		}
		for (let k = 0; k < remainingDataInBlock; k++) {
			compressed.push(blocks[tailIndex].id);
		}
		return compressed;
	}

	linkedListFileCompressor (blocks: Block[]): number {
		const head = Node.createNodesFromArray(blocks);
		let tail = head.getLast();
		while (tail.previous !== undefined) { // working back from end of list - check each file block once
			let checkingNode = head;
			const previousNode = tail.previous;
			while (checkingNode.next !== undefined && checkingNode !== tail) { // working forward from start of list to find space for target block
				if (checkingNode.value.freeSpace >= tail.value.dataLength) {
					previousNode.value.freeSpace += tail.value.dataLength + tail.value.freeSpace; // merge free space - needed for indices to be correct during checksum
					tail.value.freeSpace = checkingNode.value.freeSpace - tail.value.dataLength;
					checkingNode.value.freeSpace = 0; // no free space left since we jammed the current block in
					checkingNode.insertAfter(tail);
					break;
				}
				checkingNode = checkingNode.next;
			}
			tail.value.hasChecked = true;
			tail = previousNode;
		}

		let checksum = 0;
		let index = 0;
		let current: Node<Block> | undefined = head;
		// would have kept checksum calculation separate but honestly I just wanted to move on
		// and this is faster than converting the linked list to an array then calling computeChecksum
		while (current !== undefined) {
			for (let i = 0; i < current.value.dataLength; i++) {
				checksum += current.value.id * index;
				index++;
			}
			for (let i = 0; i < current.value.freeSpace; i++) { // skip if free space, but index has to increment
				index++;
			}
			current = current.next;
		}
		return checksum;
	}

	computeChecksum (data: number[]): number {
		let checksum = 0;
		data.forEach((value, index) => {
			if (value === -1) {
				return;
			}
			checksum += value * index;
		});
		return checksum;
	}
}

export default new Day9();
