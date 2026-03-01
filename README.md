# Secure Authentication API (MERN Stack)

A professional-grade, strictly minimalist full-stack implementation of a secure authentication and authorization system using the MERN (MongoDB, Express, React, Node) stack. This project features a clean, white-themed interface with email-only authentication.

## Project Structure

This project follows a decoupled MERN stack architecture:
- **client/**: A modern React application (Vite-powered) with a minimalist UI and integrated system documentation.
- **server/**: An Express/Node.js backend API managing security and MongoDB persistence.

## Core Features

- **Minimalist Aesthetic**: Professional white-themed design with no gradients or glows.
- **Email-Only Auth**: Simplified registration and login workflow (no username required).
- **System Documentation**: Technical details are integrated directly into the Home page.
- **Dual-Token Authentication**: Secure session management using Access and Refresh tokens.

## Testing Credentials

Use the following accounts to test the implementation:

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
npm install
cd client && npm install
cd ../server && npm install
```

### 4. Running the Application
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.
