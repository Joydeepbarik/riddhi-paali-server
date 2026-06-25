import { Router } from 'express';
import { loginUser, getProfile, restLinkSend, confirmPassword } from '../controllers/userController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// Public routes
router.post('/login', loginUser);
router.post('/restLinkSend', restLinkSend);
router.post('/confirmPassword', confirmPassword);

// Protected routes
router.get('/profile', authMiddleware, getProfile);

export default router;
