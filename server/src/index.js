require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');

const app = express();

// Connect to Database
connectDB();

// Security Middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            ...helmet.contentSecurityPolicy.getDefaultDirectives(),
            "script-src": ["'self'", "'unsafe-inline'"],
            "style-src": ["'self'", "'unsafe-inline'"],
        },
    },
}));

// Basic Middleware
app.use(cors());
app.use(express.json());

app.get('/favicon.ico', (req, res) => res.status(204).end());

// Debug Logger
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Status Check
app.get('/status', (req, res) => {
    const distPath = path.join(__dirname, '../../client/dist');
    const indexExists = require('fs').existsSync(path.join(distPath, 'index.html'));
    res.json({
        status: 'UP',
        dirname: __dirname,
        distPath: distPath,
        indexExists: indexExists,
        cwd: process.cwd()
    });
});

// Static Files (Serve React build)
app.use(express.static(path.join(__dirname, '../../client/dist')));

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/admin', require('./routes/adminRoutes'));

// Catch-all for frontend routes (SPA support)
app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

// Final 404 handler for unmatched API routes
app.use((req, res) => {
    console.log(`404 - Route not found: ${req.method} ${req.url}`);
    res.status(404).json({ message: 'Route not found' });
});

// Start Server
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
        console.log(`Server running on port ${PORT}`)
    );
}

module.exports = app;