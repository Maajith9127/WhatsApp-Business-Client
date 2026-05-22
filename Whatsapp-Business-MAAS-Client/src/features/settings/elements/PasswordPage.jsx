import React, { useState } from "react";
import { FiKey, FiLock, FiShield } from "react-icons/fi";

const PasswordPage = () => {
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
  };

  const isMismatch = passwords.new && passwords.confirm && passwords.new !== passwords.confirm;

  return (
    <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg">
          <FiKey className="h-5 w-5 text-gray-700" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Change Password</h2>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-1 md:col-span-2">
          <label className="text-sm font-medium text-gray-600 mb-1 flex items-center gap-2">
            <FiLock /> Current Password
          </label>
          <input
            type="password"
            name="current"
            value={passwords.current}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-600 mb-1 flex items-center gap-2">
            <FiShield /> New Password
          </label>
          <input
            type="password"
            name="new"
            value={passwords.new}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-600 mb-1 flex items-center gap-2">
            <FiShield /> Confirm New Password
          </label>
          <input
            type="password"
            name="confirm"
            value={passwords.confirm}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 ${
              isMismatch
                ? "border-red-400 focus:ring-red-300/40"
                : "border-gray-300 focus:ring-blue-500/20"
            }`}
          />
          {isMismatch && (
            <p className="text-sm text-red-500 mt-1">❗ Passwords do not match</p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4 pt-8 border-t border-gray-200/60 mt-10">
        <button className="px-6 py-3 text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 rounded-xl transition-all duration-300 border border-gray-300 hover:border-gray-400 hover:shadow-md">
          Cancel
        </button>
        <button
          disabled={!passwords.current || !passwords.new || isMismatch}
          className={`px-6 py-3 text-sm font-semibold text-white rounded-xl transition-all duration-300 shadow-lg ${
            isMismatch || !passwords.new
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-gray-900 to-black hover:from-gray-800 hover:to-gray-900"
          }`}
        >
          Save Password
        </button>
      </div>
    </div>
  );
};

export default PasswordPage;
