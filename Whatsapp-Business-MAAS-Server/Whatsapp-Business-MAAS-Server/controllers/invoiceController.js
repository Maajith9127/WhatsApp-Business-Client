import invoiceModel from '../models/invoiceModel.js';

// To send invoice to the customer
export const newInvoice = async (req, res, next) => {
    try {
        const userId = req.user.id;  // userId is set by auth middleware
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized: user ID not found' });
        }
        const {
            name,
            customer_phone,
            business_phone,
            invoice_number,
            input_params
        } = req.body;

        if (!name || !customer_phone || !business_phone || !invoice_number || !input_params) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const invoicePdf = req.file;
        if (!invoicePdf) {
            return res.status(400).json({ error: 'No invoice PDF uploaded.' });
        }

        const invoicePdfUrl = `${req.protocol}://${req.get('host')}/uploads/${invoicePdf.filename}`;

        const result = await invoiceModel.create({
            user_id,
            name,
            customer_phone,
            business_phone,
            invoice_number,
            invoicePdfUrl,
            input_params
        });

        // TODO: Implement whatsappService.sendInvoice()
        // await whatsappService.sendInvoice({...});

        res.status(201).json({
            message: 'Invoice created and sent successfully',
            invoiceId: result.insertId
        });
    } catch (err) {
        console.error('Error creating invoice:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// To get all invoices for logged in user
export const getAllInvoices = async (req, res, next) => {
    try {
        console.log('req:::',req.user);
        
        const user_id = req.user.id;  // user_id is set by auth middleware
        if (!user_id) {
            return res.status(401).json({ error: 'Unauthorized: user ID not found' });
        }
        const result = await invoiceModel.getAllInvoices(user_id);
        res.status(200).json(result);
    } catch (err) {
        console.error('Error getting invoices:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// To get a single invoice by id for logged in user
export const getInvoice = async (req, res, next) => {
    try {
        const userId = req.user.id;  // userId is set by auth middleware
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized: user ID not found' });
        }
        const id = req.params.id;
        const result = await invoiceModel.getInvoiceById(id, userId);
        res.status(200).json(result);
    } catch (err) {
        console.error('Error getting invoice:', err);
        if (err.message === 'Invoice not found') {
            return res.status(404).json({ message: err.message });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
};