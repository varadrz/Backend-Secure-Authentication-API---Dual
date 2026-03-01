# Secure Authentication API

A secure Node.js backend for user authentication and role-based access control.

## 🚀 Quick Start
1. **Setup Env**: Create a `.env` file with `MONGO_URI`, `JWT_ACCESS_SECRET`, and `JWT_REFRESH_SECRET`.
2. **Install**: `npm install`
3. **Run**: `npm run dev`

## 🛠️ API Endpoints
- **Register**: `POST /api/auth/register` (Username, Email, Password)
- **Login**: `POST /api/auth/login` (Email, Password) -> Returns Access & Refresh Tokens
- **Refresh**: `POST /api/auth/refresh` (RefreshToken) -> New Access Token
- **Logout**: `POST /api/auth/logout` (RefreshToken)
- **Admin**: `GET /admin` (Admin Role Required)

## 🛡️ Security
- **Hashing**: Bcryptjs (Salt: 12)
- **Auth**: JWT (Dual Token System + Rotation)
- **Protection**: Brute-force rate limiting & Input validation
- **Headers**: CSP & Security best practices (XSS, Clickjacking protection)



> See `sample_requests.http` or `test.html` for testing.