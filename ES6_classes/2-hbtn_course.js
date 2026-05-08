class HolbertonCourse {
  constructor(name, length, students) {
    this._name = String(name);
    this._length = Number(length);
    this._students = Array.isArray(students) ? students : [];
  }    
}