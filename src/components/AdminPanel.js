import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/admin-login');
  };

  return (
    <div className="min-h-screen bg-gray-800">
      {/* Header */}
      <header className="bg-black text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Azurii World Dashboard</h1>
          <button 
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* User Management Card */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">User Management</h2>
            <div className="space-y-3">
              <button className="w-full bg-blue-100 text-blue-800 p-2 rounded hover:bg-blue-200">View Users</button>
              <button className="w-full bg-blue-100 text-blue-800 p-2 rounded hover:bg-blue-200">Add New User</button>
              <button className="w-full bg-blue-100 text-blue-800 p-2 rounded hover:bg-blue-200">Manage Roles</button>
            </div>
          </div>

          {/* Content Management Card */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Content Management</h2>
            <div className="space-y-3">
              <button className="w-full bg-green-100 text-green-800 p-2 rounded hover:bg-green-200">Manage Posts</button>
              <button className="w-full bg-green-100 text-green-800 p-2 rounded hover:bg-green-200">Upload Media</button>
              <button className="w-full bg-green-100 text-green-800 p-2 rounded hover:bg-green-200">Edit Pages</button>
            </div>
          </div>

          {/* Analytics Card */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Analytics</h2>
            <div className="space-y-3">
              <button className="w-full bg-purple-100 text-purple-800 p-2 rounded hover:bg-purple-200">View Statistics</button>
              <button className="w-full bg-purple-100 text-purple-800 p-2 rounded hover:bg-purple-200">Generate Reports</button>
              <button className="w-full bg-purple-100 text-purple-800 p-2 rounded hover:bg-purple-200">Traffic Analysis</button>
            </div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Activity</h2>
          <div className="border-t pt-4">
            <p className="text-gray-600">No recent activity</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;