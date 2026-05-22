import React from 'react';
import { FiUser, FiBriefcase, FiInfo, FiPhone, FiUpload } from 'react-icons/fi';
import { useUserDetails } from '../../../hooks/useUserDetails.js';
import { updateUserDetails, uploadAvatar } from '../../../services/userService.js';
import { updateCredentialDetails } from '../../../services/credentialService.js';

const MyDetailsPage = () => {
    const {
        userDetails,
        setUserDetails,
        loading,
        error,
        availableWabas = [],
        availablePhoneIds = [],
    } = useUserDetails();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleAvatarChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const result = await uploadAvatar(file);
            if (result.success) {
                setUserDetails((prev) => ({
                    ...prev,
                    avatar: result.data.avatar,
                }));
                alert(' Avatar uploaded!');
            } else {
                alert(' Failed to upload avatar');
            }
        } catch (err) {
            console.error("Upload error:", err);
            alert('Error uploading avatar');
        }
    };

    const SaveChanges = async () => {
        try {
            const fullName = `${userDetails.firstName} ${userDetails.lastName}`.trim();

            // 🔄 Update basic user info (name, avatar, mobile)
            await updateUserDetails({
                name: fullName,
                avatar: userDetails.avatar,
                mobile: userDetails.mobile,
            });

            const {
                businessId,
                companyName,
                website,
                wabaId,
                phoneId,
                whatsappAccessToken // include if available
            } = userDetails;

            const hasCredentials =
                businessId?.trim() &&
                wabaId?.trim() &&
                phoneId?.trim() &&
                whatsappAccessToken?.trim();

            if (hasCredentials) {
                await updateCredentialDetails({
                    whatsappAccessToken,      // ✅ include only these
                    business_id: businessId,
                    business_name: companyName,
                    website,
                    waba_id: wabaId,
                    phone_id: phoneId,
                });
            }

            alert("Details updated successfully!");
        } catch (err) {
            console.error("Save error:", err);
            alert("Failed to save changes.");
        }
    };



    if (loading) return <p className="p-6 text-gray-600">Loading...</p>;
    if (error) return <p className="p-6 text-red-600">Something went wrong</p>;

    return (
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg">
                    <FiUser className="h-5 w-5 text-gray-700" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">My Details</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center border-b border-gray-200/60 pb-8 mb-8">
                <div className="flex flex-col items-center text-center">
                    <img src={userDetails.avatar} alt="Profile Avatar" className="h-24 w-24 rounded-full object-cover mb-4 ring-4 ring-white/50" />
                    <label className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 rounded-lg border border-gray-300 cursor-pointer">
                        <FiUpload size={14} /> Upload Picture
                        <input type="file" onChange={handleAvatarChange} className="hidden" accept="image/*" />
                    </label>
                </div>

                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label className="text-sm font-medium text-gray-600 mb-1 block">First Name</label>
                        <input type="text" name="firstName" value={userDetails.firstName} onChange={handleInputChange} className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-600 mb-1 block">Last Name</label>
                        <input type="text" name="lastName" value={userDetails.lastName} onChange={handleInputChange} className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg" />
                    </div>
                    <div className="sm:col-span-2">
                        <label className="text-sm font-medium text-gray-600 mb-1 block">Email Address</label>
                        <input type="email" name="email" value={userDetails.email} disabled className="w-full p-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-600 cursor-not-allowed" />
                    </div>
                    <div className="sm:col-span-2">
                        <label className="text-sm font-medium text-gray-600 mb-1 block">Mobile Number</label>
                        <input
                            type="tel"
                            name="mobile"
                            value={userDetails.mobile || ''}
                            onChange={handleInputChange}
                            placeholder="Enter mobile number"
                            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg"
                        />
                    </div>


                </div>
            </div>

            <div className="border-b border-gray-200/60 pb-8 mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <FiBriefcase /> Business Profile
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="text-sm font-medium text-gray-600 mb-1 block">Company Name</label>
                        <input type="text" name="companyName" value={userDetails.companyName} onChange={handleInputChange} placeholder="e.g., Acme Inc." className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-600 mb-1 block">Website</label>
                        <input type="text" name="website" value={userDetails.website} onChange={handleInputChange} placeholder="https://example.com" className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg" />
                    </div>
                </div>
            </div>

            <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <FiInfo /> API Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50/80 rounded-xl border border-gray-200/80">
                    <div className="md:col-span-2">
                        <label className="text-sm font-medium text-gray-600 mb-1">Business ID</label>
                        <input type="text" name="businessId" value={userDetails.businessId || ''} onChange={handleInputChange} className="w-full p-3 bg-white border border-gray-300 rounded-lg text-sm" placeholder="Enter Business ID" />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-600 mb-1">WABA ID</label>
                        <div className="flex gap-2">
                            <input type="text" name="wabaId" value={userDetails.wabaId || ''} onChange={handleInputChange} className="flex-1 p-3 bg-white border border-gray-300 rounded-lg text-sm" placeholder="Enter or select WABA ID" />
                            <select onChange={(e) => setUserDetails((prev) => ({ ...prev, wabaId: e.target.value }))} className="w-1/3 p-3 bg-gray-50 border border-gray-300 rounded-lg text-sm" defaultValue="">
                                <option value="" disabled>Select</option>
                                {availableWabas.map((waba) => (
                                    <option key={waba.id} value={waba.id}>{`WABA - ${waba.id}`}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-600 mb-1">Phone Number ID</label>
                        <div className="flex gap-2">
                            <input type="text" name="phoneId" value={userDetails.phoneId || ''} onChange={handleInputChange} className="flex-1 p-3 bg-white border border-gray-300 rounded-lg text-sm" placeholder="Enter or select Phone ID" />
                            <select onChange={(e) => setUserDetails((prev) => ({ ...prev, phoneId: e.target.value }))} className="w-1/3 p-3 bg-gray-50 border border-gray-300 rounded-lg text-sm" defaultValue="">
                                <option value="" disabled>Select</option>
                                {availablePhoneIds.map((pid) => (
                                    <option key={pid} value={pid}>{pid}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <FiPhone /> Linked Phone Numbers
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-3">
                    {userDetails.phoneNumbers?.length > 0 ? (
                        userDetails.phoneNumbers.map((num, index) => (
                            <li key={index}>{num}</li>
                        ))
                    ) : (
                        <li className="text-gray-500 italic">No phone numbers added yet</li>
                    )}
                </ul>
            </div>

            <div className="flex justify-end gap-4 pt-6 border-t border-gray-200/60">
                <button className="px-6 py-3 text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 rounded-xl border border-gray-300">Cancel</button>
                <button onClick={SaveChanges} className="px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-gray-900 to-black hover:from-gray-800 hover:to-gray-900 rounded-xl shadow-md">Save Changes</button>
            </div>
        </div>
    );
};

export default MyDetailsPage;