# Advent of Code 2024

## Day 1

### Part 1

Starting off pretty simple - goal is to just sum the differences between a sorted left list and a sorted right list.

Adding a tokenizer function in utils should make future days easier, and worked especially well for Day 1.

Approach was just to parse the input as two columns, sort said columns, and then iterate over the lists, summing the absolute value of the differences each time.

Since I believe the .sort method uses either Quick or Merge sort, it should be O(n log n) time complexity, and since we only iterate over the lists once, that should be the upper bound of this problem.

### Part 2

This was a simple modification to the existing Part 1 solution. Just instead of summing up the abs of the differences, we sum up all left elements times their freq in the right. Use a built in .filter function to simplify this process.

Time complexity is based on the complexity of .filter, which I imagine is also O(n log n). Since it's called for each element in the array, this would likely be something like O(n^2 log n) then.
