import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileQuestion, Home, ArrowLeft, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/", { replace: true });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-background px-6 overflow-hidden">
      {/* Visual background layers */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.03 }}
          className="absolute inset-0 flex items-center justify-center -rotate-12"
        >
          <span className="text-[30rem] font-black pointer-events-none">404</span>
        </motion.div>
        <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-accent/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-primary/10 rounded-full blur-[100px] animate-pulse delay-700" />
      </div>

      {/* Floating Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-accent/20"
          initial={{
            x: Math.random() * 1000 - 500,
            y: Math.random() * 1000 - 500,
            opacity: 0
          }}
          animate={{
            x: [null, Math.random() * 400 - 200],
            y: [null, Math.random() * 400 - 200],
            opacity: [0, 0.5, 0]
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-xl w-full text-center"
      >
        <div className="mb-8 relative inline-block">
          <motion.div
            animate={{
              rotate: [0, 5, -5, 0],
              y: [0, -10, 0]
            }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="relative"
          >
            <div className="absolute inset-0 bg-accent/20 rounded-full blur-2xl animate-ping" />
            <div className="relative rounded-full bg-accent/10 p-10 backdrop-blur-sm border border-accent/20">
              <FileQuestion className="h-20 w-20 text-accent" strokeWidth={1} />
            </div>
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="absolute -top-2 -right-2 bg-accent text-white rounded-full px-3 py-1 text-xs font-black shadow-lg"
          >
            MISSING
          </motion.div>
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-foreground mb-4 tracking-tighter">
          Oops! <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-primary animate-gradient-x">Path Lost.</span>
        </h1>

        <p className="text-xl text-muted-foreground mb-4 leading-relaxed font-medium">
          The module you're looking for doesn't exist.
        </p>

        <div className="flex items-center justify-center gap-2 mb-10 text-sm font-bold text-accent px-4 py-2 bg-accent/5 rounded-full w-fit mx-auto border border-accent/10">
          <Zap className="h-4 w-4 fill-accent" />
          <span>Teleporting home in {countdown}s...</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="h-14 bg-accent text-accent-foreground hover:bg-accent/90 w-full sm:w-auto gap-2 px-8 text-lg font-bold shadow-xl shadow-accent/20 hover:scale-105 transition-all">
            <Link to="/">
              <Home className="h-5 w-5" />
              Beam Me Back
            </Link>
          </Button>

          <Button asChild variant="ghost" size="lg" className="h-14 w-full sm:w-auto gap-2 px-8 text-lg font-medium hover:bg-muted/50">
            <button onClick={() => window.history.back()}>
              <ArrowLeft className="h-5 w-5" />
              Previous Page
            </button>
          </Button>
        </div>
      </motion.div>

      {/* Decorative footer */}
      <footer className="absolute bottom-8 left-0 right-0 text-center opacity-30 select-none">
        <p className="text-xs font-mono tracking-widest text-muted-foreground">ERROR_CODE: ABX_ROUTE_NOT_FOUND_404</p>
      </footer>
    </div>
  );
};

export default NotFound;
