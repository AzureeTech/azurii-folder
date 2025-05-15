import React from 'react';
import { useState } from 'react';

const AnalyticsFetcher = () => {
  const [stats] = useState([
    { name: 'Total Visitors', value: '12,483', change: '+12%', trend: 'up' },
    { name: 'Active Users', value: '3,892', change: '+5%', trend: 'up' },
    { name: 'Bounce Rate', value: '34%', change: '-2%', trend: 'down' }
  ]);

  return (
    <div className="mt-8 bg-gray-900 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-white">Analytics Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-400">{stat.name}</p>
            <div className="flex items-end mt-2">
              <p className="text-2xl font-bold">{stat.value}</p>
              <span className={`ml-2 text-sm ${
                stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
              }`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsFetcher;