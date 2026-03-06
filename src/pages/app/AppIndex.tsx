import { Navigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';

const AppIndex = () => {
  const { role } = useAuth();

  if (role === 'teacher') return <Navigate to="/app/teacher" replace />;
  if (role === 'student') return <Navigate to="/app/student" replace />;
  if (role === 'admin') return <Navigate to="/app/teacher" replace />; // Admin can act as teacher for now

  return <Navigate to="/auth/login" replace />;
};

export default AppIndex;
