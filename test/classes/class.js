'use strict';

const assert = require('assert');

class Employee {
  constructor(name = 'anonymous', salary = 0) {
    // Setting fields by directly manipulating the backing properties
    this._name = name;
    this._salary = salary;

    // Setting fields by calling setters
    this.name = name;
    this.salary = salary;
  }

  get name() {
    return "Getter: " + this._name;
  }

  set name(name) {
    this._name = name;
  }

  get salary() {
    return "Getter: " + this._salary;
  }

  set salary(salary) {
    this._salary = salary;
  }
}

describe('the class keyword', function () {
  const anonymous = new Employee();

  it('can have one and only one constructor function', function () {
    // Using properties directly
    assert.equal(anonymous._name, 'anonymous');
    assert.equal(anonymous._salary, 0);
  });

  it('can have getters and setters', function () {
    // Using Getter functions
    assert.equal(anonymous.name, 'Getter: anonymous');
    assert.equal(anonymous.salary, 'Getter: 0');
  });

});
