import React, { useEffect, useState } from "react";
import { FiPlus, FiChevronDown, FiUploadCloud, FiX, FiAlertCircle } from 'react-icons/fi';

const StyledInput = (props) => (
    <input
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

const ErrorMessage = ({ message }) => {
    if (!message) return null;
    return (
        <div className="flex items-center gap-2 text-sm text-red-600 mt-2">
            <FiAlertCircle size={15} />
            <span>{message}</span>
        </div>
    );
};

const HeaderComponent = ({ format, setFormat, headerText, setHeaderText, headerParams, setHeaderParams, headerHandle, setHeaderHandle, errors = {} }) => {
    const [uploading, setUploading] = useState(false);
    const [hasUndefinedPlaceholders, setHasUndefinedPlaceholders] = useState(false);

    useEffect(() => {
        if (format !== "TEXT") return;
        const regex = /\{\{([a-zA-Z0-9_]+)\}\}/g;
        const foundParams = new Set();
        let match;
        while ((match = regex.exec(headerText)) !== null) foundParams.add(match[1]);
        const defined = headerParams.map(p => p.param_name);
        setHasUndefinedPlaceholders([...foundParams].some(p => !defined.includes(p)));
    }, [headerText, headerParams, format]);

    const addHeaderParam = () => {
        const name = `param_${headerParams.length + 1}`;
        setHeaderText(prev => prev + ` {{${name}}}`);
        setHeaderParams(prev => [...prev, { param_name: name, example: "" }]);
    };

    const removeHeaderParam = (indexToRemove) => {
        const paramToRemove = headerParams[indexToRemove];
        if (paramToRemove) {
            setHeaderText(text => text.replaceAll(`{{${paramToRemove.param_name}}}`, ''));
        }
        setHeaderParams(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    const updateHeaderParam = (index, field, value) => {
        setHeaderParams(prev => {
            const updated = [...prev];
            const oldName = updated[index].param_name;
            updated[index][field] = value;
            if (field === "param_name") {
                setHeaderText(text => text.replaceAll(`{{${oldName}}}`, `{{${value}}}`));
            }
            return updated;
        });
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);

        const formData = new FormData();
        formData.append("file", file);

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            setHeaderHandle("mock_media_id_abc123");
            const res = await fetch("http://localhost:8080/media/meta-upload", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            if (res.ok) {
                alert("Uploaded to Meta successfully.");
            } else {
                console.error("Upload failed:", data.error);
                alert("Upload failed: " + data.error);
            }
        } catch (err) {
            console.error("Fetch error:", err);
            alert("Upload failed: Unexpected error.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Header Format</label>
                <div className="relative">
                    <select
                        value={format}
                        onChange={(e) => setFormat(e.target.value)}
                        className="w-full appearance-none bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    >
                        <option value="TEXT">Text</option>
                        <option value="IMAGE">Image</option>
                        <option value="VIDEO">Video</option>
                        <option value="DOCUMENT">Document</option>
                    </select>
                    <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
            </div>

            {format === "TEXT" && (
                <>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Header Text</label>
                        <StyledInput
                            type="text"
                            value={headerText}
                            onChange={(e) => setHeaderText(e.target.value)}
                            placeholder="e.g., Your order {{order_id}}"
                        />
                        <ErrorMessage message={errors.headerText} />
                        {hasUndefinedPlaceholders && (
                            <p className="text-red-500 text-xs mt-1">*Missing parameter definitions</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Header Parameters</label>
                        <div className="space-y-2">
                            {headerParams.map((param, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <StyledInput
                                        value={param.param_name}
                                        onChange={e => updateHeaderParam(i, "param_name", e.target.value)}
                                        placeholder="param_name"
                                    />
                                    <StyledInput
                                        value={param.example}
                                        onChange={e => updateHeaderParam(i, "example", e.target.value)}
                                        placeholder="example"
                                    />
                                    <button onClick={() => removeHeaderParam(i)} className="p-2 text-gray-400 hover:text-red-500">
                                        <FiX size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <ErrorMessage message={errors.headerParams} />
                        <StyledButton onClick={addHeaderParam} variant="secondary" icon={FiPlus} className="mt-2">Add Header Param</StyledButton>
                    </div>
                </>
            )}

            {format !== "TEXT" && (
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Upload Header Media</label>
                    <ErrorMessage message={errors.headerHandle} />

                    <div className="flex items-center justify-center w-full">
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <FiUploadCloud className="w-8 h-8 text-gray-400 mb-2" />
                                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            </div>
                            <input id="dropzone-file" type="file" className="hidden" onChange={handleFileUpload} />
                        </label>
                    </div>

                    <div className="mt-2">
                        {uploading ? (
                            <p className="text-sm text-blue-600 animate-pulse">Uploading file to server...</p>
                        ) : headerHandle ? (
                            <p className="text-sm text-green-600">✅ Media uploaded. File ID: <code>{headerHandle}</code></p>
                        ) : (
                            <>
                                <p className="text-sm text-yellow-600">
                                    ⚠️ No file uploaded. This will be treated as a dynamic media placeholder (e.g., {"{{header_document}}"})
                                </p>

                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default HeaderComponent;
