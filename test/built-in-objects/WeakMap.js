'use strict';

const assert = require('assert');

describe('Weak map', function () {
  it('has no properties and methods that belong to collections', function () {
    let weakMap = new WeakMap();

    assert.equal(weakMap.size, undefined);
    assert.equal(weakMap.entries, undefined);
    assert.equal(weakMap.keys, undefined);
    assert.equal(weakMap.values, undefined);
    assert.equal(weakMap.forEach, undefined);
  });

  it('can determine existence of items', function () {
    let weakMap = new WeakMap();
    let key = {keyName: 'key'}; // key must be an object
    weakMap.set(key, 'value');
    assert.equal(weakMap.has(key), true);
  });

  it('can get correct value', function () {
    let weakMap = new WeakMap();
    let key = {keyName: 'key'};
    let value = 'value';
    weakMap.set(key, value);

    assert.equal(weakMap.get(key), value);
  });

  it('can remove an item with delete', function () {
    let weakMap = new WeakMap();
    let key = {keyName: 'key'};
    weakMap.set(key, 'value');
    weakMap.delete(key);
    assert.equal(weakMap.has(key), false);
  });
});
