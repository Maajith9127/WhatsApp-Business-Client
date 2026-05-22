import express from 'express';
const router = express.Router();

import {
  addCredential,
  getAllCredentials,
  getCredential,
  addPhoneNumber,
  getPhoneNumber
} from '../controllers/credentialController.js';

import auth from '../middleware/auth.js';

// only accessable to us
// router.get('/all', auth, getAllCredentials);         // Get credentails of all users

// credentials Routes
router.post('/create', auth, addCredential);            // Create a new credential
router.get('/get', auth, getCredential);                // Get a credential of a user by user id 

router.route('/phone')
  .post(auth, addPhoneNumber)    // Add a phone number
  .get(auth, getPhoneNumber);    // Get phone numbers       

export default router;
