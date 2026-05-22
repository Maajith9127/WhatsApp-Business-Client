import React, { useState } from "react";
import { FiUsers, FiUserPlus, FiMail, FiUser, FiShield } from "react-icons/fi";

const initialTeam = [
  { name: "Sathish Kumar", email: "sathish@jarvis.com", role: "Admin", status: "Active" },
  { name: "Meena Patel", email: "meena@jarvis.com", role: "Manager", status: "Active" },
  { name: "Arham J", email: "arham@jarvis.com", role: "Viewer", status: "Invited" },
];

const TeamPage = () => {
  const [team, setTeam] = useState(initialTeam);
  const [invite, setInvite] = useState({ email: "", role: "Viewer" });

  const handleInviteChange = (e) => {
    const { name, value } = e.target;
    setInvite((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendInvite = () => {
    if (!invite.email) return alert("Enter email");
    setTeam((prev) => [...prev, { ...invite, name: "Pending", status: "Invited" }]);
    setInvite({ email: "", role: "Viewer" });
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg">
          <FiUsers className="h-5 w-5 text-gray-700" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Team Management</h2>
      </div>

      {/* Invite Form */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="md:col-span-2">
          <label className="text-sm font-medium text-gray-600 mb-1 flex items-center gap-2">
            <FiMail /> Email to invite
          </label>
          <input
            name="email"
            value={invite.email}
            onChange={handleInviteChange}
            placeholder="someone@example.com"
            className="w-full p-3 border border-gray-300 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600 mb-1 flex items-center gap-2">
            <FiShield /> Role
          </label>
          <select
            name="role"
            value={invite.role}
            onChange={handleInviteChange}
            className="w-full p-3 border border-gray-300 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option>Admin</option>
            <option>Manager</option>
            <option>Viewer</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleSendInvite}
        className="mb-8 px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-gray-900 to-black hover:from-gray-800 hover:to-gray-900 rounded-lg transition duration-300"
      >
        <FiUserPlus className="inline mr-2" />
        Send Invite
      </button>

      {/* Team List */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Team Members</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {team.map((member, i) => (
            <div key={i} className="p-4 border border-gray-200 rounded-xl bg-gray-50/70 shadow-sm">
              <h4 className="text-gray-800 font-semibold text-sm mb-1 flex items-center gap-2">
                <FiUser />
                {member.name}
              </h4>
              <p className="text-xs text-gray-500">{member.email}</p>
              <p className="text-xs text-blue-600 mt-1">{member.role}</p>
              <span className={`text-xs mt-1 inline-block font-medium ${member.status === "Active" ? "text-green-600" : "text-yellow-500"}`}>
                {member.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
