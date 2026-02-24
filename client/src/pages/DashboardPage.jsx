import { useQuery } from '@tanstack/react-query';
import { fetchDashboard } from '../features/dashboard/dashboardApi';
import KpiCard from '../components/KpiCard';
import ProfitChart from '../features/dashboard/ProfitChart';

export default function DashboardPage() {
  const { data } = useQuery({ queryKey: ['dashboard'], queryFn: fetchDashboard });

  if (!data) return <p>Loading...</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Business Health Dashboard</h1>
      <div className="grid md:grid-cols-4 gap-4">
        <KpiCard label="Revenue" value={`₹${data.metrics.revenue}`} />
        <KpiCard label="Collected" value={`₹${data.metrics.collected}`} />
        <KpiCard label="Profit" value={`₹${data.metrics.profit}`} />
        <KpiCard label="Health Score" value={`${data.metrics.healthScore}/100`} />
      </div>
      <div className="bg-white p-4 rounded-xl shadow-sm"><ProfitChart /></div>
      <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-amber-900">AI Insight: {data.aiSummary}</div>
    </div>
  );
}
