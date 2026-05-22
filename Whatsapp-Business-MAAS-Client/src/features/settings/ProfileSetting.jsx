import React, { useState } from "react";
import {
  FiBell, FiMail, FiMessageSquare, FiUser, FiKey, FiUsers, FiCreditCard,
  FiInbox, FiSettings, FiGrid, FiShield, FiSmartphone
} from "react-icons/fi";

import SettingsHeader from "./components/SettingsHeader";
import StatsCard from "./components/StatsCard";
import TabButton from "./components/TabButton";

import BillingPage from "./elements/BillingPage";
import EmailPage from "./elements/EmailPage";
import IntegrationPage from "./elements/IntegrationPage";
import MyDetailsPage from "./elements/MyDetailsPage";
import NotificationSection from "./elements/NotificationSection";
import PasswordPage from "./elements/PasswordPage";
import PlanPage from "./elements/PlanPage";
import ProfilePage from "./elements/ProfilePage";
import TeamPage from "./elements/TeamPage";

const ProfileSetting
 = () => {
  const [activeTab, setActiveTab] = useState("My details");

  const tabs = [
    { name: "My details", icon: <FiUser size={16} /> },
    { name: "Profile", icon: <FiGrid size={16} /> },
    { name: "Password", icon: <FiKey size={16} /> },
    { name: "Team", icon: <FiUsers size={16} /> },
    { name: "Plan", icon: <FiCreditCard size={16} /> },
    { name: "Billing", icon: <FiCreditCard size={16} /> },
    { name: "Email", icon: <FiInbox size={16} /> },
    { name: "Notifications", icon: <FiBell size={16} /> },
    { name: "Integrations", icon: <FiSettings size={16} /> },
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="p-4 md:p-5 w-full max-w-7xl mx-aut">
        <SettingsHeader />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatsCard title="Active Notifications" value="3" change="+2 this week" icon={<FiBell />} color="blue" />
          <StatsCard title="Security Score" value="95%" change="+5% improved" icon={<FiShield />} color="green" />
          <StatsCard title="Connected Devices" value="4" change="2 active" icon={<FiSmartphone />} color="purple" />
          <StatsCard title="Last Login" value="2h ago" change="Secure session" icon={<FiUser />} color="gray" />
        </div>

        <div className="mb-8">
          <div className="flex overflow-x-auto gap-2 md:gap-3 pb-2">
            {tabs.map((tab) => (
              <TabButton
                key={tab.name}
                tab={tab}
                isActive={activeTab === tab.name}
                onClick={() => setActiveTab(tab.name)}
              />
            ))}
          </div>
        </div>

        <div className="mt-6">
          {activeTab === "Notifications" && <NotificationSection />}
          {activeTab === "My details" && <MyDetailsPage />}
          {activeTab === "Profile" && <ProfilePage/>}
          {activeTab === "Password" && <PasswordPage/>}
          {activeTab === "Team" && <TeamPage/>}
          {activeTab === "Plan" && <PlanPage/>}
          {activeTab === "Billing" && <BillingPage/>}
          {activeTab === "Email" && <EmailPage/>}
          {activeTab === "Integrations" && <IntegrationPage/>}

          {/* You can add more below as you build them */}
        </div>

      </div>
    </div>
  );
};

export default ProfileSetting
;
