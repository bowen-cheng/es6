'use strict';

const assert = require('assert');

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
    let async;
    (function(){
      let sequence;
      let run = function (generator) {
        // make the generator function available at IIFE scope
        sequence = generator();
        //Call next to start
        sequence.next();
      };
      let resume = function () {
        sequence.next();
      };
      async = {
        run: run,
        resume: resume
      };
    }());

    function pause(delay) {
      setTimeout(function () {
        console.log('Paused for ' + delay +' ms');
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
});
