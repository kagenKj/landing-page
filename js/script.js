var lengthOfSequence = function (arr, n) {
    let firstIndex = arr.indexOf(n);
    let lastIndex = arr.indexOf(n, firstIndex + 1);
    let newArr = arr.splice(firstIndex, lastIndex+1);
    return newArr.length;
};

let arr = [3, 4, 5, 1, 2, 4, 6, 5, 7];

console.log(lengthOfSequence(arr, 4));