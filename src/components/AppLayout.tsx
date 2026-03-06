import { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import {
  BookOpen, Users, GraduationCap, Settings, LogOut, Menu, X,
  LayoutDashboard, UserCheck, ClipboardList
} from 'lucide-react';

const teacherNav = [
  { to: '/app/teacher', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/app/teacher/courses', label: 'My Courses', icon: BookOpen },
  { to: '/app/teacher/students', label: 'Students', icon: Users },
];

const studentNav = [
  { to: '/app/student', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/app/student/courses', label: 'Courses', icon: BookOpen },
  { to: '/app/student/enrollments', label: 'My Enrollments', icon: ClipboardList },
];

const sharedNav = [
  { to: '/app/teachers', label: 'Teachers', icon: UserCheck },
  { to: '/app/students', label: 'Students', icon: GraduationCap },
  { to: '/app/parents', label: 'Parents', icon: Users },
  { to: '/app/settings', label: 'Settings', icon: Settings },
];

const AppLayout = () => {
  const { role, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const roleNav = (role === 'teacher' || role === 'admin') ? teacherNav : studentNav;
  const allNav = [...roleNav, ...sharedNav];

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  const NavItems = () => (
    <>
      {allNav.map((item) => {
        const active = location.pathname === item.to;
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${active
                ? 'bg-accent/10 text-accent'
                : 'text-foreground/70 hover:bg-muted hover:text-foreground'
              }`}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </>
  );

  return (
    <div className="min-h-screen flex bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r border-border bg-card p-4">
        <Logo className="mb-8" />
        <nav className="flex-1 space-y-1" aria-label="Main navigation">
          <NavItems />
        </nav>
        <Button variant="ghost" onClick={handleLogout} className="justify-start gap-2 text-muted-foreground mt-4">
          <LogOut className="h-4 w-4" /> Logout
        </Button>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-card border-b border-border px-4 py-3">
        <Logo size="sm" />
        <Button variant="ghost" size="icon" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-card pt-16 px-4 pb-4 overflow-y-auto">
          <nav className="space-y-1" aria-label="Mobile navigation">
            <NavItems />
          </nav>
          <Button variant="ghost" onClick={handleLogout} className="justify-start gap-2 text-muted-foreground mt-6 w-full">
            <LogOut className="h-4 w-4" /> Logout
          </Button>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 md:ml-0 mt-14 md:mt-0 p-4 md:p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
