import { motion } from "framer-motion";

const navItems = [
  { label: "HOME", href: "#home" },
  { label: "PROJECTS", href: "#projects" },
  { label: "CONTACT", href: "#contact" },
];

const Navbar = () => {
  return (
    <motion.nav
      initial={{ opacity: 0.01, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border will-change-transform"
    >
      <div className="max-w-3xl mx-auto px-6 py-3 flex items-center justify-between">
        <a href="#home" className="font-handwriting text-2xl font-bold text-primary">
          ~/notebook
        </a>
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
