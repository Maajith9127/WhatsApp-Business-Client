import React from "react";
import { FiCreditCard, FiMail, FiDownload, FiFileText } from "react-icons/fi";

const BillingPage = () => {
  const billingEmail = "you@example.com";
  const paymentMethod = "•••• •••• •••• 4242";
  const invoices = [
    { id: "INV001", date: "12 Jun 2025", amount: "₹999", status: "Paid" },
    { id: "INV002", date: "12 May 2025", amount: "₹999", status: "Paid" },
    { id: "INV003", date: "12 Apr 2025", amount: "₹999", status: "Paid" },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg">
          <FiCreditCard className="h-5 w-5 text-gray-700" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Billing & Payments</h2>
      </div>

      {/* Current Payment Method */}
      <div className="mb-10">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Payment Method</h3>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FiCreditCard className="text-gray-600" />
            <span className="text-sm text-gray-800">{paymentMethod}</span>
          </div>
          <button className="text-sm font-medium text-indigo-600 hover:underline">
            Change
          </button>
        </div>
      </div>

      {/* Billing Email */}
      <div className="mb-10">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Billing Email</h3>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FiMail className="text-gray-600" />
            <span className="text-sm text-gray-800">{billingEmail}</span>
          </div>
          <button className="text-sm font-medium text-indigo-600 hover:underline">
            Update
          </button>
        </div>
      </div>

      {/* Invoice History */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Invoice History</h3>
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="min-w-full text-sm text-gray-700 bg-white rounded-lg">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="text-left px-4 py-3 font-semibold">Invoice</th>
                <th className="text-left px-4 py-3 font-semibold">Date</th>
                <th className="text-left px-4 py-3 font-semibold">Amount</th>
                <th className="text-left px-4 py-3 font-semibold">Status</th>
                <th className="text-left px-4 py-3 font-semibold">Download</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{inv.id}</td>
                  <td className="px-4 py-3">{inv.date}</td>
                  <td className="px-4 py-3">{inv.amount}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-gray-500 hover:text-black">
                      <FiDownload />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BillingPage;
