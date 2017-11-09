'use strict';

const assert = require('assert');

describe('Arrow function', function () {
  it('provides a concise syntax for creating functions', function () {
    let sum = (x, y) => x + y;
    assert.equal(sum(1, 2), 3);

    let six = () => 6;
    assert.equal(six(), 6);

    let square = (x) => {
      return x * x;
    };
    assert.equal(square(2), 4);
  });

  it('can work with array functions', function () {
    let numbers = [1, 2, 3];
    let sum = 0;
    numbers.forEach(n => sum += n);

    assert.equal(sum, 6);
  });

  it('lexically binds to this (without arrow function)', function (done) {
    this.name = 'Bob';
    let self = this;
    setTimeout(function () {
      assert.equal(self.name, 'Bob');
      done();
    }, 18);
  });

  it('lexically binds to this (with arrow function)', function (done) {
    this.name = 'Bob';
    // No need to store 'this' to an variable any more
    setTimeout(() => {
      assert.equal(this.name, 'Bob');
      done();
    }, 18);
  });
});
