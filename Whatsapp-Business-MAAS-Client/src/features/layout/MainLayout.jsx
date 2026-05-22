// MainLayout.js
import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

const MainLayout = () => {
  return (
    <div className="flex  h-screen">
      <div className="w-[17%]  text-white p-4">
        <SideBar />
      </div>
      <div className="flex-1 w-[80%] bg-slate-200 p-6 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
