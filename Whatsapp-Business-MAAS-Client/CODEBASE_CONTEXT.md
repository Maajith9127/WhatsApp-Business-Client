# WhatsApp Business MaaS Client - Complete Codebase Context

## 📋 Project Overview

This is a **React-based frontend application** for a WhatsApp Business Multi-Agent as a Service (MaaS) platform. The application enables businesses to:
- Create and manage WhatsApp message templates
- Send invoices via WhatsApp
- View analytics and dashboard metrics
- Manage user profiles and business credentials
- Track template approval statuses

**Project Type**: Frontend-only MVP (no backend code included)
**Current Status**: Semi-professional MVP (6.5/10 quality rating)
**Estimated Value**: $5,000 - $12,000 for handover

---

## 🛠️ Tech Stack

### Core Framework
- **React**: v19.1.0 (latest)
- **Vite**: v6.3.5 (build tool)
- **React Router DOM**: v7.6.0 (routing)

### State Management
- **Redux Toolkit**: v2.8.2 (global state)
- **React Context API**: (authentication state)

### UI Libraries
- **Tailwind CSS**: v4.1.7 (utility-first styling)
- **Material-UI (MUI)**: v7.1.0 (component library)
- **Framer Motion**: v12.18.1 (animations)
- **Lucide React**: v0.511.0 (icons)
- **React Icons**: v5.5.0 (icon library)

### HTTP Client
- **Axios**: v1.9.0 (API requests with interceptors)

### Additional Libraries
- **React Toastify**: v11.0.5 (notifications)
- **Recharts**: v2.15.3 (data visualization)
- **React Day Picker**: v9.7.0 (calendar component)
- **@react-pdf/renderer**: v4.3.0 (PDF generation)

### Development Tools
- **ESLint**: v9.25.0 (code linting)
- **TypeScript Types**: (for React/React-DOM)

---

## 🏗️ Architecture & Structure

### Project Structure
```
src/
├── __tests__/              # Test files (currently empty)
├── assets/                 # Static assets (images, SVGs)
├── components/             # Shared/reusable components
│   └── modal/
│       └── TemplateModal.jsx
├── constants/              # App constants (empty)
├── context/                  # React Context providers
│   └── AuthContext.jsx    # Authentication state management
├── features/               # Feature-based modules
│   ├── auth/              # Authentication flows
│   ├── dashboard/         # Dashboard components
│   ├── invoices/          # Invoice management
│   ├── layout/            # Layout components (Sidebar, MainLayout)
│   ├── messageAnalytics/  # Analytics views
│   ├── settings/          # User settings pages
│   └── templates/         # Template builder & stats
├── hooks/                 # Custom React hooks
│   └── useUserDetails.js  # User data fetching hook
├── ReduxStates/           # Redux store & slices
│   ├── slices/            # Redux slices
│   └── store.jsx          # Store configuration
├── services/              # API service layer
│   ├── authService.js     # Authentication API calls
│   ├── axiosInstance.js   # Axios instance with interceptors
│   ├── credentialService.js # WhatsApp credentials API
│   ├── invoiceService.js  # Invoice API calls
│   ├── templateService.js # Template API calls
│   └── userService.js     # User profile API calls
└── utils/                 # Utility functions (empty)
```

### Design Patterns
- **Feature-based folder structure**: Each major feature has its own directory
- **Service layer pattern**: API calls abstracted into service files
- **Container/Presentational**: Mix of container and presentational components
- **Custom hooks**: Reusable logic extracted into hooks

---

## 🔐 Authentication System

### Flow Overview
1. **Initial Load**: `AuthContext` checks authentication via `/auth/is-authenticated`
2. **Login**: User submits credentials → `authService.login()` → Sets HTTP-only cookies → Updates context
3. **Token Refresh**: Axios interceptor catches 401 → Calls `/user/refresh-token` → Retries original request
4. **Logout**: Clears localStorage + calls `/user/logout` → Resets context

### Key Files
- **`src/context/AuthContext.jsx`**: 
  - Manages authentication state (isAuthenticated, user, loading, error)
  - Provides `login()` and `logout()` functions
  - Auto-validates on mount via `/auth/is-authenticated` endpoint
  
- **`src/services/authService.js`**:
  - `register()`: POST `/user/register`
  - `login()`: POST `/user/login` (sets cookies)
  - `verifyEmail()`: POST `/user/verify-email`
  - `getUserDetails()`: GET `/user/user-details`
  - `logout()`: GET `/user/logout`
  - `refreshToken()`: POST `/user/refresh-token` (uses clean axios instance to avoid interceptor loops)

### Authentication Routes
- **Public Routes**: `/`, `/verify-email`, `/forgot-password`
- **Protected Routes**: All routes under `/dashboard/*`, `/profile-setting`, `/send-invoices`
- **Route Guard**: `App.jsx` checks `isAuthenticated` from context

### Token Management
- **Storage**: HTTP-only cookies (not localStorage)
- **Refresh Strategy**: Automatic via axios interceptor
- **Interceptor Location**: `src/services/axiosInstance.js`

---

## 🌐 API Integration

### Base Configuration
- **Base URL**: `import.meta.env.VITE_API_BASE_URL` (environment variable)
- **Credentials**: `withCredentials: true` (sends cookies automatically)
- **Instance**: `src/services/axiosInstance.js`

### API Endpoints Used

#### Authentication (`/user/*`)
- `POST /user/register` - User registration
- `POST /user/login` - User login (sets cookies)
- `POST /user/verify-email` - Email verification
- `GET /user/user-details` - Get current user info
- `GET /user/logout` - Logout user
- `POST /user/refresh-token` - Refresh access token
- `PUT /user/update-user` - Update user profile
- `PUT /user/upload-avatar` - Upload profile picture

#### Authentication Check (`/auth/*`)
- `GET /auth/is-authenticated` - Validate current session

#### Invoices (`/invoice/*`)
- `POST /invoice` - Create new invoice (multipart/form-data with PDF)
- `GET /invoice` - Get all invoices for logged-in user
- `GET /invoice/:id` - Get single invoice by ID

#### Templates (`/template/*`)
- `GET /template/invoice-template` - Fetch all templates (with optional status filter)

#### Credentials (`/credential/*`)
- `GET /credential/get` - Get WhatsApp Business credentials
- `GET /credential/phone` - Get registered phone numbers
- `POST /credential/create` - Create/update credentials

### Axios Interceptor
Located in `src/services/axiosInstance.js`:
- **Response Interceptor**: Catches 401 errors
- **Auto-refresh**: Attempts token refresh on 401
- **Retry Logic**: Retries original request after refresh
- **Error Handling**: Rejects promise if refresh fails

---

## 📦 State Management (Redux)

### Store Configuration
**File**: `src/ReduxStates/store.jsx`

**Reducers**:
- `customer`: Customer selection and data
- `invoices`: Invoice list and filtering
- `templateStats`: Template list and status filtering
- `globalError`: Global error state

### Redux Slices

#### 1. Customer Slice (`customerSlice.jsx`)
**State**:
```javascript
{
  selectedCustomerId: "",
  customerData: { name, phone, email, address },
  customerList: [],
  loading: false,
  error: null
}
```
**Actions**:
- `selectCustomer(id)` - Select a customer
- `updateCustomerField({ field, value })` - Update customer form field
- `setCustomerData(data)` - Set full customer object
- `resetCustomer()` - Clear customer selection
- `fetchCustomers()` - Async thunk (currently uses dummy data)

**Note**: Currently uses hardcoded dummy customer list (10 customers). Backend integration pending.

#### 2. Invoice Slice (`invoiceSlice.jsx`)
**State**:
```javascript
{
  items: [],
  filteredItems: [],
  loading: false,
  error: null,
  filterSettings: {
    status: 'all',
    startDate: '',
    endDate: ''
  }
}
```
**Actions**:
- `setFilter(status)` - Set status filter
- `fetchInvoices(filterSettings)` - Async thunk that:
  - Calls `fetchInvoicesAPI()` from `invoiceService.js`
  - Filters by status, startDate, endDate on frontend

#### 3. Template Stats Slice (`templateStatsSlice.jsx`)
**State**:
```javascript
{
  items: [],
  loading: false,
  error: null,
  filterStatus: 'all' // Options: all, approved, pending, rejected
}
```
**Actions**:
- `setTemplateFilter(status)` - Set filter status
- `fetchTemplates(filterStatus)` - Async thunk that:
  - Calls `fetchTemplatesFromServer()` from `templateService.js`
  - Transforms backend format to frontend format
  - Filters by status on frontend

**Backend Format → Frontend Format**:
- Backend: `{ id, name, status, category, components: [{ type, format, text }] }`
- Frontend: `{ id, templateName, status, category, headerFormat, headerText, templateBody, footerText }`

#### 4. Global Error Slice (`globalErrorSlice.jsx`)
**State**: `null` or error object
**Actions**:
- `setError(error)` - Set global error
- `clearError()` - Clear error

---

## 🎨 Component Architecture

### Layout Components

#### MainLayout (`features/layout/MainLayout.jsx`)
- Wraps protected routes
- Provides sidebar + main content area
- Uses `<Outlet />` for nested routes
- Layout: 17% sidebar + 83% content

#### SideBar (`features/layout/SideBar.jsx`)
- Navigation menu with active state highlighting
- Menu items:
  - Dashboard (`/DashBoard`)
  - Send Invoices (`/send-invoices`)
  - Message History (`/MessageHistory` - route not implemented)
  - Profile Settings (`/profile-setting`)
- Logout button (calls `useAuth().logout()`)
- "Upgrade to Pro" button (UI only)

### Feature Components

#### Authentication (`features/auth/`)
- **Auth.jsx**: Main auth container (Login/Registration toggle)
- **Login.jsx**: Login form (MUI components)
- **Registration.jsx**: Registration form
- **Forgot_password.jsx**: Password reset flow
- **verifyemail.jsx**: Email verification page

#### Dashboard (`features/dashboard/`)
- **DashBoard.jsx**: Main dashboard container
  - Grid layout with multiple cards
  - Components: MessageAnalyticsCard, BusinessNumbers, RunCampaign, CreateTemplates, GraphVisuals, TopSendersCard, TopTemplatesCard, CalendarCard
- **MessageAnalyticsCard.jsx**: Analytics metrics display
- **BusinessNumbers.jsx**: Business phone numbers display
- **RunCampaign.jsx**: Campaign management UI
- **CreateTemplates.jsx**: Quick template creation link
- **GraphVisuals.jsx**: Charts/graphs (Recharts)
- **TopSenderCard.jsx**: Top senders list
- **TopTemplatesCard.jsx**: Top templates list
- **Calendar.jsx**: Calendar widget

#### Templates (`features/templates/`)
- **TemplateBuilder.jsx**: Main template creation interface
  - Header, Body, Footer components
  - WhatsApp preview with animations (Framer Motion)
  - Supports formats: TEXT, IMAGE, VIDEO, DOCUMENT
  - Parameter management (headerParams, bodyParams)
  - Validation before submission
  - **Note**: Currently submits to fake API endpoint
  
- **TemplatesStats.jsx**: Template list view with filters
- **TemplateStatsTable.jsx**: Table display of templates

- **Template Builder Sub-components**:
  - `HeaderComponent.jsx`: Header format selection and text/params
  - `BodyComponent.jsx`: Body text and parameter management
  - `FooterComponent.jsx`: Footer text input
  - `ErrorMessage.jsx`: Error display component
  - `WhatsAppPreview.jsx`: Preview component (separate from main builder)

#### Invoices (`features/invoices/`)
- **Invoices.jsx**: Invoice list page
- **InvoiceTable.jsx**: Table component for invoices
- **SendInvoices.jsx**: Invoice sending interface
  - Customer selector
  - Template selector
  - PDF upload
  - WhatsApp preview
  - **Note**: Send functionality is commented out (needs backend integration)

- **SendInvoicesComponents/**:
  - `CustomerSelector.jsx`: Customer dropdown/selection
  - `TemplateSelector.jsx`: Template dropdown/selection
  - `WhatsAppPreview.jsx.jsx`: Preview of message with invoice

#### Settings (`features/settings/`)
- **ProfileSetting.jsx**: Main settings container with tabs
- **Components/**:
  - `SettingsHeader.jsx`: Settings page header
  - `StatsCard.jsx`: Statistics card component
  - `SwitchToggle.jsx`: Toggle switch component
  - `TabButton.jsx`: Tab navigation button

- **Elements/** (Settings pages):
  - `ProfilePage.jsx`: User profile editing
  - `MyDetailsPage.jsx`: Personal details
  - `EmailPage.jsx`: Email settings
  - `PasswordPage.jsx`: Password change
  - `PlanPage.jsx`: Subscription plan management
  - `BillingPage.jsx`: Billing information
  - `IntegrationPage.jsx`: WhatsApp Business API integration
  - `TeamPage.jsx`: Team management
  - `NotificationSection.jsx`: Notification preferences

#### Message Analytics (`features/messageAnalytics/`)
- **MessageAnalytics.jsx**: Analytics dashboard view

---

## 🛣️ Routing

### Route Configuration
**File**: `src/App.jsx`

### Public Routes
- `/` → `<Auth />` (Login/Registration)
- `/verify-email` → `<VerifyEmail />`
- `/forgot-password` → `<Forgot_password />`

### Protected Routes (wrapped in `<MainLayout />`)
- `/dashboard` → `<DashBoard />`
- `/dashboard/message-analytics` → `<MessageAnalytics />`
- `/dashboard/message-analytics/invoices` → `<Invoices />`
- `/dashboard/message-analytics/template-stats` → `<TemplateStats />`
- `/dashboard/message-analytics/template-stats/template-submit` → `<TemplateBuilder />`
- `/profile-setting` → `<ProfileSetting />`
- `/send-invoices` → `<SendInvoices />`

### Route Protection
- Uses `useAuth()` hook to check `isAuthenticated`
- Redirects to `/` if not authenticated
- Redirects to `/Dashboard` if authenticated and accessing public routes

### Known Issues
- Route path casing inconsistency: `/DashBoard` vs `/dashboard` (may cause issues)
- ToastContainer in `App.jsx` is not rendered (line 21 is outside return statement)

---

## 🔧 Custom Hooks

### useUserDetails (`hooks/useUserDetails.js`)
**Purpose**: Fetch and manage user details, credentials, and phone numbers

**Returns**:
```javascript
{
  userDetails: {
    firstName, lastName, email, avatar, mobile,
    companyName, website,
    wabaId, phoneId, businessId, wabaToken,
    phoneNumbers: []
  },
  setUserDetails,
  loading,
  error
}
```

**API Calls**:
- `GET /user/user-details` - User basic info
- `GET /credential/get` - WhatsApp credentials
- `GET /credential/phone` - Phone numbers

**Usage**: Used in settings pages to populate user data

---

## 🎯 Key Features & Workflows

### 1. Template Creation Workflow
1. Navigate to `/dashboard/message-analytics/template-stats/template-submit`
2. Enter template name
3. Select header format (TEXT, IMAGE, VIDEO, DOCUMENT, NONE)
4. Add header text and parameters (if TEXT format)
5. Add body text and parameters
6. Add footer text (optional)
7. Click "Preview Message" to see WhatsApp preview
8. Click "Submit Template" to send to backend
9. **Current Status**: Submits to fake API endpoint (`https://fake.api/template`)

### 2. Invoice Sending Workflow
1. Navigate to `/send-invoices`
2. Select customer from dropdown (fetches from Redux `customerSlice`)
3. Select template from dropdown (fetches approved templates from Redux `templateStatsSlice`)
4. Upload PDF file
5. Preview WhatsApp message with template + customer data
6. Click "Send Invoice"
7. **Current Status**: Send functionality is commented out (needs backend integration)

### 3. Dashboard Analytics
- Displays multiple metric cards
- Shows graphs/charts (Recharts)
- Top senders and templates lists
- Calendar widget
- **Note**: Data sources not fully implemented (likely mock data)

### 4. User Settings Management
- Profile editing (name, email, mobile, avatar)
- WhatsApp Business API credentials (WABA ID, phone ID, business ID, access token)
- Password change
- Subscription plan management
- Billing information
- Team management
- Notification preferences

---

## 🔌 Environment Variables

### Required Variables
- `VITE_API_BASE_URL`: Backend API base URL (e.g., `http://localhost:8080` or `https://api.example.com`)

### Usage
- Accessed via `import.meta.env.VITE_API_BASE_URL`
- Used in `axiosInstance.js` and service files

### Setup
- Create `.env` file in root directory
- Add: `VITE_API_BASE_URL=your_backend_url`

---

## 🐛 Known Issues & Technical Debt

### Critical Issues
1. **ToastContainer not rendered** (`App.jsx` line 21):
   - `ToastContainer` is outside the return statement
   - Should be inside the JSX return

2. **Route path casing inconsistency**:
   - Some routes use `/DashBoard` (capital D)
   - Others use `/dashboard` (lowercase)
   - May cause routing issues on case-sensitive systems

3. **Console.log statements**:
   - Multiple `console.log()` calls in production code
   - Should be removed or replaced with proper logging

### Medium Priority Issues
4. **Missing error boundaries**:
   - No React error boundaries implemented
   - App will crash on unhandled errors

5. **No loading states**:
   - Some components don't show loading indicators
   - User experience could be improved

6. **Dummy data in Redux**:
   - `customerSlice` uses hardcoded dummy customers
   - Should fetch from backend API

7. **Commented-out code**:
   - `SendInvoices.jsx` has commented-out send functionality
   - `templateStatsSlice.jsx` has large commented-out dummy data section

8. **Fake API endpoints**:
   - `TemplateBuilder.jsx` submits to `https://fake.api/template`
   - Needs real backend integration

### Low Priority / Code Quality
9. **Inconsistent naming**:
   - `Forgot_password.jsx` (snake_case) vs `VerifyEmail.jsx` (PascalCase)
   - Should standardize to PascalCase

10. **File naming inconsistency**:
    - `WhatsAppPreview.jsx.jsx` (double extension)
    - Should be `WhatsAppPreview.jsx`

11. **No TypeScript**:
    - Entire codebase is JavaScript
    - Type safety would improve maintainability

12. **Limited test coverage**:
    - `__tests__` directory exists but is empty
    - No unit or integration tests

13. **No documentation**:
    - README.md is default Vite template
    - No API documentation or component docs

---

## 📝 Code Quality Assessment

### Strengths
✅ Modern React patterns (hooks, context, Redux Toolkit)
✅ Clean feature-based folder structure
✅ Service layer abstraction for API calls
✅ Axios interceptors for token refresh
✅ Responsive design with Tailwind CSS
✅ Component reusability (some shared components)

### Weaknesses
❌ No error boundaries
❌ Limited error handling in some components
❌ Console.log statements in production code
❌ Inconsistent naming conventions
❌ No TypeScript for type safety
❌ No tests
❌ Some incomplete features (commented code)
❌ Dummy data instead of real API calls in some places

### Overall Rating: 6.5/10
- **Professional enough** for MVP/demo purposes
- **Not production-ready** without addressing critical issues
- **Good foundation** that can be improved

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Starts Vite dev server (typically on `http://localhost:5173`)

### Build
```bash
npm run build
```
Creates production build in `dist/` directory

### Lint
```bash
npm run lint
```
Runs ESLint on codebase

### Environment Setup
1. Create `.env` file in root
2. Add: `VITE_API_BASE_URL=your_backend_url`
3. Restart dev server

---

## 🔄 Data Flow Examples

### Authentication Flow
```
User enters credentials
  → Login.jsx calls useAuth().login()
  → AuthContext.login() calls authService.login()
  → POST /user/login (sets HTTP-only cookies)
  → AuthContext updates state (isAuthenticated: true)
  → Navigate to /dashboard
```

### Template Fetching Flow
```
Component mounts
  → dispatch(fetchTemplates('approved'))
  → templateStatsSlice fetchTemplates thunk
  → templateService.fetchTemplatesFromServer()
  → GET /template/invoice-template
  → Transform backend format to frontend format
  → Filter by status
  → Update Redux state
  → Component re-renders with data
```

### Invoice Creation Flow
```
User uploads PDF + fills form
  → SendInvoices.jsx calls invoiceService.createInvoice()
  → POST /invoice (multipart/form-data)
  → Backend processes and stores invoice
  → Response returned to frontend
  → (Currently commented out in SendInvoices.jsx)
```

---

## 🎯 Integration Points

### Backend API Expected Format

#### Template Response Format
```json
{
  "id": 1,
  "name": "template_name",
  "status": "APPROVED",
  "category": "TRANSACTIONAL",
  "components": [
    {
      "type": "HEADER",
      "format": "TEXT",
      "text": "Header text"
    },
    {
      "type": "BODY",
      "text": "Body text with {{1}} parameter"
    },
    {
      "type": "FOOTER",
      "text": "Footer text"
    }
  ]
}
```

#### Invoice Response Format
```json
{
  "id": 1,
  "invoice_number": "INV-001",
  "status": "sent",
  "created_at": "2024-01-01T00:00:00Z",
  "customer_name": "John Doe",
  "amount": 1000.00
}
```

#### User Details Response Format
```json
{
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "mobile": "+1234567890",
    "avatar": "https://..."
  }
}
```

---

## 📚 Additional Notes

### Styling Approach
- **Primary**: Tailwind CSS utility classes
- **Secondary**: Material-UI components (for forms)
- **Custom**: Some inline styles and custom CSS classes
- **Theme**: Black/white color scheme with gray accents

### Animation
- **Framer Motion**: Used in TemplateBuilder for preview animations
- **CSS**: Tailwind transition classes for hover effects

### Icons
- **React Icons**: Material Design icons (Md*)
- **Lucide React**: Additional icon set
- **MUI Icons**: Material-UI icon components

### Form Handling
- **Uncontrolled**: Most forms use local state with `useState`
- **No form library**: No Formik, React Hook Form, etc.
- **Validation**: Basic HTML5 validation + custom validation in TemplateBuilder

---

## 🔮 Future Improvements

### High Priority
1. Fix ToastContainer rendering issue
2. Implement real invoice sending functionality
3. Replace dummy customer data with API calls
4. Add error boundaries
5. Remove console.log statements
6. Standardize route paths (all lowercase)

### Medium Priority
7. Add TypeScript
8. Implement comprehensive error handling
9. Add loading states everywhere
10. Write unit tests
11. Add API documentation
12. Implement proper logging system

### Low Priority
13. Add Storybook for component documentation
14. Implement i18n for internationalization
15. Add PWA capabilities
16. Optimize bundle size
17. Add accessibility improvements (ARIA labels, keyboard navigation)

---

## 📞 Support & Handover

### For AI/Developers Taking Over
1. **Start with**: `src/App.jsx` to understand routing
2. **Then review**: `src/context/AuthContext.jsx` for auth flow
3. **Check services**: `src/services/` for API integration points
4. **Review Redux**: `src/ReduxStates/` for state management
5. **Explore features**: `src/features/` for business logic

### Key Files to Understand First
- `src/main.jsx` - App entry point
- `src/App.jsx` - Routing and auth guards
- `src/context/AuthContext.jsx` - Authentication
- `src/services/axiosInstance.js` - HTTP client setup
- `src/ReduxStates/store.jsx` - State management setup

### Common Tasks
- **Adding a new feature**: Create folder in `src/features/`, add route in `App.jsx`
- **Adding API call**: Create/update service in `src/services/`
- **Adding global state**: Create slice in `src/ReduxStates/slices/`
- **Styling**: Use Tailwind classes, MUI for complex components

---

**Last Updated**: 2025-01-01
**Codebase Version**: MVP v0.0.0
**Maintainer**: [To be filled]

