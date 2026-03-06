import { motion } from 'framer-motion';
import { BookOpen, ClipboardList, GraduationCap, TrendingUp, ArrowRight, Calendar } from 'lucide-react';
import { useFetchEnrollments, useFetchCourses, useFetchMe } from '@/hooks/useDataHooks';
import { useAuth } from '@/lib/auth';
import { getGreeting } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  const { data: enrollments } = useFetchEnrollments();
  const { data: allCourses } = useFetchCourses();
  const { data: freshUser } = useFetchMe();
  const { user: authUser } = useAuth();
  const greeting = getGreeting();

  const capitalize = (s: string) => s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : '';
  const user = freshUser || authUser;

  const firstName = capitalize(user?.first_name || '');
  const lastName = capitalize(user?.last_name || '');
  const fullName = firstName && lastName ? `${firstName} ${lastName}` : firstName || user?.email?.split('.')[0] || 'Student';

  return (
    <div className="space-y-8 pb-10">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="w-6 h-1 bg-accent rounded-full animate-pulse" />
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">Student Access</p>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-foreground tracking-tighter leading-none mb-2">
            {greeting}, <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-primary">{fullName}!</span>
          </h1>
          <p className="text-base text-muted-foreground max-w-xl font-medium">
            Welcome back to your learning dashboard. Here's what's happening today.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card border border-border p-3 rounded-2xl flex items-center gap-3 shadow-sm inline-flex"
        >
          <div className="bg-accent/10 p-2 rounded-xl">
            <Calendar className="h-4 w-4 text-accent" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase opacity-70">Current Session</p>
            <p className="text-xs font-black uppercase">2025 / 2026 Academic Year</p>
          </div>
        </motion.div>
      </section>


      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'My Enrollments', value: enrollments?.length ?? 0, icon: ClipboardList, color: 'bg-blue-500/10 text-blue-500' },
          { label: 'Available Courses', value: allCourses?.length ?? 0, icon: BookOpen, color: 'bg-accent/10 text-accent' },
          { label: 'Courses Completed', value: 0, icon: GraduationCap, color: 'bg-green-500/10 text-green-500' },
          { label: 'Learning Streak', value: '3 days', icon: TrendingUp, color: 'bg-orange-500/10 text-orange-500' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-xl border border-border bg-card p-5 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className={`rounded-lg p-3 ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-card-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Enrollments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground">Continue Learning</h2>
            <Link to="/app/student/enrollments" className="text-sm font-medium text-accent hover:underline flex items-center gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {enrollments && enrollments.length > 0 ? (
              enrollments.slice(0, 3).map((enrollment) => (
                <div
                  key={enrollment.id}
                  className="group rounded-xl border border-border bg-card p-4 hover:border-accent/40 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
                        <BookOpen className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-card-foreground">
                          {enrollment.course_details?.title || 'Unknown Course'}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          by {enrollment.course_details?.teacher_details?.first_name} {enrollment.course_details?.teacher_details?.last_name}
                        </p>
                      </div>
                    </div>
                    <Button variant="secondary" size="sm">Continue</Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 rounded-xl border border-dashed border-border bg-muted/30">
                <p className="text-muted-foreground">You haven't enrolled in any courses yet.</p>
                <Link to="/app/student/courses" className="mt-4 block text-accent font-medium">
                  Browse Courses
                </Link>
              </div>
            )}
          </div>
        </motion.div>

        {/* Promo sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-2xl bg-accent p-6 text-accent-foreground shadow-lg flex flex-col justify-between"
        >
          <div>
            <GraduationCap className="h-12 w-12 mb-4 opacity-50" />
            <h3 className="text-2xl font-bold mb-2">Ready to level up?</h3>
            <p className="text-accent-foreground/80 mb-6">
              Check out our newly added courses in Chemistry and Further Mathematics!
            </p>
          </div>
          <Button asChild className="bg-white text-accent hover:bg-white/90 w-full">
            <Link to="/app/student/courses">Explore More</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentDashboard;
