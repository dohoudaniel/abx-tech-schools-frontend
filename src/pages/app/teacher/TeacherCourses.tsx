import { useFetchCourses } from '@/hooks/useDataHooks';
import CourseCard from '@/components/CourseCard';
import CreateCourseModal from '@/components/CreateCourseModal';
import { Skeleton } from '@/components/ui/skeleton';
import { Link } from 'react-router-dom';

const TeacherCourses = () => {
  const { data: courses, isLoading } = useFetchCourses();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">My Courses</h1>
        <CreateCourseModal />
      </div>
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-40 rounded-lg" />)}
        </div>
      ) : !courses?.length ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground mb-4">No courses yet. Create your first course!</p>
          <CreateCourseModal />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((c, i) => (
            <Link key={c.id} to={`/app/teacher/courses/${c.id}`}>
              <CourseCard course={c} index={i} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeacherCourses;
