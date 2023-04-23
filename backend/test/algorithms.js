//linear search
// function linearSearch(array, n, x) {
//   for (let i = 0; i < n; i++) {
//     if (array[i] == x) return i;
//   }
//   return -1;
// }

// const array = [56, 98, 23, 12, 54, 90];
// const n = array.length;
// const x = 9;
// foundIndex = linearSearch(array, n, x);
// if (foundIndex != -1) console.log("Found at index", foundIndex);
// else console.log("Not found");

//binary search === sorted array
// function binarySearch(arr, start, end, x) {
//   //while
//   while (start <= end) {
//     let mid = Math.floor((start + end) / 2);

//     if (arr[mid] == x) {
//       return mid;
//     } else if (arr[mid] < x) {
//       start = mid + 1;
//     } else {
//       end = mid - 1;
//     }
//   }

//   return -1;
// }

// const array = [10, 20, 30, 50, 80, 90];
// const r = array.length;
// const x = 50;
// const foundIndex = binarySearch(array, 0, r - 1, x);
// if (foundIndex != -1) console.log("Found at index", foundIndex);
// else console.log("Not found");

// selection sort
function selectionSort(array) {
  for (let i = 0; i < array.length; i++) {
    let min = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[min]) {
        min = j;
      }
    }
    if (min != i) {
      let tmp = array[i];
      array[i] = array[min];
      array[min] = tmp;
    }
  }
  return array;
}

const array = [56, 98, 23, 12, 54, 90];
console.log("UnSorted", array);
console.log("Sorted", selectionSort(array));
