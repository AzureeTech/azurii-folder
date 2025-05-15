const AnalyticsDashboard = () => {
  const stats = [
    { name: 'Total Visitors', value: '12,483', change: '+12%', trend: 'up' },
    { name: 'Active Users', value: '3,892', change: '+5%', trend: 'up' },
    { name: 'Bounce Rate', value: '34%', change: '-2%', trend: 'down' }
  ];

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Analytics Dashboard</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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

      {/* Charts Section */}
      <div className="space-y-6">
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="font-medium mb-4">Visitor Trends</h3>
          <div className="h-64 bg-gray-800 rounded flex items-center justify-center">
            <p className="text-gray-500">Chart visualization would appear here</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="font-medium mb-4">Top Pages</h3>
            <ul className="space-y-3">
              {['Homepage', 'Products', 'About Us', 'Contact'].map((page, i) => (
                <li key={i} className="flex justify-between">
                  <span>{page}</span>
                  <span className="text-gray-400">{(i+1)*12}%</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="font-medium mb-4">Traffic Sources</h3>
            <ul className="space-y-3">
              {['Organic Search', 'Direct', 'Social', 'Referral'].map((source, i) => (
                <li key={i} className="flex justify-between">
                  <span>{source}</span>
                  <span className="text-gray-400">{(i+1)*15}%</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};