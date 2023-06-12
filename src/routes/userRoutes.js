const express = require('express');
const router = express.Router();
const { register, login, getUser } = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleWare')
// User registration route
router.post('/register', register);

// User login route
router.post('/login', login);

// Get user details route
router.get('/', authenticateToken, getUser);

module.exports = router;
