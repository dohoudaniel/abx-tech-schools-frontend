import { useFetchEnrollments, useDropEnrollment } from '@/hooks/useDataHooks';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
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
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">My Enrollments</h1>
      {isLoading ? (
        <div className="space-y-3">{[...Array(4)].map((_, i) => <Skeleton key={i} className="h-16 rounded-lg" />)}</div>
      ) : !enrollments?.length ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground mb-2">You have no enrollments yet.</p>
          <p className="text-sm text-muted-foreground">Browse available courses and start learning!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {enrollments.map((e, i) => (
            <motion.div
              key={e.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              className="flex items-center justify-between rounded-lg border border-border bg-card p-4"
            >
              <div>
                <p className="font-semibold text-card-foreground">{e.course_name || `Course #${typeof e.course === 'number' ? e.course : e.course.id}`}</p>
                <p className="text-sm text-muted-foreground">Enrolled {e.enrolled_at ? new Date(e.enrolled_at).toLocaleDateString() : ''}</p>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10">
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
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentEnrollments;
