const router = require('express').Router();
const { register, login, refresh, logout } = require('../controllers/authController');
const { handleValidation, registerRules, loginRules } = require('../middleware/validate');

router.get('/register', (req, res) => res.status(405).json({ message: 'Please use POST to register.' }));
router.post('/register', registerRules, handleValidation, register);
router.post('/login', loginRules, handleValidation, login);
router.post('/refresh', refresh);
router.post('/logout', logout);

router.get('/', (req, res) => res.json({ message: 'Auth API is running. Use POST /register or /login.' }));

module.exports = router;