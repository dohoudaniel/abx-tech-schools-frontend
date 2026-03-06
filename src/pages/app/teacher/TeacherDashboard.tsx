import { motion } from 'framer-motion';
import { BookOpen, Users, TrendingUp } from 'lucide-react';
import { useFetchCourses, useFetchStudents } from '@/hooks/useDataHooks';

const StatCard = ({ icon: Icon, label, value, index }: { icon: any; label: string; value: string | number; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.08, duration: 0.4 }}
    className="rounded-lg border border-border bg-card p-6 flex items-center gap-4"
  >
    <div className="rounded-md bg-accent/10 p-3"><Icon className="h-5 w-5 text-accent" /></div>
    <div>
      <p className="text-2xl font-bold text-card-foreground">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  </motion.div>
);

const TeacherDashboard = () => {
  const { data: courses } = useFetchCourses();
  const { data: students } = useFetchStudents();

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Teacher Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard icon={BookOpen} label="Total Courses" value={courses?.length ?? '—'} index={0} />
        <StatCard icon={Users} label="Total Students" value={students?.length ?? '—'} index={1} />
        <StatCard icon={TrendingUp} label="Active" value="—" index={2} />
      </div>
      <p className="text-muted-foreground">Welcome! Use the sidebar to manage your courses and students.</p>
    </div>
  );
};

export default TeacherDashboard;
