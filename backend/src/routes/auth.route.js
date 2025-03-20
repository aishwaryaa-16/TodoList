import express from 'express'
import { protectRoute } from '../middleware/auth.middleware.js';
import { checkAuth, forgotPassword, login, logout, resetPassword, signup, verifyEmail } from '../controllers/auth.controller.js';

const router = express.Router()

router.post("/signup", signup)
router.post("/login", login) 
router.post("/logout", logout)

router.post("/verify-email",verifyEmail)
router.post("/forgot-password",forgotPassword)

router.post("/reset-password/:token", resetPassword)

router.get("/check",protectRoute, checkAuth)

export default router;