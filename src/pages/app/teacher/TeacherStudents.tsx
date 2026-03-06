import { useState } from 'react';
import { useFetchStudents } from '@/hooks/useDataHooks';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

const TeacherStudents = () => {
  const { data: students, isLoading } = useFetchStudents();
  const [search, setSearch] = useState('');

  const filtered = students?.filter((s) =>
    `${s.first_name} ${s.last_name} ${s.email}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">All Students</h1>
      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search students..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 focus:focus-accent" />
      </div>
      {isLoading ? (
        <div className="space-y-3">{[...Array(5)].map((_, i) => <Skeleton key={i} className="h-16 rounded-lg" />)}</div>
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
              className="rounded-lg border border-border bg-card p-4"
            >
              <p className="font-semibold text-card-foreground">{s.first_name} {s.last_name}</p>
              <p className="text-sm text-muted-foreground">{s.email}</p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeacherStudents;
