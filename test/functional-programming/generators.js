'use strict';

const assert = require('assert');

describe('Generator functions', function () {
  it('can be iterable', function () {

    /**
     * Calling generator functions returns an iterator. Calling iterator.next()
     * returns a new object: {value: return-value/yield-value, done: true/false}
     *
     * When the iterator.next() is called for the first time, the generator
     * function executes from the beginning and stops when it yields the first
     * value.
     *
     * When the iterator.next() is called for the second time and so on, the
     * generator function executes from where the previous iteration left off,
     * meaning the yield statement. And it stops at the next yield statement.
     *
     * If there is no more yield statement, meaning it's the last iteration, the
     * generator function simply executes all the rest of the statements like a
     * normal function and stops until it reaches the end.
     *
     * A return statement sets the 'done' flag of the result of iterator.next()
     * to true, so does reaching the end of the generator function.
     *
     * The whole process works just like a state machine: the generator function
     * knows exactly its state at each iteration.
     *
     * @param start Starting value for summation
     * @param end Ending value for summation
     */
    function* numbers(start, end) {
      for (let i = start; i <= end; i++) {
        if (i > 8) {
          console.log('i is now larger than 8, returning i');
          return i; // 'return' sets the 'done' flag to true;
        }
        console.log('Inside for loop, yielding ', i);
        yield i;
      }
      console.log('End of the generator function, done');
    }

    let sum = 0;
    let iterator = numbers(0, 10);

    console.log('Calling iterator.next()');
    let next = iterator.next();

    while (!next.done) {
      sum += next.value;
      console.log('Calling iterator.next()');
      next = iterator.next();
    }
    assert.equal(sum, 36);
  });
});
