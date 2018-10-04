# nest-boiler-plate

Nest boiler plate code to spin up API server with basic modules including user login, registration , JWT authentication, notification and so on

## Prerequisites
Make sure you have installed all of the following prerequisites on your development machine:
* Node.js - [Download & Install Node.js](http://www.nodejs.org/download/) and the npm package manager. If you encounter any problems, you can also use this [GitHub Gist](https://gist.github.com/isaacs/579814) to install Node.js.
* MongoDB - [Download & Install MongoDB](http://www.mongodb.org/downloads), and make sure it's running on the default port (27017).

The first thing you should do is install the Node.js dependencies. The application comes pre-bundled with a package.json file that contains the list of modules you need to start your application.

To install Node.js dependencies you're going to use npm again. In the application folder run this in the command-line:

Checkout the code from GIT repository and save the code into specific directory in your local machine. Go to the folder where the files checked out into command prompt and run the following

```bash
$ npm install

Configure environment specific properties in respective property file residing in properties folder

```bash
$ npm run start:dev

The above command spin up the API server and runs in port 3000 by default. Open URL http://localhost:3000