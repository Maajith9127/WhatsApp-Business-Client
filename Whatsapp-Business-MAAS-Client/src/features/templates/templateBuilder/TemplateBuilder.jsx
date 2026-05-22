//  Enhanced TemplateBuilder with WhatsApp realistic preview + animation
import React, { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { submitTemplate } from '../../../services/templateService';
import HeaderComponent from "./HeaderComponent";
import BodyComponent from "./BodyComponent";
import FooterComponent from "./FooterComponent";
import ErrorMessage from "./ErrorMessage";
import {
    FiFileText,
    FiMessageSquare,
    FiWind,
    FiUploadCloud,
    FiMessageCircle,
    FiImage,
    FiVideo,
    FiFile,
    FiMoreVertical,
    FiPaperclip,
    FiMic
} from 'react-icons/fi';
import { BsCheck2All } from 'react-icons/bs';

const Card = ({ title, icon: Icon, children, className = '', titleExtra }) => (
    <div className={`bg-white p-6 rounded-xl shadow border border-gray-100 flex flex-col ${className}`}>
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
                {Icon && <Icon className="h-5 w-5 text-gray-500" />}
                <h2 className="text-lg font-bold text-gray-800">{title}</h2>
            </div>
            {titleExtra}
        </div>
        <div className="flex-grow">{children}</div>
    </div>
);

const StyledButton = ({ children, onClick, variant = 'primary', icon: Icon }) => {
    const baseClasses = "px-4 py-2 rounded-3xl font-semibold text-sm transition-transform active:scale-95 flex items-center justify-center gap-2";
    const variants = {
        primary: "bg-black text-white hover:bg-gray-800",
        secondary: "bg-gray-200 text-gray-700 hover:bg-gray-300",
    };
    return (
        <button onClick={onClick} className={`${baseClasses} ${variants[variant]}`}>
            {Icon && <Icon size={16} />}
            {children}
        </button>
    );
};

const MessageBubble = ({ header, body, footer, format }) => {
    const renderHeader = () => {
        if (!header && format !== 'TEXT') return null;
        switch (format) {
            case 'IMAGE': return <div className="flex items-center justify-center bg-gray-300 rounded-t-lg p-10"><FiImage className="h-16 w-16 text-gray-500" /></div>;
            case 'VIDEO': return <div className="relative flex items-center justify-center bg-gray-800 rounded-t-lg p-10"><FiVideo className="h-16 w-16 text-white" /></div>;
            case 'DOCUMENT': return <div className="flex items-center gap-3 bg-gray-200 rounded-t-lg p-4"><FiFile className="h-8 w-8 text-gray-600" /><span className="text-gray-800 font-medium truncate">document_preview.pdf</span></div>;
            case 'TEXT': return <div className="font-bold p-3 pb-1 text-gray-800">{header}</div>;
            default: return null;
        }
    };
    return (
        <div className="bg-white shadow-sm rounded-lg w-full max-w-md">
            {renderHeader()}
            <div className="p-3">
                <p className="text-gray-800 whitespace-pre-wrap">{body}</p>
                {footer && <p className="text-xs text-gray-400 mt-2">{footer}</p>}
                <div className="flex justify-end items-center mt-1">
                    <p className="text-xs text-gray-400 mr-1">4:27 PM</p>
                    <BsCheck2All className="text-blue-500" />
                </div>
            </div>
        </div>
    );
};

const WhatsAppPreviewUI = ({ format, headerText, headerParams, bodyText, bodyParams, footerText }) => {
    const replacePlaceholders = (text = "", paramList = []) => {
        let result = text;
        paramList.forEach(param => {
            const placeholder = `{{${param.param_name}}}`;
            const exampleValue = param.example || `[${param.param_name}]`;
            result = result.split(placeholder).join(exampleValue);
        });
        return result;
    };

    const previewHeader = format === 'TEXT' ? replacePlaceholders(headerText, headerParams) : "media_placeholder";
    const previewBody = replacePlaceholders(bodyText, bodyParams);

    return (
        <div className="bg-[#E5DDD5] flex flex-col h-[600px] w-full border border-gray-300 rounded-xl overflow-hidden">
            <header className="bg-[#005E54] text-white flex items-center p-3 shadow-md z-10">
                <img src="https://i.pravatar.cc/40?u=receiver" alt="avatar" className="rounded-full mr-3" />
                <div className="flex-grow"><h2 className="font-semibold">Receiver</h2></div>
                <FiMoreVertical size={20} />
            </header>
            <main className="flex-1 p-4 overflow-y-auto" style={{ backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")' }}>
                <div className="flex justify-end">
                    <MessageBubble header={previewHeader} body={previewBody} footer={footerText} format={format} />
                </div>
            </main>
            <footer className="bg-gray-100 p-2 flex items-center gap-2">
                <FiPaperclip size={24} className="text-gray-500" />
                <input type="text" placeholder="Type a message" className="flex-grow bg-white rounded-full px-4 py-2 outline-none" disabled />
                <FiMic size={24} className="text-gray-500" />
            </footer>
        </div>
    );
};

function TemplateBuilder() {
    const [format, setFormat] = useState("TEXT");
    const [headerText, setHeaderText] = useState("");
    const [headerParams, setHeaderParams] = useState([]);
    const [headerHandle, setHeaderHandle] = useState("");
    const [bodyText, setBodyText] = useState("");
    const [bodyParams, setBodyParams] = useState([]);
    const [footerText, setFooterText] = useState("");
    const [whatsappPreview, setWhatsappPreview] = useState("");
    const [errors, setErrors] = useState({});
    const [fileName, setFileName] = useState("");


    const validateForm = () => {
        const newErrors = {};
        if (!fileName.trim()) newErrors.fileName = "Template name is required.";
        if (!bodyText.trim()) newErrors.bodyText = "Body text cannot be empty.";
        if (bodyParams.some(p => !p.param_name.trim() || !p.example.trim()))
            newErrors.bodyParams = "All body parameters must have both a name and an example value.";
        if (format === "TEXT") {
            if (!headerText.trim()) newErrors.headerText = "Header text is required for text-based headers.";
            if (headerParams.some(p => !p.param_name.trim() || !p.example.trim()))
                newErrors.headerParams = "All header parameters must have both a name and an example value.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFinalSubmit = async () => {
        if (!validateForm()) return;

        const payload = {
            name: fileName.trim().toLowerCase().replace(/\s+/g, "_"),
            language: "en_US",
            category: "TRANSACTIONAL",
            components: [
                format !== "NONE" && {
                    type: "HEADER",
                    format: format,
                    ...(format === "TEXT" && { text: headerText }),
                    ...(format === "TEXT" && headerParams.length > 0 && {
                        example: {
                            header_text: [headerParams.map(p => p.example)]
                        }
                    })
                },
                {
                    type: "BODY",
                    text: bodyText,
                    ...(bodyParams.length > 0 && {
                        example: {
                            body_text: [bodyParams.map(p => p.example)]
                        }
                    })
                },
                footerText && {
                    type: "FOOTER",
                    text: footerText
                }
            ].filter(Boolean)
        };

        //  Show clean payload in console for verification
        console.log("Payload to Meta:", JSON.stringify(payload, null, 2));

        try {
            await submitTemplate(payload);
            alert("Template submitted successfully!");
            // Optionally redirect or reset form here
        } catch (err) {
            console.error("Submission failed", err);
            alert("Failed to submit template: " + (err?.response?.data?.message || err.message));
        }
    };



    const generatePreview = () => {
        setWhatsappPreview("show");
    };

    return (
        <div className="bg-slate-100 min-h-screen font-sans">
            <main className="flex-1 p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">WhatsApp Template Builder</h1>
                        <p className="text-gray-500 mt-1">Create and preview your message templates before submission.</p>
                    </div>

                    <div className="flex gap-8 items-start flex-col lg:flex-row">
                        <div className="flex flex-col gap-8 w-full lg:w-1/2 max-h-[700px] overflow-y-auto pr-2">

                            <Card title="Template Name" icon={FiFileText}>
                                <input
                                    type="text"
                                    placeholder="Enter template name (e.g., welcome_template_1)"
                                    value={fileName}
                                    onChange={(e) => setFileName(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                />
                                {errors.fileName && <ErrorMessage message={errors.fileName} />}
                            </Card>


                            <Card title="Header Component" icon={FiFileText}>
                                <HeaderComponent errors={errors} {...{ format, setFormat, headerText, setHeaderText, headerParams, setHeaderParams, headerHandle, setHeaderHandle }} />
                            </Card>
                            <Card title="Body Component" icon={FiMessageSquare}>
                                <BodyComponent errors={errors} {...{ bodyText, setBodyText, bodyParams, setBodyParams }} />
                            </Card>
                            <Card title="Footer Component" icon={FiWind}>
                                <FooterComponent errors={errors} {...{ footerText, setFooterText }} />
                            </Card>
                            <div className="mt-4 text-right">
                                <StyledButton onClick={handleFinalSubmit} icon={FiUploadCloud}>
                                    Submit Template
                                </StyledButton>
                            </div>
                        </div>

                        <div className="w-full lg:w-1/2">
                            <Card title="WhatsApp Message Preview" icon={FiMessageCircle} titleExtra={
                                <StyledButton onClick={() => { if (validateForm()) generatePreview(); }} icon={FiMessageCircle}>
                                    Preview Message
                                </StyledButton>
                            }>
                                <AnimatePresence mode="wait">
                                    {whatsappPreview ? (
                                        <motion.div
                                            key="preview"
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 30 }}
                                            transition={{ duration: 0.4, ease: 'easeInOut' }}
                                        >
                                            <WhatsAppPreviewUI
                                                format={format}
                                                headerText={headerText}
                                                headerParams={headerParams}
                                                bodyText={bodyText}
                                                bodyParams={bodyParams}
                                                footerText={footerText}
                                            />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="placeholder"
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 30 }}
                                            transition={{ duration: 0.4, ease: 'easeInOut' }}
                                            className="flex flex-col items-center justify-center text-center text-gray-400 h-full min-h-[300px]"
                                        >
                                            <FiMessageCircle size={40} className="mb-4" />
                                            <p>Fill out the fields and click "Preview Message" to see how your template will look on a device.</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default TemplateBuilder;
