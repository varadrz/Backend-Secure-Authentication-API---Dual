const router = require('express').Router();
const { protect, adminOnly } = require('../middleware/auth');

const User = require('../models/User');

router.get('/', protect, adminOnly, (req, res) => {
  res.status(200).json({ message: `Welcome Admin ${req.user.id}` });
});

// GET /admin/users - List all clients
router.get('/users', protect, adminOnly, async (req, res) => {
  try {
    const clients = await User.find({ role: 'user' }).select('-password -refreshToken');
    res.status(200).json(clients);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
});

module.exports = router;