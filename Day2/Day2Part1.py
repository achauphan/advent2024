

def dayTwoPartOne():
    safeReports = 0
    file = open("Day2Text.txt", "r")
    for line in file:
        numbers = line.split()
        safe = True
        
        #If our list is 1 long, it is safe
        if (len(numbers) == 1):
            safeReports += 1
            continue
        
        #int our starting number
        curNum = int(numbers[0])
        
        #Check to see if were are increasing or decreating
        UpTrueDownFalse = False
        if (int(numbers[1]) > int(numbers[0])):
            UpTrueDownFalse = True
        
        for i in range(1, len(numbers)):
            safeCheck = int(numbers[i])
            
            if (UpTrueDownFalse):
                if (safeCheck < curNum + 1) or (safeCheck > curNum + 3):
                    safe = False
                    break
                    
            else:
                if (safeCheck > curNum - 1) or (safeCheck < curNum - 3):
                    safe = False
                    break
            curNum = safeCheck

        if (safe):
            safeReports += 1
            print("SAFE " + line)

    return safeReports

print(dayTwoPartOne())