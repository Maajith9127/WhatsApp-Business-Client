import React, { useState } from 'react';
import Modal from '../../components/modal/TemplateModal' // Ensure this path is correct
// Icons for actions, loading, and empty state
import { IoEyeOutline } from 'react-icons/io5';
import { CgSpinner } from 'react-icons/cg';
import { BsJournalBookmark } from 'react-icons/bs';

const TemplateStatsTable = ({ templates, isLoading }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState(null);

    const handleViewClick = (template) => {
        setSelectedTemplate(template);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedTemplate(null);
    };

    // 1. Loading State
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-gray-500">
                <CgSpinner className="animate-spin text-4xl" />
                <p className="mt-4 text-lg">Loading Templates...</p>
            </div>
        );
    }

    // 2. Empty State
    if (templates.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-gray-500 bg-gray-50 rounded-lg">
                <BsJournalBookmark className="text-5xl" />
                <h3 className="mt-4 text-xl font-semibold">No Templates Found</h3>
                <p className="mt-1">Use the button above to submit a new template.</p>
            </div>
        );
    }

    // 3. The Professional Table
    return (
        <>
            <div className="bg-white borde border-slate-200 rounded-xl shadow-sm">
                <div className="overflow-y-auto max-h-[65vh]">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-gray-100 sticky top-0 z-10">
                            <tr>
                                <th className="px-4 py-3 font-semibold text-gray-600">Template Name</th>
                                <th className="px-4 py-3 font-semibold text-gray-600">Category</th>
                                <th className="px-4 py-3 font-semibold text-gray-600">Status</th>
                                <th className="px-4 py-3 font-semibold text-gray-600 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {templates.map((template) => {
                                const statusStyles = {
                                    approved: 'bg-green-100 text-green-800',
                                    rejected: 'bg-red-100 text-red-800',
                                    pending: 'bg-yellow-100 text-yellow-800',
                                };
                                return (
                                    <tr key={template.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-3 font-medium text-gray-800">{template.templateName}</td>
                                        <td className="px-4 py-3 text-gray-600">{template.category}</td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${statusStyles[template.status]}`}>
                                                {template.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <button
                                                onClick={() => handleViewClick(template)}
                                                title="View Template"
                                                className="text-gray-500 hover:text-indigo-600 transition-colors"
                                            >
                                                <IoEyeOutline size={22} />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal for displaying the template content (no changes needed here) */}
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                {selectedTemplate && (
                    <div className="p-6 space-y-4">
                        <h3 className="text-lg font-bold text-gray-800 capitalize">
                            {selectedTemplate.templateName.replace(/_/g, ' ')}
                        </h3>

                        <div className="bg-[#E5DDD5] rounded-xl p-4 shadow space-y-2">
                            {/* Header */}
                            <div className="bg-white p-3 rounded-md shadow-sm">
                                <p className="text-gray-600 text-sm font-semibold">Header</p>
                                <div className="mt-1 text-gray-800">
                                    {selectedTemplate.headerFormat === 'TEXT' && selectedTemplate.headerText}
                                    {selectedTemplate.headerFormat === 'IMAGE' && '🖼️ Image Header'}
                                    {selectedTemplate.headerFormat === 'VIDEO' && '🎥 Video Header'}
                                    {selectedTemplate.headerFormat === 'DOCUMENT' && '📄 Document Header'}
                                </div>
                            </div>

                            {/* Body */}
                            <div className="bg-white p-3 rounded-md shadow-sm">
                                <p className="text-gray-600 text-sm font-semibold">Body</p>
                                <div className="mt-1 text-gray-800 whitespace-pre-wrap">
                                    {selectedTemplate.templateBody}
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="bg-white p-3 rounded-md shadow-sm">
                                <p className="text-gray-600 text-sm font-semibold">Footer</p>
                                <div className="mt-1 text-gray-800">
                                    {selectedTemplate.footerText || '—'}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>

        </>
    );
};

export default TemplateStatsTable;