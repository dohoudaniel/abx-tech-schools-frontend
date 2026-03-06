import { Navigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';

const AppIndex = () => {
  const { role } = useAuth();

  if (role === 'teacher') return <Navigate to="/app/teacher" replace />;
  if (role === 'student') return <Navigate to="/app/student" replace />;

  // Default: redirect to settings to pick role
  return <Navigate to="/app/settings" replace />;
};

export default AppIndex;
