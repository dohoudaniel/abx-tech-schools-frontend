import { useParams, useNavigate } from 'react-router-dom';
import { useFetchCourse, useFetchCourseStudents } from '@/hooks/useDataHooks';
import { motion } from 'framer-motion';
import { Users, ArrowLeft, BookOpen, Calendar, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const courseId = Number(id);

  const { data: course, isLoading: courseLoading } = useFetchCourse(courseId);
  const { data: students, isLoading: studentsLoading } = useFetchCourseStudents(courseId);

  if (courseLoading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-12 w-1/3" />
        <Skeleton className="h-48 w-full rounded-2xl" />
        <Skeleton className="h-64 w-full rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="rounded-full hover:bg-accent/10 hover:text-accent"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold text-foreground">Course Details</h1>
      </div>

      {/* Course Hero Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-lg"
      >
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <BookOpen className="h-40 w-40 text-accent" />
        </div>

        <div className="p-8 md:p-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="bg-accent/10 text-accent text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Active Program
            </span>
            <span className="text-muted-foreground text-sm flex items-center gap-1.5 ml-2">
              <Calendar className="h-4 w-4" />
              Created {course?.created_at ? new Date(course.created_at).toLocaleDateString() : 'N/A'}
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6 tracking-tight">
            {course?.title}
          </h2>

          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
            {course?.description || "No description provided for this course section."}
          </p>
        </div>
      </motion.div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="bg-blue-500/10 p-3 rounded-xl">
              <Users className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">Enrolled Students</p>
              <p className="text-2xl font-bold">{students?.length || 0}</p>
            </div>
          </div>
        </div>
        {/* Add more stats if needed */}
      </div>

      {/* Student Roster Table */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            Student Roster
          </h3>
          <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
            Live Feed
          </span>
        </div>

        {studentsLoading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-14 w-full rounded-xl" />)}
          </div>
        ) : !students?.length ? (
          <div className="text-center py-20 rounded-3xl border border-dashed border-border bg-muted/20">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-30" />
            <h4 className="text-lg font-semibold">No Students Enrolled</h4>
            <p className="text-muted-foreground">Share this course with students to see them appear here.</p>
          </div>
        ) : (
          <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-xl">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-[80px] py-4">Avatar</TableHead>
                  <TableHead className="py-4">Student Name</TableHead>
                  <TableHead className="py-4">Contact Email</TableHead>
                  <TableHead className="py-4">Gender</TableHead>
                  <TableHead className="py-4 text-right pr-8">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((s, idx) => (
                  <motion.tr
                    key={s.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="group border-b last:border-0 hover:bg-muted/30 transition-colors"
                  >
                    <TableCell className="py-4">
                      <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-sm">
                        {s.first_name?.[0]}{s.last_name?.[0]}
                      </div>
                    </TableCell>
                    <TableCell className="py-4 font-bold text-card-foreground">
                      {s.first_name} {s.last_name}
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        {s.email}
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      {s.gender === 'M' ? 'Male' : s.gender === 'F' ? 'Female' : 'Not Specified'}
                    </TableCell>
                    <TableCell className="py-4 text-right pr-6">
                      <Button variant="outline" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        View Profile
                      </Button>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default CourseDetail;
