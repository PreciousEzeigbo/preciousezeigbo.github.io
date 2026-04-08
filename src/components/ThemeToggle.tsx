import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette } from "lucide-react";

const themes = [
  { name: "amber", label: "Amber", color: "hsl(45, 80%, 60%)" },
  { name: "cyan", label: "Cyan", color: "hsl(185, 70%, 55%)" },
  { name: "rose", label: "Rose", color: "hsl(350, 70%, 60%)" },
  { name: "green", label: "Green", color: "hsl(145, 60%, 50%)" },
  { name: "violet", label: "Violet", color: "hsl(270, 60%, 65%)" },
];

const ThemeToggle = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(() => {
    return localStorage.getItem("color-theme") || "amber";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", active);
    localStorage.setItem("color-theme", active);
  }, [active]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-14 right-0 bg-card border border-border rounded-lg p-3 flex flex-col gap-2 min-w-[120px]"
          >
            {themes.map((theme) => (
              <button
                key={theme.name}
                onClick={() => { setActive(theme.name); setOpen(false); }}
                className={`flex items-center gap-3 px-2 py-1.5 rounded text-left font-mono text-xs tracking-wider transition-colors duration-200 ${
                  active === theme.name
                    ? "text-foreground bg-accent"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: theme.color }}
                />
                {theme.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary transition-colors duration-300"
        aria-label="Change color theme"
      >
        <Palette className="w-4 h-4" />
      </motion.button>
    </div>
  );
};

export default ThemeToggle;
