import { useFetchEnrollments, useDropEnrollment } from '@/hooks/useDataHooks';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Trash2, Calendar, BookOpen, MoreVertical, PlayCircle } from 'lucide-react';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const StudentEnrollments = () => {
  const { data: enrollments, isLoading } = useFetchEnrollments();
  const drop = useDropEnrollment();
  const { toast } = useToast();

  const handleDrop = (id: number) => {
    drop.mutate(id, {
      onSuccess: () => toast({ title: 'Dropped', description: 'You have been unenrolled from the course.' }),
      onError: () => toast({ title: 'Error', description: 'Failed to drop course.', variant: 'destructive' }),
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">My Learning Journey</h1>
        <p className="text-muted-foreground mt-1">Track your progress and continue where you left off.</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-48 rounded-2xl" />)}
        </div>
      ) : !enrollments?.length ? (
        <div className="text-center py-20 bg-card rounded-2xl border border-dashed border-border">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
          <p className="text-muted-foreground mb-4">You have no enrollments yet.</p>
          <Button asChild variant="outline">
            <a href="/app/student/courses">Explore Courses</a>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {enrollments.map((e, i) => (
            <motion.div
              key={e.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="group rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-card-foreground leading-tight">
                      {e.course_details?.title || `Course #${e.course}`}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Teacher: {e.course_details?.teacher_details?.first_name} {e.course_details?.teacher_details?.last_name}
                    </p>
                  </div>
                </div>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 -mt-1 -mr-1">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Drop this course?</AlertDialogTitle>
                      <AlertDialogDescription>This action will remove you from the course. You can re-enroll later.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDrop(e.id)} className="bg-destructive text-destructive-foreground">Drop Course</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    Enrolled {e.enrolled_at ? new Date(e.enrolled_at).toLocaleDateString() : 'N/A'}
                  </span>
                  <span className="font-medium text-accent">0% Complete</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-accent/30 w-[0%] transition-all" />
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <Button className="flex-1 gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
                    <PlayCircle className="h-4 w-4" /> Start Learning
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentEnrollments;
