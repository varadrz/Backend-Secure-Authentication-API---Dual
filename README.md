# Secure Authentication & Authorization API

A robust Node.js/Express backend for secure user authentication and role-based authorization.

## Core Features
- **User Roles**: Supports `user` and `admin` roles.
- **RESTful APIs**:
  - `POST /api/auth/register`: New user registration with validation.
  - `POST /api/auth/login`: JWT-based login returning access and refresh tokens.
  - `POST /api/auth/refresh`: Refresh access tokens using a secure refresh token.
  - `POST /api/auth/logout`: Invalidate the refresh token on the server.
- **Protected Routes**:
  - `GET /admin`: Accessible only by users with the `admin` role.

## Security Decisions & Implementation
### 1. Password Hashing
- **Algorithm**: Bcryptjs with a salt factor of 12.
- **Implementation**: Automatically hashes passwords during the Mongoose `pre('save')` hook to ensure no plaintext passwords are ever stored.

### 2. JWT-Based Authentication
- **Dual Token System**:
  - **Access Token**: Short-lived (15 mins) for authenticating requests via the `Authorization: Bearer <token>` header.
  - **Refresh Token**: Long-lived (7 days), stored in the database to allow secure session renewal without re-entering credentials.
- **Token Rotation**: On every `/refresh` call, a new Refresh Token is issued, and the old one is replaced to prevent reuse attacks.

### 3. Authorization (RBAC)
- **Middleware**: A dedicated `adminOnly` middleware checks the `role` field in the JWT payload to restrict access to sensitive routes.

### 4. Input Validation
- **Library**: `express-validator`
- **Rules**: Enforces email format, minimum password length (8 chars), and non-empty fields to prevent malicious or malformed data.

### 5. Rate Limiting & Brute-Force Protection
- **Implementation**: `express-rate-limit` is applied to `/register` and `/login` routes (10 requests per 15 minutes) to mitigate brute-force and DoS attacks.

### 6. Security Headers
- Uses manual CSP (Content Security Policy) and standard security headers like `X-Content-Type-Options: nosniff` and `X-Frame-Options: DENY` to protect against common web vulnerabilities.

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB URI (Atlas or local)

### Environment Variables
Create a `.env` file in the root directory:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=7d
```

### Running the Project
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start in dev mode:
   ```bash
   npm run dev
   ```

## Testing the API
- **Sample Requests**: Refer to `sample_requests.http` for example `curl` and REST client calls.
- **Interactive UI**: Open `test.html` in your browser for a basic visual test bench.