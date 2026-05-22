import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();


const connectDatabase = mysql.createConnection({
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD
});

// TODO: Modify code to standard practice
connectDatabase.connect((err) => {
  if (err)
    console.error(err);
  else
    console.log('Connected to MySQL database');
});

export default connectDatabase.promise();