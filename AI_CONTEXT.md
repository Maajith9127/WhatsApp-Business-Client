## WhatsApp Business MAAS – AI Context Pack

This document consolidates the essential architecture, APIs, data models, environment variables, and workflows needed for an AI agent to contribute effectively to this project.

### Monorepo Structure
- `Whatsapp-Business-MAAS-Client/`: React (Vite) frontend with Tailwind and Redux Toolkit
- `Whatsapp-Business-MAAS-Server/Whatsapp-Business-MAAS-Server/`: Node.js (Express) backend with MySQL

### Tech Stack
- Backend: Node.js, Express, mysql2 (promise), JWT, Multer, CORS, Cookie-Parser, Body-Parser, Dotenv
- Frontend: React, Vite, TailwindCSS, Redux Toolkit, Axios (with interceptors), React-Toastify
- Database: MySQL
- Integrations: Meta WhatsApp Business Cloud API

### Environment Variables
- Backend
  - `PORT` (default 8080)
  - `FRONTEND_URL` (CORS + email verification link base)
  - `DATABASE_NAME`, `DATABASE_HOST`, `DATABASE_USER`, `DATABASE_PASSWORD`
  - `SECRET_KEY_ACCESS_TOKEN`, `SECRET_KEY_REFRESH_TOKEN`
  - `WABA_ACCESS_TOKEN` (WhatsApp Cloud API)
  - `WABA_APP_ID` (for uploads API)
  - Consider adding: `WEBHOOK_VERIFY_TOKEN` (currently hardcoded)
- Frontend
  - `VITE_API_BASE_URL` (e.g., `http://localhost:8080`)

## Backend

### Entry Points
- `server.js`: starts Express on `PORT`. DB connect currently happens in `config/database.js` import side-effect.
- `app.js`: Express app configuration
  - Serves static public and `/uploads`
  - CORS allowed origins: `FRONTEND_URL` and `*` (consider restricting in production)
  - JSON parsing, cookies, urlencoded body
  - Mounts routes:
    - `/auth` → `routes/authRoute.js`
    - `/invoice` → `routes/invoiceRoute.js`
    - `/user` → `routes/userRoute.js`
    - `/credential` → `routes/credentialRoute.js`
    - `/template` → `routes/templateRoute.js`
    - `/media` → `routes/mediaRoute.js`
    - `/webhook` → `routes/webhookRoute.js`

### Auth
- JWT Access/Refresh tokens
- Tokens are set as httpOnly, secure, SameSite=None cookies on login
- Middleware `middleware/auth.js`
  - Reads `accessToken` from cookies or `Authorization: Bearer`
  - Verifies using `SECRET_KEY_ACCESS_TOKEN`
  - Attaches `request.user = { id, credentialid }` using credential lookup
- `controllers/authController.js:isAuthenticated` route validates token

### Database
- `config/database.js` creates a mysql2 connection pool (promise) using envs
- Schema in `schema/create-tables.sql`
  - `users`: account, auth, role, status, timestamps
  - `invoices`: user-owned invoice records with status and PDF URL
  - `templates`: user-owned WhatsApp templates metadata (JSON components)
  - `whatsappCredentials`: per-user WhatsApp tokens/IDs
  - `user_phone_numbers`: per-user phone numbers and phone_number_id

### Core Models (selected)
- `models/userModel.js`
  - Basic create/read helpers for `users`
- `models/invoiceModel.js`
  - `create({ user_id, name, customer_phone, business_phone, invoice_number, invoicePdfUrl, message })`
  - `getAllInvoices(user_id)`
  - `getInvoiceById(id, userId)`
- `models/credentialModel.js`
  - `create({ userId, whatsappAccessToken, whatsappBusinessId, businessName })`
  - `getAllCredentials()`
  - `getCredentialsById(userId)`
  - `addPhoneNumber({ userId, phoneNumber })`
  - `getPhoneNumber(userId)`
- `models/templateModel.js` (named `templateMessageModel.js` in file)
  - `create({ user_id, name, category, language, components, parameters })`
  - `getAllTemplates(user_id)`
  - `getTemplateById(id, user_id)`

### Routes and Controllers
- `routes/userRoute.js`
  - POST `/user/register` → `registerUserController`
  - POST `/user/verify-email` → `verifyEmailController`
  - POST `/user/login` → `loginController`
  - GET `/user/logout` (auth) → `logoutController`
  - PUT `/user/upload-avatar` (auth, multer single `avatar`) → `uploadAvatar`
  - PUT `/user/update-user` (auth) → `updateUserDetails`
  - GET `/user/user-details` (auth) → `userDetails`
  - PUT `/user/forgot-password` → `forgotPasswordController`
  - PUT `/user/verify-forgot-password-otp` → `verifyForgotPasswordOtp`
  - PUT `/user/reset-password` → `resetpassword`
  - POST `/user/refresh-token` → `refreshToken`

- `routes/invoiceRoute.js` (uses global `auth`)
  - POST `/invoice` (multer single `file`) → `newInvoice`
  - GET `/invoice` → `getAllInvoices`
  - GET `/invoice/:id` → `getInvoice`

- `routes/templateRoute.js`
  - GET `/template/invoice-template` (auth) → `getAllTemplates`
  - POST `/template/invoice-template` (auth) → `createTemplate`

- `routes/credentialRoute.js`
  - POST `/credential/create` (auth) → `addCredential`
  - GET `/credential/get` (auth) → `getCredential`
  - POST/GET `/credential/phone` (auth) → `addPhoneNumber` / `getPhoneNumber`

- `routes/mediaRoute.js`
  - POST `/media/meta-upload` (multer single `file`) → `whatsappService.uploadToMetaGraph`

- `routes/webhookRoute.js`
  - GET `/webhook` → `verifyWebhook` (uses fixed VERIFY_TOKEN)
  - POST `/webhook` → `handleWebhook` (append payload to `logs/webhook.log`)

### WhatsApp Integration (`services/whatsappService.js`)
- `getPhoneNumbers(businessAccountId)`
- `sendInvoice(businessPhoneNumberId, recipientNumber)` (template-based)
- `sendMessage(businessPhoneNumberId, recipientNumber, message)` (session text)
- `createTemplate(businessAccountId, accessToken, templateData)`
- `getAllTemplates(wabaId)` (paginated 100)
- `uploadToMetaGraph(req, res)` (2-step upload API; returns file handle)

### File Uploads
- `config/multer.js`
  - Destination: `../uploads` with timestamped filename
  - Accepts only PDFs by default (invoice upload path)
  - Limit: 10MB

### Email
- `config/sendEmail.js` (not expanded here) used by user controllers for verification/forgot-password
- Email HTML templates: `utils/verifyEmailTemplate.js`, `utils/forgotPasswordTemplate.js`

### Notable Behaviors & Constraints
- Cookies used for tokens; client Axios uses `withCredentials: true`
- CORS allows `FRONTEND_URL` and `*`; consider restricting
- Webhook verification token is hardcoded; move to env for production
- Many controllers assume `request.user.id` set by auth middleware

### Known Gaps / Issues to Watch
- `controllers/templateController.js` mixes names (`createInvoiceTemplate`, `createTemplate`) and uses helper functions `getBusinessAccountId/getAccessToken` that are not defined in file. Align with credentials model or inject via `request.user.credentialid` and fetch.
- `controllers/invoiceController.js` references `user_id` in payload but constructs from `userId`; ensure variable exists when calling `invoiceModel.create`.
- `models/invoiceModel.getInvoiceById` uses `userId` column name instead of `user_id` in SQL.
- `middleware/Admin.js` references `db` and `user.model.js` inconsistently; appears unused and broken.
- `controllers/webhookController.js` `VERIFY_TOKEN` should be env-configured.

## Frontend

### App Setup
- Vite React app with Tailwind (`tailwind.config.js`) and entry `src/main.jsx`
- Global auth context in `src/context/AuthContext.jsx` manages login/logout and initial auth check via `/auth/is-authenticated`

### State Management (Redux)
- Store: `src/ReduxStates/store.jsx`
  - Slices: `customerSlice`, `invoiceSlice`, `templateStatsSlice`, `globalErrorSlice`
- `invoiceSlice` exposes `fetchInvoices` async thunk, filters by status/date client-side after fetch

### Services (API clients)
- `src/services/axiosInstance.js`
  - Base URL from `VITE_API_BASE_URL`
  - `withCredentials: true`
  - Response interceptor: on 401 once, calls `refreshToken()` then retries
- `src/services/authService.js`
  - `register`, `login`, `verifyEmail`, `getUserDetails`, `logout`, `refreshToken`
- `src/services/userService.js`
  - `getUserDetails`, `updateUserDetails`, `uploadAvatar`
- `src/services/invoiceService.js`
  - `createInvoice(formData)` (multipart with `file`), `fetchInvoices()`, `fetchInvoiceById(id)`
- `src/services/templateService.js`
  - `fetchTemplatesFromServer(status)` → `/template/invoice-template`

### Auth Flow (Client)
- On app load: `AuthContext` calls `GET /auth/is-authenticated`. If valid, marks `isAuthenticated=true`.
- Login: `POST /user/login` sets httpOnly cookies; then context marks authenticated.
- Protected calls: Axios includes cookies; on 401, refresh via `POST /user/refresh-token` and retry.
- Logout: `GET /user/logout`, clears cookies server-side and resets context.

## Local Development

### Prerequisites
- Node.js LTS, MySQL server, WhatsApp Cloud API credentials if testing integrations

### Setup Steps
1) Backend
   - Copy `.env.example` to `.env` (create if missing) with keys listed above
   - Create database and tables using `schema/create-tables.sql`
   - From `Whatsapp-Business-MAAS-Server/Whatsapp-Business-MAAS-Server`: `npm install` then `npm run start` (or `node server.js`)
2) Frontend
   - From `Whatsapp-Business-MAAS-Client`: `npm install` then `npm run dev`
   - Set `VITE_API_BASE_URL` to backend URL (e.g., `http://localhost:8080`)

### Key Endpoints (quick reference)
- Auth/User
  - `POST /user/register`
  - `POST /user/login`
  - `GET /user/logout` (auth)
  - `GET /user/user-details` (auth)
  - `PUT /user/update-user` (auth)
  - `PUT /user/upload-avatar` (auth, multipart field `avatar`)
  - `PUT /user/forgot-password`, `PUT /user/verify-forgot-password-otp`, `PUT /user/reset-password`
  - `POST /user/refresh-token`
  - `GET /auth/is-authenticated`
- Invoices (auth)
  - `POST /invoice` (multipart field `file`)
  - `GET /invoice`
  - `GET /invoice/:id`
- Templates (auth)
  - `GET /template/invoice-template`
  - `POST /template/invoice-template`
- Credentials (auth)
  - `POST /credential/create`, `GET /credential/get`
  - `POST /credential/phone`, `GET /credential/phone`
- Media (auth)
  - `POST /media/meta-upload` (multipart field `file`) → returns Meta file handle
- Webhook
  - `GET /webhook` (verify), `POST /webhook` (ingest)

## Implementation Notes for AI Contributors
- Respect the promise-based mysql2 API; many models already `await db.query(...)` returning `[rows]`
- Validate required fields and return consistent JSON `{ message, error, success, data? }`
- Use `auth` middleware for protected routes; rely on `request.user.id`
- When integrating WhatsApp API, ensure numbers are E.164 format and handle 24-hour session policy
- Prefer moving secrets/tokens from code to envs; avoid `*` in CORS for production
- Fix the known gaps listed above early to stabilize flows

## Quick Fix Backlog (suggested)
1) Align `invoiceModel.getInvoiceById` SQL to use `user_id`
2) Fix `invoiceController.newInvoice` to pass `user_id` not `userId` variable into model create
3) Refactor `templateController` to fetch credentials via `credentialModel.getCredentialsById(request.user.id)` and remove undefined helpers; consolidate create method names
4) Move webhook `VERIFY_TOKEN` to `process.env.WEBHOOK_VERIFY_TOKEN`
5) Remove or fix unused `middleware/Admin.js`
6) Restrict CORS origins to `FRONTEND_URL` only



