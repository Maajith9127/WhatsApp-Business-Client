import express from 'express';
const router = express.Router();

import {
  forgotPasswordController,
  loginController,
  logoutController,
  refreshToken,
  registerUserController,
  resetpassword,
  updateUserDetails,
  uploadAvatar,
  userDetails,
  verifyEmailController,
  verifyForgotPasswordOtp,
} from '../controllers/userController.js';

import auth from '../middleware/auth.js';
import upload from '../middleware/multer.js';

// Auth & Account Management Routes
router.post('/register', registerUserController);
router.post('/verify-email', verifyEmailController);
router.post('/login', loginController);
router.get('/logout', auth, logoutController);

// Profile and Avatar
router.put('/upload-avatar', auth, upload.single('avatar'), uploadAvatar);
router.put('/update-user', auth, updateUserDetails);
router.get('/user-details', auth, userDetails);

// Password Reset Workflow
router.put('/forgot-password', forgotPasswordController);
router.put('/verify-forgot-password-otp', verifyForgotPasswordOtp);
router.put('/reset-password', resetpassword);

// Token Refresh
router.post('/refresh-token', refreshToken);

export default router;
