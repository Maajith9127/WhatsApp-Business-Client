import React from 'react';

const TemplateSelector = ({ templates = [], selectedTemplate, onSelectTemplate }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow space-y-4 borde h-[50%]">
            <div>
                <label className="text-sm font-semibold text-gray-600">Choose Template</label>
                <select
                    className="w-full mt-2 p-2 border rounded-lg"
                    value={selectedTemplate?.templateName || ''}
                    onChange={(e) => {
                        const template = templates.find(t => t.templateName === e.target.value);
                        onSelectTemplate(template);
                    }}
                >
                    <option value="">Select Template</option>
                    {templates.map((tpl) => (
                        <option key={tpl.id} value={tpl.templateName}>
                            {tpl.templateName}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default TemplateSelector;
