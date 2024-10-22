# GitHub OAuth2 Integration

### Preview link Task 1- [Click here](https://www.loom.com/share/455e60248b794031b2f400ce33a5367f?sid=edeabb27-c86d-48b8-9054-669b7f2a60a5)

### Preview link Task 2- [Click here](https://www.loom.com/share/e748f74d58934e5eb2fff692f9b93085?sid=c3c4e7bc-d613-4555-8eb2-9a6e8d83a331)


# Frontend

Welcome to the frontend portion of the GitHub OAuth 2 Integration project. This README will guide you through the setup and usage of the frontend application, showcasing its features and technical aspects.

## Initial Setup

1. **Prerequisites**: Ensure you have Node.js and npm installed on your system. You can download them from [nodejs.org](https://nodejs.org/).

2. **Clone the Repository**: Clone the project repository from GitHub:

   ```bash
   git clone https://github.com/djwebexpert/github-oauth.git
   ```

3. **Install Dependencies**: Navigate to the project directory and install the required dependencies using npm:

   ```bash
   cd frontend
   npm install
   ```

4. **Run the Application**: Start the Angular development server by running:

   ```bash
   npm run start
   ```

   The application will be available at `http://localhost:4200`.
   
5. **Setup Enviroment**: Add GithubClientId value in environment in src folder:

   ```bash
   Path: frontend/src/environments/environment.ts
   ```

## Project Structure

- **Components**: The frontend application is organized into components, following Angular's component-based architecture. Each component handles specific aspects of the user interface and functionality.

- **Services**: Dedicated services are used to make API calls and manage data. These services ensure data is fetched and processed efficiently.

## User Authentication

- **OAuth 2 Authentication**: User authentication is handled via GitHub OAuth 2. When you click the "Connect" button, you'll be redirected to GitHub for authentication.

## Additional Features

- **User-Friendly UI**: Angular Material provides an elegant and responsive user interface.


------------------------------------


# Backend

Welcome to the backend portion of the GitHub OAuth 2 Integration project. This README will guide you through the setup and usage of the backend server, highlighting its features and technical aspects.

## Initial Setup

1. **Prerequisites**: Ensure you have Node.js and npm installed on your system. You can download them from [nodejs.org](https://nodejs.org/).

2. **Clone the Repository**: Clone the project repository from GitHub:

   ```bash
   git clone https://github.com/djwebexpert/github-oauth.git
   ```

3. **Install Dependencies**: Navigate to the project directory and install the required dependencies using npm:

   ```bash
   cd backend
   npm install
   ```

4. **Run the Server**: Start the backend server by running:

   ```bash
   npm run start
   ```

   The server will be available at `http://localhost:3000`.
   
5. **Setup Credentials**: Create .env file and Add ClientId and Secret key of Github in that file for Authentication. You can find data from .env.example file:

   ```bash
   GITHUB_CLIENT_ID = ****
   GITHUB_CLIENT_SECRET = ****
   REDIRECT_URL = http://localhost:4200
   PORT = 3000
   DB = mongodb://127.0.0.1:27017/integrations
   ```

## Project Structure

- **Controllers**: The backend server uses controllers to manage route handling and business logic.

- **Routes**: Routes are defined to handle API endpoints and interact with the frontend.

- **Models**: Data models are established using Mongoose, providing structure and validation for data stored in MongoDB.

## OAuth 2 Authentication

- OAuth 2 authentication is implemented on the server side to ensure data security and privacy during GitHub integration.

- Error handling is in place to provide informative error messages in case of unexpected issues.
