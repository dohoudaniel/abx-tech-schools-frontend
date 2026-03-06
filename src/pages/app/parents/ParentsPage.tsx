import { useState } from 'react';
import { useFetchStudents } from '@/hooks/useDataHooks';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Search, Users, Upload } from 'lucide-react';

const ParentsPage = () => {
  const { data: students, isLoading } = useFetchStudents();
  const [search, setSearch] = useState('');
  const { toast } = useToast();

  const filtered = students?.filter((s) =>
    `${s.first_name} ${s.last_name} ${s.parent_name} ${s.parent_email}`.toLowerCase().includes(search.toLowerCase())
  );

  const handleSync = () => {
    toast({ title: 'Coming Soon', description: 'Parent data sync will be available once the backend endpoint is ready.' });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="text-2xl font-bold text-foreground">Parents</h1>
        <Button onClick={handleSync} variant="outline" className="gap-2">
          <Upload className="h-4 w-4" /> Sync Parents
        </Button>
      </div>

      <div className="rounded-lg border border-border bg-card p-6 mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Users className="h-5 w-5 text-accent" />
          <p className="text-sm font-medium text-card-foreground">Integration Note</p>
        </div>
        <p className="text-sm text-muted-foreground">
          Parent data is derived from student records. When the backend adds a <code>/api/parents/</code> endpoint,
          this page will fetch directly from it. See <code>api/parents.ts</code> for the integration hook.
        </p>
      </div>

      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search parent info..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 focus:focus-accent" />
      </div>

      {isLoading ? (
        <div className="space-y-3">{[...Array(5)].map((_, i) => <Skeleton key={i} className="h-16 rounded-lg" />)}</div>
      ) : !filtered?.length ? (
        <p className="text-muted-foreground text-center py-8">No parent records found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.3 }}
              className="rounded-lg border border-border bg-card p-4"
            >
              <p className="font-semibold text-card-foreground text-sm">Student: {s.first_name} {s.last_name}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Parent: {s.parent_name || <span className="italic">Not available</span>}
              </p>
              <p className="text-xs text-muted-foreground">
                Contact: {s.parent_email || s.parent_phone || <span className="italic">Not available</span>}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ParentsPage;
