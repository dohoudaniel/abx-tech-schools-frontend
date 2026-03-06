import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useFetchMe } from '@/hooks/useDataHooks';
import { motion } from 'framer-motion';
import { User, Mail, Shield, LogOut, RefreshCw, BadgeCheck, Calendar, Cake } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const SettingsPage = () => {
  const { logout } = useAuth();
  const { data: userData, isLoading, refetch, isFetching } = useFetchMe();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
    toast({ title: 'Logged out', description: 'You have been signed out safely.' });
  };

  const handleRefresh = () => {
    refetch();
    toast({ title: 'Data refreshed', description: 'Your profile information has been updated.' });
  };

  const fullName = userData ? `${userData.first_name || ''} ${userData.last_name || ''}`.trim() : 'User';

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account and profile information.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="md:col-span-1 space-y-6"
        >
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col items-center text-center">
            <div className="h-24 w-24 rounded-full bg-accent/10 flex items-center justify-center mb-4 relative">
              <User className="h-12 w-12 text-accent" />
              <div className="absolute bottom-0 right-0 bg-green-500 h-6 w-6 rounded-full border-4 border-card" />
            </div>
            {isLoading ? (
              <div className="space-y-2 w-full">
                <Skeleton className="h-6 w-3/4 mx-auto" />
                <Skeleton className="h-4 w-1/2 mx-auto" />
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold text-card-foreground capitalize">{fullName || 'Student'}</h2>
                <p className="text-sm text-muted-foreground mb-4 uppercase tracking-wider font-medium">{userData?.role}</p>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-accent/10 rounded-full text-accent text-xs font-bold">
                  <BadgeCheck className="h-4 w-4" />
                  VERIFIED ACCOUNT
                </div>
              </>
            )}
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-4 text-center items-center">
            <div className="space-y-1">
              <h4 className="font-semibold text-foreground">Sign Out</h4>
              <p className="text-xs text-muted-foreground">End your current session safely.</p>
            </div>
            <Button variant="destructive" onClick={handleLogout} className="gap-2 w-full">
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </motion.div>

        {/* Details Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:col-span-2 space-y-6"
        >
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-muted/30 flex items-center justify-between">
              <h3 className="font-semibold">Personal Information</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRefresh}
                disabled={isFetching}
                className="gap-2 text-muted-foreground"
              >
                <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <User className="h-3.5 w-3.5" /> First Name
                  </p>
                  <p className="text-foreground">{isLoading ? <Skeleton className="h-5 w-24" /> : userData?.first_name || '—'}</p>
                </div>
                <div className="space-y-1.5">
                  <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <User className="h-3.5 w-3.5" /> Last Name
                  </p>
                  <p className="text-foreground">{isLoading ? <Skeleton className="h-5 w-24" /> : userData?.last_name || '—'}</p>
                </div>
                <div className="space-y-1.5">
                  <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5" /> Email Address
                  </p>
                  <p className="text-foreground font-medium">{isLoading ? <Skeleton className="h-5 w-48" /> : userData?.email}</p>
                </div>
                <div className="space-y-1.5">
                  <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Shield className="h-3.5 w-3.5" /> User Role
                  </p>
                  <p className="text-foreground capitalize">{userData?.role || '—'}</p>
                </div>
                {userData?.profile_data?.gender && (
                  <div className="space-y-1.5">
                    <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <User className="h-3.5 w-3.5" /> Gender
                    </p>
                    <p className="text-foreground">{userData.profile_data.gender}</p>
                  </div>
                )}
                {userData?.profile_data?.date_of_birth && (
                  <div className="space-y-1.5">
                    <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <Cake className="h-3.5 w-3.5" /> Date of Birth
                    </p>
                    <p className="text-foreground">{new Date(userData.profile_data.date_of_birth).toLocaleDateString(undefined, { dateStyle: 'long' })}</p>
                  </div>
                )}
              </div>

              <hr className="border-border" />

              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="outline" className="flex-1" disabled>Edit Profile</Button>
                <Button variant="outline" className="flex-1" disabled>Change Password</Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SettingsPage;
