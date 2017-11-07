'use strict';

const assert = require('assert');

// The super class implicitly extends 'Object' class
class Human {
  constructor(name = 'Human') {
    // Setting fields by directly manipulating the backing property
    this._name = name;
    // Setting fields by calling setters
    this.name = name;
  }

  run() {
    return `${this._name} is running`;
  }

  work() {
    return `${this._name} is working`;
  }

  get name() {
    return `${this._name}`.toUpperCase();
  }

  set name(name) {
    this._name = name;
  }
}

class Employee extends Human {
  constructor(name = 'Employee', salary = 0) {
    super(name);
    this._salary = salary;
  }

  work() {
    let responseFromSuperClass = super.work();
    return `Alert!!! ${responseFromSuperClass}`;
  }

  // Overriding method from 'Object' class
  toString() {
    return `Employee: ${this.name}`;
  }

  get salary() {
    return this._salary;
  }
}

describe('The class keyword', function () {

  const aHuman = new Human();
  const anEmployee = new Employee();

  it('can have one and only one constructor function', function () {
    // Using properties directly
    assert.equal(aHuman._name, 'Human');
  });

  it('can have getters and setters', function () {
    // Using Getter functions
    assert.equal(aHuman.name, 'HUMAN');
  });

  it('can have a super class', function () {
    assert.equal(anEmployee.name, 'EMPLOYEE');
    assert.equal(anEmployee.salary, 0);
  });

  it('can invoke super methods', function () {
    assert.equal(anEmployee.run(), 'Employee is running')
  });

  it('can override methods', function () {
    assert.equal(aHuman.work(), 'Human is working');
    assert.equal(anEmployee.work(), 'Alert!!! Employee is working');
    assert.equal(anEmployee.toString(), 'Employee: EMPLOYEE');
  });
});
