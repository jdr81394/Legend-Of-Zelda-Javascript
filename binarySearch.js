/*
    What is Binary Search?
    It is an algorithm that we can use to find a value in a sorted array

    What is a sorted array?

    [0 , 5, 10 ,12, 14, 22, 32, 45, 57 , 59]

    By taking the value that were searching for, and comparing it to the middle value with the array. 
    If the value we are searching for is smaller, or larger, we will take all the values of the array that are to the left
    of the middle value, or take all the values to the right respectively. 


    length = 10
    r = 9
    l = 1

    target = 57

     l               m                    r
    [0 , 5, 10 ,12, 14, 22, 32, 45, 57 , 59]

    arr[m] less than or greater than target? 

    14 is less than, so our target must be in the second half of the array

    1 = m +1
                        L        M          r
    [0 , 5, 10 ,12, 14, 22, 32, 45, 57 , 59]

    L = 5
    r = 9
    m =  Math.floor((r - L) / 2)  + L  = 7



    L = m + 1 =8
    r = 9
    M = Math.floor((r - L) / 2 ) + L = 8
                                    L/M    r
    [0 , 5, 10 ,12, 14, 22, 32, 45, 57 , 59]

    arr[m] = 57 ... yes it is, return this value. 

    Hypothetical: if 57 last value
                                    L/M/R
    [0 , 5, 10 ,12, 14, 22, 32, 45, 57 ]

    
    Hypothetical: if did not exist
                                    M/R   L  
    [0 , 5, 10 ,12, 14, 22, 32, 45, 57 ]

*/


function BinarySearch(arr, target) {

    let left = 0;
    let right = arr.length - 1;
    let middle = Math.floor(right / 2)``
    let closestValue = Infinity

    /*
        l            r   m                    r
        [0 , 5, 10 ,12, 14, 22, 32, 45, 57 , 59]
    */

    while (left <= right) {
        if (Math.abs(arr[middle] - target) < Math.abs(closestValue - target)) {
            closestValue = arr[middle];
        }

        if (arr[middle] < target) {
            left = middle + 1
        }
        else if (arr[middle] > target) {
            right = middle - 1;
        }
        else if (arr[middle] == target) {
            return arr[middle]
        }

        middle = Math.floor((right - left) / 2) + left;
    }

    return closestValue;

}

