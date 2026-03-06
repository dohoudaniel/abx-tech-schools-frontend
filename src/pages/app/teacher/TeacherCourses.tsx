import { useFetchMyCourses } from '@/hooks/useDataHooks';
import CourseCard from '@/components/CourseCard';
import CreateCourseModal from '@/components/CreateCourseModal';
import { Skeleton } from '@/components/ui/skeleton';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap } from 'lucide-react';

const TeacherCourses = () => {
  const { data: courses, isLoading } = useFetchMyCourses();

  return (
    <div className="space-y-10">
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-foreground tracking-tighter">My Courses</h1>
          <p className="text-muted-foreground mt-2 font-medium">Manage and monitor programs under your care.</p>
        </div>
        <CreateCourseModal />
      </section>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-64 rounded-3xl" />)}
        </div>
      ) : !courses?.length ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-24 rounded-[3rem] border border-dashed border-border bg-muted/20"
        >
          <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-6 opacity-30" />
          <h3 className="text-2xl font-bold mb-2">No active courses found</h3>
          <p className="text-muted-foreground max-w-sm mx-auto mb-8 font-medium">You haven't created any courses yet. Start your teaching journey today by launching your first program!</p>
          <CreateCourseModal />
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative"
            >
              <Link to={`/app/teacher/courses/${c.id}`} className="block group">
                <CourseCard course={c} index={0} />
                <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                  Manage
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}

      {/* Footer Info */}
      <div className="text-center opacity-40 py-10">
        <GraduationCap className="h-10 w-10 mx-auto mb-4" />
        <p className="text-xs font-mono tracking-widest uppercase">End of Directory</p>
      </div>
    </div>
  );
};

export default TeacherCourses;
