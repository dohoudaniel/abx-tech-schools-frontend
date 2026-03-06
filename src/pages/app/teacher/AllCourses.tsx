import { useFetchCourses } from '@/hooks/useDataHooks';
import CourseCard from '@/components/CourseCard';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';

const AllCourses = () => {
    const { data: courses, isLoading } = useFetchCourses();

    return (
        <div className="space-y-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground">All Courses</h1>
                <p className="text-muted-foreground mt-1">Browse all educational programs offered at ABX Tech Schools.</p>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-48 rounded-2xl" />)}
                </div>
            ) : !courses?.length ? (
                <div className="text-center py-20 rounded-2xl border border-dashed border-border bg-muted/30">
                    <p className="text-muted-foreground">No courses have been created in the school yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((c, i) => (
                        <motion.div
                            key={c.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                        >
                            <CourseCard course={c} index={i} />
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllCourses;
