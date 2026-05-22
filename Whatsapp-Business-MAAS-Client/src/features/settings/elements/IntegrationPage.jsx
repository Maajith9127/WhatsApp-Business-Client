import React from "react";
import { FiSettings, FiLink, FiKey, FiCopy, FiRefreshCcw } from "react-icons/fi";

const IntegrationPage = () => {
  const apiKey = "YOUR_API_KEY_HERE";
  const webhookURL = "https://yourapp.com/webhook";

  const copy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const regenerateKey = () => {
    alert("This would trigger a backend call to regenerate the API key.");
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg">
          <FiSettings className="h-5 w-5 text-gray-700" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Integrations</h2>
      </div>

      {/* API Key */}
      <div className="mb-8">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
          <FiKey /> API Key
        </label>
        <div className="relative">
          <input
            type="text"
            readOnly
            value={apiKey}
            className="w-full p-3 pr-20 bg-gray-100 border border-gray-200 rounded-lg text-gray-600 font-mono text-sm"
          />
          <div className="absolute right-2 top-1.5 flex gap-2">
            <button onClick={() => copy(apiKey)} className="p-1 text-gray-500 hover:text-black">
              <FiCopy size={16} />
            </button>
            <button onClick={regenerateKey} className="p-1 text-gray-500 hover:text-red-600">
              <FiRefreshCcw size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Webhook URL */}
      <div className="mb-8">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
          <FiLink /> Webhook URL
        </label>
        <div className="relative">
          <input
            type="text"
            readOnly
            value={webhookURL}
            className="w-full p-3 pr-10 bg-gray-100 border border-gray-200 rounded-lg text-gray-600 font-mono text-sm"
          />
          <button
            onClick={() => copy(webhookURL)}
            className="absolute right-2 top-1.5 p-1 text-gray-500 hover:text-black"
          >
            <FiCopy size={16} />
          </button>
        </div>
      </div>

      {/* Save button placeholder */}
      <div className="flex justify-end pt-6 border-t border-gray-200/60">
        <button className="px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-gray-900 to-black hover:from-gray-800 hover:to-gray-900 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
          Done
        </button>
      </div>
    </div>
  );
};

export default IntegrationPage;
