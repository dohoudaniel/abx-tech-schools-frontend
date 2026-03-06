import { useState } from 'react';
import { useFetchTeachers } from '@/hooks/useDataHooks';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { Search, Mail, UserCheck } from 'lucide-react';

const TeachersPage = () => {
  const { data: teachers, isLoading } = useFetchTeachers();
  const [search, setSearch] = useState('');

  const filtered = teachers?.filter((t) =>
    `${t.first_name} ${t.last_name} ${t.subject} ${t.email}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Teachers Directory</h1>
      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search by name or subject..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 focus:focus-accent" />
      </div>
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-32 rounded-lg" />)}
        </div>
      ) : !filtered?.length ? (
        <p className="text-muted-foreground text-center py-8">No teachers found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              className="rounded-lg border border-border bg-card p-5"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="rounded-full bg-accent/10 p-2"><UserCheck className="h-5 w-5 text-accent" /></div>
                <div>
                  <p className="font-semibold text-card-foreground">{t.first_name} {t.last_name}</p>
                  {t.subject && <p className="text-xs text-muted-foreground">{t.subject}</p>}
                </div>
              </div>
              {t.bio && <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{t.bio}</p>}
              {t.email && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-3 w-3" /> {t.email}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeachersPage;
