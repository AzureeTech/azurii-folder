import React from "react";
import { Link } from "react-router-dom";

const ContentManagement = () => {
  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-6">Content Management</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Manage Posts Card */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition-colors">
          <h3 className="text-lg font-semibold mb-3">Manage Posts</h3>
          <p className="text-gray-300 mb-4">Create, edit, and organize your blog posts and articles.</p>
          <Link 
            to="/content/posts" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors"
          >
            Go to Posts
          </Link>
        </div>
        
        {/* Upload Media Card */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition-colors">
          <h3 className="text-lg font-semibold mb-3">Upload Media</h3>
          <p className="text-gray-300 mb-4">Upload and manage images, videos, and other media files.</p>
          <Link 
            to="/content/media" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors"
          >
            Upload Media
          </Link>
        </div>
        
        {/* Edit Pages Card */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition-colors">
          <h3 className="text-lg font-semibold mb-3">Edit Pages</h3>
          <p className="text-gray-300 mb-4">Edit static pages like About, Contact, and Terms of Service.</p>
          <Link 
            to="/content/pages" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors"
          >
            Edit Pages
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContentManagement;