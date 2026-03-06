import { motion } from 'framer-motion';
import { BookOpen, ClipboardList } from 'lucide-react';
import { useFetchEnrollments } from '@/hooks/useDataHooks';

const StudentDashboard = () => {
  const { data: enrollments } = useFetchEnrollments();

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Student Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="rounded-lg border border-border bg-card p-6 flex items-center gap-4">
          <div className="rounded-md bg-accent/10 p-3"><ClipboardList className="h-5 w-5 text-accent" /></div>
          <div>
            <p className="text-2xl font-bold text-card-foreground">{enrollments?.length ?? '—'}</p>
            <p className="text-sm text-muted-foreground">My Enrollments</p>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.4 }} className="rounded-lg border border-border bg-card p-6 flex items-center gap-4">
          <div className="rounded-md bg-accent/10 p-3"><BookOpen className="h-5 w-5 text-accent" /></div>
          <div>
            <p className="text-sm text-muted-foreground">Keep going — you're learning something new!</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentDashboard;
