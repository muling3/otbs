// const s = "(My name is string)";
// //take character at index 0

// // const first = s.charAt(0);
// // const last = s.charAt(s.length - 1);
// // if (
// //   (first == "{" && last == "}") ||
// //   (first == "(" && last == ")") ||
// //   (first == "[" && last == "]")
// // ) {
// //   return true;
// // } else {
// //   return false;
// // }

// const isValid = function (s) {
//   let stringArray = s.split("");
//   let result = null;

//   for (let i = 0; i < stringArray.length; i++) {
//     if (stringArray[i] == "(" && stringArray[i + 1] != ")") {
//       result = false;
//       break;
//     } else if (stringArray[i] == "{" && stringArray[i + 1] != "}") {
//       // continue;
//       result = false;
//       break;
//     } else if (stringArray[i] == "[" && stringArray[i + 1] != "]") {
//       // continue;
//       result = false;
//       break;
//     } else {
//       result = true;
//       continue;
//     }
//   }
//   return result;
// console.log(result);
// if (
//   (first == "{" && last == "}") ||
//   (first == "(" && last == ")") ||
//   (first == "[" && last == "]")
// ) {
//   return true;
// } else {
//   return false;
// }
// };
// if (isValid("()[]{}")) console.log("Valid");
// else console.log("Invalid");
// // ( = 40, ) = 41
// // { = 123, } = 125
// // [ = 91, ] = 93

// const ops = ["5", "2", "C", "D", "10", "+"];
// const myArray = [];
// let myIndex = 0;
// let total = 0;

// for (let i = 0; i < ops.length; i++) {
//   if (ops[i] == "C") {
//     myArray.pop();
//     continue;
//   }
//   if (ops[i] == "D") {
//     myArray.push(myArray[myArray.length - 1] * 2);
//     continue;
//   }
//   if (ops[i] == "+") {
//     myArray.push(myArray[myArray.length - 1] + myArray[myArray.length - 2]);
//     continue;
//   }
//   myArray.push(Number(ops[i]));
// }

// // loop through to get the sum
// for (let i = 0; i < myArray.length; i++) {
//   total += myArray[i];
// }
// console.log(total)

// function countTrue() {
//   const arrayName = [true, false, true, false, true, true, true];

//   let count = 0;
//   for (let i = 0; i < arrayName.length; i++) {
//     if (arrayName[i]) {
//       count += 1;
//     }
//   }
//   console.log(count);
// }

// countTrue();

// function redundant(str) {
//   return function () {
//     return str;
//   };
// }

// const str = redundant("myString")();
// console.log(str);

// function myFunc() {
//   A = [10, 40, 10, 55, 34, 3, 6];
//   k = 80;

//   maxSum = 0;
//   currSum = 0;
//   sums = [];

//   for (let i = 0; i < A.length - 1; i++) {
//     for (let index = i + 1; index < A.length; index++) {
//       currSum = A[i] + A[index];
//       if (currSum > maxSum) {
//         maxSum = A[i] + A[index];
//         if (maxSum > k) {
//           continue;
//         } else {
//           maxSum = A[i] + A[index];
//         }
//       }
//     }
//   }
//   console.log(maxSum);
// }

// myFunc();

// rotating an array

// function rotate(array, size, elements) {
//   temp = [];
//   for (let i = 0; i < size; i++) {
//     temp.push(array[i]);
//   }
//   array.splice(0, size);
//   array.push(...temp);
//   console.log(array);
// }

// rotate([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 3, 12);

// function gcd(a, b) {
//   if (b == 0) return a;
//   else return gcd(b, a % b);
// }

// function leftRotate(arr, d, n) {
//   // d = d % n;
//   let g_c_d = gcd(d, n);
//   for (let i = 0; i < g_c_d; i++) {
//     let temp = arr[i];
//     let j = i;

//     while (true) {
//       let k = j + d;
//       if (k >= n) k = k - n;
//       if (k == i) break;
//       arr[j] = arr[k];
//       j = k;
//     }
//     arr[j] = temp;
//   }
// }

// function printArray(arr, size) {
//   for (let i = 0; i < size; i++) console.log(arr[i]);
// }

// let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
// let n = array.length;
// leftRotate(array, 3, n);
// printArray(array, n);

function rotate(array, size, elements) {
  temp = [];
  array.reverse();
  for (let i = elements - size; i < elements; i++) {
    temp.push(array[i]);
  }
  array.splice(elements - size);
  array.reverse();
  console.log(array);
  array.push(...temp.reverse());
  console.log(array);
}

rotate([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 3, 12);
