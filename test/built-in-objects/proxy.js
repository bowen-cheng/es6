'use strict';

const assert = require('assert');

describe('Proxies', function () {
  it('should let us intercept getters and setters', function () {

    const unicorn = {
      legs: 4,
      color: 'blue',
      horn: true
    };

    const unicornProxy = new Proxy(unicorn, {
      get: function (target, property) {
        if (property === 'color') {
          return 'Beautiful ' + target[property];
        } else {
          return target[property];
        }
      },
      set: function (target, property, newValue) {
        if (property === 'horn') {
          console.log('Unicorn cannot lose its horn');
          return false; // In strict mode, returning false causes a 'TypeError'
        } else {
          console.log(`Setting property ${property} to ${newValue}`);
          target[property] = newValue;
          return true;
        }
      }
    });

    assert.equal(unicornProxy.legs, 4);

    unicornProxy.color = 'white';
    assert.equal(unicornProxy.color, 'Beautiful white');

    assert.throws(() => {
      unicornProxy.horn = false;
    }, 'TypeError');
  });
});
