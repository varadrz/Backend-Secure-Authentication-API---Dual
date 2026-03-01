const router = require('express').Router();
const { register, login, refresh, logout } = require('../controllers/authController');
const { authLimiter } = require('../middleware/rateLimiter');
const { handleValidation, registerRules, loginRules } = require('../middleware/validate');

router.get('/register', (req, res) => res.status(405).json({ message: 'Please use POST to register.' }));
router.post('/register', authLimiter, registerRules, handleValidation, register);
router.post('/login', authLimiter, loginRules, handleValidation, login);
router.post('/refresh', refresh);
router.post('/logout', logout);

router.get('/', (req, res) => res.json({ message: 'Auth API is running. Use POST /register or /login.' }));

module.exports = router;