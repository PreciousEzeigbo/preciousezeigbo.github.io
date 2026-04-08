import { useState } from "react";
import { motion } from "framer-motion";
import TypewriterText from "./TypewriterText";

const HeroSection = () => {
  const [showSubtext, setShowSubtext] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="max-w-3xl w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-6">
            {">"} hello, world
          </p>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-sans font-bold leading-tight mb-6">
            <TypewriterText
              text="Akinkunmi"
              speed={80}
              delay={300}
              className="text-foreground"
              onComplete={() => setShowSubtext(true)}
            />
          </h1>

          {showSubtext && (
            <div className="space-y-4 mb-10">
              <p className="font-mono text-sm md:text-base tracking-wide text-primary glow-primary">
                <TypewriterText
                  text="SOFTWARE ENGINEER"
                  speed={40}
                  delay={200}
                  onComplete={() => setShowButtons(true)}
                />
              </p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="text-muted-foreground font-sans text-lg md:text-xl max-w-xl leading-relaxed"
              >
                Building clean, performant software with a focus on developer experience and elegant solutions.
              </motion.p>
            </div>
          )}

          {showButtons && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#projects"
                className="font-mono text-sm px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                View Projects →
              </a>
              <a
                href="#contact"
                className="font-mono text-sm px-6 py-3 border border-border text-muted-foreground hover:border-foreground hover:text-foreground transition-all duration-300"
              >
                Contact Me
              </a>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="font-mono text-xs tracking-widest text-muted-foreground animate-bounce">
            ↓ scroll
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
