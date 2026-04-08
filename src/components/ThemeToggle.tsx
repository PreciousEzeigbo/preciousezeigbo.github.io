import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Sun, Moon } from "lucide-react";

const themes = [
  { name: "amber", label: "Amber", color: "hsl(45, 80%, 60%)" },
  { name: "cyan", label: "Cyan", color: "hsl(185, 70%, 55%)" },
  { name: "rose", label: "Rose", color: "hsl(350, 70%, 60%)" },
  { name: "green", label: "Green", color: "hsl(145, 60%, 50%)" },
  { name: "violet", label: "Violet", color: "hsl(270, 60%, 65%)" },
];

const ThemeToggle = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(() => localStorage.getItem("color-theme") || "amber");
  const [mode, setMode] = useState<"dark" | "light">(() => (localStorage.getItem("bg-mode") as "dark" | "light") || "dark");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const modeButtonRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", active);
    localStorage.setItem("color-theme", active);
  }, [active]);

  useEffect(() => {
    document.documentElement.setAttribute("data-mode", mode);
    localStorage.setItem("bg-mode", mode);
  }, [mode]);

  const toggleMode = useCallback(() => {
    if (isTransitioning) return;

    const nextMode = mode === "dark" ? "light" : "dark";
    const btn = modeButtonRef.current;
    const overlay = overlayRef.current;
    if (!btn || !overlay) return;

    setIsTransitioning(true);

    // Get button center for the circle origin
    const rect = btn.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // Calculate max radius to cover the full viewport
    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // Set the overlay to the NEW mode's background color
    const newBg = nextMode === "light" ? "hsl(40, 20%, 96%)" : "hsl(220, 14%, 6%)";
    overlay.style.backgroundColor = newBg;
    overlay.style.clipPath = `circle(0px at ${x}px ${y}px)`;
    overlay.style.display = "block";
    overlay.style.transition = "none";

    // Force reflow
    overlay.offsetHeight;

    // Animate the circle expanding
    overlay.style.transition = "clip-path 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
    overlay.style.clipPath = `circle(${maxRadius}px at ${x}px ${y}px)`;

    const onEnd = () => {
      overlay.removeEventListener("transitionend", onEnd);
      // Apply the actual mode change
      setMode(nextMode);
      // Hide overlay after mode is applied
      requestAnimationFrame(() => {
        overlay.style.display = "none";
        setIsTransitioning(false);
      });
    };

    overlay.addEventListener("transitionend", onEnd);
  }, [mode, isTransitioning]);

  return (
    <>
      {/* Paint splash overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 9999, display: "none" }}
      />

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
        {/* Color accent picker */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-[7.5rem] right-0 bg-card border border-border rounded-lg p-3 flex flex-col gap-2 min-w-[120px]"
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

        {/* Dark/Light mode toggle — paint splash */}
        <motion.button
          ref={modeButtonRef}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.85, rotate: mode === "dark" ? 180 : -180 }}
          onClick={toggleMode}
          className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary transition-colors duration-300 overflow-hidden"
          aria-label="Toggle dark/light mode"
        >
          <AnimatePresence mode="wait">
            {mode === "dark" ? (
              <motion.div
                key="sun"
                initial={{ y: 20, opacity: 0, rotate: -90 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: -20, opacity: 0, rotate: 90 }}
                transition={{ duration: 0.3 }}
              >
                <Sun className="w-4 h-4" />
              </motion.div>
            ) : (
              <motion.div
                key="moon"
                initial={{ y: 20, opacity: 0, rotate: 90 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: -20, opacity: 0, rotate: -90 }}
                transition={{ duration: 0.3 }}
              >
                <Moon className="w-4 h-4" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Color palette toggle */}
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
    </>
  );
};

export default ThemeToggle;
