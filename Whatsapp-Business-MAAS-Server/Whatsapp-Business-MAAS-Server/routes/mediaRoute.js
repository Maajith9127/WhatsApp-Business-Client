import express from 'express';
const router = express.Router();

import upload from '../config/multer.js';

import { uploadToMetaGraph } from '../services/whatsappService.js';

// To post any media that will be then uploaded to meta social graph and return a HEADER_HANDLE
router.route('/meta-upload')
        .post(upload.single('file'), uploadToMetaGraph)  // File should be sent in a field with key "file"

export default router;