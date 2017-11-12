class Company {
  constructor() {
    this.employees = [];
  }

  addEmployees(...names) {
    this.employees = this.employees.concat(names);
  }

  // make the iterator property a generator function
  * [Symbol.iterator]() {
    // return new ArrayIterator(this.employees);
    for (let e of this.employees) {
      console.log(e);
      yield e;
    }
  }
}

/**
 * The class is replaced by making iterator property a generator function
 */
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
