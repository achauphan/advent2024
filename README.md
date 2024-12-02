# Advent of Code in Typescript

[Advent of Code](https://adventofcode.com/) 2025 with Typescript and jest for testing.

## How to use (develop)

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

A debugger config is set up for testing - update the launch.json file with the day to debug. Then breakpoint in vscode and run with F5 or in the debug tab.

## How to use (test solutions)

Initial setup: `npm install`

Once setup is complete, for each day, where `X` is the day number (1-25) run `npm run start X` to run the day's test or run `npm test` to run all tests for all days.

## Credits

Project skeleton taken from <https://github.com/LBognanni/adventofcode-typescript-starter> so I didn't spend more time setting up the environment than I did solving the puzzles. As such, the MIT license that was filed under is retained in the code.

## Docs

### Day 1

#### Part 1

Starting off pretty simple - goal is to just sum the differences between a sorted left list and a sorted right list.

Adding a tokenizer function in utils should make future days easier, and worked especially well for Day 1.

Approach was just to parse the input as two columns, sort said columns, and then iterate over the lists, summing the absolute value of the differences each time.

Since I believe the .sort method uses either Quick or Merge sort, it should be O(n log n) time complexity, and since we only iterate over the lists once, that should be the upper bound of this problem.

#### Part 2

This was a simple modification to the existing Part 1 solution. Just instead of summing up the abs of the differences, we sum up all left elements times their freq in the right. Use a built in .filter function to simplify this process.

Time complexity is based on the complexity of .filter, which I imagine is also O(n log n). Since it's called for each element in the array, this would likely be something like O(n^2 log n) then.
