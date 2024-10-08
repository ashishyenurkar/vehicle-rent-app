import express from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/userController.js';

const router = express.Router();

// Registration route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

// Logout route (clears the JWT token from cookies)
router.post('/logout', logoutUser);

export default router;
