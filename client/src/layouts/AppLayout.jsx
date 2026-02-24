import { Link, Outlet } from 'react-router-dom';

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-slate-900 text-white px-6 py-4 flex gap-4">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/invoices">Invoices</Link>
      </header>
      <main className="p-6 max-w-6xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
}
