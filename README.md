<h1 align="center">Task-Management Backend</h1>

Explore our efficient task management backend, thoughtfully designed to streamline your task organization. Experience a diverse range of backend capabilities, enjoy a seamless API experience, and ensure smooth task operations, making every task management interaction convenient and satisfactory.

## Features

- **User Management:**

  - User register/login
  - Secure user authentication using JSON Web Tokens (JWT).

- **Task Management:**

  - Create new tasks
  - Edit and delete existing tasks.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)

## Getting Started

### Installation

1. **Clone the repository:**

   ```shell
   git clone https://github.com/Manideep-0164/Task-Management-API.git

   ```

2. **Install Dependencies:**

   ```shell
   cd Task-Management-API
   npm install
   ```

3. **Set Environmental Variables(.env)**

   ```shell
   MONGO_URL=your_mongodb_url
   PORT=your_port_number
   JWT_TKN_SECRET=your_token_secret
   JWT_TKN_EXPIRY=token_expiry_time
   REQUESTS_PER_MINUTE=10
   ```

4. **Start the backend server**

   ```shell
   node index.js
   # or
   nodemon index.js
   # or
   npm run start
   # or
   npm run dev
   ```

### Endpoints

- _POST /tasks_: Create a new task.
- _GET /tasks_: Retrieve a list of all tasks.
- _GET /tasks/:id_: Retrieve a specific task by its ID.
- _PUT /tasks/:id_: Update a specific task by its ID.
- _DELETE /tasks/:id_: Delete a specific task by its ID.
- _POST /user/register_: Register a new user.
- _POST /user/login_: Log in as a registered user and obtain a JWT token for authentication.

### Usage

- Register and login to obtain authentication credentials.
- User email is attached to the `req` object within the authentication middleware.
- To add a task, ensure that the `req.body` contains the `title` and `description`.
- When updating a task, pass a valid task ID as a parameter. Also, ensure that `req.body` contains at least one of these fields: `title`, `description`, or `status`.
- To delete a task, provide the ID of the task to be deleted.

### Swagger Docs

[API Docs](https://puzzled-flip-flops-wasp.cyclic.app/api-docs/)

### Contact Information

For any queries and feedback, please contact me at [peddaboinimanideep03@gmail.com](mailto:peddaboinimanideep03@gmail.com).

---

<h1 align="center">✨Thank You✨</h1>
