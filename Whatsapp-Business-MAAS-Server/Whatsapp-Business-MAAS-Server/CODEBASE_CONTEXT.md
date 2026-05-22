# WhatsApp Business MaaS Server - Complete Codebase Context

## 📋 Project Overview

This is a **WhatsApp Business API as a Service (MaaS)** backend server built with Node.js/Express. It enables businesses to:
- Manage WhatsApp Business API credentials
- Create and send WhatsApp message templates
- Send invoices via WhatsApp
- Handle webhooks from Meta/Facebook
- Manage user authentication and profiles

**Project Type**: RESTful API Server  
**Language**: JavaScript (ES6 Modules)  
**Runtime**: Node.js  
**Framework**: Express.js v5.1.0

---

## 🏗️ Architecture

### **Layered Architecture Pattern**

```
┌─────────────────────────────────────┐
│         Routes Layer                 │  (API Endpoints)
├─────────────────────────────────────┤
│      Controllers Layer               │  (Business Logic)
├─────────────────────────────────────┤
│       Models Layer                   │  (Data Access)
├─────────────────────────────────────┤
│      Services Layer                  │  (External APIs)
├─────────────────────────────────────┤
│      Middleware Layer                │  (Auth, Validation)
├─────────────────────────────────────┤
│      Database (MySQL)                │
└─────────────────────────────────────┘
```

### **Key Design Patterns**
- **MVC-like separation**: Routes → Controllers → Models
- **Service layer**: External API integrations isolated in `services/`
- **Middleware-based auth**: JWT tokens via cookies/headers
- **Callback/Promise mix**: Models use callbacks, Controllers use async/await

---

## 🛠️ Technology Stack

### **Core Dependencies**
```json
{
  "express": "^5.1.0",           // Web framework
  "mysql2": "^3.14.1",            // MySQL database driver (Promise-based)
  "jsonwebtoken": "^9.0.2",      // JWT authentication
  "bcryptjs": "^3.0.2",          // Password hashing
  "axios": "^1.9.0",             // HTTP client for WhatsApp API
  "multer": "^2.0.0",            // File upload handling
  "cookie-parser": "^1.4.7",     // Cookie parsing
  "cors": "^2.8.5",              // Cross-origin resource sharing
  "dotenv": "^16.5.0",           // Environment variables
  "cloudinary": "^2.6.1",        // Image hosting
  "resend": "^4.5.1"             // Email service
}
```

### **Module System**
- **ES6 Modules** (`import`/`export`) - configured via `"type": "module"` in package.json

---

## 📁 Project Structure

```
Whatsapp-Business-MAAS-Server/
├── app.js                          # Express app configuration
├── server.js                       # Server entry point
├── package.json                    # Dependencies & scripts
│
├── config/                         # Configuration files
│   ├── database.js                 # MySQL connection (Promise-based)
│   ├── multer.js                   # File upload config
│   └── sendEmail.js                # Resend email service
│
├── controllers/                    # Business logic handlers
│   ├── authController.js           # Token validation endpoint
│   ├── credentialController.js     # WhatsApp credentials CRUD
│   ├── invoiceController.js        # Invoice management
│   ├── templateController.js       # Message template CRUD
│   ├── templateMessageController.js # (Empty file, unused)
│   ├── userController.js           # User auth & profile
│   └── webhookController.js        # Meta webhook handlers
│
├── middleware/                     # Request interceptors
│   ├── auth.js                     # JWT authentication middleware
│   ├── Admin.js                    # Admin role check (incomplete)
│   └── multer.js                   # File upload middleware
│
├── models/                         # Database access layer
│   ├── credentialModel.js          # WhatsApp credentials DB ops
│   ├── invoiceModel.js             # Invoice DB ops
│   ├── templateModel.js            # Template DB ops
│   ├── templateMessageModel.js     # (Duplicate/Unused)
│   └── userModel.js                # User DB ops (callback-based)
│
├── routes/                         # API route definitions
│   ├── authRoute.js                # /auth/* endpoints
│   ├── credentialRoute.js          # /credential/* endpoints
│   ├── invoiceRoute.js             # /invoice/* endpoints
│   ├── mediaRoute.js               # /media/* endpoints (Meta file upload)
│   ├── mediaRoutes.js              # (Duplicate/unused)
│   ├── templateRoute.js            # /template/* endpoints
│   ├── userRoute.js                # /user/* endpoints
│   └── webhookRoute.js             # /webhook/* endpoints
│
├── services/                       # External service integrations
│   └── whatsappService.js          # WhatsApp Graph API wrapper
│
├── utils/                          # Helper functions
│   ├── generatedAccessToken.js     # JWT access token generator
│   ├── generatedRefreshToken.js    # JWT refresh token generator
│   ├── generatedOtp.js             # OTP generator
│   ├── toCamelCase.js              # Converts snake_case DB fields to camelCase
│   ├── uploadImageClodinary.js     # Cloudinary image upload
│   ├── verifyEmailTemplate.js      # Email template HTML
│   └── forgotPasswordTemplate.js   # Password reset email HTML
│
├── schema/                         # Database schema
│   ├── create-tables.sql           # MySQL table definitions
│   ├── seedAdmin.js                # Admin user seeder
│   └── seedInvoice.js              # Invoice seeder
│
├── uploads/                        # Local file storage (PDFs)
├── logs/                           # Webhook log files
└── README.md
```

---

## 🗄️ Database Schema

### **Database Name**: `WABMAAS_DATABASE`

### **Tables**

#### **1. `users`**
```sql
- id (INT, PK, AUTO_INCREMENT)
- name (VARCHAR(255))
- email (VARCHAR(255), UNIQUE)
- password (VARCHAR(255), bcrypt hashed)
- avatar (VARCHAR(255), Cloudinary URL)
- mobile (BIGINT, nullable)
- refresh_token (TEXT)
- verify_email (BOOLEAN, default: false)
- last_login_date (DATETIME)
- status (ENUM: 'Active', 'Inactive', 'Suspended')
- forgot_password_otp (VARCHAR(10))
- forgot_password_expiry (DATETIME)
- role (ENUM: 'ADMIN', 'USER', default: 'USER')
- created_at, updated_at (TIMESTAMP)
```

#### **2. `whatsappCredentials`**
```sql
- id (INT, PK, AUTO_INCREMENT)
- user_id (INT, FK → users.id, CASCADE DELETE)
- whatsapp_access_token (VARCHAR(512))
- whatsapp_business_id (VARCHAR(100))
- business_name (VARCHAR(100))
- created_at (TIMESTAMP)
```

#### **3. `user_phone_numbers`**
```sql
- id (INT, PK, AUTO_INCREMENT)
- user_id (INT, FK → users.id, CASCADE DELETE)
- phone_number (VARCHAR(20))
- phone_number_id (VARCHAR(100), nullable)
```

#### **4. `templates`**
```sql
- id (INT, PK, AUTO_INCREMENT)
- user_id (INT, FK → users.id, CASCADE DELETE)
- name (VARCHAR(512))
- category (ENUM: 'UTILITY', 'MARKETING', 'AUTHENTICATION', 'TRANSACTIONAL')
- language (ENUM: 'en_US', 'ar', 'es_ES', 'fr_FR')
- status (ENUM: 'approved', 'pending', 'rejected', default: 'pending')
- components (JSON) - WhatsApp template structure
- parameters (TEXT, nullable)
- created_at, updated_at (TIMESTAMP)
```

#### **5. `invoices`**
```sql
- id (INT, PK, AUTO_INCREMENT)
- user_id (INT, FK → users.id, CASCADE DELETE)
- customer_name (VARCHAR(100))
- customer_phone (VARCHAR(20))
- business_phone (VARCHAR(20))
- invoice_number (VARCHAR(100))
- invoice_pdf_url (VARCHAR(2083))
- message (TEXT)
- status (ENUM: 'pending', 'sent', 'failed', default: 'pending')
- created_at (TIMESTAMP)
```

---

## 🔐 Authentication System

### **Token Types**
1. **Access Token**: Short-lived (5 hours), stored in cookie + response body
2. **Refresh Token**: Long-lived, stored in cookie + database

### **Token Storage**
- **Cookies**: `accessToken`, `refreshToken` (httpOnly, secure, sameSite: 'None')
- **Headers**: `Authorization: Bearer <token>` (alternative)
- **Database**: `users.refresh_token` field

### **Authentication Flow**

```
1. User registers → Email verification sent
2. User verifies email → Account activated
3. User logs in → Access + Refresh tokens generated
4. Access token expires → Use refresh token to get new access token
5. Protected routes → Middleware validates JWT from cookie/header
```

### **Middleware: `middleware/auth.js`**
- Extracts token from `req.cookies.accessToken` or `Authorization` header
- Verifies JWT with `SECRET_KEY_ACCESS_TOKEN`
- Fetches user credentials from DB
- Attaches to `req.user`: `{ id, credentialid }`

### **Protected Route Pattern**
```javascript
router.get('/endpoint', auth, controllerFunction);
```

---

## 🌐 API Endpoints

### **Base URL**: `http://localhost:8080` (default)

### **1. Authentication Routes** (`/auth/*`)
- `GET /auth/is-authenticated` - Validate current token (no auth required)

### **2. User Routes** (`/user/*`)
- `POST /user/register` - Register new user
- `POST /user/verify-email` - Verify email with code
- `POST /user/login` - Login and get tokens
- `GET /user/logout` - Logout (requires auth)
- `GET /user/user-details` - Get current user profile (requires auth)
- `PUT /user/upload-avatar` - Upload profile picture (requires auth, multipart/form-data)
- `PUT /user/update-user` - Update user details (requires auth)
- `PUT /user/forgot-password` - Request password reset OTP
- `PUT /user/verify-forgot-password-otp` - Verify OTP
- `PUT /user/reset-password` - Reset password with new password
- `POST /user/refresh-token` - Get new access token

### **3. Credential Routes** (`/credential/*`)
- `POST /credential/create` - Add WhatsApp Business credentials (requires auth)
- `GET /credential/get` - Get user's WhatsApp credentials (requires auth)
- `POST /credential/phone` - Add phone number to credential (requires auth)
- `GET /credential/phone` - Get user's phone numbers (requires auth)

### **4. Template Routes** (`/template/*`)
- `POST /template/invoice-template` - Create invoice template (requires auth)
- `GET /template/invoice-template` - Get all templates (requires auth)

### **5. Invoice Routes** (`/invoice/*`)
- `POST /invoice` - Create and send invoice (requires auth, multipart/form-data with 'file')
- `GET /invoice` - Get all invoices for user (requires auth)
- `GET /invoice/:id` - Get single invoice by ID (requires auth)

### **6. Media Routes** (`/media/*`)
- `POST /media/meta-upload` - Upload file to Meta Graph API, returns header handle (multipart/form-data with 'file')

### **7. Webhook Routes** (`/webhook/*`)
- `GET /webhook` - Meta webhook verification (query: `hub.mode`, `hub.verify_token`, `hub.challenge`)
- `POST /webhook` - Receive webhook events from Meta (logs to `logs/webhook.log`)

---

## 🔄 Data Flow Examples

### **1. User Registration Flow**
```
Client → POST /user/register
  → userController.registerUserController()
    → Hash password (bcrypt)
    → Insert into users table
    → Send verification email (Resend API)
    → Return user ID
```

### **2. **Sending Invoice Flow**
```
Client → POST /invoice (with PDF file)
  → auth middleware validates JWT
  → invoiceController.newInvoice()
    → Multer saves PDF to /uploads
    → invoiceModel.create() inserts into DB
    → (TODO: whatsappService.sendInvoice() - not implemented)
    → Return invoice ID
```

### **3. **Creating WhatsApp Template Flow**
```
Client → POST /template/invoice-template
  → auth middleware validates JWT
  → templateController.createTemplate()
    → templateModel.create() saves to DB
    → whatsappService.createTemplate() calls Meta Graph API
    → Return success
```

---

## 🔌 External Integrations

### **1. WhatsApp Business Graph API**
**Service**: `services/whatsappService.js`

**Endpoints Used**:
- `GET /{businessAccountId}/phone_numbers` - Get phone numbers
- `POST /{businessAccountId}/message_templates` - Create template
- `GET /{wabaId}/message_templates` - List templates
- `POST /{phoneNumberId}/messages` - Send message/template
- `POST /{appId}/uploads` - Upload media to Meta

**API Versions**: Mixed (v15.0, v18.0, v22.0, v23.0) - **Inconsistency noted**

**Authentication**: Bearer token from `WABA_ACCESS_TOKEN` env var

### **2. Resend Email Service**
**Service**: `config/sendEmail.js`
- Sends verification emails and password reset emails
- Uses `RESEND_API` env var

### **3. Cloudinary**
**Service**: `utils/uploadImageClodinary.js`
- Uploads user avatars
- Returns public URL

---

## 🔧 Environment Variables

**Required `.env` file**:
```env
# Server
PORT=8080
NODE_ENV=development|production
FRONTEND_URL=http://localhost:3000

# Database
DATABASE_NAME=WABMAAS_DATABASE
DATABASE_HOST=localhost
DATABASE_USER=root
DATABASE_PASSWORD=your_password

# JWT Secrets
SECRET_KEY_ACCESS_TOKEN=your_secret_key
SECRET_KEY_REFRESH_TOKEN=your_refresh_secret_key

# WhatsApp Business API
WABA_ACCESS_TOKEN=your_whatsapp_access_token
WABA_APP_ID=your_app_id

# Email Service
RESEND_API=your_resend_api_key

# Cloudinary (for avatars)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 🚨 Known Issues & TODOs

### **Security Issues**
1. **Hardcoded verify token**: `webhookController.js` has `VERIFY_TOKEN = "YOUR_VERIFY_TOKEN"` (should be env var)
2. **Permissive CORS**: `app.js` allows `'*'` origin (security risk)
3. **No rate limiting**: API endpoints are unprotected from abuse
4. **No input validation**: Missing validation library (Joi/Zod)
5. **SQL injection risk**: Some queries use string concatenation (though most use parameterized queries)

### **Code Quality Issues**
1. **Mixed API versions**: WhatsApp Graph API uses v15, v18, v22, v23 inconsistently
2. **Callback/Promise mix**: `userModel.js` uses callbacks, others use Promises
3. **Commented code**: Error middleware commented out in `app.js`
4. **Duplicate files**: `mediaRoute.js` and `mediaRoutes.js` exist
5. **Incomplete Admin middleware**: `middleware/Admin.js` references undefined `db` and `UserModel`
6. **Synchronous file operations**: `fs.readFileSync` in request handlers

### **Functionality Gaps**
1. **Invoice sending not implemented**: `invoiceController.js` has TODO for `whatsappService.sendInvoice()`
2. **24-hour window not managed**: `whatsappService.js` TODO for managing conversation window
3. **Template approval status**: Not integrated with Meta's approval workflow
4. **Error handling**: Global error middleware is commented out
5. **No logging library**: Uses `console.log` instead of structured logging

### **Database Issues**
1. **Column name mismatch**: `invoiceModel.getInvoiceById` uses `userId` but schema has `user_id`
2. **Missing indexes**: No indexes on frequently queried fields (email, user_id)

---

## 📊 Request/Response Patterns

### **Standard Success Response**
```json
{
  "message": "Success message",
  "error": false,
  "success": true,
  "data": { ... }
}
```

### **Standard Error Response**
```json
{
  "message": "Error message",
  "error": true,
  "success": false
}
```

### **Authentication Headers**
- **Cookie-based**: `Cookie: accessToken=...; refreshToken=...`
- **Header-based**: `Authorization: Bearer <accessToken>`

---

## 🔄 Key Business Logic

### **User Management**
- Email verification required before account activation
- Password reset via OTP (60-minute expiry)
- Avatar uploads to Cloudinary
- Role-based access (ADMIN/USER) - partially implemented

### **WhatsApp Integration**
- Users link their WhatsApp Business Account via credentials
- Templates are created locally AND synced to Meta
- Phone numbers are stored per user for multi-number support
- Webhooks log all events to `logs/webhook.log`

### **Invoice System**
- PDFs stored locally in `/uploads`
- Invoice metadata stored in database
- Status tracking (pending/sent/failed)
- **Note**: Actual WhatsApp sending not yet implemented

---

## 🧪 Testing & Development

### **Scripts**
```bash
npm start          # Production mode
npm run dev        # Development with nodemon
npm run seedInvoice # Seed invoice data
```

### **Database Setup**
1. Run `schema/create-tables.sql` to create database and tables
2. Optionally run `schema/seedAdmin.js` to create admin user

---

## 📝 Code Style Notes

- **ES6 Modules**: All files use `import`/`export`
- **Async/Await**: Controllers use async/await (except `userModel.js` callbacks)
- **Error Handling**: Try/catch blocks in controllers, errors logged to console
- **Naming**: camelCase for variables, PascalCase for models
- **File Naming**: kebab-case for routes, camelCase for others

---

## 🔗 Key File Relationships

```
server.js
  └→ app.js
      ├→ routes/*.js
      │   └→ controllers/*.js
      │       ├→ models/*.js
      │       │   └→ config/database.js
      │       └→ services/whatsappService.js
      └→ middleware/auth.js
          └→ models/credentialModel.js
```

---

## 🎯 Core Functionality Summary

1. **User Authentication**: Register, login, JWT tokens, email verification, password reset
2. **WhatsApp Credentials**: Store and retrieve Business API credentials per user
3. **Template Management**: Create WhatsApp message templates, sync with Meta
4. **Invoice Management**: Upload PDFs, store metadata, (sending not implemented)
5. **Webhook Handling**: Receive and log Meta webhook events
6. **File Uploads**: PDF invoices (Multer), avatar images (Cloudinary)

---

## 🚀 Deployment Considerations

- **Port**: Configurable via `PORT` env var (default: 8080)
- **Database**: MySQL required, connection in `config/database.js`
- **File Storage**: `/uploads` directory for PDFs (ensure write permissions)
- **Logs**: `/logs` directory for webhook logs
- **CORS**: Currently allows all origins (should be restricted in production)
- **HTTPS**: Required for secure cookies (`secure: true` in cookie settings)

---

## 📚 Additional Context

- **Project Type**: MVP/Production-ready hybrid
- **Code Quality**: Functional but needs refactoring for production
- **Scalability**: Single-instance design, no clustering/load balancing
- **Monitoring**: No APM or structured logging
- **Documentation**: Minimal inline comments, no API docs (Swagger/OpenAPI)

---

**Last Updated**: Generated for AI codebase understanding  
**Version**: 1.0.0  
**Maintainer**: See package.json

