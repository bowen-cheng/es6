'use strict';

const assert = require('assert');

let asyncP;
(function () {

  const run = function (generator) {
    let sequence;
    const process = function (generatorResult) {
      generatorResult.value.then(function (resolveValue) {
        if (!generatorResult.done) {
          process(sequence.next(resolveValue));
        }
      }, function (error) {
        if (!generatorResult.done) {
          process(sequence.throw(error));
        }
      });
    };

    sequence = generator();
    let next = sequence.next();
    process(next);
  };

  asyncP = {
    run: run
  };
}());

function getPriceWithPromise() {
  return new Promise(function (resolve, reject) {
        setTimeout(function () {
          resolve(50);
        }, 1000)
      }
  );
}

function doTradeWithPromise() {
  return new Promise(function (resolve, reject) {
        setTimeout(function () {
          console.log('Done deal!');
          resolve();
          // reject(Error('Failed, no deal!'));
        }, 1000)
      }
  );
}

describe('Async generators', function () {
  it('should work with promises', function (done) {
    function* main() {
      try {
        const price = yield getPriceWithPromise();
        if (price < 60) {
          doTradeWithPromise();
        } else {
          console.log('Success but no deal');
        }
      } catch (e) {
        console.log('An error occurred: ' + e);
      }
      done();
    }
    asyncP.run(main);
  });
});
