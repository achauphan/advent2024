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

`git push group-advent-solutions main:dylan` to push to group repo as separate branch.

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

#### Part 2

This was a simple modification to the existing Part 1 solution. Just instead of summing up the abs of the differences, we sum up all left elements times their freq in the right. Use a built in `.filter()` function to simplify this process.

### Day 2

#### Part 1

Goal was to check rows of integers and see if they follow two cases across the whole row. Using the tokenizer util, iterate over the rows and check the cases. If a comparison in the row fails a case, then the whole row fails.

#### Part 2

Goal was to do the same as part one, but allow for a single errored value. This was a pain. There are 12 cases in my input which were not working with my initial design (as I believe the 0th index value was never being removed from the list), so a brute force solution was necessary. I hope to revisit this since as long as we can check 0 and ensure that it's accurate, then the first error found is the linchpin (if removing the first error doesn't work, then no other value can be removed so that it works). I could write a proof for this using induction, but I don't want to.

### Day 3

#### Part 1

Goal was to sum up a series of `mul(x,y)` commands in a messy string. This was actually incredibly easy since I know regex pretty well. Just `.matchAll()` with the correct regex equation across the string, and then for each match, parse integers and sum up their products.

#### Part 2

Goal was to extend part 1 by also adding an enable/disable command as `do()` and `don't()`. This was also pretty straightforward. Adjust the regex string to also look for `do()` and `don't()` commands. Then, for each match, use the matched text (match[0]) to see if the command is enable, disable, or multiply, and then follow those commands.

I love regex <3
