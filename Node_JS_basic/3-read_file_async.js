const fs = require('fs/promises');

async function countStudents(filePath) {
  try {
    const data = await fs.readFile(filePath, { encoding: 'utf8' });

    const lines = data.split('\n').filter((line) => line.trim() !== '');
    if (lines.length === 0) {
      console.log('Number of students: 0');
      return;
    }

    const headers = lines[0].split(',').map((h) => h.trim());
    const studentData = lines.slice(1);

    if (studentData.length === 0) {
      console.log('Number of students: 0');
      return;
    }

    const students = studentData.map((line) => {
      const values = line.split(',');
      const student = {};
      headers.forEach((header, index) => {
        student[header] = (values[index] || '').trim();
      });
      return student;
    });

    const validStudents = students.filter((student) => student.firstname && student.field);

    console.log(`Number of students: ${validStudents.length}`);

    const fields = {};
    validStudents.forEach((student) => {
      const { field } = student;
      if (!fields[field]) {
        fields[field] = [];
      }
      fields[field].push(student.firstname);
    });

    for (const field in fields) {
      if (Object.prototype.hasOwnProperty.call(fields, field)) {
        const studentList = fields[field];
        console.log(`Number of students in ${field}: ${studentList.length}. List: ${studentList.join(', ')}`);
      }
    }
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
