class Car {
  constructor(brand, motor, color) {
    this._brand = brand;
    this._motor = motor;
    this._color = color;
  }

  get brand() {
    return this._brand;
  }

  get motor() {
    return this._motor;
  }

  get color() {
    return this._color;
  }
}
  cloneCar() {
    return new Car(this._brand, this._motor, this._color);
  }
}

const car1 = new Car('Tesla', 'electric', 'red');
const car2 = car1.cloneCar();

export { Car, car1, car2 };