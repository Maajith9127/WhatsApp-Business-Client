import React from 'react';
import { IoCubeOutline } from 'react-icons/io5';
import { IoChevronDownOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const MessageAnalyticsCard = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/dashboard/message-analytics");
    };

    return (
        <div
            onClick={handleClick}
            className="bg-white shadow rounded-3xl p-6 border border-gray-200 w-full cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
        >
            {/* Top row */}
            <div className="flex items-start  justify-between mb-4">
                {/* Icon */}
                <div className="bg-gray-300 p-3 rounded-full">
                    <IoCubeOutline className="text-black-600" size={40} />
                </div>

                {/* Report button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation(); // prevents parent click from firing
                        navigate("/DashBoard/MessageAnalytics");
                    }}
                    className="flex items-center gap-1 bg-black text-white px-4 py-1.5 rounded-full text-sm font-medium"
                >
                    Report <IoChevronDownOutline size={40} />
                </button>
            </div>

            {/* Text */}
            <p className="text-gray-500  text mb-1">WhatsApp Message Analytics</p>

            {/* Value and growth */}
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-semibold text-gray-900 tracking-tight">5,12,340</h2>
                <span className="text-sm text-green-600 font-medium flex items-center">
                    ↑ 7.2%
                </span>
            </div>
        </div>
    );
};

export default MessageAnalyticsCard;
