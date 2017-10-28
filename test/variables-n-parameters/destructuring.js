'use strict';

const assert = require('assert');

describe('Destructure', function () {

  it('can assign values to variables', function () {
    let sampleArray = ['zero', 'one', 'two', 'three'];

    // Skipping the zeroth element
    let [, first, second, third, fourth] = sampleArray;

    assert.equal(first, 'one');
    assert.equal(second, 'two');
    assert.equal(third, 'three');
    assert.equal(fourth, undefined);
  });

  it('can destructure arrays', function () {
    let x = 2;
    let y = 3;
    [x, y] = [y, x];
    assert.equal(x, 3);
    assert.equal(y, 2);
  });

  it('can destructure objects', function () {
    const config = {
      data: 'sample data',
      cache: false,
      headers: 'sample header'
    };
    const url = 'test.url.com';

    function workWithDestructure (url, {data, cache, headers}) {
      return cache;
    }

    function workWithoutDestructure (url, config) {
      return config.cache;
    }

    assert.equal(workWithDestructure(url, config), false);
    assert.equal(workWithoutDestructure(url, config), false);
  })
});
