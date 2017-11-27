'use strict';

const assert = require('assert');

const unicorn = {
  legs: 4,
  color: 'blue',
  horn: true,
  hornAttack: function (target) {
    return `${target.name} is obliterated`;
  }
};

describe('Proxies', function () {
  it('should intercept getters and setters', function () {

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

    // Operating on the proxy object, not the original one
    unicornProxy.color = 'white';
    assert.equal(unicornProxy.color, 'Beautiful white');
    // The property of the original object is also changed
    assert.equal(unicorn.color, 'white');

    assert.throws(() => {
      unicornProxy.horn = false;
    }, 'TypeError');
  });

  it('should proxy functions', function () {
    // Before applying proxy
    const earlyBirdThief = {
      name: 'earlyBirdThief ',
      stolenAttack: unicorn.hornAttack
    };
    assert.equal(earlyBirdThief.stolenAttack({name: 'BadGuy'}),
        'BadGuy is obliterated');

    // Use Proxy to hide (override) the original function
    unicorn.hornAttack = new Proxy(unicorn.hornAttack, {
      apply: function (target, context, argsArray) {
        // target = hornAttack, context = The this argument for the call
        if (context !== unicorn) {
          return 'Only unicorns can use attack with corn!';
        } else {
          return target.apply(context, argsArray);
        }
      }
    });

    // Note: only future assignments of unicorn.hornAttack is proxied
    // Thief can still steal hornAttack before it was overriden
    const lazyThief = {
      name: 'lazyThief',
      stolenAttack: unicorn.hornAttack
    };

    assert.equal(lazyThief.stolenAttack({name: 'BadGuy'}),
        'Only unicorns can use attack with corn!');
  });
});
