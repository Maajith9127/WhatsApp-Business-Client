import React from 'react';
// Icons for actions, loading, and empty state
import { IoDocumentTextOutline } from 'react-icons/io5';
import { CgSpinner } from 'react-icons/cg';
import { BsInbox } from 'react-icons/bs';

const InvoiceTable = ({ invoices, isLoading }) => {
  // 1. Loading State
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-gray-500">
        <CgSpinner className="animate-spin text-4xl" />
        <p className="mt-4 text-lg">Loading Invoices...</p>
      </div>
    );
  }

  // 2. Empty State
  if (invoices.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-gray-500 bg-gray-50 rounded-lg">
        <BsInbox className="text-5xl" />
        <h3 className="mt-4 text-xl font-semibold">No Invoices Found</h3>
        <p className="mt-1">When new invoices are sent, they will appear here.</p>
      </div>
    );
  }

  // 3. The Professional Table
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
      <div className="overflow-y-auto max-h-[70vh]">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3 font-semibold text-gray-600">Invoice No</th>
              <th className="px-4 py-3 font-semibold text-gray-600">Customer</th>
              <th className="px-4 py-3 font-semibold text-gray-600">Status</th>
              <th className="px-4 py-3 font-semibold text-gray-600 max-w-[250px]">Message</th>
              <th className="px-4 py-3 font-semibold text-gray-600">Created At</th>
              <th className="px-4 py-3 font-semibold text-gray-600 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {invoices.map((invoice) => (
              <InvoiceRow key={invoice.id} invoice={invoice} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const InvoiceRow = ({ invoice }) => {
  const formatDate = (timestamp) => {
    // More readable date format
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const statusStyles = {
    sent: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800',
    pending: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-4 py-3 font-mono text-gray-800">{invoice.invoice_number}</td>
      <td className="px-4 py-3">
        <div className="font-medium text-gray-800">{invoice.customer_name}</div>
        <div className="text-gray-500">{invoice.customer_phone}</div>
      </td>
      <td className="px-4 py-3">
        <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${statusStyles[invoice.status] || statusStyles.pending}`}>
          {invoice.status}
        </span>
      </td>
      <td className="px-4 py-3 max-w-[250px] truncate text-gray-600" title={invoice.message}>
        {invoice.message}
      </td>
      <td className="px-4 py-3 text-gray-600">{formatDate(invoice.created_at)}</td>
      <td className="px-4 py-3 text-center">
        <a
          href={invoice.invoice_pdf_url}
          target="_blank"
          rel="noopener noreferrer"
          title="View PDF"
          className="text-gray-500 hover:text-indigo-600 transition-colors"
        >
          <IoDocumentTextOutline size={22} />
        </a>
      </td>
    </tr>
  );
};

export default InvoiceTable;


