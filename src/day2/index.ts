import { Day } from "../day";
import { tokenizeAsInt2dArrayByRow } from "../utils";

class Day2 extends Day {

    constructor(){
        super(2);
    }

    solveForPartOne(input: string): string {
        const tokens = tokenizeAsInt2dArrayByRow(input);
        const minChange = 1;
        const maxChange = 3;
        const safeReports = 
            tokens.map(row => {
                return this.isSafe(row) ? row : undefined;
            }).filter(row => row !== undefined);
        return safeReports.length.toString();
    }

    solveForPartTwo(input: string): string {
        const tokens = tokenizeAsInt2dArrayByRow(input);
        const safeReports = 
            tokens.map(row => {
                if(this.isSafe(row)){
                    return row;
                }
                for (let i = 0; i < row.length; i++) { // index 0 was not being checked in initial implementation
                    const rowCopy = row.slice();
                    rowCopy.splice(i, 1);
                    if(this.isSafe(rowCopy)){
                        return rowCopy;
                    }
                }
            }).filter(row => row !== undefined);
        return safeReports.length.toString();
    }

    isSafe(row: number[]): boolean {
        const minChange = 1;
        const maxChange = 3;
        const isConstantIncreasing = row[0] < row[1];
        for (let i = 1; i < row.length; i++) {
            if (row[i - 1] < row[i] !== isConstantIncreasing) {
                return false;
            }
            if (Math.abs(row[i] - row[i - 1]) > maxChange || Math.abs(row[i] - row[i - 1]) < minChange) {
                return false;
            }
        }
        return true;
    }
}

export default new Day2;