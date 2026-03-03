# Frontend Client - Secure Authentication

A minimalist, high-performance React application built with Vite and vanilla CSS.

## Technical Highlights

### 1. State Management & Auth
- **Session Persistence**: Auth state is managed via React context/hooks. Tokens are handled securely.
- **Axios Interceptors**: A custom Axios instance automatically attaches the `AccessToken` to every request. 
- **Silent Refresh**: If a request fails with a 401 (Expired Token), the interceptor automatically attempts to call the `/refresh` endpoint and retries the original request.

### 2. UI/UX Design
- **Minimalist Aesthetic**: Pure white/gray palette for a professional, "system tool" feel.
- **Responsive Layout**: Fluid design that works seamlessly on mobile and desktop.
- **Interactivity**: Subtle hover effects and clear feedback for loading/error states.

### 3. Routing & Authorization
- **React Router**: Handles navigation between Home, Login, Register, and Dashboards.
- **Protected Routes**: Custom wrappers ensure that only authenticated users (or admins) can access specific pages.

## Key Components
- `LoginForm.jsx`: Handles user authentication.
- `Dashboard.jsx`: Displays user-specific content.
- `AdminPanel.jsx`: Restricted to users with the `admin` role.
