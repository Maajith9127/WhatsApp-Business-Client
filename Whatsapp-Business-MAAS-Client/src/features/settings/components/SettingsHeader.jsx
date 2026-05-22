import React from "react";
import { FiSettings } from "react-icons/fi";

const SettingsHeader = () => (
  <div className="mb-8">
    <div className="flex items-center gap-3 mb-4">

      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Settings
        </h1>
        <p className="text-gray-600 mt-1">Manage your account settings and preferences</p>
      </div>
    </div>
  </div>
);

export default SettingsHeader;
