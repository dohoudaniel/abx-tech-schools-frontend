import { Button } from '@/components/ui/button';
import { useEnroll } from '@/hooks/useDataHooks';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface EnrollmentButtonProps {
  studentId: number;
  courseId: number;
  isEnrolled?: boolean;
}

const EnrollmentButton = ({ studentId, courseId, isEnrolled }: EnrollmentButtonProps) => {
  const { mutate, isPending } = useEnroll();
  const { toast } = useToast();

  if (isEnrolled) {
    return (
      <Button variant="outline" size="sm" disabled className="opacity-60">
        Enrolled
      </Button>
    );
  }

  const handleEnroll = () => {
    mutate({ student: studentId, course: courseId }, {
      onSuccess: () => toast({ title: 'Enrolled!', description: "Keep going — you're learning something new!" }),
      onError: (err: any) => {
        const msg = err?.response?.status === 400
          ? "You're already enrolled in this course."
          : 'Failed to enroll. Please try again.';
        toast({ title: 'Error', description: msg, variant: 'destructive' });
      },
    });
  };

  return (
    <Button
      size="sm"
      onClick={handleEnroll}
      disabled={isPending}
      className="bg-accent text-accent-foreground hover:bg-accent/90 active:scale-[0.98] transition-transform"
    >
      {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Enroll'}
    </Button>
  );
};

export default EnrollmentButton;
