import { motion } from 'framer-motion';
import type { Course } from '@/types';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  actionLabel?: string;
  onAction?: (course: Course) => void;
  index?: number;
}

const CourseCard = ({ course, actionLabel, onAction, index = 0 }: CourseCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.06, duration: 0.4 }}
    className="group rounded-lg border border-border bg-card p-6 md:p-6 p-4 shadow-sm hover:shadow-md transition-shadow focus-within:focus-accent"
    tabIndex={0}
  >
    <div className="flex items-start gap-3 mb-3">
      <div className="rounded-md bg-accent/10 p-2">
        <BookOpen className="h-5 w-5 text-accent" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-card-foreground truncate">{course.title}</h3>
        {course.teacher_details && (
          <p className="text-sm text-muted-foreground mt-1">by {course.teacher_details.first_name} {course.teacher_details.last_name}</p>
        )}
      </div>
    </div>
    {course.description && (
      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{course.description}</p>
    )}
    {actionLabel && onAction && (
      <Button
        size="sm"
        onClick={() => onAction(course)}
        className="w-full bg-accent text-accent-foreground hover:bg-accent/90 active:scale-[0.98] transition-transform"
      >
        {actionLabel}
      </Button>
    )}
  </motion.div>
);

export default CourseCard;
