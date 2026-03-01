import React from 'react';

const Documentation = () => {
    return (
        <div className="docs-section">
            <h2>System Documentation</h2>

            <div className="docs-grid">
                <div className="doc-card">
                    <h4>Technical Stack</h4>
                    <p>MERN Stack: MongoDB, Express, React, Node.js. Powered by Vite and Axios.</p>
                </div>

                <div className="doc-card">
                    <h4>Security Architecture</h4>
                    <p>JWT dual-token strategy with short-lived access and long-lived refresh tokens stored in DB.</p>
                </div>

                <div className="doc-card">
                    <h4>Authentication Flow</h4>
                    <p>Stateless authentication using Bearer tokens. Role-based access control (RBAC) implementation.</p>
                </div>

                <div className="doc-card">
                    <h4>API Endpoints</h4>
                    <p>
                        <code>POST /api/auth/register</code><br />
                        <code>POST /api/auth/login</code><br />
                        <code>GET /admin/users</code>
                    </p>
                </div>
            </div>

            <div className="docs-content" style={{ marginTop: '3rem' }}>
                <h3>Security Implementation</h3>
                <p>Passwords are hashed using <strong>Bcryptjs</strong> (12 salt rounds) before persistence. System includes rate limiting and security headers via Helmet.</p>

                <h3>Project Structure</h3>
                <p>Decoupled architecture: <code>/client</code> (Frontend) and <code>/server</code> (Backend) handled via shared orchestration.</p>
            </div>
        </div>
    );
};

export default Documentation;
