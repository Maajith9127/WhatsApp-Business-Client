import React from 'react';
import { FiUser } from 'react-icons/fi';

const CustomerSelector = ({ customers = [], selectedCustomer, onChange }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow borde h-[50%] space-y-3">
            <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                <FiUser /> Select Customer
            </label>
            <select
                className="w-full p-2 border rounded-lg"
                value={selectedCustomer}
                onChange={(e) => onChange(e.target.value)} // sends selected customer ID
            >
                <option value="">Select</option>
                {customers.map((cust) => (
                    <option key={cust.id} value={cust.name+cust.phone}>
                        {cust.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CustomerSelector;
