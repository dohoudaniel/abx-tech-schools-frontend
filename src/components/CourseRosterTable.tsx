import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { useFetchCourseStudents } from '@/hooks/useDataHooks';
import { Skeleton } from '@/components/ui/skeleton';
import type { Student } from '@/types';

const CourseRosterTable = ({ courseId }: { courseId: number }) => {
  const { data: students, isLoading } = useFetchCourseStudents(courseId);

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
      </div>
    );
  }

  if (!students?.length) {
    return <p className="text-muted-foreground text-center py-8">No students enrolled yet.</p>;
  }

  return (
    <div className="rounded-lg border overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Date of Birth</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((s: Student) => (
            <TableRow key={s.id} className="hover:bg-cream focus-within:border-l-2 focus-within:border-l-accent transition-colors">
              <TableCell className="font-medium">{s.first_name} {s.last_name}</TableCell>
              <TableCell>{s.email}</TableCell>
              <TableCell>{s.gender || '—'}</TableCell>
              <TableCell>{s.date_of_birth || '—'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CourseRosterTable;
