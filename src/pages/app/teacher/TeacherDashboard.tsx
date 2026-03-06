import { motion } from 'framer-motion';
import { BookOpen, Users, TrendingUp, ArrowRight, GraduationCap, Clock, Calendar } from 'lucide-react';
import { useFetchMyCourses, useFetchMyStudents, useFetchMe, useFetchEnrollments } from '@/hooks/useDataHooks';
import { useAuth } from '@/lib/auth';
import { getGreeting } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDistanceToNow } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

const StatCard = ({ icon: Icon, label, value, index, trend }: { icon: any; label: string; value: string | number; index: number, trend?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.08, duration: 0.4 }}
    className="relative group rounded-3xl border border-border bg-card p-5 flex flex-col gap-3 shadow-sm hover:shadow-xl hover:border-accent/40 transition-all duration-300"
  >
    <div className="flex items-center justify-between">
      <div className="rounded-2xl bg-accent/10 p-3 group-hover:bg-accent group-hover:text-white transition-colors duration-500">
        <Icon className="h-5 w-5 text-accent group-hover:text-white transition-colors" />
      </div>
      {trend && (
        <span className="text-[10px] font-bold text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
          <TrendingUp className="h-3 w-3" /> {trend}
        </span>
      )}
    </div>
    <div>
      <p className="text-2xl font-black text-card-foreground tracking-tight">{value}</p>
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</p>
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
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">Teacher Access</p>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-foreground tracking-tighter leading-none mb-2">
            {greeting}, <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-primary">{fullName}!</span>
          </h1>
          <p className="text-base text-muted-foreground max-w-xl font-medium">
            Your classroom's academic performance at a glance.
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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={BookOpen} label="Courses" value={courses?.length ?? 0} index={0} trend="+12%" />
        <StatCard icon={Users} label="Students" value={students?.length ?? 0} index={1} trend="+4%" />
        <StatCard icon={TrendingUp} label="Retention" value="High" index={2} />
        <StatCard icon={Clock} label="Hours" value="128h" index={3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Programs Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 space-y-4"
        >
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h2 className="text-xl font-black text-foreground tracking-tight">Active Programs</h2>
            <Link to="/app/teacher/courses" className="group text-xs font-bold text-accent flex items-center gap-1.5 hover:translate-x-1 transition-transform">
              Management Portal <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {coursesLoading ? (
              [...Array(3)].map((_, i) => <Skeleton key={i} className="h-24 w-full rounded-2xl" />)
            ) : courses && courses.length > 0 ? (
              courses.slice(0, 4).map((course, i) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + (i * 0.1) }}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card p-4 hover:shadow-lg hover:border-accent/30 transition-all duration-300"
                >
                  <Link to={`/app/teacher/courses/${course.id}`} className="absolute inset-0 z-10" />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-muted group-hover:bg-accent/10 flex items-center justify-center transition-colors">
                        <BookOpen className="h-6 w-6 text-muted-foreground group-hover:text-accent font-bold" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-card-foreground group-hover:text-accent transition-colors truncate max-w-[180px] md:max-w-md leading-tight">
                          {course.title}
                        </h3>
                        <p className="text-[10px] text-muted-foreground uppercase font-black opacity-60 tracking-wider mt-0.5">
                          Launch: {new Date(course.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="hidden sm:flex flex-col items-end">
                      <p className="text-[8px] font-black uppercase text-accent/60 tracking-widest leading-none mb-1">Status</p>
                      <p className="text-xs font-bold text-green-500 uppercase">Live</p>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-10 rounded-3xl border border-dashed border-border bg-muted/20">
                <p className="text-xs font-medium text-muted-foreground">No active courses detected.</p>
                <Button asChild variant="outline" size="sm" className="mt-3 rounded-full">
                  <Link to="/app/teacher/courses">Launch New</Link>
                </Button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Expand Your Reach Promo */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col h-full"
        >
          <Link to="/app/teacher/all-courses" className="h-full">
            <div className="group h-full p-6 rounded-[2rem] bg-accent text-accent-foreground shadow-lg overflow-hidden relative cursor-pointer active:scale-[0.98] transition-all flex flex-col justify-end min-h-[260px]">
              <GraduationCap className="absolute -top-4 -right-4 h-32 w-32 opacity-20 -rotate-12 group-hover:scale-110 transition-all duration-700" />
              <div className="relative z-10">
                <h3 className="text-2xl font-black mb-2 leading-tight">Expand Your Reach</h3>
                <p className="text-xs opacity-90 mb-6 font-medium tracking-tight leading-relaxed">
                  Collaborate across departments and grow your student network school-wide.
                </p>
                <div className="bg-white text-accent p-2.5 rounded-full w-fit shadow-xl group-hover:translate-x-2 transition-transform">
                  <ArrowRight className="h-5 w-5" />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>

      {/* Recent Activity Table Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h2 className="text-xl font-black text-foreground tracking-tight">Recent Activity Log</h2>
          <span className="text-[10px] font-black bg-muted px-2 py-0.5 rounded-full uppercase tracking-widest opacity-60">Live feed</span>
        </div>

        <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-md">
          {enrollmentsLoading ? (
            <div className="p-4 space-y-3">
              {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-10 w-full rounded-lg" />)}
            </div>
          ) : enrollments && enrollments.length > 0 ? (
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="hover:bg-transparent border-b">
                  <TableHead className="py-3 pl-6 font-black uppercase text-[9px] tracking-widest">Student</TableHead>
                  <TableHead className="py-3 font-black uppercase text-[9px] tracking-widest hidden sm:table-cell">Action</TableHead>
                  <TableHead className="py-3 font-black uppercase text-[9px] tracking-widest">Course</TableHead>
                  <TableHead className="py-3 pr-6 text-right font-black uppercase text-[9px] tracking-widest">Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {enrollments.slice(0, 5).map((e, idx) => (
                  <motion.tr
                    key={e.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + (idx * 0.05) }}
                    className="group hover:bg-muted/20 transition-colors border-b last:border-0"
                  >
                    <TableCell className="py-3 pl-6">
                      <div className="flex items-center gap-2.5">
                        <div className="h-7 w-7 rounded-full bg-accent/10 flex items-center justify-center text-accent font-black text-[10px]">
                          {e.student_details?.first_name?.[0]}{e.student_details?.last_name?.[0]}
                        </div>
                        <span className="font-bold text-xs truncate max-w-[100px] sm:max-w-none">
                          {e.student_details?.first_name} {e.student_details?.last_name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-3 hidden sm:table-cell">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider bg-green-500/10 text-green-600">
                        Join
                      </span>
                    </TableCell>
                    <TableCell className="py-3">
                      <span className="text-xs font-medium text-muted-foreground truncate max-w-[100px] sm:max-w-none block">
                        {e.course_details?.title}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 pr-6 text-right">
                      <span className="text-[10px] font-medium text-muted-foreground whitespace-nowrap">
                        {formatDistanceToNow(new Date(e.enrolled_at), { addSuffix: true })}
                      </span>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="py-12 text-center">
              <GraduationCap className="h-10 w-10 text-muted-foreground mx-auto mb-3 opacity-20" />
              <p className="text-xs font-bold text-muted-foreground">No recent enrollment activity detected.</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default TeacherDashboard;
