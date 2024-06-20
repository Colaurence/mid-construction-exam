# Task Management API

This project implements a RESTful API for managing users and tasks, built using Node.js and Express.js. It includes user authentication, task management with role-based access control, and SQLite database integration for data storage.

## Features

- **User Management:**

  - Create, Read, Update, Delete (CRUD) operations for users.
  - User registration and login with password hashing for security.

- **Task Management:**

  - CRUD operations for tasks with fields `id`, `title`, `description`, `status`, `userId`.
  - Users can only access and modify their own tasks.

- **Authentication and Authorization:**

  - Token-based authentication using JWT (JSON Web Tokens).
  - Role-based access control (RBAC) to differentiate between regular users and administrators.

- **Error Handling:**

  - Proper error messages and HTTP status codes for API responses.
  - Handling of common error scenarios such as invalid input and unauthorized access.

- **Bonus Features:**
  - Pagination and sorting for task lists.
  - Search and filtering tasks by title.
  - SQLite database for lightweight data storage.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Colaurence/mid-construction-exam.git
   cd mid-construction-exam

   ```

2. **Install dependencies:**

   ```bash
   npm install

   ```

3. **Set up environment variables:**

   ```bash
   DATABASE_URL=:memory:
   SECRET_KEY=456ddb5e508f703a8bffc4a40ed75426da4265e680271aaccc93b8ff36683cb4

   ```

4. **Run the application:**

   ```bash
   npm run dev

   ```

## Endpoints

### Users

#### Create a New User

- **POST /api/users/**
  - Create a new user.
  - Payload:
    ```json
    {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "password": "password123"
    }
    ```

#### User Login

- **POST /api/users/auth/login**
  - User login to obtain authentication token.
  - Payload:
    ```json
    {
      "email": "john.doe@example.com",
      "password": "password123"
    }
    ```

#### Get All Users

- **GET /api/users/**
  - Get all users.
  - Query Parameters:
    - `page`: Page number for pagination (default: 1)
    - `perPage`: Number of users per page (default: 10)
    - `searchQuery`: Optional query string for searching users by name or email.

#### Update User

- **PUT /api/users/:id**
  - Update user details by ID.
  - Payload:
    ```json
    {
      "name": "Updated Name",
      "email": "updated.email@example.com"
    }
    ```

#### Delete User

- **DELETE /api/users/:id**
  - Delete a user by ID.

### Tasks

#### Create a New Task

- **POST /api/tasks/**
  - Create a new task.
  - Payload:
    ```json
    {
      "title": "New Task",
      "description": "Task description"
    }
    ```

#### Get All Tasks

- **GET /api/tasks/**
  - Get all tasks.
  - Query Parameters:
    - `page`: Page number for pagination (default: 1)
    - `perPage`: Number of tasks per page (default: 10)
    - `searchQuery`: Optional query string for searching tasks by title.

#### Get Tasks by User ID

- **GET /api/tasks/user**
  - Get tasks by user ID.

#### Update Task

- **PUT /api/tasks/:id**
  - Update a task by ID.
  - Payload:
    ```json
    {
      "title": "Updated Task Title",
      "description": "Updated task description"
    }
    ```

#### Delete Task

- **DELETE /api/tasks/:id**
  - Delete a task by ID.

## Technologies Used

- Node.js
- Express.js
- SQLite
- JSON Web Tokens (JWT)
- joi 
