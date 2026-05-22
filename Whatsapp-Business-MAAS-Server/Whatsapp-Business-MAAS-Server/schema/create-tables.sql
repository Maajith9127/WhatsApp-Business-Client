CREATE DATABASE IF NOT EXISTS WABMAAS_DATABASE;
USE WABMAAS_DATABASE;

-- Users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  avatar VARCHAR(255) DEFAULT '',
  mobile BIGINT DEFAULT NULL,
  refresh_token TEXT,
  verify_email BOOLEAN DEFAULT FALSE,
  last_login_date DATETIME DEFAULT NULL,
  status ENUM('Active', 'Inactive', 'Suspended') DEFAULT 'Active',
  forgot_password_otp VARCHAR(10) DEFAULT NULL,
  forgot_password_expiry DATETIME DEFAULT NULL,
  role ENUM('ADMIN', 'USER') DEFAULT 'USER',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Invoices table
CREATE TABLE invoices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  customer_name VARCHAR(100),
  customer_phone VARCHAR(20),
  business_phone VARCHAR(20),
  invoice_number VARCHAR(100),
  invoice_pdf_url VARCHAR(2083),
  message TEXT,
  status ENUM('pending', 'sent', 'failed') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Templates table
CREATE TABLE templates (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  name VARCHAR(512) NOT NULL,
  category ENUM('UTILITY', 'MARKETING', 'AUTHENTICATION', 'TRANSACTIONAL') NOT NULL,
  language ENUM('en_US', 'ar', 'es_ES', 'fr_FR') NOT NULL,
  status ENUM('approved', 'pending', 'rejected') DEFAULT 'pending',   --added here
  components JSON NOT NULL,
  parameters TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


-- WhatsApp credentials table
CREATE TABLE whatsappCredentials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  whatsapp_access_token VARCHAR(512),
  whatsapp_business_id VARCHAR(100),
  business_name VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- User phone numbers table
CREATE TABLE user_phone_numbers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  phone_number_id VARCHAR(100),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Optional: Select queries for verification
SELECT * FROM users;
SELECT * FROM invoices;
SELECT * FROM whatsappCredentials;
SELECT * FROM user_phone_numbers;
