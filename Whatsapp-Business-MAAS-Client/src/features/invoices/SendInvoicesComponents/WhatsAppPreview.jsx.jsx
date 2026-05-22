import React, { useRef } from 'react'; // Import useRef
// Import the original icons plus a new, more specific one for PDFs
import { FiMoreVertical, FiPaperclip, FiMic, FiFile, FiImage, FiVideo, FiUploadCloud } from 'react-icons/fi';
import { BsCheck2All } from 'react-icons/bs';
import { FaFilePdf } from 'react-icons/fa'; // A better icon for PDF documents

const WhatsAppPreview = ({
  selectedTemplate,
  selectedCustomer,
  paramValues,
  setParamValues,
  uploadedFile,
  setUploadedFile
}) => {
  // --- 1. Create references for each file input ---
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const documentInputRef = useRef(null);

  // This core logic remains untouched
  if (!selectedTemplate || !selectedCustomer) return null;

  const handleChange = (key, value) => {
    setParamValues(prev => ({ ...prev, [key]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setUploadedFile(file);
  };

  // This rendering logic also remains structurally the same
  const renderBodyWithInputs = () => {
    const parts = selectedTemplate.templateBody.split(/(\{\{\d+\}\})/g);
    return parts.map((part, index) => {
      const match = part.match(/\{\{(\d+)\}\}/);
      if (match) {
        const key = match[1];
        return (
          <input
            key={index}
            value={paramValues[key] || ''}
            onChange={(e) => handleChange(key, e.target.value)}
            placeholder={`Param ${key}`}
            className="inline-block bg-gray-100 px-2 py-1 rounded border border-gray-300 mx-1 text-sm"
          />
        );
      } else {
        return <span key={index}>{part}</span>;
      }
    });
  };

  // --- 2. MODIFICATIONS APPLIED BELOW ---
  // The input elements are now hidden, and the click is triggered by the parent div.
  const renderHeaderMedia = () => {
    const format = selectedTemplate.headerFormat;

    if (format === 'TEXT') {
      return <div className="p-3 pb-1 text-gray-800 font-semibold">{selectedTemplate.headerText}</div>;
    }

    if (format === 'IMAGE') {
      return (
        // Add onClick to the container and a cursor-pointer class
        <div className="bg-gray-200 p-4 flex flex-col items-center justify-center rounded-t-lg gap-2 text-center cursor-pointer hover:bg-gray-300 transition-colors" onClick={() => imageInputRef.current.click()}>
          {uploadedFile ? (
            <img src={URL.createObjectURL(uploadedFile)} alt="uploaded" className="max-h-40 rounded-md" />
          ) : (
            <div className="text-gray-500">
              <FiImage className="mx-auto text-4xl" />
              <p className="text-xs mt-1 font-semibold">Image Header</p>
              <p className="text-xs">Click to upload an image</p>
            </div>
          )}
          {/* Add the ref and a 'hidden' class to the input */}
          <input ref={imageInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        </div>
      );
    }

    if (format === 'VIDEO') {
      return (
        // Add onClick to the container and a cursor-pointer class
        <div className="bg-black p-4 flex flex-col items-center justify-center rounded-t-lg gap-2 text-center cursor-pointer hover:bg-gray-800 transition-colors" onClick={() => videoInputRef.current.click()}>
          {uploadedFile ? (
            <video controls className="max-h-40 rounded-md">
              <source src={URL.createObjectURL(uploadedFile)} type={uploadedFile.type} />
            </video>
          ) : (
            <div className="text-gray-300">
              <FiVideo className="mx-auto text-4xl" />
              <p className="text-xs mt-1 font-semibold">Video Header</p>
              <p className="text-xs">Click to upload a video</p>
            </div>
          )}
          {/* Add the ref and a 'hidden' class to the input */}
          <input ref={videoInputRef} type="file" accept="video/*" onChange={handleFileChange} className="hidden" />
        </div>
      );
    }

    if (format === 'DOCUMENT') {
      return (
        // Add onClick to the container and a cursor-pointer class
        <div className="bg-gray-200 px-4 py-3 flex flex-col items-center gap-2 rounded-t-lg cursor-pointer hover:bg-gray-300 transition-colors" onClick={() => documentInputRef.current.click()}>
          <div className="flex items-center justify-center text-center p-4 w-full">
            <FaFilePdf className="text-red-500 text-4xl flex-shrink-0 mr-3" />
            <div className="text-left">
              <p className="truncate font-medium text-gray-700 text-sm">
                {uploadedFile ? uploadedFile.name : 'Document Header'}
              </p>
              {!uploadedFile && <p className="text-xs text-gray-500">Click to upload a PDF</p>}
            </div>
          </div>
          {/* Add the ref and a 'hidden' class to the input */}
          <input ref={documentInputRef} type="file" accept="application/pdf" onChange={handleFileChange} className="hidden" />
        </div>
      );
    }

    return null;
  };

  // --- NO CHANGES TO THE MAIN COMPONENT STRUCTURE BELOW ---
  return (
    <div className="bg-[#E5DDD5] border border-gray-300 rounded-xl overflow-hidden w-full   shadow">
      <header className="bg-[#075E54] text-white flex items-center p-3">
        <img src={`https://i.pravatar.cc/40?u=${selectedCustomer}`} alt="avatar" className="rounded-full mr-3" />
        <div className="flex-grow font-semibold">{selectedCustomer}</div>
        <FiMoreVertical size={20} />
      </header>

      <main className="p-4 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat-y bg-cover min-h-[300px]">
        <div className="bg-white rounded-lg shadow max-w-[80%] ml-auto">
          {renderHeaderMedia()}
          <div className="p-3">
            <div className="text-gray-800 text-sm">{renderBodyWithInputs()}</div>
            {selectedTemplate.footerText && (
              <p className="text-xs text-gray-400 mt-2">{selectedTemplate.footerText}</p>
            )}
            <div className="flex justify-end items-center mt-1 text-xs text-gray-500">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })} <BsCheck2All className="ml-1 text-blue-500" />
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-100 p-2 flex items-center gap-2">
        <FiPaperclip size={20} className="text-gray-500" />
        <input
          type="text"
          placeholder="Type a message"
          className="flex-grow bg-white rounded-full px-4 py-2 outline-none text-sm"
        />
        <FiMic size={20} className="text-gray-500" />
      </footer>
    </div>
  );
};

export default WhatsAppPreview;