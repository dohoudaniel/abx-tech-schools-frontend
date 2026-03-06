import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useCreateCourse } from '@/hooks/useDataHooks';
import { useToast } from '@/hooks/use-toast';
import { Plus, CheckCircle } from 'lucide-react';

const CreateCourseModal = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [success, setSuccess] = useState(false);
  const { mutate, isPending } = useCreateCourse();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    mutate({ title, description }, {
      onSuccess: () => {
        setSuccess(true);
        toast({ title: 'Course created', description: 'Students will see it immediately.' });
        setTimeout(() => { setOpen(false); setSuccess(false); setTitle(''); setDescription(''); }, 1200);
      },
      onError: () => {
        toast({ title: 'Error', description: 'Failed to create course.', variant: 'destructive' });
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
          <Plus className="h-4 w-4 mr-2" /> New Course
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{success ? 'Course Created!' : 'Create New Course'}</DialogTitle>
        </DialogHeader>
        {success ? (
          <div className="flex flex-col items-center py-8">
            <CheckCircle className="h-12 w-12 text-accent animate-scale-in" />
            <p className="mt-3 text-muted-foreground">Course created — students will see it immediately.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="course-title">Course Title</Label>
              <Input id="course-title" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="e.g. Introduction to Python" className="focus:focus-accent" />
            </div>
            <div>
              <Label htmlFor="course-desc">Description</Label>
              <Textarea id="course-desc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Brief description..." className="focus:focus-accent" />
            </div>
            <Button type="submit" disabled={isPending} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 active:scale-[0.98]">
              {isPending ? 'Creating...' : 'Create Course'}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreateCourseModal;
