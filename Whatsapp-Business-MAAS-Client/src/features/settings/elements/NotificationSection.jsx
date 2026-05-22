import React from "react";
import { FiBell, FiMail, FiMessageSquare, FiShield } from "react-icons/fi";
import SwitchToggle from "../components/SwitchToggle";

const NotificationSection = () => {
  return (
    <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg">
            <FiBell className="h-5 w-5 text-gray-700" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Notification Settings</h2>
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-200/50">
          <p className="text-sm text-gray-700">
            <FiShield className="inline h-4 w-4 mr-2 text-blue-600" />
            We may still send you important notifications about your account, and may contact you about your account outside of your settings.
          </p>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        <SwitchToggle
          icon={<FiBell size={18} className="text-gray-700" />}
          label="Push Notifications"
          description="Receive instant push notifications on your device for important updates."
          isNew={true}
        />
        <SwitchToggle
          icon={<FiMail size={18} className="text-gray-700" />}
          label="Email Notifications"
          description="Get detailed email updates about your account activity and security."
          defaultChecked={true}
        />
        <SwitchToggle
          icon={<FiMessageSquare size={18} className="text-gray-700" />}
          label="SMS Notifications"
          description="Receive critical alerts and security notifications via SMS."
        />
      </div>

      <div className="flex justify-end gap-4 pt-6 border-t border-gray-200/60">
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

export default NotificationSection;
