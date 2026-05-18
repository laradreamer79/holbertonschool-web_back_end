class AppController {
  static getHomepage(request, response) {
    response.type('text/plain').status(200).send('Hello Holberton School!');
  }
}

export default AppController;
