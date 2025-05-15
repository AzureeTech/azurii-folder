// Remove the hardcoded `stats` array and receive data via props
const AnalyticsDashboard = ({ stats }) => {  // 👈 Accept props
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Analytics Dashboard</h2>
      {/* Rest of your existing JSX */}
    </div>
  );
};