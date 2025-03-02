import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

export const Dashboard = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-r from-blue-100 to-emerald-2000">
      <Navbar />
      <div className="flex h-full">
        <Sidebar />
        <div className="flex-1 overflow-y-auto p-4">
          {/* Dynamic outlet content */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};
