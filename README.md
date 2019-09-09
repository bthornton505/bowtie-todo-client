# Bowtie To-Do Client

This is a To-Do React app which interacts with a Rails API for managing content creation. This was created for a code challenge.

As of now the available features are:

- **Login and Signup**
- **Logged in users can maintain a list of Projects and add to-dos for them**

Features soon to be added:

- **Users will be able to signup/signin with a Google account**

## Docker Installation:

To use [Docker](https://docs.docker.com/docker-for-mac/install/) you'll need to make sure it's been downloaded to your operating system. I've provided a link for you to get started with that process!

Once you have Docker all setup, follow the below instructions

- Fork and clone this repo

#### Get Docker up and running

- cd into bowtie-todo-client directory which holds the `Dockerfile`
- In your terminal run this command: `docker build -t bowtie-todo-client .`
  - This command will build the Docker Image which is then used to build the container
- If all goes well, run this next command in the terminal: `docker run -p 80:80 bowtie-todo-client:latest`
  - This will boot up the application in a Docker container
  - Navigate to http://localhost and you should see the To-Do React App running

## Without Docker Installation:

Assuming you have React and Node.js installed,

- Fork and clone this repo
- cd into bowtie-todo-client directory
  - Run `$ npm install`
  - Run `$ npm start`
- Now you should have the app open up in your browser
- Make sure you're running the [bowtie-todo-api](https://github.com/bthornton505/bowtie-todo-api) before you start-up this application. You need both for the app to work properly.

## Frameworks and Libraries Used

- Front-end: [React](https://reactjs.org/)
- [Docker](https://www.docker.com/)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Twitter Bootstrap](https://getbootstrap.com/)

## Author

- [Brenden Thornton](https://github.com/bthornton505)

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/bthornton505/bowtie-todo-client. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the Contributor Covenant code of conduct.

## License

All software is available as open source under the terms of the [MIT License](https://github.com/bthornton505/bowtie-todo-client/blob/master/LICENSE).
