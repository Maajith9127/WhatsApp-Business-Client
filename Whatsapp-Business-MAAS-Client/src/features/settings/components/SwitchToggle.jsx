import React, { useState } from "react";
import { FiCheck } from "react-icons/fi";

const SwitchToggle = ({ icon, label, description, defaultChecked = false, isNew = false }) => {
  const [enabled, setEnabled] = useState(defaultChecked);

  return (
    <div className="group relative bg-gradient-to-r from-white to-gray-50/50 p-5 rounded-xl border border-gray-200/60 hover:border-gray-300/80 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-2.5 bg-gradient-to-br from-gray-100 to-gray-200/50 rounded-lg group-hover:from-gray-200 group-hover:to-gray-300/50 transition-all duration-300">
            {icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-gray-900">{label}</p>
              {isNew && (
                <span className="px-2 py-0.5 text-xs font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full">
                  NEW
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 mt-1">{description}</p>
          </div>
        </div>
        <button
          onClick={() => setEnabled(!enabled)}
          className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-lg ${enabled
            ? "bg-gradient-to-r from-gray-800 to-black focus:ring-gray-500"
            : "bg-gradient-to-r from-gray-300 to-gray-400 focus:ring-gray-300"
            }`}
        >
          <span
            aria-hidden="true"
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition-all duration-300 ease-in-out ${enabled ? "translate-x-5" : "translate-x-0"
              }`}
          />
          {enabled && (
            <FiCheck className="absolute top-1 left-1 h-3 w-3 text-white" />
          )}
        </button>
      </div>
    </div>
  );
};

export default SwitchToggle;
