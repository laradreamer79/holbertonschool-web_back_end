const http = require('http');
const fs = require('fs/promises');

const databaseFile = process.argv[2];

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

const app = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === '/') {
    res.statusCode = 200;
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    res.statusCode = 200;
    res.write('This is the list of our students\n');

    countStudents(databaseFile)
      .then((data) => {
        res.end(data);
      })
      .catch((err) => {
        res.end(err.message);
      });
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

app.listen(1245);

module.exports = app;
