import { useFetchCourses, useFetchEnrollments } from '@/hooks/useDataHooks';
import { useAuth } from '@/lib/auth';
import CourseCard from '@/components/CourseCard';
import EnrollmentButton from '@/components/EnrollmentButton';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import { Search, Filter, BookOpen } from 'lucide-react';
import { Input } from '@/components/ui/input';

const StudentCourses = () => {
  const { data: courses, isLoading } = useFetchCourses();
  const { data: enrollments } = useFetchEnrollments();
  const { user } = useAuth();

  const enrolledCourseIds = new Set(
    enrollments?.map((e) => e.course) ?? []
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Explore Courses</h1>
          <p className="text-muted-foreground mt-1">Discover your next favorite subject.</p>
        </div>

        <div className="flex items-center gap-2 max-w-sm w-full">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              className="pl-9 bg-card border-border focus:ring-accent"
            />
          </div>
          <button className="p-2 rounded-md border border-border bg-card text-muted-foreground hover:text-foreground transition-colors">
            <Filter className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {['All Subjects', 'Mathematics', 'Science', 'Languages', 'Arts'].map((cat, i) => (
          <button
            key={cat}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${i === 0
                ? 'bg-accent text-accent-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-64 rounded-xl" />)}
        </div>
      ) : !courses?.length ? (
        <div className="text-center py-20 bg-card rounded-2xl border border-dashed border-border">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
          <p className="text-muted-foreground text-lg">No courses available yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="group"
            >
              <div className="h-full rounded-2xl border border-border bg-card p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
                <div className="flex-1">
                  <CourseCard course={c} index={i} />
                </div>
                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Term 1 • 2024
                  </span>
                  <EnrollmentButton
                    courseId={c.id}
                    isEnrolled={enrolledCourseIds.has(c.id)}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentCourses;
