import { useState } from 'react';
import { useFetchMyStudents } from '@/hooks/useDataHooks';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import { Search, GraduationCap, Mail } from 'lucide-react';

const TeacherStudents = () => {
  const { data: students, isLoading } = useFetchMyStudents();
  const [search, setSearch] = useState('');

  const filtered = students?.filter((s) =>
    `${s.first_name} ${s.last_name} ${s.email}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Students</h1>
          <p className="text-muted-foreground mt-1">Students enrolled in your courses.</p>
        </div>
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Filter by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 focus:focus-accent border-border"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-32 rounded-2xl" />)}
        </div>
      ) : !filtered?.length ? (
        <div className="text-center py-20 rounded-2xl border border-dashed border-border bg-muted/30">
          <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold text-foreground">No students found</h3>
          <p className="text-muted-foreground max-w-xs mx-auto mt-1">
            {search ? "No students match your filter criteria." : "You don't have any students enrolled in your courses yet."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              className="group rounded-2xl border border-border bg-card p-5 hover:border-accent/40 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-lg group-hover:bg-accent group-hover:text-white transition-colors">
                  {s.first_name?.[0]}{s.last_name?.[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-card-foreground truncate">{s.first_name} {s.last_name}</h3>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Mail className="h-3 w-3" />
                    <span className="truncate">{s.email}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeacherStudents;
