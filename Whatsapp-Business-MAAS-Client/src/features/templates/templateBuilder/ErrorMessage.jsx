import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';

const ErrorMessage = ({ message }) => {
    if (!message) return null;
    return (
        <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg mt-2">
            <FiAlertCircle />
            <span>{message}</span>
        </div>
    );
};

export default ErrorMessage;