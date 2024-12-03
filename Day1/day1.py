
firstList = []
secondList = []

def firstday():
    file = open("day1Input.txt", "r")
    for line in file:
        numbers = line.split()
        firstList.append(int(numbers[0]))
        secondList.append(int(numbers[1]))
    firstList.sort()
    secondList.sort()
    sum = 0
    counter = 0
    curNum = firstList[0]
    for i in range(len(firstList)):
        countNum = secondList.count(firstList[i])
        sum = sum + (firstList[i] * countNum)
    return sum


print(firstday())