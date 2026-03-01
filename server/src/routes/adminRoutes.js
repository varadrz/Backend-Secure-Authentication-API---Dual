const router = require('express').Router();
const { protect, adminOnly } = require('../middleware/auth');

router.get('/', protect, adminOnly, (req, res) => {
  res.status(200).json({ message: `Welcome Admin ${req.user.id}` });
});

module.exports = router;