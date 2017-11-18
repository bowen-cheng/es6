'use strict';

const assert = require('assert');

const getOrder = function (orderId) {
  let order = {orderId: 'orderId', userId: 'userId'};
  return Promise.resolve(order);
};

const getUser = function (userId) {
  let user = {userId: 'userId', companyId: 'companyId'};
  return Promise.resolve(user);
};

const getCompany = function (companyId) {
  let company = {companyId: 'companyId', name: 'Company Name'};
  return Promise.resolve();
};

const getCourse = function (courseId) {
  let courses = {
    1: {name: 'NodeJs'},
    2: {name: 'ES6'},
    3: {name: 'Angular'}
  };
  if (courseId > 3 || courseId < 0) {
    return Promise.reject(Error('Invalid course Id: ' + courseId));
  }
  return Promise.resolve(courses[courseId]);
};

describe('Promise (continued)', function () {
  it('can be chained sequentially by calling then', function (done) {
    getOrder('orderId').then(function (order) {
      return getUser(order.userId);
    }).then(function (user) {
      return getCompany(user.companyId);
    }).then(function (company) {
      assert.equal(company.name, 'Company Name');
      done();
    }).catch(function (error) {
      // error handling
    });
  });

  it('should execute after all promises with all', function (done) {
    let courseId = [1, 2, 3];
    let promises = [];

    for (let id of courseId) {
      promises.push(getCourse(id));
    }
    // The all function returns an array of result objects
    // The order of the returned results is not guaranteed
    Promise.all(promises).then(function (results) {
      assert.equal(results.length, 3);
      done();
    }).catch(function (error) {
      console.log('Error:' + error.message);
    });
  });

  it('should resolve after the first promise', function (done) {
    let courseId = [1, 2, 3];
    let promises = [];

    for (let id of courseId) {
      promises.push(getCourse(id));
    }
    // The race function only returns one value
    Promise.race(promises).then(function (firstResult) {
      assert.ok(firstResult.name);
      done();
    }).catch(function (error) {
      console.log('Error:' + error.message);
    });
  });
});
