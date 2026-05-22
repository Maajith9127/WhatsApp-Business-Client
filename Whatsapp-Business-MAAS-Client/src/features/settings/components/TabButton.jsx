import React from "react";

const TabButton = ({ tab, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-3xl transition-all duration-300 ${isActive
        ? "bg-gradient-to-r from-gray-900 to-black text-white shadow-lg shadow-black/20"
        : "text-gray-600 hover:text-black hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200/50 hover:shadow-md"
      }`}
  >
    <div className={`p-1 rounded ${isActive ? "bg-white/20" : "bg-gray-100"}`}>
      {React.cloneElement(tab.icon, {
        className: isActive ? "text-white" : "text-gray-600"
      })}
    </div>
    {tab.name}
  </button>
);

export default TabButton;
