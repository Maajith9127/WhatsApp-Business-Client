import React, { useState, useEffect } from "react";
//  Added FiAlertCircle for the error icon
import { FiPlus, FiX, FiAlertCircle } from 'react-icons/fi';

const StyledInput = (props) => (
    <input
        {...props}
        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
    />
);

const StyledTextarea = (props) => (
    <textarea
        {...props}
        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
    />
);

const StyledButton = ({ children, onClick, variant = 'primary', icon: Icon, className = '' }) => {
    const baseClasses = "px-4 py-2 rounded-lg font-semibold text-sm transition-transform active:scale-95 flex items-center justify-center gap-2";
    const variants = {
        primary: "bg-black text-white hover:bg-gray-800",
        secondary: "bg-gray-200 text-gray-700 hover:bg-gray-300",
    };
    return (
        <button onClick={onClick} className={`${baseClasses} ${variants[variant]} ${className}`}>
            {Icon && <Icon size={16} />}
            {children}
        </button>
    );
};

//  ADDED: A simple, local component to display error messages.
const ErrorMessage = ({ message }) => {
    if (!message) return null;
    return (
        <div className="flex items-center gap-2 text-sm text-red-600 mt-2">
            <FiAlertCircle size={15} />
            <span>{message}</span>
        </div>
    );
};

//  MODIFIED: Added `errors` to the list of accepted props.
const BodyComponent = ({ bodyText, setBodyText, bodyParams, setBodyParams, errors = {} }) => {
    const [hasUndefinedPlaceholders, setHasUndefinedPlaceholders] = useState(false);

    // Your existing logic remains unchanged.
    useEffect(() => {
        const regex = /\{\{([a-zA-Z0-9_]+)\}\}/g;
        const foundParams = new Set();
        let match;
        while ((match = regex.exec(bodyText)) !== null) foundParams.add(match[1]);
        const defined = bodyParams.map(p => p.param_name);
        setHasUndefinedPlaceholders([...foundParams].some(p => !defined.includes(p)));
    }, [bodyText, bodyParams]);

    const addBodyParam = () => {
        const name = `param_${bodyParams.length + 1}`;
        setBodyText(prev => prev + ` {{${name}}}`);
        setBodyParams(prev => [...prev, { param_name: name, example: "" }]);
    };

    const removeBodyParam = (indexToRemove) => {
        const paramToRemove = bodyParams[indexToRemove];
        if (paramToRemove) {
            setBodyText(text => text.replaceAll(`{{${paramToRemove.param_name}}}`, ''));
        }
        setBodyParams(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    const updateBodyParam = (index, field, value) => {
        setBodyParams(prev => {
            const updated = [...prev];
            const old = updated[index].param_name;
            updated[index][field] = value;
            if (field === "param_name") {
                setBodyText(text => text.replaceAll(`{{${old}}}`, `{{${value}}}`));
            }
            return updated;
        });
    };

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Body Text</label>
                <StyledTextarea
                    rows={4}
                    value={bodyText}
                    onChange={(e) => setBodyText(e.target.value)}
                    placeholder="Hi {{name}}, your item {{item_name}} is ready!"
                />
                {/*  INLINE ERROR for body text */}
                <ErrorMessage message={errors.bodyText} />

                {hasUndefinedPlaceholders && (
                    <p className="text-red-600 text-xs mt-1">*Some placeholders don’t have defined params</p>
                )}
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Named Parameters</label>
                <div className="space-y-2">
                    {bodyParams.map((param, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <StyledInput
                                value={param.param_name}
                                onChange={(e) => updateBodyParam(i, "param_name", e.target.value)}
                                placeholder="param_name"
                            />
                            <StyledInput
                                value={param.example}
                                onChange={(e) => updateBodyParam(i, "example", e.target.value)}
                                placeholder="example"
                            />
                            <button onClick={() => removeBodyParam(i)} className="p-2 text-gray-400 hover:text-red-500">
                                <FiX size={16} />
                            </button>
                        </div>
                    ))}
                </div>
                {/*  INLINE ERROR for body parameters */}
                <ErrorMessage message={errors.bodyParams} />

                <StyledButton onClick={addBodyParam} variant="secondary" icon={FiPlus} className="mt-2">Add Body Param</StyledButton>
            </div>
        </div>
    );
};

export default BodyComponent;