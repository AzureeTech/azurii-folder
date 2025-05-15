import React, { useState } from "react";
import UserManagement from "./UserManagement";
import ContentManagement from "./ContentManagement";
import Analytics from "./Analytics";

const AdminPanel = () => {
  const [section, setSection] = useState("dashboard");

  const renderSection = () => {
    switch (section) {
      case "users":
        return <UserManagement />;
      case "content":
        return <ContentManagement />;
      case "analytics":
        return <Analytics />;
      default:
        return (
          <div className="text-white">
            <h2 className="text-xl font-bold mb-4">Welcome to Admin Dashboard</h2>
            <p>Select an option to get started.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <div className="mb-6">
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            localStorage.removeItem("isAuthenticated");
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <button onClick={() => setSection("users")} className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded">
          User Management
        </button>
        <button onClick={() => setSection("content")} className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded">
          Content Management
        </button>
        <button onClick={() => setSection("analytics")} className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded">
          Analytics
        </button>
      </div>

      {renderSection()}
    </div>
  );
};

export default AdminPanel;
