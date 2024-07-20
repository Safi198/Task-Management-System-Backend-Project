# Task Management System

## Overview

This is an advanced task management system built with Node.js, Express, MongoDB, and React. It supports user authentication, role-based access control, real-time notifications, and advanced task management features.

## Features

- User Authentication with JWT
- Role-Based Access Control (Admin, Manager, Team Member)
- CRUD operations for tasks and users
- Real-time notifications using WebSockets
- Task priority, deadlines, task dependencies, and user comments on tasks
- Comprehensive error handling and logging with Winston
- API documentation with Swagger

## Technologies Used

- Backend: Node.js, Express, MongoDB
- Frontend: React, Redux (Note: Frontend implementation is not included here)
- WebSockets: Socket.io
- Logging: Winston
- API Documentation: Swagger

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB instance running

### Installation

1. Clone the repository:
   ```bash
   git clone <https://github.com/Safi198/Task-Management-System-Backend-Project>
   cd task-management-system
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your MongoDB URI and JWT secret:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the server:
   ```bash
   npm start
   ```

## API Documentation

API documentation is available via Swagger. Once the server is running, navigate to:
```
http://localhost:3000/api-docs
```

## Testing with Postman

1. **Register a User**: `POST /api/auth/register`
   - Body: 
     ```json
     {
       "name": "John Doe",
       "email": "john@example.com",
       "password": "password123",
       "role": "admin"
     }
     ```

2. **Login a User**: `POST /api/auth/login`
   - Body: 
     ```json
     {
       "email": "john@example.com",
       "password": "password123"
     }
     ```
   - Note the JWT token from the response.

3. **Get All Users**: `GET /api/users`
   - Headers: 
     - Key: `Authorization`
     - Value: `Bearer <JWT_TOKEN>`

4. **Get User by ID**: `GET /api/users/:id`
   - Headers:
     - Key: `Authorization`
     - Value: `Bearer <JWT_TOKEN>`

5. **Update User**: `PUT /api/users/:id`
   - Headers:
     - Key: `Authorization`
     - Value: `Bearer <JWT_TOKEN>`
   - Body: 
     ```json
     {
       "name": "John Updated",
       "email": "john.updated@example.com",
       "role": "manager"
     }
     ```

6. **Delete User**: `DELETE /api/users/:id`
   - Headers:
     - Key: `Authorization`
     - Value: `Bearer <JWT_TOKEN>`

7. **Create a Task**: `POST /api/tasks`
   - Headers:
     - Key: `Authorization`
     - Value: `Bearer <JWT_TOKEN>`
   - Body: 
     ```json
     {
       "title": "New Task",
       "description": "Task description",
       "priority": "high",
       "deadline": "2024-07-25",
       "assignedTo": "user_id"
     }
     ```

8. **Get All Tasks**: `GET /api/tasks`
   - Headers:
     - Key: `Authorization`
     - Value: `Bearer <JWT_TOKEN>`

9. **Get Task by ID**: `GET /api/tasks/:id`
   - Headers:
     - Key: `Authorization`
     - Value: `Bearer <JWT_TOKEN>`

10. **Update Task**: `PUT /api/tasks/:id`
    - Headers:
      - Key: `Authorization`
      - Value: `Bearer <JWT_TOKEN>`
    - Body: 
      ```json
      {
        "title": "Updated Task",
        "description": "Updated description"
      }
      ```

11. **Delete Task**: `DELETE /api/tasks/:id`
    - Headers:
      - Key: `Authorization`
      - Value: `Bearer <JWT_TOKEN>`

12. **Add Comment to Task**: `POST /api/tasks/:id/comments`
    - Headers:
      - Key: `Authorization`
      - Value: `Bearer <JWT_TOKEN>`
    - Body: 
      ```json
      {
        "text": "This is a comment"
      }
      ```

## Logging

Logging is implemented using Winston. Logs are available in `error.log` and `combined.log` files.

## WebSockets

Real-time notifications for task updates are implemented using Socket.io. Ensure the client-side is set up to connect to the WebSocket server.

## Folder Structure

```
task-management-system/
├── config/
│   ├── db.js
│   ├── roles.js
│   └── winston.js
├── controllers/
│   ├── authController.js
│   ├── taskController.js
│   └── userController.js
├── middlewares/
│   ├── authMiddleware.js
│   ├── errorHandler.js
│   ├── rbacMiddleware.js
│   └── socketMiddleware.js
├── models/
│   ├── Task.js
│   └── User.js
├── routes/
│   ├── authRoutes.js
│   ├── taskRoutes.js
│   └── userRoutes.js
├── utils/
│   ├── generateToken.js
│   └── swagger.js
├── .env
├── app.js
├── package.json
├── README.md
└── server.js
```

## License

This project is licensed under the MIT License.