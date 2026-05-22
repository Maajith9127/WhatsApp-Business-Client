import dotenv from 'dotenv';
dotenv.config();

import mysql from 'mysql2';
import bcrypt from 'bcryptjs';

const db = mysql.createConnection({
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
});

// Connect to DB
db.connect(async (err) => {
  if (err) {
    console.error('DB connection failed:', err);
    return;
  }
  console.log('Connected to MySQL');

  try {
    const [existingUser] = await db.promise().query(
      `SELECT id FROM users WHERE name = ? LIMIT 1`,
      ['admin']
    );

    if (existingUser.length === 0) {
      // Hash the password
      const hashedPassword = await bcrypt.hash('pass', 10);

      // Create a user object
      const user = {
        name: 'admin',
        email: 'admin@gmail.com',
        password: hashedPassword,
        avatar: '',
        mobile: 9876543210,
        refresh_token: '',
        verify_email: true,
        last_login_date: new Date(),
        status: 'Active',
        forgot_password_otp: null,
        forgot_password_expiry: null,
        role: 'USER',
      };

      // Insert into users table
      const insertUserQuery = `
        INSERT INTO users (
          name, email, password, avatar, mobile,
          refresh_token, verify_email, last_login_date,
          status, forgot_password_otp, forgot_password_expiry, role
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const userValues = [
        user.name,
        user.email,
        user.password,
        user.avatar,
        user.mobile,
        user.refresh_token,
        user.verify_email,
        user.last_login_date,
        user.status,
        user.forgot_password_otp,
        user.forgot_password_expiry,
        user.role,
      ];

      const [userResult] = await db.promise().query(insertUserQuery, userValues);
      const userId = userResult.insertId;
      console.log(`✅ User created with ID: ${userId}`);

      // Insert WhatsApp credentials for the user
      const credential = {
        whatsapp_access_token: process.env.WABA_ACCESS_TOKEN,
        whatsapp_business_id: process.env.WABA_BUSINESS_ACCOUNT_ID,
        business_name: 'Admin Business',
      };

      const insertCredentialQuery = `
      INSERT INTO whatsappCredentials (
        user_id, whatsapp_access_token, whatsapp_business_id, business_name
        ) VALUES (?, ?, ?, ?)
        `;

      const credentialValues = [
        userId,
        credential.whatsapp_access_token,
        credential.whatsapp_business_id,
        credential.business_name,
      ];

      await db.promise().query(insertCredentialQuery, credentialValues);
      console.log(`✅ WhatsApp credentials added for user ID: ${userId}`);
    } else {
      console.log('⚠️ Admin user already exists. Skipping insert.');
    }
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    db.end();
  }
});
