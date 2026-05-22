import React from "react";

// Dummy data — replace with Redux/backend later
const senders = [
    { name: "ABC Pvt Ltd", total: 140987 },
    { name: "Global Tech", total: 347153 },
    { name: "NextGen Corp", total: 598500 },
    { name: "VisionSoft", total: 298485 },
];

const maxTotal = Math.max(...senders.map((s) => s.total));

const TopSendersCard = () => {
    return (
        <div className="bg-white p-4 rounded-xl shadow-sm w-full">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text font-semibold text-gray-800">Top Performing Senders</h2>
                <button className="text-gray-400 hover:text-gray-600 text">⟳</button>
            </div>

            <div className="space-y-6">
                {senders.map((sender, idx) => (
                    <div key={idx}>
                        <div className="flex justify-between mb-2 text-sm text-gray-700">
                            <span className="truncate max-w-[60%]">{sender.name}</span>
                            <span className="text-gray-500">{sender.total.toLocaleString()}</span>
                        </div>

                        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="bg-black h-full rounded-full transition-all duration-300"
                                style={{
                                    width: `${(sender.total / maxTotal) * 100}%`,
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopSendersCard;
