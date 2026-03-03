# Secure Authentication API (MERN Stack)

A professional-grade, strictly minimalist full-stack implementation of a secure authentication and authorization system using the MERN (MongoDB, Express, React, Node) stack.

## Architecture & Technical Choices

### 1. Decoupled MERN Stack
The project is split into two distinct directories:
- **[client/](file:///p:/Backend%20Secure%20Authentication%20API%20Dual/client/)**: A Vite-powered React SPA. We chose Vite for its superior developer experience and faster build times compared to CRA.
- **[server/](file:///p:/Backend%20Secure%20Authentication%20API%20Dual/server/)**: A Node.js/Express API. Decoupling ensures that the frontend and backend can be scaled and deployed independently.

### 2. Dual-Token Authentication (JWT)
We use a short-lived `AccessToken` (15m) and a long-lived `RefreshToken` (7d).
- **Why?**: This balances security and user experience. Access tokens are kept in memory (or short-lived cookies) to minimize damage if stolen. Refresh tokens allow users to stay logged in without re-entering credentials, but they are stored in the database for "sliding sessions" and can be revoked if suspicious activity is detected (token reuse detection).

### 3. Security-First Backend
- **Helmet.js**: Automatically sets various HTTP headers to protect against common attacks like XSS and Clickjacking.
- **CORS**: Strictly configured to only allow communication from the trusted frontend origin.
- **Express-Rate-Limit**: Prevents brute-force attacks by limiting the number of requests from a single IP.
- **Bcrypt.js**: Industry-standard password hashing with a salt factor of 10.

### 4. Robust Validation
We use **express-validator** as middleware to sanitize and validate all incoming requests before they reach the controllers. This prevents NoSQL injection and ensures data integrity.

## Testing Credentials

| Role | Email | Password |
| :--- | :--- | :--- |
| **User** | `simple@example.com` | `password123` |
| **Admin** | `admin@gmail.com` | `admin` |

## Setup and Installation

### 1. Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account

### 2. Environment Configuration
Create a `.env` file in the `server/` directory:
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
# Install root dependencies
npm install

# Install sub-project dependencies
cd client && npm install
cd ../server && npm install
```

### 4. Running the Application
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

