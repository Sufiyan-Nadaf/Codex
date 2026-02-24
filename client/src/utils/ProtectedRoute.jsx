import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../app/store';

export default function ProtectedRoute({ children }) {
  const token = useAuthStore((s) => s.accessToken);
  return token ? children : <Navigate to="/login" replace />;
}
