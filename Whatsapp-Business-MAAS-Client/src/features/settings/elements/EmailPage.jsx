import React, { useState } from "react";
import { FiMail, FiSend, FiAlertTriangle } from "react-icons/fi";

const EmailPage = () => {
  const [emails, setEmails] = useState({
    business: "you@yourcompany.com",
    invoices: "billing@yourcompany.com",
    reports: "alerts@yourcompany.com",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmails((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg">
          <FiMail className="h-5 w-5 text-gray-700" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Email Settings</h2>
      </div>

      {/* Email Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Business Email"
          name="business"
          value={emails.business}
          onChange={handleChange}
          icon={<FiMail size={16} />}
        />
        <InputField
          label="Invoicing Email"
          name="invoices"
          value={emails.invoices}
          onChange={handleChange}
          icon={<FiSend size={16} />}
        />
        <InputField
          label="Error Reports Email"
          name="reports"
          value={emails.reports}
          onChange={handleChange}
          icon={<FiAlertTriangle size={16} />}
        />
      </div>

      {/* Save Button */}
      <div className="flex justify-end gap-4 pt-6 border-t border-gray-200/60 mt-8">
        <button className="px-6 py-3 text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 rounded-xl transition-all duration-300 border border-gray-300 hover:border-gray-400 hover:shadow-md">
          Cancel
        </button>
        <button className="px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-gray-900 to-black hover:from-gray-800 hover:to-gray-900 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
          Save Changes
        </button>
      </div>
    </div>
  );
};

const InputField = ({ label, name, value, onChange, icon }) => (
  <div>
    <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-1">
      {icon}
      {label}
    </label>
    <input
      type="email"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={`Enter ${label.toLowerCase()}`}
      className="w-full p-3 bg-gray-50/80 border rounded-lg text-gray-800 border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
    />
  </div>
);

export default EmailPage;
