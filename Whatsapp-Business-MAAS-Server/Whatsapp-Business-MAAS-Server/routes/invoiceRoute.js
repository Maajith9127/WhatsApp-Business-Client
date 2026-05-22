import express from 'express';
import auth from '../middleware/auth.js';

const router = express.Router();

import upload from '../config/multer.js';
import { newInvoice, getAllInvoices, getInvoice } from '../controllers/invoiceController.js';

//Make sure we pass all thr req through a middleware
router.use(auth);
// POST To send a new invoice
// GET  To get all invoices 
router.route('/')
        .post(upload.single('file'), newInvoice)  // The invoice pdf should be sent in a field with key "file"
        .get(getAllInvoices);

// To get a single invoice with its ID
router.route('/:id')
        .get(getInvoice);

export default router;