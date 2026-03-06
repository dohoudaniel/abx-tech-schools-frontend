import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { useInView } from '@/hooks/useInView';
import { BookOpen, Users, GraduationCap, Shield } from 'lucide-react';

const features = [
  { icon: BookOpen, title: 'Comprehensive Courses', desc: 'Access a wide range of tech courses taught by industry professionals.' },
  { icon: Users, title: 'Expert Teachers', desc: 'Learn from experienced educators passionate about technology.' },
  { icon: GraduationCap, title: 'Track Progress', desc: 'Monitor your learning journey with intuitive enrollment management.' },
  { icon: Shield, title: 'Secure Platform', desc: 'Industry-standard security for your educational data.' },
];

const Landing = () => {
  const featuresSection = useInView();

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="flex items-center justify-between px-6 md:px-12 py-4 border-b border-border bg-card">
        <Logo />
        <Link to="/auth/login">
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
            Login
          </Button>
        </Link>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden px-6 md:px-12 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-8"
          >
            <Logo size="lg" showText={false} />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight"
          >
            Empowering the Next Generation of{' '}
            <span className="text-accent">Tech Leaders</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            ABX Tech Schools provides world-class technology education with hands-on courses, expert teachers, and a modern learning management experience.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <Link to="/auth/login">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 hover:scale-[1.02] active:scale-[0.98] transition-transform px-8">
                Get Started
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section ref={featuresSection.ref} className="px-6 md:px-12 py-16 md:py-24 bg-card">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-foreground">
            Why ABX Tech Schools?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 18 }}
                animate={featuresSection.inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="rounded-lg border border-border bg-background p-6 text-center"
              >
                <div className="inline-flex rounded-md bg-accent/10 p-3 mb-4">
                  <f.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-8 border-t border-border text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} ABX Tech Schools. All rights reserved.
      </footer>
    </div>
  );
};

export default Landing;
