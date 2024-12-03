import day0 from './index';

describe('On Day 0', () =>
    {
        it(`part1 is identity function`, () => 
            {
                expect(day0.solveForPartOne('hello')).toBe('hello');
            }
        );
        it(`part2 is identity function`, ()=> 
            {
                expect(day0.solveForPartTwo('hello')).toBe('hello');
            }
        );
    }
);