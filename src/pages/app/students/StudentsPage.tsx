import { useState } from 'react';
import { useFetchStudents } from '@/hooks/useDataHooks';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { Search, GraduationCap } from 'lucide-react';

const StudentsPage = () => {
  const { data: students, isLoading } = useFetchStudents();
  const [search, setSearch] = useState('');

  const filtered = students?.filter((s) =>
    `${s.first_name} ${s.last_name} ${s.email}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Students Directory</h1>
      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search students..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 focus:focus-accent" />
      </div>
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-20 rounded-lg" />)}
        </div>
      ) : !filtered?.length ? (
        <p className="text-muted-foreground text-center py-8">No students found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.3 }}
              className="rounded-lg border border-border bg-card p-4 flex items-center gap-3"
            >
              <div className="rounded-full bg-accent/10 p-2"><GraduationCap className="h-4 w-4 text-accent" /></div>
              <div>
                <p className="font-semibold text-card-foreground text-sm">{s.first_name} {s.last_name}</p>
                <p className="text-xs text-muted-foreground">{s.email}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentsPage;
