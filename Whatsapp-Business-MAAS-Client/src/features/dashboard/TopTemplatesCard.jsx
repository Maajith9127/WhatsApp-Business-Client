import React from "react";

// Dummy data — replace with Redux/backend later
const templates = [
    {
        name: "Order Confirmation",
        sent: 3200,
        date: "12 Jun 2025",
        status: "In Use",
        approval: "Pending",
    },
    {
        name: "Delivery Update",
        sent: 2100,
        date: "10 Jun 2025",
        status: "In Use",
        approval: "Approved",
    },
    {
        name: "Promo Alert",
        sent: 1800,
        date: "08 Jun 2025",
        status: "In Use",
        approval: "Pending",
    },
];

const TopTemplatesCard = () => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm w-full">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-800">Best Performing Templates</h2>
                <button className="text-gray-400 hover:text-gray-600 text-sm">Filter</button>
            </div>

            <div className="space-y-6">
                {templates.map((template, idx) => (
                    <div
                        key={idx}
                        className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b pb-4"
                    >
                        {/* Template Info */}
                        <div>
                            <p className="text-base font-medium text-gray-900">{template.name}</p>
                            <p className="text-sm text-gray-500">${template.sent.toLocaleString()} × 3</p>
                        </div>

                        {/* Date + Tags */}
                        <div className="flex flex-col md:items-end gap-1">
                            <p className="text-sm text-gray-400">{template.date}</p>
                            <div className="flex gap-2">
                                <span className="bg-black text-white text-xs font-medium px-3 py-1 rounded-full">
                                    {template.status}
                                </span>
                                <span className="bg-gray-200 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">
                                    {template.approval}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopTemplatesCard;
