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

### Day 4

#### Part 1

Goal was to find how many occurrences of the word "XMAS" there are in a grid of letters. A recursive solution was my immediate instinct, which should prevent too much unnecessary backtracking. As always with recursive solutions, once you figure out the base cases, it's not too hard. In this case, we do one full pass over the array of characters, and make a call to the `search()` function whenever we find a cell that matches the first letter in the search term. Then, the `search()` function will call up `searchInDirection()` for any cells surrounding the first letter that match the next letter. `searchInDirection()` will then continue calling itself on the next cell until either the next letter does not match, or there are no remaining letters in the search term. Perhaps not the most efficient solution, but since we iterate across the search term, we know that each letter is matched as we proceed, meaning we do not need to backtrack and double check our work at any point.

#### Part 2

Goal is to find the number of X-"MAS" patterns there are in an array of characters. Sometimes AoC is fun, and lets you reuse your part 1 code, and sometimes it doesn't. This is a case of the latter. No matter how I thought about it, there was no way to reuse my existing code without it being massively overhauled in a less than optimal manner. Attempting to make the part 2 solution generic also was not working out in my head since it's hard to decide exactly how other inputs would be handled and did not seem worth the time. In this case, I figured I should just do the easy solution, even if it isn't super elegant. For part 2 I just found each instance of "A" in the list. Then, we know that for this to be valid, the upper left has to be either "M" or "S" and the lower right needs to be the opposite letter. In addition, the same needs to be true for the upper right and lower left letters respectively. Once again, probably not ideal, but it's simple and easy to understand and that seemed better than making assumptions about how a generic form of this very specific problem would be handled.

### Day 5

#### Part 1

Goal was to sum the middle number of all "updates" that follow a series of rules where if X and Y are both in the update, X must proceed Y. Some tinkering with the input was needed for my tokenizer to split the input apart correctly, but once that was done, the first step was to construct a map of rules. Each unique X value was given a map entry with an array of rules (where Y was required after X). Then, similar to Day 4, the best approach to me seemed to be another recursive function, indexing across each update and its values. For each index, we check the rules and see if there is a value on the left of the indexed value that matches one of its corresponding rules. If so, then Y comes before X, meaning the update is invalid, and we can immediately stop checking the line and move to the next. Once we know if it's valid, we can easily O(1) get the middle value of the update and add it to the running total. The only issue I ran into here was misreading the instructions, and so I initially tried to validate against items that weren't even in the update - but once I realized, this went pretty smoothly.

#### Part 2

Goal was to sum the middle number of all _invalid_ "updates" after they had been reordered to be correct. I detail more about my approach in the code for this one, but given one critical assumption, I was able to establish 3 cases and create a custom sort function to use on the invalid updates (determining if they were invalid based on the `isValid()` recursive function I used in part 1). Similar to most AoC challenges, if what work you've done so far is correct, the next step can be done without reverifying the validity of the steps before. The function used to sort makes sure that what has already has been done follows the set of rules provided, so we just need to prove the current step also is correct, and by the end we know we have a valid update without going back and double checking the rules of the items already in the update. This is based on the assumption that there will be no rules provided that are contradictory. Part of me still wants to do a proof by induction for this as well, but not today. Was a pretty fun day overall, I got to make a custom sort function - I don't get to do that too often!

### Day 6

#### Part 1

WIP

#### Part 2

WIP

### Day 7

#### Part 1

Goal was to sum up the results of all lines in the input which could be made valid by using + or * operations. This uniquely required ignoring standard order of operations (thank the lord for that). The big hurdle here was figuring out how to actually generate and test every single unique combination of operators on the values against the goal result. Luckily, I had a brainiac moment and realized there are 2 operators, meaning some sort of binary mask should work great. After looking into an easy way to convert integers into their binary representations (with padded 0s) this was pretty straightforward! If we are given n values on the right, then we know that there are n - 1 spaces for operators, and since there are 2 different types of operators, we know that there must be 2^(n - 1) different possible ways to evaluate the equation. We can loop over all numbers from 0 to 2^(n - 1) and test the equation using the binary mask from that iteration. And it worked great. I always love it when you get the answer right on the first try.

#### Part 2

Goal was the same as part one but with the addition of a new operator type: || for concatenation. Luckily, this was really easy given the work that was put into part one. We can simply change the integer -> binary converter to do base 3 instead (since there are 3 different operator types). This means we should have 3^(n-1) possible ways to interpret the equation, found by evaluating the values against the equation mask as defined by turning the iteration number to a base 3 mask. This meant I could use almost the exact same code as part 1 with literally a single number change and 1 extra line of code.

Theoretically this could be extended further, but each additional operator option would add exponentially more time. There is likely a way to improve this so it's less brute force, but it was quick and I'm running behind on AoC right now, so that's a problem for another day.
