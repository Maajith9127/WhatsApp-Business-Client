import db from '../config/database.js';
import toCamelCase from '../utils/toCamelCase.js';

const create = async (data) => {
    const sql = `
        INSERT INTO whatsappCredentials (
            user_id, whatsapp_access_token, whatsapp_business_id, business_name, created_at
        ) VALUES (?, ?, ?, ?, ?)
    `;

    const values = [
        data.userId,
        data.whatsappAccessToken,
        data.whatsappBusinessId,
        data.businessName,
        new Date()
    ];

    // Use await with the Promise-based query
    const [result] = await db.query(sql, values);
    return result;
};

// Get all tenants
const getAllCredentials = async () => {
    try {
        // mysql2/promise returns [rows, fields] array
        const [rows] = await db.query("SELECT * FROM whatsappCredentials");
        return rows;
    } catch (err) {
        console.error('Database error in getAllCredentials:', err);
        throw err; // Re-throw for the controller to handle
    }
};

// Get credential by user id
const getCredentialsById = async (userId) => {
    try {
        // mysql2/promise returns [rows, fields] array
        const [rows] = await db.query(
            "SELECT * FROM whatsappCredentials WHERE user_id = ?",
            [userId]
        );

        if (rows.length === 0) {
            //we throw null because this could be the first time the user is even logging in
             return null;
        }

        return toCamelCase(rows[0]); // Return the first matching credential
    } catch (err) {
        console.error(`Database error in getCredentialsById(${userId}):`, err);
        throw err; // Re-throw for the controller to handle
    }
};

const addPhoneNumber = async (data) => {
    try {
        const sql = `INSERT INTO user_phone_numbers(user_id, phone_number) VALUES (?,?)`;
        const values = [data.userId, data.phoneNumber]
        await db.query(sql, values);
    } catch (err) {
        console.error('Database error in addPhone:', err);
        throw err; // Re-throw for the controller to handle
    }
};

const getPhoneNumber = async (id) => {
  try {
    const [rows] = await db.query(
      "SELECT phone_number FROM user_phone_numbers WHERE user_id = ?",
      [id]
    );

    return rows; //even if empty, that's fine

  } catch (err) {
    console.error(`Database error in getPhoneById(${id}):`, err);
    throw err;
  }
};


const credentialModel = {
    create,
    getAllCredentials,
    getCredentialsById,
    addPhoneNumber,
    getPhoneNumber
};

export default credentialModel;