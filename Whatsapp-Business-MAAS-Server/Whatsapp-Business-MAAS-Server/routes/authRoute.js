import express from 'express';
import { isAuthenticated } from '../controllers/authController.js';
const authRoute = express.Router();

// No middleware here!
authRoute.get('/is-authenticated', isAuthenticated);

export default authRoute;
