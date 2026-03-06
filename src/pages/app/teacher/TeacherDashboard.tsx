import { motion } from 'framer-motion';
import { BookOpen, Users, TrendingUp } from 'lucide-react';
import { useFetchCourses, useFetchMyStudents, useFetchMe } from '@/hooks/useDataHooks';
import { useAuth } from '@/lib/auth';
import { getGreeting } from '@/lib/utils';

const StatCard = ({ icon: Icon, label, value, index }: { icon: any; label: string; value: string | number; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.08, duration: 0.4 }}
    className="rounded-xl border border-border bg-card p-6 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="rounded-lg bg-accent/10 p-3"><Icon className="h-5 w-5 text-accent" /></div>
    <div>
      <p className="text-2xl font-bold text-card-foreground">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  </motion.div>
);

const TeacherDashboard = () => {
  const { data: courses } = useFetchCourses();
  const { data: students } = useFetchMyStudents();
  const { data: freshUser } = useFetchMe();
  const { user: authUser } = useAuth();
  const greeting = getGreeting();

  const capitalize = (s: string) => s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : '';
  const user = freshUser || authUser;

  const firstName = capitalize(user?.first_name || '');
  const lastName = capitalize(user?.last_name || '');
  const fullName = firstName && lastName ? `${firstName} ${lastName}` : firstName || user?.email?.split('.')[0] || 'Teacher';

  return (
    <div className="space-y-8">
      <section>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            {greeting}, <span className="text-accent">{fullName}!</span>
          </h1>
          <p className="text-muted-foreground mt-2">
            Here's an overview of your classroom's academic performance and school statistics.
          </p>
        </motion.div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard icon={BookOpen} label="Total Courses" value={courses?.length ?? '—'} index={0} />
        <StatCard icon={Users} label="Total Students" value={students?.length ?? '—'} index={1} />
        <StatCard icon={TrendingUp} label="Engagement" value="High" index={2} />
      </div>

      <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-12 text-center">
        <h2 className="text-xl font-semibold mb-2">Classroom Insights</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Detailed analytics and student performance metrics will appear here once the term progresses.
        </p>
      </div>
    </div>
  );
};

export default TeacherDashboard;
