// import express from 'express';
// const router = express.Router();

// import { createTemplate } from '../controllers/templateController.js';

// // POST To create a new invoice template
// router.route('/invoice-template')
//         .post(createTemplate)  // The invoice pdf should be sent in a field with key "file"

// export default router;

import express from 'express';
const router = express.Router();

import { createTemplate, getAllTemplates } from '../controllers/templateController.js';
import auth from '../middleware/auth.js'; //  import auth

router.route('/invoice-template')
  .get(auth, getAllTemplates)   //protected
  .post(auth, createTemplate);     //protected

export default router;

