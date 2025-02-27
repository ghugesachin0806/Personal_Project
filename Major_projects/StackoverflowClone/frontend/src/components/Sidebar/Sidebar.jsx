import React from "react";

const Sidebar = () => {
  return (
    <div>
    <div className="w-auto h-screen bg-gray-900 text-white p-4">
      <h2 className="text-xl font-bold mb-4">Sidebar</h2>
      <ul className="space-y-2">
        <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Home</li>
        <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Questions</li>
        <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Tags</li>
        <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Users</li>
        <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Settings</li>
      </ul>
    </div>
    </div>
  );
};

export default Sidebar;