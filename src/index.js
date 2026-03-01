require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();
const cors = require('cors');
app.use(cors());
connectDB();

app.use(express.json());

// Security Headers & CSP
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    next();
});
app.get('/favicon.ico', (req, res) => res.status(204).end());

app.use(express.static('public'));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/admin', require('./routes/adminRoutes'));

app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

app.listen(process.env.PORT || 5000, () =>
    console.log(`Server running on port ${process.env.PORT || 5000}`)
);

module.exports = app;