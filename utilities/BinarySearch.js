// Refactored Version
function BinarySearch(arr, elem) {
    arr = Object.keys(arr);
    let start = 0;
    let end = arr.length - 1;
    let middle = Math.floor((start + end) / 2);
    let closestNode = Infinity;

    while(start <= end) {
        if(Math.abs(elem - closestNode) > Math.abs(elem - arr[middle]) ) {
            closestNode = arr[middle];
        }
        if(elem < arr[middle]) end = middle - 1;
        else start = middle + 1;
        middle = Math.floor((start + end) / 2);
    }
    return arr[middle] === elem ? arr[middle] : closestNode;
}


export default BinarySearch;