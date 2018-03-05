function Car(name) {
  this.name = name;
}

function displayInfo(cars) {
  cars.forEach(function (car) {
    console.log(car.name + ", year: " + car.year);
  });
}

Car.prototype.year = 2010;
var car1 = new Car("first");
var car2 = new Car("second");
console.log("Car.prototype.year = 2010;");
console.log("var car1 = new Car('first');");
console.log("var car2 = new Car('second');");
displayInfo([car1, car2]);

car1.__proto__.year = 2015;
console.log("---> car1.__proto__.year = 2015;");
displayInfo([car1, car2]);

Car.prototype = {year:  2018};
var car3 = new Car("third");
console.log("---> Car.prototype = {year:  2018};");
console.log("---> car3 = new Car('third')");
displayInfo([car1, car2, car3]);
