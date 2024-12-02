# Advent of Code in Typescript

[Advent of Code](https://adventofcode.com/) 2025 with Typescript and jest for testing.

## How to use

Initial setup

 - `npm install`

For each day, where `X` is the day number (1-25):

 - run `npm run setup X` from your terminal
 - Visit [https://adventofcode.com/{year}/day/X/input](#fill_in_your_day) and copy the contents in your `inputs/dayX/part1.txt` file
 - Implement the necessary logic in `solveForPart1` 
 - Do the same for part 2
 - `npm run start X` to run the day's test
 - `npm test` to run all tests
 - Profit! 🎉

## Credits

Project skeleton taken from https://github.com/LBognanni/adventofcode-typescript-starter so I didn't spend more time setting up the environment than I did solving the puzzles. As such, the MIT license that was filed under is retained in the code.
