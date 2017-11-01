'use strict';

const assert = require('assert');

describe('Spread operator', function () {
  it('can spread an array across parameters', function () {
    const testArray = [1, 2, 3];
    const sum = function (x, y, z) {
      return x + y + z;
    };

    assert.equal(sum(1, 2, 3), 6);
    assert.equal(sum(...testArray), 6);
  });

  it('can build arrays', function () {
    let a = [4, 5, 6];
    let b = [1, 2, 3, ...a, 7, 8, 9];
    assert.deepEqual(b, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
  })
});
