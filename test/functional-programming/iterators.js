'use strict';

const assert = require('assert');
const Company = require('./Company').Company;

describe('Iterables', function () {
  const numbers = [1, 2, 3];
  it('can work with iterators at a low level', function () {
    // iterator
    let sum = 0;
    let iterator = numbers.keys();
    let next = iterator.next();
    while (!next.done) {
      sum += numbers[next.value];
      next = iterator.next();
    }
    assert.equal(sum, 6);
  });

  it('for in', function () {
    //for in loops over the keys of an object
    let sum = 0;
    for (let n in numbers) {
      sum += numbers[n];
    }
    assert.equal(sum, 6);
  });

  it('for of', function () {
    // for of loops over the values of an object
    let sum = 0;
    for (let n of numbers) {
      sum += n;
    }
    assert.equal(sum, 6);
  });

  it('can be built be implementing Symbol.iterator', function () {
    let count = 0;
    let company = new Company();
    company.addEmployees('Tim', 'Bob', 'Joy', 'Tom');

    function* filter(element, predicate) {
      for (let element of element) {
        console.log('Filtering: ', element);
        if (predicate(element)) {
          yield element;
        }
      }
    }

    function* take(elements, maxToTake) {
      let count = 0;
      if (maxToTake < 1) {
        return;
      }

      for (let element of elements) {
        console.log('Taking: ', element);
        yield element;
        count++;
        if (count >= maxToTake) {
          return
        }
      }
    }

    // Using the iterator of Company class
    for (let employee of take(filter(company, e => e[0] === 'T'))) {
      count += 2;
    }
    assert.equal(count, 4);
  });
});
