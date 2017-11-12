class Company {
  constructor() {
    this.employees = [];
  }

  addEmployees(...names) {
    this.employees = this.employees.concat(names);
  }

  [Symbol.iterator]() {
    // Delegate the iterator to a generically reusable class
    return new ArrayIterator(this.employees);
  }
}

class ArrayIterator {
  constructor(array) {
    this.array = array;
    this.index = 0;
  }

  next() {
    let result = {value: undefined, done: true};
    if (this.index < this.array.length) {
      result.value = this.array[this.index];
      result.done = false;
      this.index+=1;
    }
    return result;
  }
}

module.exports.Company = Company;
