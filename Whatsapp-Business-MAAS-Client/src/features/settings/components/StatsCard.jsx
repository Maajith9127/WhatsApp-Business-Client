import React from 'react';
import { FiArrowUp, FiChevronDown } from 'react-icons/fi';

const StatsCard = ({ title, value, change, icon, onReportClick }) => {
    return (
        <div className="bg-white p-6  rounded-2xl shadow-sm border border-gray-200/80">
            <div className="flex items-start justify-between">
                <div className="p-3 bg-gray-300 rounded-full">
                    {React.cloneElement(icon, { className: "h-8 w-8  text-gray-700" })}
                </div>
                <button
                    onClick={onReportClick}
                    className="flex items-center gap-2 bg-black text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-gray-800 transition-colors"
                >
                    Report
                    <FiChevronDown size={16} />
                </button>
            </div>
            <div className="mt-4">
                <p className="text-sm font-medium text-gray-600">{title}</p>
                <div className="flex items-end gap-4 mt-1">
                    <p className="text-3xl font-bold text-gray-900">{value}</p>
                    <p className="text-sm text-green-600 font-semibold flex items-center gap-1">
                        <FiArrowUp size={14} />
                        {change}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default StatsCard;