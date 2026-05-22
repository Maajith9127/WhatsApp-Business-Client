// App.jsx
import Auth from "./features/auth/Auth";
import VerifyEmail from "./features/auth/verifyemail";
import Forgot_password from "./features/auth/Forgot_password";
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from "./features/layout/MainLayout";
import DashBoard from "./features/dashboard/DashBoard";
import MessageAnalytics from "./features/messageAnalytics/MessageAnalytics";
import Invoices from "./features/invoices/Invoices";
import TemplateStats from "./features/templates/TemplatesStats";
import TemplateBuilder from "./features/templates/TemplateBuilder/TemplateBuilder";
import SendInvoices from "./features/invoices/SendInvoices";
import ProfileSetting from "./features/settings/ProfileSetting";
import { useAuth } from "./context/AuthContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  <ToastContainer position="top-center" autoClose={3000} />

  const { isAuthenticated, loading } = useAuth();
  console.log(isAuthenticated)

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to="/Dashboard" replace /> : <Auth />}
      />
      <Route
        path="/verify-email"
        element={isAuthenticated ? <Navigate to="/Dashboard" replace /> : <VerifyEmail />}
      />
      <Route
        path="/forgot-password"
        element={isAuthenticated ? <Navigate to="/Dashboard" replace /> : <Forgot_password />}
      />

      {/* Protected routes */}
      {isAuthenticated ? (
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/dashboard/message-analytics" element={<MessageAnalytics />} />
          <Route path="/dashboard/message-analytics/invoices" element={<Invoices />} />
          <Route path="/dashboard/message-analytics/template-stats" element={<TemplateStats />} />
          <Route path="/dashboard/message-analytics/template-stats/template-submit" element={<TemplateBuilder />} />
          <Route path="/profile-setting" element={<ProfileSetting />} />
          <Route path="/send-invoices" element={<SendInvoices />} />
        </Route>
      ) : (
        // Redirect any protected route to login
        <Route path="*" element={<Navigate to="/" replace />} />
      )}
    </Routes>
  );
}

export default App;