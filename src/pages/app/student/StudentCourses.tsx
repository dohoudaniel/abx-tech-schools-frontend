import { useFetchCourses, useFetchEnrollments } from '@/hooks/useDataHooks';
import { useAuth } from '@/lib/auth';
import CourseCard from '@/components/CourseCard';
import EnrollmentButton from '@/components/EnrollmentButton';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';

const StudentCourses = () => {
  const { data: courses, isLoading } = useFetchCourses();
  const { data: enrollments } = useFetchEnrollments();
  const { user } = useAuth();

  const enrolledCourseIds = new Set(
    enrollments?.map((e) => e.course) ?? []
  );

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Available Courses</h1>
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-40 rounded-lg" />)}
        </div>
      ) : !courses?.length ? (
        <p className="text-muted-foreground text-center py-16">No courses available yet. Check back soon!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((c, i) => (
            <motion.div key={c.id} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06, duration: 0.4 }}>
              <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
                <CourseCard course={c} index={i} />
                <div className="mt-3">
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
