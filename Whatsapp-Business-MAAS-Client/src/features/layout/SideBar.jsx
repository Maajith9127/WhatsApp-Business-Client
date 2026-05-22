import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MdDashboard, MdSend, MdHistory, MdSettings, MdLogout } from 'react-icons/md';
import { IoLogoWhatsapp } from 'react-icons/io5';
import { RocketIcon } from 'lucide-react'; // Optional SVG
import { useAuth } from '../../context/AuthContext';
import axiosInstance from '../../services/axiosInstance';

const menuItems = [
  { label: "Dashboard", path: "/DashBoard", icon: <MdDashboard size={20} /> },
  { label: "Send Invoices", path: "/send-invoices", icon: <MdSend size={20} /> },
  { label: "Message History", path: "/MessageHistory", icon: <MdHistory size={20} /> },
  { label: "Profile Settings", path: "/profile-setting", icon: <MdSettings size={20} /> },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth(); // get the context's logout

  const handleLogout = async () => {
    try {
      logout();              // clear frontend auth context
      navigate('/');         // go to login page
    } catch (error) {
      console.error('Logout failed:', error?.response?.data?.message || error.message);
    }
  };


  return (
    <aside className="w-64 h-screen bg-white border-r flex flex-col justify-between p-6">
      {/* Logo */}
      <div>
        <div className="flex items-center gap-3 text-xl font-bold text-gray-900 mb-8">
          <IoLogoWhatsapp className="text-black text-2xl" size={60} />
          Whats App
        </div>

        {/* Menu section */}
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Menu</p>
          <nav className="flex flex-col gap-2">
            {menuItems.map(({ label, path, icon }) => {
              const isActive = location.pathname === path;
              return (
                <div
                  key={path}
                  onClick={() => navigate(path)}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition-all
                    ${isActive
                      ? "bg-gray-200 text-black font-semibold border-l-4 border-black"
                      : "text-gray-700 hover:bg-gray-100 hover:text-black"
                    }`}
                >
                  <span>{icon}</span>
                  <span>{label}</span>
                </div>
              );
            })}
          </nav>
        </div>

        {/* Account Section */}
        <div className="mt-8">
          <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Account</p>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-gray-100"
          >
            <MdLogout size={20} />
            Log Out
          </button>
        </div>
      </div>

      {/* Upgrade Section */}
      <div className="flex flex-col items-center">
        <RocketIcon className="w-12 h-12 mb-2 text-black" />
        <button className="bg-black text-white text-sm font-medium px-4 py-2 rounded-3xl w-full hover:bg-gray-800 transition-all">
          Upgrade to Pro
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
