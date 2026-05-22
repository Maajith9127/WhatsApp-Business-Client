import db from '../config/database.js';

// Create a new user
const createUser = (data, cb) => {
    const {
        name, email, password, avatar = "", mobile = null,
        refresh_token = "", verify_email = false, last_login_date = null,
        status = "Active", forgot_password_otp = null, forgot_password_expiry = null,
        role = "USER"
    } = data;

    const sql = `
        INSERT INTO users (
            name, email, password, avatar, mobile, refresh_token, verify_email,
            last_login_date, status, forgot_password_otp, forgot_password_expiry, role
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        name, email, password, avatar, mobile, refresh_token, verify_email,
        last_login_date, status, forgot_password_otp, forgot_password_expiry, role
    ];

    db.query(sql, values, (err, result) => {
        if (err) return cb(err);
        cb(null, result);
    });
};

// Get all users
const getAllUsers = (cb) => {
    db.query("SELECT * FROM users", (err, result) => {
        if (err) return cb(err);
        cb(null, result);
    });
};

// Get user by ID
const getUserById = (id, cb) => {
    db.query("SELECT * FROM users WHERE id = ?", [id], (err, result) => {
        if (err) return cb(err);
        cb(null, result);
    });
};

const userModel = {
    createUser,
    getAllUsers,
    getUserById
};

export default userModel;