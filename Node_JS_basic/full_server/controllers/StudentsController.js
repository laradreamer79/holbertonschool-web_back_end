import readDatabase from '../utils';

class StudentsController {
  static getAllStudents(request, response) {
    const database = process.argv[2];

    readDatabase(database)
      .then((studentsByField) => {
        const output = ['This is the list of our students'];
        const fields = Object.keys(studentsByField).sort((a, b) => (
          a.toLowerCase().localeCompare(b.toLowerCase())
        ));

        fields.forEach((field) => {
          output.push(
            `Number of students in ${field}: ${studentsByField[field].length}. List: ${studentsByField[field].join(', ')}`,
          );
        });

        response.type('text/plain').status(200).send(output.join('\n'));
      })
      .catch(() => {
        response.type('text/plain').status(500).send('Cannot load the database');
      });
  }

  static getAllStudentsByMajor(request, response) {
    const { major } = request.params;
    const database = process.argv[2];

    if (major !== 'CS' && major !== 'SWE') {
      response.type('text/plain').status(500).send('Major parameter must be CS or SWE');
      return;
    }

    readDatabase(database)
      .then((studentsByField) => {
        response.type('text/plain').status(200).send(`List: ${(studentsByField[major] || []).join(', ')}`);
      })
      .catch(() => {
        response.type('text/plain').status(500).send('Cannot load the database');
      });
  }
}

export default StudentsController;
