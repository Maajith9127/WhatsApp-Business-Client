import React from "react";
//  Added FiAlertCircle for the error icon
import { FiAlertCircle } from 'react-icons/fi';

const StyledTextarea = (props) => (
    <textarea
        {...props}
        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
    />
);

// ADDED: A simple, local component to display error messages.
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
const FooterComponent = ({ footerText, setFooterText, errors = {} }) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Footer Text</label>
            <StyledTextarea
                rows={3}
                placeholder="The footer will appear below your main content."
                value={footerText}
                onChange={(e) => setFooterText(e.target.value)}
            />
            {/*  INLINE ERROR for footer text */}
            <ErrorMessage message={errors.footerText} />
        </div>
    );
};

export default FooterComponent;