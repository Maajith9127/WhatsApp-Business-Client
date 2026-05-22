import React, { useState, useEffect } from 'react';
import { FiMoreVertical, FiPaperclip, FiMic, FiFile, FiImage, FiVideo } from 'react-icons/fi';
import { BsCheck2All } from 'react-icons/bs';

const WhatsAppPreview = ({ selectedTemplate, selectedCustomer }) => {
    const [paramValues, setParamValues] = useState({});

    useEffect(() => {
        // Reset param values when template changes
        if (selectedTemplate?.templateBody) {
            const matches = selectedTemplate.templateBody.match(/\{\{\d+\}\}/g);
            const uniqueParams = [...new Set(matches || [])];
            const initialValues = {};
            uniqueParams.forEach(ph => {
                const key = ph.replace(/[{}]/g, '');
                initialValues[key] = '';
            });
            setParamValues(initialValues);
        }
    }, [selectedTemplate]);

    const handleChange = (key, value) => {
        setParamValues(prev => ({ ...prev, [key]: value }));
    };

    const renderBodyWithInputs = () => {
        let parts = selectedTemplate.templateBody.split(/(\{\{\d+\}\})/g);
        return parts.map((part, idx) => {
            const match = part.match(/\{\{(\d+)\}\}/);
            if (match) {
                const key = match[1];
                return (
                    <input
                        key={idx}
                        value={paramValues[key] || ''}
                        onChange={(e) => handleChange(key, e.target.value)}
                        placeholder={`Param ${key}`}
                        className="inline-block bg-gray-100 px-2 py-1 rounded border border-gray-300 mx-1 text-sm"
                    />
                );
            } else {
                return <span key={idx}>{part}</span>;
            }
        });
    };

    const renderHeaderMedia = () => {
        switch (selectedTemplate.headerFormat) {
            case 'IMAGE': return <div className="bg-gray-300 p-6 rounded-t-lg flex justify-center"><FiImage className="text-3xl text-gray-600" /></div>;
            case 'VIDEO': return <div className="bg-gray-800 p-6 rounded-t-lg flex justify-center"><FiVideo className="text-3xl text-white" /></div>;
            case 'DOCUMENT': return <div className="bg-gray-200 px-4 py-3 flex items-center gap-2 rounded-t-lg"><FiFile className="text-gray-600" /><span>sample.pdf</span></div>;
            case 'TEXT': return <div className="p-3 pb-1 text-gray-800 font-semibold">{selectedTemplate.headerText}</div>;
            default: return null;
        }
    };

    if (!selectedTemplate || !selectedCustomer) return null;

    return (
        <div className="bg-[#E5DDD5] border border-gray-300 rounded-xl overflow-hidden w-full max-w-md mx-auto shadow">
            {/* Chat Header */}
            <header className="bg-[#075E54] text-white flex items-center p-3">
                <img src={`https://i.pravatar.cc/40?u=${selectedCustomer}`} alt="avatar" className="rounded-full mr-3" />
                <div className="flex-grow font-semibold">{selectedCustomer}</div>
                <FiMoreVertical size={20} />
            </header>

            {/* Chat Body */}
            <main className="p-4 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat-y bg-cover min-h-[300px]">
                <div className="bg-white rounded-lg shadow max-w-[80%] ml-auto">
                    {renderHeaderMedia()}
                    <div className="p-3">
                        <div className="text-gray-800 text-sm">{renderBodyWithInputs()}</div>
                        {selectedTemplate.footerText && (
                            <p className="text-xs text-gray-400 mt-2">{selectedTemplate.footerText}</p>
                        )}
                        <div className="flex justify-end items-center mt-1 text-xs text-gray-500">
                            4:20 PM <BsCheck2All className="ml-1 text-blue-500" />
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer Input (Disabled) */}
            <footer className="bg-gray-100 p-2 flex items-center gap-2">
                <FiPaperclip size={20} className="text-gray-500" />
                <input
                    type="text"
                    placeholder="Type a message"
                    disabled
                    className="flex-grow bg-white rounded-full px-4 py-2 outline-none text-sm"
                />
                <FiMic size={20} className="text-gray-500" />
            </footer>
        </div>
    );
};

export default WhatsAppPreview;
