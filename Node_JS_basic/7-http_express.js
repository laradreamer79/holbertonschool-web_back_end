const express = require('express');
const fs = require('fs/promises');

const databaseFile = process.argv[2];

const app = express();

async function countStudents(filePath) {
  try {
    const data = await fs.readFile(filePath, { encoding: 'utf8' });
    const lines = data.split('\n').filter((line) => line.trim() !== '');

    if (lines.length === 0) {
      return 'Number of students: 0';
    }

    const headers = lines[0].split(',').map((header) => header.trim());
    const students = lines.slice(1).map((line) => {
      const values = line.split(',');
      const student = {};

      headers.forEach((header, index) => {
        student[header] = (values[index] || '').trim();
      });

      return student;
    }).filter((student) => student.firstname && student.field);

    const fields = {};
    students.forEach((student) => {
      if (!fields[student.field]) {
        fields[student.field] = [];
      }

      fields[student.field].push(student.firstname);
    });

    const output = [`Number of students: ${students.length}`];
    Object.keys(fields).forEach((field) => {
      output.push(
        `Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`,
      );
    });

    return output.join('\n');
  } catch (err) {
    throw new Error('Cannot load the database');
  }
}

app.get('/', (req, res) => {
  res.type('text/plain');
  res.send('Hello Holberton School!');
});

app.get('/students', async (req, res) => {
  res.type('text/plain');

  try {
    const data = await countStudents(databaseFile);
    res.send(`This is the list of our students\n${data}`);
  } catch (err) {
    res.send(`This is the list of our students\n${err.message}`);
  }
});

app.listen(1245);

module.exports = app;
