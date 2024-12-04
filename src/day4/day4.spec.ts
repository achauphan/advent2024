import day4 from './index';

describe('On Day 4', () =>
    {
        it(`part1 is the number of word matches in a grid`, () => 
            {
                expect(day4.solveForPartOne(
`MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`)).toBe('18');
            }
        );
        it(`part2 is the number of X-MAS patterns there are in a grid`, ()=> 
            {
                expect(day4.solveForPartTwo(
`MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`)).toBe('9');            
            }
        );
    }
);