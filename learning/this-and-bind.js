'use strict';

/* the this keyword

this always returns a reference to the current object

remember that in JS functions are objects */

const person = {
  name: "Ian",
  walk() {
    console.log('Logging walk from inside object...');
    console.log(this);
  },
  talk() {
    setTimeout(function() {
      console.log('Logging talk from inside object...');
      console.log('this', this);
    }, 1000);
  },
  eat() {
    setTimeout(() => {
      console.log('Logging eat from inside object...');
      console.log('this', this);
    }, 1000);
  }
};

console.log('');
console.log('1a - Here we see that "this" outputs the full person object');
console.log('Calling walk method from object...');
person.walk();
console.log('');

console.log('1b - Here we see that "this" outputs undefined when we store the method as a function');
console.log('If strict mode is not set we get the full window object)');
const walk_a = person.walk;
console.log('Calling walk method from own reference...');
walk_a();
console.log('');

console.log('1c - Here we see that using bind, "this" now outputs the full person object');
console.log('If strict mode is not set we get the full window object)');
const walk_b = person.walk.bind(person);
console.log('Calling walk method from own reference...');
walk_b();
console.log('');

console.log('2 - Now we see that logging "this" inside a callback function using the function keyword returns the window object');
console.log('Inside a callback function the strict mode does not override this and return undefined');
console.log('Then by using an arrow function "this" logs the person object, because arrow functions do not re-bing "this"');
console.log('Calling talk and eat methods from object...');
person.talk();
person.eat();
