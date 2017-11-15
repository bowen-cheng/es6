'use strict';

const assert = require('assert');

describe('Weak set', function () {
  it('has no properties and methods that belong to collections', function () {
    let weakSet = new WeakSet();

    assert.equal(weakSet.size, undefined);
    assert.equal(weakSet.entries, undefined);
    assert.equal(weakSet.values, undefined);
    assert.equal(weakSet.forEach, undefined);
  });

  it('can determine existence of items', function () {
    let weakSet = new WeakSet();
    let item = {name: 'Bill'};
    weakSet.add(item);
    assert.equal(weakSet.has(item), true);
  });

  it('can remove an item with delete', function () {
    let weakSet = new WeakSet();
    let item = {name: 'Bill'};
    weakSet.add(item);
    weakSet.delete(item);
    assert.equal(weakSet.has(item), false);
  });

  it('can remove all items with clear', function () {
    let weakSet = new WeakSet();
    let item1 = {name: 'Bill'};
    let item2 = {name: 'John'};
    weakSet.add(item1);
    weakSet.add(item2);
    weakSet.clear();
    assert.equal(weakSet.has(item1), false);
    assert.equal(weakSet.has(item2), false);
  });
});
