'use strict';

const assert = require('assert');

// For test 2, 3
let async;
(function () {
  let sequence;

  const run = function (generator) {
    // make the generator function available at IIFE scope
    sequence = generator();
    //Call next to start
    sequence.next();
  };

  const resume = function (value) {
    sequence.next(value);
  };

  async = {
    run: run,
    resume: resume,
  };
}());

// For test 3
function getPrice() {
  setTimeout(function () {
    async.resume(50);
  }, 1000);
}

function doTrade() {
  setTimeout(function () {
    console.log('Deal!');
    async.resume();
  }, 1000);
}

describe('Async generators', function () {

  it('traditional callbacks introduce christmas tree problem', function () {
    setTimeout(function () {
      console.log('Christmas tree: 1');
      setTimeout(function () {
        console.log('Christmas tree: 2');
        setTimeout(function () {
          console.log('Christmas tree: 3');
        }, 1000);
      }, 1000);
    }, 1000);
  });

  it('should be easy to read with generators', function () {
    function pause(delay) {
      setTimeout(function () {
        console.log('Paused for ' + delay + ' ms');
        async.resume();
      }, delay);
    }

    function* main() {
      console.log('1');
      yield pause(1000);
      console.log('2');
      yield pause(1000);
      console.log('3');
      yield pause(1000);
      done();
    }

    async.run(main);
  });

  it('should work with returned data', function (done) {
    function* main() {
      let price = yield getPrice();
      if (price < 60) {
        doTrade();
      } else {
        console.log('No deal!');
      }
      done();
    }

    async.run(main);
  });
});
