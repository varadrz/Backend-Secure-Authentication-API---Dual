# Secure Authentication API

A professional-grade backend implementation of a secure authentication and authorization system using Node.js, Express, and MongoDB. This project demonstrates industry-standard security practices including JWT dual-token strategy, password hashing, and middleware-based access control.

## Technical Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Atlas)
- **ODM**: Mongoose
- **Security**: JWT (jsonwebtoken), Bcryptjs, Helmet, Express-rate-limit
- **Validation**: Express-validator

## Core Features

- **User Roles**: Comprehensive role-based access control (RBAC) supporting 'user' and 'admin' roles.
- **Dual-Token Authentication**: Secure session management using short-lived Access Tokens and long-lived Refresh Tokens.
- **Token Rotation**: Implementation of refresh token rotation and invalidation to mitigate session hijacking risks.
- **Protected Routing**: Granular access control for sensitive endpoints using custom middleware.

## Security Implementation

### 1. Password Security
Passwords are never stored in plaintext. The system uses **Bcryptjs** with 12 salt rounds to hash passwords within a Mongoose pre-save hook, ensuring consistent encryption before data persistence.

### 2. JWT Authentication Flow
The system utilizes a two-tier token strategy:
- **Access Tokens (15 min)**: Bearer tokens for stateless authentication on every request.
- **Refresh Tokens (7 days)**: Stored in the database to allow secure renewal of access tokens, reducing the risk of compromised long-term credentials.

### 3. Middleware-driven Defense
- **Authorization**: Custom `adminOnly` middleware validates the user's role extracted from the JWT payload.
- **Rate Limiting**: Throttling implemented on authentication routes to prevent brute-force and credential stuffing attacks.
- **HTTP Headers**: Leveraging **Helmet** to set secure headers (CSP, HSTS, No-Sniff) to protect against common web vulnerabilities like XSS and Clickjacking.
- **Input Validation**: Centralized validation logic to sanitize and verify all incoming request bodies.

## Project Structure

- `src/controllers/`: Business logic for authentication and user operations.
- `src/models/`: Mongoose schemas and data models.
- `src/routes/`: Express route definitions for auth and admin modules.
- `src/middleware/`: Security, authentication, and validation layers.
- `src/config/`: Database connection and environment configurations.

## API Endpoints

### Authentication
- `POST /api/auth/register`: Create a new user account.
- `POST /api/auth/login`: Authenticate and receive Access/Refresh tokens.
- `POST /api/auth/refresh`: Obtain a new access token using a valid refresh token.
- `POST /api/auth/logout`: Invalidate the current session and refresh token.

### Administrative
- `GET /admin`: Access the admin-only dashboard (Requires 'admin' role).

## Setup and Installation

### 1. Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB instance

### 2. Environment Configuration
Create a `.env` file in the root directory with the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_ACCESS_SECRET=your_access_token_secret
JWT_REFRESH_SECRET=your_refresh_token_secret
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=7d
```

### 3. Installation
```bash
npm install
```

### 4. Running the Application
To start the development server with nodemon:
```bash
npm run dev
```

## Testing
Comprehensive testing can be performed using the included `sample_requests.http` file (compatible with REST Client extensions) or via standard `curl` commands as documented in the codebase.