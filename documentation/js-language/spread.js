'use strict';

/* the "spread" operator

flattens one array or object into another */

console.log('');
console.log('1a - Here we see one array "spread" into another');
const arrayA = [4,5,6];
const arrayB = [1, 2, 3, ...arrayA, 7, 8, 9];
console.log(arrayB);
console.log('');

console.log('');
console.log('1b - Here we see two arrays combined using "spread"');
const arrayD = [1, 2, 3];
const arrayE = [4, 5, 6];
const arrayF = [...arrayD, ...arrayE];
console.log(arrayF);
console.log('');

console.log('');
console.log('2a - Here we see one object "spread" into another');
const objectA = { d: 4, e: 5, f: 6 };
const objectB = { a: 1, b: 2, c:3, ...objectA, g: 7, h: 8, i: 9 };
console.log(objectB);
console.log('');

console.log('');
console.log('2b - Here we see two objects combined using "spread"');
const objectD = { a: 1, b: 2, c: 3 };
const objectE = { d: 4, e: 5, f: 6 };
const objectF = { ...objectD, ...objectE };
console.log(objectF);
console.log('');

console.log('');
console.log('3a - Here we see "spread" used to clone an array');
const arrayClone = [...arrayD];
console.log(arrayClone);
const arrayCheck = arrayD === arrayClone;
console.log(arrayCheck);
console.log('');

console.log('');
console.log('3b - Here we see "spread" used to clone an object');
const objectClone = { ...objectD };
console.log(objectClone);
const objectCheck = objectD === objectClone;
console.log(objectCheck);
