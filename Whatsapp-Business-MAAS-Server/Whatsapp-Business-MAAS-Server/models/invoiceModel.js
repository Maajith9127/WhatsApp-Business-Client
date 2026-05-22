import db from '../config/database.js';

// To create a new invoice in DB
const create = async (data) => {
    const {
        user_id,
        name,
        customer_phone,
        business_phone,
        invoice_number,
        invoicePdfUrl,
        message
    } = data;

    const sql = `
        INSERT INTO invoices 
        (user_id, customer_name, customer_phone, business_phone, invoice_number, invoice_pdf_url, message) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [user_id, name, customer_phone, business_phone, invoice_number, invoicePdfUrl, message];

    try {
        const [result] = await db.query(sql, values);
        return result;
    } catch (err) {
        throw err;
    }
};

// To get all invoices for a specific user
const getAllInvoices = async (user_id) => {
    const sql = `SELECT * FROM invoices WHERE user_id = ?`;

    try {
        const [rows] = await db.query(sql, [user_id]);
        return rows;
    } catch (err) {
        throw err;
    }
};

// To get an invoice by id and user id
const getInvoiceById = async (id, userId) => {
    const sql = `SELECT * FROM invoices WHERE id = ? AND userId = ?`;

    try {
        const [rows] = await db.query(sql, [id, userId]);
        if (rows.length === 0) {
            throw new Error('Invoice not found');
        }
        return rows[0];
    } catch (err) {
        throw err;
    }
};

const invoiceModel = {
    create,
    getAllInvoices,
    getInvoiceById
};

export default invoiceModel;