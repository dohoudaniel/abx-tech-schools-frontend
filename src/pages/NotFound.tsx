import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { FileQuestion, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <div className="relative mb-8 flex justify-center">
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [-10, 0, -10] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="rounded-3xl bg-accent/10 p-8"
          >
            <FileQuestion className="h-24 w-24 text-accent" strokeWidth={1.5} />
          </motion.div>
          <div className="absolute -bottom-2 -right-2 bg-background border border-border rounded-full p-2 shadow-sm">
            <span className="text-2xl font-bold text-accent">404</span>
          </div>
        </div>

        <h1 className="text-4xl font-extrabold text-foreground mb-4 tracking-tight">
          Lost in the <span className="text-accent">ABX Lab?</span>
        </h1>

        <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
          The page you're searching for seems to have vanished into thin air. Don't worry, even the best students get lost sometimes.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 w-full sm:w-auto gap-2">
            <Link to="/">
              <Home className="h-4 w-4" />
              Return Home
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto gap-2">
            <button onClick={() => window.history.back()}>
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </button>
          </Button>
        </div>
      </motion.div>

      {/* Background subtle decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-50" />
      </div>
    </div>
  );
};

export default NotFound;
