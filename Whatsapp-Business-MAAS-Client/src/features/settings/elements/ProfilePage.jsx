import React, { useState } from "react";
import { FiGlobe, FiMoon, FiBell, FiClock, FiFolder, FiImage } from "react-icons/fi";

const ProfilePage = () => {
    const [profileSettings, setProfileSettings] = useState({
        language: "English",
        theme: "Auto",
        notification: "Email",
        timezone: "Asia/Kolkata",
        defaultFolder: "Marketing",
        mediaQuality: "High"
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileSettings(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20">
            {/* Header Section */}
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg">
                    <FiGlobe className="h-5 w-5 text-gray-700" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Profile Preferences</h2>
            </div>

            {/* Settings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Language */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-1">
                        <FiGlobe /> Language
                    </label>
                    <select name="language" value={profileSettings.language} onChange={handleChange}
                        className="w-full p-3 border border-gray-300 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                        <option>English</option>
                        <option>Hindi</option>
                        <option>Tamil</option>
                        <option>Arabic</option>
                    </select>
                </div>

                {/* Theme */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-1">
                        <FiMoon /> Theme Preference
                    </label>
                    <select name="theme" value={profileSettings.theme} onChange={handleChange}
                        className="w-full p-3 border border-gray-300 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                        <option>Light</option>
                        <option>Dark</option>
                        <option>Auto</option>
                    </select>
                </div>

                {/* Notification Type */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-1">
                        <FiBell /> Default Notification
                    </label>
                    <select name="notification" value={profileSettings.notification} onChange={handleChange}
                        className="w-full p-3 border border-gray-300 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                        <option>Email</option>
                        <option>Push</option>
                        <option>WhatsApp</option>
                    </select>
                </div>

                {/* Timezone */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-1">
                        <FiClock /> Timezone
                    </label>
                    <input
                        type="text"
                        name="timezone"
                        value={profileSettings.timezone}
                        onChange={handleChange}
                        placeholder="Asia/Kolkata"
                        className="w-full p-3 border border-gray-300 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                </div>

                {/* Default Template Folder */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-1">
                        <FiFolder /> Default Template Folder
                    </label>
                    <select name="defaultFolder" value={profileSettings.defaultFolder} onChange={handleChange}
                        className="w-full p-3 border border-gray-300 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                        <option>Marketing</option>
                        <option>Support</option>
                        <option>Transactional</option>
                    </select>
                </div>

                {/* Media Quality */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-1">
                        <FiImage /> Media Upload Quality
                    </label>
                    <select name="mediaQuality" value={profileSettings.mediaQuality} onChange={handleChange}
                        className="w-full p-3 border border-gray-300 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                    </select>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-8 border-t border-gray-200/60 mt-10">
                <button className="px-6 py-3 text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 rounded-xl transition-all duration-300 border border-gray-300 hover:border-gray-400 hover:shadow-md">
                    Cancel
                </button>
                <button className="px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-gray-900 to-black hover:from-gray-800 hover:to-gray-900 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                    Save Preferences
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;
