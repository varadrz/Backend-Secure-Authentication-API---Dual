# Backend API - Secure Authentication

This is the backend service for the Secure Authentication API, built with Node.js, Express, and MongoDB.

## Technical Implementation Details

### 1. Authentication Flow
- **Registration**: Passwords are hashed using `bcryptjs` before storage.
- **Login**: Validates credentials and issues a pair of JWTs (Access & Refresh).
- **Refresh**: Uses the `RefreshToken` to issue a new `AccessToken`. Implements **Token Reuse Detection** by comparing the provided token with the one stored in the User document.
- **Logout**: Clears the `refreshToken` from the database to invalidate the session.

### 2. Middleware Stack
- `auth.js`: Verifies the `AccessToken` in the `Authorization` header.
- `validate.js`: Uses `express-validator` to enforce strict input rules (e.g., valid email format, minimum password length).
- `error.js`: Centralized error handling for consistent API responses.

### 3. Database Schema
The User model includes:
- `email`: Indexed and unique.
- `password`: Hashed string.
- `role`: Enum (`user`, `admin`).
- `refreshToken`: Stored for session persistence and revocation.

## API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/api/auth/register` | Create a new account |
| POST | `/api/auth/login` | Authenticate and get tokens |
| POST | `/api/auth/refresh` | Get new access token |
| POST | `/api/auth/logout` | Invalidate session |
| GET | `/api/admin/dashboard` | Protected admin route |
