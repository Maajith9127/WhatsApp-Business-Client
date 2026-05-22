import db from '../config/database.js';

// Create a new template
const create = async (data) => {
  const {
    user_id,
    name,
    category,
    language,
    components,
    parameters
  } = data;

  const sql = `
    INSERT INTO templates 
    (user_id, name, category, language, components, parameters) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const values = [
    user_id,
    name,
    category,
    language,
    JSON.stringify(components), // store components as JSON string
    parameters || null // store parameters (can be comma-separated)
  ];

  try {
    const [result] = await db.query(sql, values);
    return result;
  } catch (err) {
    throw err;
  }
};

// Get all templates filtered by user_id
const getAllTemplates = async (user_id) => {
  const sql = `SELECT * FROM templates WHERE user_id = ?`;
  const values = [user_id];

  try {
    const [rows] = await db.query(sql, values);
    return rows;
  } catch (err) {
    throw err;
  }
};

// Get template by id and user_id
const getTemplateById = async (id, user_id) => {
  const sql = `SELECT * FROM templates WHERE id = ? AND user_id = ?`;
  const values = [id, user_id];

  try {
    const [rows] = await db.query(sql, values);
    if (rows.length === 0) {
      throw new Error('Template not found');
    }
    return rows[0];
  } catch (err) {
    throw err;
  }
};

const templateMessageModel = {
  create,
  getAllTemplates,
  getTemplateById,
};

export default templateMessageModel;