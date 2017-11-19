'use strict';

const assert = require('assert');

describe('Async generators', function () {

  it('introduces christmas tree problem with regular callback', function () {
    setTimeout(function () {
      console.log('1');
      setTimeout(function () {
        console.log('2');
        setTimeout(function () {
          console.log('3');
        }, 1000);
      }, 1000);
    }, 1000);
  });
});
