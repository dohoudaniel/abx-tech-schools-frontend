import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const SettingsPage = () => {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
    toast({ title: 'Logged out', description: 'You have been signed out.' });
  };

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold text-foreground mb-6">Settings</h1>
      <div className="rounded-lg border border-border bg-card p-6 space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">Email</p>
          <p className="font-medium text-card-foreground">{user?.email || '—'}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Current Role</p>
          <p className="font-medium text-card-foreground capitalize">{role || 'Not set'}</p>
        </div>
        <hr className="border-border" />
        <Button variant="destructive" onClick={handleLogout}>Sign Out</Button>
      </div>
    </div>
  );
};

export default SettingsPage;
