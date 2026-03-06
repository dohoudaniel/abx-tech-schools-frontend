import { useFetchParents, useFetchEnrollments } from '@/hooks/useDataHooks';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import {
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar
} from 'recharts';
import { GraduationCap, TrendingUp, CheckCircle2, AlertCircle, Calendar } from 'lucide-react';
import { useState } from 'react';

const ParentProgress = () => {
    const { data: parents, isLoading: isParentLoading } = useFetchParents();
    const { data: enrollments, isLoading: isEnrollmentLoading } = useFetchEnrollments();
    const [selectedChildId, setSelectedChildId] = useState<number | null>(null);

    const parentProfile = parents?.[0];
    const children = parentProfile?.students_details || [];

    // Set initial selected child if not set
    if (!selectedChildId && children.length > 0) {
        setSelectedChildId(children[0].id);
    }

    const selectedChild = children.find(c => c.id === selectedChildId);
    const childEnrollments = enrollments?.filter(e => e.student === selectedChildId) || [];



    const gradeData = [
        { subject: 'Math', grade: 85 },
        { subject: 'Physics', grade: 92 },
        { subject: 'English', grade: 78 },
        { subject: 'Biology', grade: 88 },
    ];

    if (isParentLoading || isEnrollmentLoading) {
        return (
            <div className="space-y-8 max-w-6xl mx-auto">
                <Skeleton className="h-16 w-1/3" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Skeleton className="h-40" />
                    <Skeleton className="h-40" />
                    <Skeleton className="h-40" />
                </div>
                <Skeleton className="h-[400px]" />
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            {/* Header & Child Selector */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Academic Progress</h1>
                    <p className="text-muted-foreground mt-1">Detailed performance monitoring for your children.</p>
                </div>

                <div className="flex bg-muted p-1 rounded-xl border border-border overflow-hidden">
                    {children.map((child) => (
                        <button
                            key={child.id}
                            onClick={() => setSelectedChildId(child.id)}
                            className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${selectedChildId === child.id
                                ? 'bg-card text-foreground shadow-sm'
                                : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            {child.first_name}
                        </button>
                    ))}
                </div>
            </div>

            {!selectedChild ? (
                <div className="text-center py-20 bg-card rounded-2xl border border-dashed border-border">
                    <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                    <p className="text-muted-foreground">Select a child to view their progress.</p>
                </div>
            ) : (
                <>
                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { label: 'Overall GPA', value: '3.8', sub: 'Top 10% of class', icon: TrendingUp, color: 'text-accent' },
                            { label: 'Attendance', value: '94%', sub: 'Last 30 days', icon: Calendar, color: 'text-blue-500' },
                            { label: 'Assignments', value: '24/25', sub: 'Completed this term', icon: CheckCircle2, color: 'text-green-500' },
                            { label: 'Late Tasks', value: '1', sub: 'Physics report', icon: AlertCircle, color: 'text-amber-500' },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-card border border-border p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <div className={`p-2 bg-muted rounded-xl ${stat.color}`}>
                                        <stat.icon size={20} />
                                    </div>
                                    <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest px-2 py-1 bg-muted rounded-full">Record</span>
                                </div>
                                <h4 className="text-2xl font-bold text-foreground mb-1">{stat.value}</h4>
                                <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
                                <p className="text-[10px] text-muted-foreground mt-3 pt-3 border-t border-border/50">{stat.sub}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Enrollment Summary */}
                        <div className="lg:col-span-1 space-y-6">
                            <h3 className="text-lg font-bold flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5 text-accent" />
                                Active Enrollments
                            </h3>
                            <div className="space-y-4">
                                {childEnrollments.map((enr, i) => (
                                    <motion.div
                                        key={enr.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="p-4 bg-card border border-border rounded-2xl group hover:border-accent/40 transition-all hover:shadow-md"
                                    >
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-xs font-bold text-accent uppercase tracking-wider">{enr.course_details?.title}</span>
                                            <span className="px-2 py-0.5 bg-green-500/10 text-green-500 rounded text-[10px] font-bold uppercase">Passing</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground line-clamp-1 mb-3">
                                            Teacher: {enr.course_details?.teacher_details?.first_name} {enr.course_details?.teacher_details?.last_name}
                                        </p>
                                        <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                                            <div className="h-full bg-accent rounded-full" style={{ width: `${Math.random() * 40 + 60}%` }} />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Performance Charts */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Grades Chart */}
                            <div className="bg-card border border-border p-6 rounded-2xl shadow-sm">
                                <h3 className="text-lg font-bold mb-6">Subject Performance</h3>
                                <div className="h-[250px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={gradeData}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.5} />
                                            <XAxis dataKey="subject" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: '#64748B' }} dy={10} />
                                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} dx={-10} domain={[0, 100]} />
                                            <Tooltip
                                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                                cursor={{ fill: '#F1F5F9', opacity: 0.5 }}
                                            />
                                            <Bar dataKey="grade" fill="#FF7E47" radius={[6, 6, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>


                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ParentProgress;
