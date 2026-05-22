import React from 'react';
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2'; // Modern, grey-toned icon
import { IoChevronDownOutline } from 'react-icons/io5';

const BusinessNumbers = () => {
  return (
    <div className="bg-white shadow rounded-3xl p-6 border border-gray-200 w-[100%] cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-green-500 hover:-translate-y-1">
      {/* Top row */}
      <div className="flex items-start justify-between mb-4">
        {/* Icon */}
        <div className="bg-gray-300 p-3 rounded-full">
          <HiOutlineBuildingOffice2 className="text-gray-700" size={40} />
        </div>

        {/* Report button */}
        <button className="flex items-center gap-1 bg-black text-white px-4 py-1.5 rounded-full text-sm font-medium">
          Report <IoChevronDownOutline size={40} />
        </button>
      </div>

      {/* Text */}
      <p className="text-gray-500 text mb-1">Business Numbers</p>

      {/* Value and growth */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold text-gray-900 tracking-tight">12 Numbers</h2>
        <span className="text-sm text-green-600 font-medium flex items-center">
          +2 Added
        </span>
      </div>
    </div>
  );
};

export default BusinessNumbers;
