import React from 'react';
import { HiOutlineMegaphone } from 'react-icons/hi2';
import { IoChevronDownOutline } from 'react-icons/io5';

const RunCampaign = () => {
  return (
    <div className="bg-white shadow rounded-3xl p-6 border border-gray-200 w-[100%] cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-gray-400 hover:-translate-y-1">
      {/* Top row */}
      <div className="flex items-start justify-between mb-4">
        {/* Icon */}
        <div className="bg-gray-300 p-3 rounded-full">
          <HiOutlineMegaphone className="text-gray-700" size={40} />
        </div>

        {/* Report button */}
        <button className="flex items-center gap-1 bg-black text-white px-4 py-1.5 rounded-full text-sm font-medium">
          Report <IoChevronDownOutline size={40} />
        </button>
      </div>

      {/* Text */}
      <p className="text-gray-500 te mb-1">Campaigns</p>

      {/* Value and growth */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold text-gray-900 tracking-tight">1,234 Sent</h2>
        <span className="text-sm text-gray-600 font-medium flex items-center">
          ↑ 3.8%
        </span>
      </div>
    </div>
  );
};

export default RunCampaign;
