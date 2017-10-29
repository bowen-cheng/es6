'use strict';

const assert = require('assert');
const defaultName = 'default name';
const defaultUrl = 'test.url.com';

function getName(name=defaultName) {
  return name;
}

function getData({data, url=defaultUrl, cache=false}, isTest = true) {
  return {data, url, cache, isTest};
}

describe('default parameters', function () {

  it('provides default values', function () {
    assert.equal(getName(), defaultName);
    assert.equal(getName(undefined), defaultName);

    // careful with the following ones
    assert.equal(getName(null), null);
    assert.equal(getName(''), '');
  });

  it('works with destructuring', function () {
    let partialParameter = {data: defaultName};
    let result = getData(partialParameter);

    assert.equal(result.data, defaultName);
    assert.equal(result.url, defaultUrl);
    assert.equal(result.cache, false);
    assert.equal(result.isTest, true);
  });
});