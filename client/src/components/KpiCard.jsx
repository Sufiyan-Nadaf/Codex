export default function KpiCard({ label, value }) {
  return (
    <div className="rounded-xl bg-white p-4 shadow-sm border border-slate-100">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="text-2xl font-semibold text-slate-900 mt-2">{value}</p>
    </div>
  );
}
