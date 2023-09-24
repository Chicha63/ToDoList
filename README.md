
# ToDoList app Project README

This README provides essential information about the ToDoList project, a web application built using Java Spring, JavaScript, and MongoDB. This project aims to help users manage their tasks and stay organized by providing a user-friendly interface for creating, updating, and tracking tasks.



## Table of contents

- [ToDoList app Project README](#todolist-app-project-readme)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Configuration](#configuration)
  - [Usage](#usage)
  - [License](#license)
## Introduction

The ToDoList project is a task management web application developed with Java Spring as the backend framework, JavaScript for the frontend, and MongoDB as the database. It offers a convenient way for users to create, organize, and complete their tasks efficiently. This README will guide you through the setup and usage of the project.
## Features

- User Authentication: Users can create accounts, log in, and manage their tasks securely.
- Task Management: Create, update and delete tasks with ease.
- Task Priority: Assign priorities to tasks to indicate their importance.
- Task Categories: Organize tasks into categories for better organization
- Due Dates: Set due dates for tasks to help prioritize and schedule activities.
- Search: Easily search for tasks.


## Configuration
1. Configure the MongoDB connection by editing the src/main/resources/application.properties file and update the spring.data.mongodb.uri property with your MongoDB connection string.
2. Customize other application properties as needed, such as security settings or server port in the same application.properties file.
3. Create environment variables for any sensitive information such as database credentials.
## Usage

1. Start the Java Spring backend

The backend will start on port 8080 by default. You can change the port in the application.properties file.

2. Start the fronend with: npm start

The frontend development server will start, and the application will be accessible at http://localhost:3000 by default.

4. Access the application in your web browser.

5. Register an account or log in if you already have one.

6. Start managing your tasks!

## License

[MIT](https://choosealicense.com/licenses/mit/)

This project is licensed under the MIT License - see the LICENSE file for details.

