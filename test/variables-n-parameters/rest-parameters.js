'use strict';

const assert = require('assert');

function sumPreEs6() {
  let result = 0;
  for (let i = 0; i < arguments.length; i++) {
    result += arguments[i];
  }
  return result;
}

// The rest parameter must be the last parameter of the function
function sumEs6(noOneCares, ...inputs) {
  let result = 0;
  inputs.forEach(function (n) {
    result += n;
  });
  return result;
}

describe('Rest parameter', function () {
  it('replaces the old way of achieving the same goal', function () {

    let result = sumPreEs6(6, 8, 9);
    let sameResult = sumEs6('some crap that no one cares', 6, 8, 9);

    assert.equal(result, 23);
    assert.equal(sameResult, 23);
    assert.equal(result, sameResult);
  });
});
