import { useState } from "react";
import { motion } from "framer-motion";
import TypewriterText from "./TypewriterText";

const HeroSection = () => {
  const [showSubtext, setShowSubtext] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  return (
    <section id="home" className="min-h-screen flex items-start justify-center px-4 pt-24 pb-16">
      <div className="w-full max-w-3xl notebook-lines notebook-margin notebook-holes paper-texture bg-card rounded-sm border border-border px-6 pl-20 py-0">
        {/* Top header area */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="pt-8"
        >
          {/* Name field - like a form header */}
          <div className="on-line flex items-baseline gap-2 text-muted-foreground font-mono text-xs tracking-wider">
            <span className="text-primary">NAME:</span>
          </div>

          <h1 className="on-line-lg font-handwriting text-5xl md:text-6xl font-bold text-foreground">
            <TypewriterText
              text="Akinkunmi"
              speed={80}
              delay={300}
              className="text-foreground"
              onComplete={() => setShowSubtext(true)}
            />
          </h1>

          {/* Subject line */}
          {showSubtext && (
            <div>
              <div className="on-line flex items-baseline gap-2 text-muted-foreground font-mono text-xs tracking-wider mt-0">
                <span className="text-primary">SUBJECT:</span>
              </div>
              <p className="on-line font-mono text-sm tracking-[0.2em] text-primary glow-primary">
                <TypewriterText
                  text="SOFTWARE ENGINEERING"
                  speed={40}
                  delay={200}
                  onComplete={() => setShowButtons(true)}
                />
              </p>

              <div className="on-line" /> {/* blank line */}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                <div className="on-line flex items-baseline gap-2 text-muted-foreground font-mono text-xs tracking-wider">
                  <span className="text-primary">NOTES:</span>
                </div>
                <p className="on-line font-handwriting text-xl md:text-2xl text-foreground/80 leading-[var(--line-height)]">
                  Building clean, performant software
                </p>
                <p className="on-line font-handwriting text-xl md:text-2xl text-foreground/80 leading-[var(--line-height)]">
                  with a focus on developer experience
                </p>
                <p className="on-line font-handwriting text-xl md:text-2xl text-foreground/80 leading-[var(--line-height)]">
                  and elegant solutions.
                </p>
              </motion.div>
            </div>
          )}

          {showButtons && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="on-line" /> {/* blank line */}
              <div className="on-line flex flex-wrap gap-4 items-center">
                <a
                  href="#projects"
                  className="font-mono text-xs px-4 py-1.5 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 rounded-sm"
                >
                  View Projects →
                </a>
                <a
                  href="#contact"
                  className="font-mono text-xs px-4 py-1.5 border border-border text-muted-foreground hover:border-foreground hover:text-foreground transition-all duration-300 rounded-sm"
                >
                  Contact Me
                </a>
              </div>
              <div className="on-line" />
              <div className="on-line" />
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
