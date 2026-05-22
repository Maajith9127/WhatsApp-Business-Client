import dotenv from 'dotenv';
dotenv.config();

import mysql from 'mysql2';

const db = mysql.createConnection({
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD
});

// Connect to DB
db.connect(err => {
  if (err) {
    console.error('DB connection failed:', err);
    return;
  }
  console.log('Connected to MySQL');

  // Delete all records
  db.query('DELETE FROM invoices', (err) => {
    if (err) {
      console.error('Failed to delete data:', err);
      db.end();
      return;
    }
    console.log('All records deleted.');

    db.query('ALTER TABLE invoices AUTO_INCREMENT = 1', (err) => {
      if (err) {
        console.error('Failed to delete data:', err);
        db.end();
        return;
      }
      // Step 3: Insert 10 dummy invoices
      const dummyInvoices = [];
      for (let i = 1; i <= 10; i++) {
        dummyInvoices.push([
          i, // user_id
          `Customer ${i}`,
          `987654321${i}`,
          `123456789${i}`,
          `INV-00${i}`,
          `https://example.com/invoice/inv-00${i}.pdf`,
          `Hello Customer ${i}, this is your invoice.`,
          'pending'
        ]);
      }

      const insertSql = `
      INSERT INTO invoices (
        user_id,
        customer_name,
        customer_phone,
        business_phone,
        invoice_number,
        invoice_pdf_url,
        message,
        status
      ) VALUES ?
    `;

      db.query(insertSql, [dummyInvoices], (err, result) => {
        if (err) {
          console.error('Failed to insert dummy data:', err);
        } else {
          console.log(`Inserted ${result.affectedRows} dummy invoices.`);
        }
        db.end();
      });
    });
  });
});