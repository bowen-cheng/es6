'use strict';

const assert = require('assert');

describe('Promises (basic)', function () {
  it('should execute the call back given to them', function (done) {
    let promise = new Promise(function (resolve, reject) {
      // Both resolve and reject are functions
      console.log('Promise is being executed as soon as it is created...');
      resolve();
    });

    promise.then(function () {
      console.log('the first promise has finished successfully!');
      // done is a function from Mocha test suite for asynchronous testing
      done();
    })
  });

  it('should receive the resolved data', function (done) {
    let promise = new Promise(function (resolve, reject) {
      resolve(1);
    });

    promise.then(function (data) {
      assert.equal(data, 1);
      done();
    });
  });

  it('should fail when rejected', function (done) {
    let errorMessage = 'Error occurred!';
    let promise = new Promise(function (resolve, reject) {
      reject(Error(errorMessage));
    });

    promise.then(function () {
      // success callback
    }, function (error) {
      // failure callback
      assert.equal(error.message, errorMessage);
      done();
    });
  });

  // Same as passing two functions into 'then' as shown in previous test
  it('can invoke catch function when rejected', function (done) {
    let errorMessage = 'Error occurred!';
    let promise = new Promise(function (resolve, reject) {
      reject(Error(errorMessage));
    });

    // The below then and catch function must be chained together to work
    promise.then(function () {
      // success callback
      console.log('Success! (will not happen here...)');
    }).catch(function (error) {
      // failure callback
      assert.equal(error.message, errorMessage);
      done();
    });
  });

  it('should compose when resolved with a promise', function (done) {
    let firstPromise = new Promise(function (resolve, reject) {
      console.log('1st promise is executing...');
      resolve(6);
    });

    let secondPromise = new Promise(function (resolve, reject) {
      console.log('2nd promise is executing...');
      resolve(firstPromise);
    });

    secondPromise.then(function (data) {
      // success callback
      console.log('2nd promise has succeeded with data: ' + data);
      assert.equal(data, 6);
      done();
    }).catch(function () {
      // failure callback
      console.log('2nd promise has failed');
    });
  });

  it('has a static resolve function', function (done) {
    let firstPromise = Promise.resolve(6);
    let secondPromise = Promise.resolve(firstPromise);

    secondPromise.then(function (data) {
      // success callback
      console.log('2nd promise has succeeded with data: ' + data);
      assert.equal(data, 6);
      done();
    }).catch(function () {
      // failure callback
      console.log('2nd promise has failed');
    });
  });

  it('has a static reject function', function (done) {
    let promise = Promise.reject(Error('Oops!'));

    promise.then(function () {
      // success callback
      console.log('The promise has succeeded');
    }).catch(function (error) {
      // failure callback
      console.log('The promise has failed, error: ' + error.message);
      done();
    });
  });

  it('should be asynchronous even if resolved immediately', function (done) {
    let aBoolean = false;
    let promise = new Promise(function (resolve, reject) {
      resolve();
    });
    promise.then(function () {
      assert.equal(aBoolean, true);
      done();
    });
    aBoolean = true;
  });
});
