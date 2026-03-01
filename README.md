# Secure Authentication API (MERN Stack)

A professional-grade full-stack implementation of a secure authentication and authorization system using the MERN (MongoDB, Express, React, Node) stack. This project demonstrates industry-standard security practices, including JWT dual-token strategy, role-based access control, and modern React frontend architecture.

## Project Structure

This project follows a decoupled MERN stack architecture:
- **client/**: A modern React application (Vite-powered) handling the UI and authentication state.
- **server/**: An Express/Node.js backend API managing security, business logic, and MongoDB persistence.
- **Root Directory**: Orchestrates both environments using a single `package.json` and shared configuration.

## Technical Stack

- **Frontend**: React.js, React Router, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Atlas)
- **Security**: JWT (Access & Refresh tokens), Password Hashing (Bcryptjs), Helmet, Rate Limiting
- **Dev Tools**: Vite, Concurrently, Nodemon

## Core Features

- **User Roles**: Comprehensive role-based access control (RBAC) supporting 'user' and 'admin' roles.
- **Dual-Token Authentication**: Secure session management using short-lived Access Tokens and long-lived Refresh Tokens.
- **Protected Routing**: Both client-side (React Router) and server-side (Express middleware) protection for sensitive resources.
- **Modern UI**: A responsive, professional-grade interface with clean styling and dynamic state updates.

## Security Implementation

### 1. Password Security
Passwords are never stored in plaintext. The system uses **Bcryptjs** with 12 salt rounds to hash passwords within a Mongoose pre-save hook, ensuring consistent encryption before data persistence.

### 2. JWT Authentication Flow
The system utilizes a two-tier token strategy:
- **Access Tokens (15 min)**: Bearer tokens for stateless authentication on every request.
- **Refresh Tokens (7 days)**: Stored in the database to allow secure renewal of access tokens, reducing the risk of compromised long-term credentials.

### 3. Middleware-driven Defense
- **Authorization**: Custom `adminOnly` middleware validates the user's role extracted from the JWT payload.
- **Rate Limiting**: Throttling implemented on authentication routes to prevent brute-force attacks.
- **Security Headers**: Leveraging **Helmet** to set secure headers (CSP, HSTS, No-Sniff) to protect against XSS and Clickjacking.

## API Endpoints

### Authentication
- `POST /api/auth/register`: Create a new user account.
- `POST /api/auth/login`: Authenticate and receive Access/Refresh tokens.
- `POST /api/auth/refresh`: Obtain a new access token using a valid refresh token.
- `POST /api/auth/logout`: Invalidate the current session and refresh token.

### Administrative
- `GET /admin`: Access the admin-only resources.

## Setup and Installation

### 1. Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account

### 2. Environment Configuration
Create a `.env` file in the `server/` directory with the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_ACCESS_SECRET=your_access_token_secret
JWT_REFRESH_SECRET=your_refresh_token_secret
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=7d
```

### 3. Installation
From the root directory, install all dependencies for both client and server:
```bash
npm run install:all
```

### 4. Running the Application
To start both the backend and frontend in development mode:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (React dev server).