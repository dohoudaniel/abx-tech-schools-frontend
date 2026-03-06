import { useAuth } from '@/lib/auth';
import { useFetchParents, useFetchEnrollments } from '@/hooks/useDataHooks';
import { motion } from 'framer-motion';
import { Users, GraduationCap, Calendar, Heart, BookOpen } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const ParentDashboard = () => {
    const { user } = useAuth();
    const { data: parents, isLoading: isParentLoading } = useFetchParents();
    const { data: enrollments, isLoading: isEnrollmentLoading } = useFetchEnrollments();

    // Since useFetchParents lists parents and parents see only themselves
    const parentProfile = parents?.[0];

    const isLoading = isParentLoading || isEnrollmentLoading;

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-foreground capitalize">
                        Welcome, {user?.first_name || 'Parent'}!
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Track your children's academic progress and activities.
                    </p>
                </div>
                <div className="px-4 py-2 bg-accent/10 rounded-2xl border border-accent/20 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-accent" />
                    <span className="text-sm font-semibold text-accent uppercase tracking-wider">
                        Academic Session 2025 / 2026
                    </span>
                </div>
            </div>

            {/* Children Section */}
            <div>
                <div className="flex items-center gap-2 mb-6">
                    <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                    <h2 className="text-xl font-bold">My Children</h2>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Skeleton className="h-48 rounded-2xl" />
                        <Skeleton className="h-48 rounded-2xl" />
                    </div>
                ) : !parentProfile?.students_details?.length ? (
                    <div className="text-center py-12 bg-card rounded-2xl border border-dashed border-border">
                        <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                        <p className="text-muted-foreground font-medium">No children linked to your account yet.</p>
                        <p className="text-xs text-muted-foreground mt-1">Please contact the school office to link your children.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {parentProfile.students_details.map((student, i) => {
                            const childEnrollments = enrollments?.filter(e => e.student === student.id) || [];

                            return (
                                <motion.div
                                    key={student.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-all"
                                >
                                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                        <GraduationCap size={80} />
                                    </div>

                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="h-14 w-14 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-xl">
                                            {student.first_name[0]}{student.last_name[0]}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-foreground">
                                                {student.first_name} {student.last_name}
                                            </h3>
                                            <p className="text-sm text-muted-foreground">{student.email}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between text-sm py-2 border-t border-border/50">
                                            <span className="text-muted-foreground">Relationship</span>
                                            <span className="font-semibold text-foreground capitalize">
                                                {parentProfile.student_links?.find(l => l.student === student.id)?.relationship || 'Child'}
                                            </span>
                                        </div>

                                        {/* Enrollments Preview */}
                                        <div className="py-2 border-t border-border/50">
                                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2 flex items-center gap-1">
                                                <BookOpen size={10} /> Active Courses
                                            </p>
                                            <div className="flex flex-wrap gap-1.5">
                                                {childEnrollments.slice(0, 3).map(enr => (
                                                    <span key={enr.id} className="px-2 py-0.5 bg-muted rounded text-[10px] font-medium">
                                                        {enr.course_details?.title}
                                                    </span>
                                                ))}
                                                {childEnrollments.length > 3 && (
                                                    <span className="text-[10px] text-muted-foreground font-medium">+{childEnrollments.length - 3} more</span>
                                                )}
                                                {childEnrollments.length === 0 && (
                                                    <span className="text-[10px] italic text-muted-foreground">Not enrolled in any courses</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-border/50 grid grid-cols-2 gap-3">
                                        <div className="p-3 bg-muted/30 rounded-xl text-center">
                                            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold mb-1">Attendance</p>
                                            <p className="text-lg font-bold text-foreground">94%</p>
                                        </div>
                                        <div className="p-3 bg-muted/30 rounded-xl text-center">
                                            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold mb-1">Total GPA</p>
                                            <p className="text-lg font-bold text-foreground">3.8</p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Info Card */}
            <div className="rounded-2xl bg-accent p-8 text-accent-foreground relative overflow-hidden shadow-lg">
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="max-w-lg">
                        <h3 className="text-2xl font-bold mb-2">School Communication Hub</h3>
                        <p className="text-accent-foreground/80">
                            Receive live updates about school events, emergency notifications, and parent-teacher meeting schedules directly here.
                        </p>
                    </div>
                    <button className="px-6 py-3 bg-white text-accent rounded-xl font-bold hover:bg-white/90 transition-colors whitespace-nowrap">
                        View Notifications
                    </button>
                </div>
                <div className="absolute top-0 right-0 -mr-8 -mt-8 opacity-10">
                    <Users size={200} />
                </div>
            </div>
        </div>
    );
};

export default ParentDashboard;
