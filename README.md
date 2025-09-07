# Photo Service

A RESTful API for managing users, photos, and categories, built with [NestJS](https://nestjs.com/) and MySQL. This service supports authentication (JWT), user management, photo uploads, and category tagging, suitable for photo-sharing or gallery applications.

## Features

- **User Management**: Register, authenticate, and manage users with hashed passwords.
- **Profiles**: Each user has a profile with gender and photo.
- **Photos**: Users can upload photos with metadata (name, location, description, URL) and assign categories.
- **Categories**: Organize photos by categories; categories are unique and can be managed via the API.
- **Authentication**: JWT-based login and route protection.
- **MySQL Database**: Uses TypeORM for database access and migrations.
- **Dockerized**: Includes a `docker-compose.yaml` for easy local MySQL setup.

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm
- Docker (for local MySQL)

### Installation

```bash
npm install
```

If you see vulnerabilities after installation, you can try:

```bash
npm audit fix
# Or, if needed (use with caution):
npm audit fix --force
```

## Environment Variables Example
Your `.env` file should look like this:

```
DB_HOST=localhost
DB_HOST_PORT=3306
DB_USER=photo_user
DB_PASSWORD=password
DB_ROOT_PASSWORD=rootpassword
DB_DATABASE=photo_service_db

# JWT secret for authentication
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=3600s
```

> **Security Note:**
> - **Change all default passwords and secrets** before deploying or sharing your project.
> - **Never commit your `.env` file to version control.** Add `.env` to your `.gitignore` file to keep sensitive data safe.

### Running MySQL with Docker

```bash
docker compose up --force-recreate --build photo-service-database -d
```

---

### Running the Application

```bash
# development
npm run start

# watch mode
npm run start:dev

# production
npm run start:prod
```

### Running Tests

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

---

### Logging into MySQL (inside Docker)

1. Open Docker Desktop, go to **Containers**, and select your running MySQL container.
2. Click the **Exec** tab to open a shell inside the container.
3. Log in to MySQL using your credentials from the `.env` file:

   ```sh
   mysql -u photo_user -p photo_service_db
   ```
   Enter your password when prompted (`DB_PASSWORD` from `.env`).

   Or, for root access:
   ```sh
   mysql -u root -p
   ```
   Enter your root password (`DB_ROOT_PASSWORD` from `.env`).

### Useful MySQL Commands

Once logged in, you can use these commands:

- **Show all databases:**
  ```sql
  SHOW DATABASES;
  ```

- **Select your database:**
  ```sql
  USE photo_service_db;
  ```

- **Show all tables:**
  ```sql
  SHOW TABLES;
  ```

- **Describe a table:**
  ```sql
  DESCRIBE users;
  ```

![Docker Desktop](docs/screenshots/docker_desktop.png)

---

## API Interface (Swagger UI)

This project includes an interactive API documentation and testing interface using Swagger.

### Accessing Swagger UI

1. **Start your NestJS application:**
   ```bash
   npm run start
   ```
2. **Open your browser and go to:**
   ```
   http://localhost:3000/api
   ```
   *(or `/docs` if configured that way)*

3. **You will see an interface like this:**

   ![Swagger UI Screenshot](docs/screenshots/swagger-ui.png)

   - You can explore all endpoints, see request/response schemas, and try out API calls directly from your browser.
   - Use the **Authorize** button to enter your JWT token for protected endpoints.

> **Tip:** If you don't see the Swagger UI, check your `main.ts` for Swagger setup.

## API Overview

- **Auth**: `/login` (POST, returns JWT)
- **Users**: `/users` (CRUD)
- **Photos**: `/photos` (CRUD, assign categories)
- **Categories**: `/categories` (CRUD)

All endpoints (except `/login` and `/`) require JWT authentication.

---

## Using Postman

You can use [Postman](https://www.postman.com/) to interact with all API endpoints, especially if you want to test authentication or if Swagger UI is missing features.

### Example Workflow

#### 1. Logging in to get a token

- Open Postman and create a new **POST** request to:
  ```
  http://localhost:3000/login
  ```
- In the **Body** tab, select **raw** and **JSON** and enter:
  ```json
  {
    "username": "your@email.com",
    "password": "yourpassword"
  }
  ```
- Click **Send**.
- You will receive a response with an `access_token`.

---

#### 2. Authorizing requests with the token

- Copy the `access_token` from the login response.
- For protected endpoints, go to the **Headers** tab and add:
  ```
  Key: Authorization
  Value: Bearer <your_token_here>
  ```
- Now you can make authenticated requests.

---

#### 3. Creating a new photo

- Create a **POST** request to:
  ```
  http://localhost:3000/photos
  ```
- In the **Body** tab, select **raw** and **JSON** and enter:
  ```json
  {
    "name": "Mountain view",
    "location": "Alps",
    "description": "Beautiful mountain landscape.",
    "url": "http://example.com/photo.jpg",
    "owner": "admin@example.com",
    "categories": ["nature", "mountains"]
  }
  ```
- Ensure the **Authorization** header is set as above.
- Click **Send** to create a photo.

![Postman create photo example](docs/screenshots/create_photo.png)

---

## Deployment

See [NestJS deployment docs](https://docs.nestjs.com/deployment) for best practices.

## Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [TypeORM Documentation](https://typeorm.io)
- [Docker Compose](https://docs.docker.com/compose/)

## License

MIT
