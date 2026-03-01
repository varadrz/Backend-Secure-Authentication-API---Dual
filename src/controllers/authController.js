const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateTokens = (user) => {
    const payload = { id: user._id, role: user.role };
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.JWT_ACCESS_EXPIRES });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES });
    return { accessToken, refreshToken };
};

// POST /api/auth/register
exports.register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        const exists = await User.findOne({ email });
        if (exists) return res.status(409).json({ message: 'Email already registered' });

        // Prevent self-assigning admin via API
        const user = await User.create({ username, email, password, role: role === 'admin' ? 'user' : role });
        res.status(201).json({ message: 'Registered successfully', userId: user._id });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// POST /api/auth/login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        const match = await user.comparePassword(password);
        if (!match) return res.status(401).json({ message: 'Invalid credentials' });

        const { accessToken, refreshToken } = generateTokens(user);
        user.refreshToken = refreshToken;
        await user.save();

        res.status(200).json({ accessToken, refreshToken, role: user.role });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// POST /api/auth/refresh
exports.refresh = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) return res.status(400).json({ message: 'Refresh token required' });

        let payload;
        try {
            payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        } catch {
            return res.status(401).json({ message: 'Invalid or expired refresh token' });
        }

        const user = await User.findById(payload.id);
        if (!user || user.refreshToken !== refreshToken)
            return res.status(401).json({ message: 'Token reuse detected or user not found' });

        const { accessToken, refreshToken: newRefresh } = generateTokens(user);
        user.refreshToken = newRefresh;
        await user.save();

        res.status(200).json({ accessToken, refreshToken: newRefresh });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// POST /api/auth/logout
exports.logout = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) return res.status(400).json({ message: 'Refresh token required' });

        const user = await User.findOne({ refreshToken });
        if (user) {
            user.refreshToken = null;
            await user.save();
        }

        res.status(200).json({ message: 'Logged out successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};