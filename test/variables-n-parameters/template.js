'use strict';

const assert = require('assert');

function insertIntoTemplate(name) {
  // Template uses back tick instead of quotation marks
  return `Hello ${name}`;
}

function sum(strings, ...vals) {
  // strings: ['', ' + ', ' = ', ''], length: 4
  // vals: [1, 2, 3], length: 3
  let result = `Sum of ${vals[0]} and ${vals[1]} is ${vals[0] + vals[1]}`;
  return result.toUpperCase();
}

describe('Template literals', function () {
  it('can combine literals and data', function () {
    assert.equal(insertIntoTemplate('Iron man'), 'Hello Iron man');
  });

  it('can use tag functions', function () {
    let x = 1;
    let y = 2;
    let z = 3;
    assert.equal(sum `${x} + ${y} = ${z}`, 'SUM OF 1 AND 2 IS 3');
  });
});
