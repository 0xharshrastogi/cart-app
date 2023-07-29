# Cart App with Authentication Microservice and Cart Service

Welcome to the Cart App! This is a modern web application built with an authentication microservice and a cart service. The backend is developed using Express.js, and the frontend is built with Next.js. The application is designed with security in mind, ensuring the safety and privacy of users' data.

## Features

- **Authentication Microservice**: The authentication microservice handles user registration, login, and token generation. It ensures that only authenticated users can access the cart functionality.

- **Cart Service**: The cart service manages the user's shopping cart. It allows users to add, remove, and view items in their cart.

- **Next.js Frontend**: The frontend is built using Next.js, a popular React framework that provides server-side rendering and efficient client-side navigation.

## Security Measures

Security is a top priority for the Cart App. The following security measures have been implemented:

- **JWT Authentication**: User authentication is based on JSON Web Tokens (JWT). JWTs are used to securely transmit user information between the frontend and backend.

- **Password Hashing**: User passwords are securely hashed before storing them in the database. This ensures that even if the database is compromised, the passwords remain protected.

## Prerequisites

Before you can run the Cart App, ensure that you have the following prerequisites installed on your system:

- **Docker 24.0.2**: Docker is required to containerize and manage the application's services efficiently. You can download Docker from the official website: [Get Docker](https://www.docker.com/get-started).

- **Node.js v20.0.0**: Node.js is the runtime environment for executing JavaScript code. You can download Node.js from the official website: [Node.js Downloads](https://nodejs.org/en/download/).

- **npm v9.6.4**: npm is the package manager for Node.js and is installed automatically with Node.js.

- **make v3.81**: make is a build automation tool used to simplify project management tasks. It is generally pre-installed on Unix-like systems. For Windows users, you can install `make` through tools like Cygwin or MinGW.

Please ensure that you have the specified versions of Docker, Node.js, and make installed on your machine to have a smooth and error-free experience with the Cart App.

If you already have these prerequisites installed, you are all set to proceed with the setup and execution of the application. If not, please install them before proceeding with the next steps.

## Getting Started

To run the Cart App on your local machine, follow these steps:

1. Clone the repository: `git clone https://github.com/harshrastogiexe/cart-app.git`
2. Change the path: `cd cart-app`
3. Install dependencies microservice: `make install-deps`
4. Start docker service : `make run-docker-service`
5. Start the app and service: `make rub`
6. Access the application in your browser at http://localhost:3000.

**Please ensure you meet the prerequisites before running the application. If you encounter any issues during the setup, refer to the documentation or open an issue in the repository for assistance.**
