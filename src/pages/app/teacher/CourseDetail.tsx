import { useParams } from 'react-router-dom';
import CourseRosterTable from '@/components/CourseRosterTable';

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const courseId = Number(id);

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-2">Course Details</h1>
      <p className="text-muted-foreground mb-6">Student roster for course #{courseId}</p>
      <CourseRosterTable courseId={courseId} />
    </div>
  );
};

export default CourseDetail;
