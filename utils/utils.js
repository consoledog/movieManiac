export function average(arr){
    return arr.reduce((acc, cur) => acc + cur / arr.length, 0);
}

