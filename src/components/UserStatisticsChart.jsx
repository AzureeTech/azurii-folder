import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function UserStatisticsChart() {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'New Users',
        data: [30, 45, 28, 60, 75],
        borderColor: 'rgb(59, 130, 246)', // Tailwind blue-500
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'User Growth Over Time' },
    },
    scales: {
      x: {
        ticks: { color: '#fff' },
      },
      y: {
        ticks: { color: '#fff' },
      },
    },
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow mt-10">
      <h2 className="text-xl font-semibold text-white mb-4">User Statistics</h2>
      <Line data={data} options={options} />
    </div>
  );
}
