import express from 'express';
import { createBooking } from '../controllers/bookingController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/book',authMiddleware, createBooking);

export default router;
