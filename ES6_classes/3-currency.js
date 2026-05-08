class Currency{
  constructor(code, name) {
    this._code = String(code);
    this._name = String(name);
  }

  displayFullCurrency() {
    return `${this._name} (${this._code})`;
  }
}