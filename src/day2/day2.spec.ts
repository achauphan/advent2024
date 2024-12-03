import day2 from './index';

describe('On Day 2', () =>{
    it(`part1 measures lines as safe or unsafe - must be gradually increasing/decreasing and have max change 1-3`, ()=>{
        expect(day2.solveForPartOne(
`7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`)).toBe('2');
    });
    it(`part2 measures lines as safe or unsafe - but can have 1 exception`, ()=>{
        expect(day2.solveForPartTwo(
`7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`)).toBe('4');
    })
});