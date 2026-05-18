import fs from 'fs';

function readDatabase(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (error, data) => {
      if (error) {
        reject(error);
        return;
      }

      const lines = data.split('\n').filter((line) => line.trim() !== '');

      if (lines.length === 0) {
        resolve({});
        return;
      }

      const headers = lines[0].split(',').map((header) => header.trim());
      const studentsByField = {};

      lines.slice(1).forEach((line) => {
        const values = line.split(',');
        const student = {};

        headers.forEach((header, index) => {
          student[header] = (values[index] || '').trim();
        });

        if (student.firstname && student.field) {
          if (!studentsByField[student.field]) {
            studentsByField[student.field] = [];
          }

          studentsByField[student.field].push(student.firstname);
        }
      });

      resolve(studentsByField);
    });
  });
}

export default readDatabase;
