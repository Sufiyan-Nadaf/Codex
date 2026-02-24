import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { loginApi } from '../features/auth/authApi';
import { useAuthStore } from '../app/store';

export default function LoginPage() {
  const [form, setForm] = useState({ email: 'demo@gstsaas.com', password: 'Demo@1234' });
  const navigate = useNavigate();
  const setSession = useAuthStore((s) => s.setSession);

  const mutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      const businessId = data.user.memberships?.[0]?.business;
      setSession({ user: data.user, tokens: data.tokens, businessId });
      navigate('/dashboard');
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form className="bg-white p-8 rounded-xl shadow w-96 space-y-4" onSubmit={(e) => { e.preventDefault(); mutation.mutate(form); }}>
        <h1 className="text-xl font-bold">GST Automation Login</h1>
        <input className="w-full border p-2 rounded" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" className="w-full border p-2 rounded" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="bg-blue-600 text-white w-full p-2 rounded">Login</button>
      </form>
    </div>
  );
}
