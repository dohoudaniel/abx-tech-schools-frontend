import { motion } from 'framer-motion';
import { BookOpen, Users, TrendingUp, ArrowRight, GraduationCap, Clock, Calendar } from 'lucide-react';
import { useFetchMyCourses, useFetchMyStudents, useFetchMe, useFetchEnrollments } from '@/hooks/useDataHooks';
import { useAuth } from '@/lib/auth';
import { getGreeting } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDistanceToNow } from 'date-fns';

const StatCard = ({ icon: Icon, label, value, index, trend }: { icon: any; label: string; value: string | number; index: number, trend?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.08, duration: 0.4 }}
    className="relative group rounded-3xl border border-border bg-card p-6 flex flex-col gap-4 shadow-sm hover:shadow-xl hover:border-accent/40 transition-all duration-300"
  >
    <div className="flex items-center justify-between">
      <div className="rounded-2xl bg-accent/10 p-4 group-hover:bg-accent group-hover:text-white transition-colors duration-500">
        <Icon className="h-6 w-6 text-accent group-hover:text-white transition-colors" />
      </div>
      {trend && (
        <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-full flex items-center gap-1">
          <TrendingUp className="h-3 w-3" /> {trend}
        </span>
      )}
    </div>
    <div>
      <p className="text-3xl font-black text-card-foreground tracking-tight">{value}</p>
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
    </div>
  </motion.div>
);

const TeacherDashboard = () => {
  const { data: courses, isLoading: coursesLoading } = useFetchMyCourses();
  const { data: students, isLoading: studentsLoading } = useFetchMyStudents();
  const { data: enrollments, isLoading: enrollmentsLoading } = useFetchEnrollments();
  const { data: freshUser } = useFetchMe();
  const { user: authUser } = useAuth();
  const greeting = getGreeting();

  const capitalize = (s: string) => s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : '';
  const user = freshUser || authUser;

  const firstName = capitalize(user?.first_name || '');
  const lastName = capitalize(user?.last_name || '');
  const fullName = firstName && lastName ? `${firstName} ${lastName}` : firstName || user?.email?.split('.')[0] || 'Teacher';

  return (
    <div className="space-y-10 pb-20">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="w-8 h-1 bg-accent rounded-full animate-pulse" />
            <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">Teacher Access</p>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tighter leading-none mb-4">
            {greeting}, <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-primary">{fullName}!</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl font-medium">
            Here's an overview of your classroom's academic performance and school statistics.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card border border-border p-4 rounded-2xl flex items-center gap-4 shadow-sm"
        >
          <div className="bg-accent/10 p-3 rounded-xl">
            <Calendar className="h-5 w-5 text-accent" />
          </div>
          <div>
            <p className="text-xs font-bold text-muted-foreground uppercase opacity-70">Current Session</p>
            <p className="text-sm font-black">2023 / 2024 Academic Year</p>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={BookOpen} label="Total Courses" value={courses?.length ?? 0} index={0} trend="+12%" />
        <StatCard icon={Users} label="Enrolled Students" value={students?.length ?? 0} index={1} trend="+4%" />
        <StatCard icon={TrendingUp} label="Engagement Rate" value="High" index={2} trend="Stable" />
        <StatCard icon={Clock} label="Classroom Hours" value="128h" index={3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Active Programs Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 space-y-6"
        >
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h2 className="text-2xl font-black text-foreground tracking-tight">Active Programs</h2>
            <Link to="/app/teacher/courses" className="group text-sm font-bold text-accent flex items-center gap-1.5 hover:translate-x-1 transition-transform">
              Management Portal <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {coursesLoading ? (
              [...Array(3)].map((_, i) => <Skeleton key={i} className="h-28 w-full rounded-2xl" />)
            ) : courses && courses.length > 0 ? (
              courses.slice(0, 4).map((course, i) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + (i * 0.1) }}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 hover:shadow-lg hover:border-accent/30 transition-all duration-300"
                >
                  <Link to={`/app/teacher/courses/${course.id}`} className="absolute inset-0 z-10" />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-5">
                      <div className="h-14 w-14 rounded-2xl bg-muted group-hover:bg-accent/10 flex items-center justify-center transition-colors">
                        <BookOpen className="h-7 w-7 text-muted-foreground group-hover:text-accent font-bold" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-card-foreground group-hover:text-accent transition-colors truncate max-w-[200px] md:max-w-md">
                          {course.title}
                        </h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1 font-medium">
                          Created {new Date(course.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="hidden md:flex flex-col items-end">
                      <p className="text-xs font-black uppercase text-accent/60 tracking-widest leading-none mb-1">Status</p>
                      <p className="text-sm font-bold text-green-500">Active</p>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-16 rounded-3xl border border-dashed border-border bg-muted/20">
                <p className="text-muted-foreground font-medium">No courses found in your department.</p>
                <Button asChild variant="outline" className="mt-4 rounded-full">
                  <Link to="/app/teacher/courses">Launch New Course</Link>
                </Button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Recent Activity sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h2 className="text-2xl font-black text-foreground tracking-tight">Recent Activity</h2>
          </div>

          <div className="space-y-4">
            {enrollmentsLoading ? (
              [...Array(4)].map((_, i) => <Skeleton key={i} className="h-24 w-full rounded-2xl" />)
            ) : enrollments && enrollments.length > 0 ? (
              enrollments.slice(0, 5).map((e, idx) => (
                <motion.div
                  key={e.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + (idx * 0.05) }}
                  className="flex flex-col gap-3 p-4 rounded-2xl border border-border bg-card hover:border-accent/30 hover:shadow-sm transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-black text-xs shrink-0">
                      {e.student_details?.first_name?.[0]}{e.student_details?.last_name?.[0]}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-foreground text-sm truncate leading-tight">
                        {e.student_details?.first_name} {e.student_details?.last_name}
                      </p>
                      <p className="text-[10px] text-muted-foreground font-medium">
                        {formatDistanceToNow(new Date(e.enrolled_at), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                  <div className="bg-muted px-3 py-2 rounded-xl">
                    <p className="text-[10px] text-muted-foreground uppercase font-black opacity-60 tracking-wider mb-0.5">Joined Course</p>
                    <p className="text-xs font-bold text-accent truncate">{e.course_details?.title}</p>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="p-8 text-center bg-muted/20 rounded-2xl border border-dashed border-border">
                <GraduationCap className="h-10 w-10 text-muted-foreground mx-auto mb-3 opacity-30" />
                <p className="text-sm text-muted-foreground font-medium">No recent enrollments detected.</p>
              </div>
            )}
          </div>

          <Link to="/app/teacher/all-courses">
            <div className="group mt-6 p-6 rounded-[2rem] bg-accent text-accent-foreground shadow-lg overflow-hidden relative cursor-pointer active:scale-[0.98] transition-all">
              <GraduationCap className="absolute -bottom-4 -right-4 h-32 w-32 opacity-20 rotate-12 group-hover:scale-110 transition-transform duration-500" />
              <h3 className="text-xl font-black mb-1 relative z-10">Expand Your Reach</h3>
              <p className="text-sm opacity-80 mb-6 relative z-10 font-medium tracking-tight leading-snug">Reach more students by browsing school-wide courses.</p>
              <div className="bg-white/20 hover:bg-white/30 p-2 rounded-full w-fit relative z-10 transition-colors">
                <ArrowRight className="h-5 w-5" />
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
