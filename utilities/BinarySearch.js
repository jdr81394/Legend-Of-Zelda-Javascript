// Refactored Version
function BinarySearch(arr, elem) {
    arr = Object.keys(arr);
    let start = 0;
    let end = arr.length - 1;
    let middle = Math.floor((start + end) / 2);
    let closestNode = Infinity;

    // console.log("element: " ,elem ,  " arr" , arr)

    while(start <= end) {
        if(Math.abs(elem - closestNode) > Math.abs(elem - arr[middle]) ) {
            // console.log("closest node: " , closestNode, "absolute amount: " , Math.abs(elem - arr[middle]), "arr middle: " , arr[middle])

            closestNode = arr[middle];
            // console.log("new closest node: " , closestNode);

        }

        if(elem < arr[middle]) end = middle - 1;
        else start = middle + 1;
        middle = Math.floor((start + end) / 2);
    }
    // console.log("closest node: " , closestNode, "absolute amount: " , Math.abs(elem - arr[middle]), "arr middle: " , arr[middle])
    return arr[middle] === elem ? arr[middle] : closestNode;
}


export default BinarySearch;