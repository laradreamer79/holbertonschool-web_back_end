export default class Car {
  constructor(brand, motor, color) {
    this._brand = brand;
    this._motor = motor;
    this._color = color;
  }

  cloneCar() {
    const Constructor = this.constructor[Symbol.species];
    return new Constructor();
  }

  static get [Symbol.species]() {
    return this;
  }
}
