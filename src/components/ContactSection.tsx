import { motion } from "framer-motion";
import { Github, Mail } from "lucide-react";

const XIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153zM17.61 20.644h2.039L6.486 3.24H4.298l13.312 17.403z" />
  </svg>
);

const links = [
  { icon: Github, label: "GitHub", href: "https://github.com/PreciousEzeigbo" },
  { icon: Mail, label: "Email", href: "mailto:preciousezeigbo81@gmail.com" },
  { icon: XIcon, label: "X", href: "https://x.com/preciousezeigbo" },
];

const ContactSection = () => {
  return (
    <section id="contact" className="py-12 px-4 pb-24">
      <div className="max-w-3xl mx-auto notebook-lines notebook-margin notebook-holes paper-texture bg-card rounded-sm border border-border px-6 pl-20 py-0">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="pt-8"
        >
          <div className="on-line font-mono text-xs tracking-wider text-primary">
            SECTION: CONTACT
          </div>
          <h2 className="on-line-lg font-handwriting text-4xl md:text-5xl font-bold text-foreground">
            Get in Touch
          </h2>
          <div className="on-line" />

          <p className="on-line font-handwriting text-xl text-foreground/70">
            Interested in working together or
          </p>
          <p className="on-line font-handwriting text-xl text-foreground/70">
            just want to say hello? Feel free to reach out.
          </p>

          <div className="on-line" />

          <div className="on-line flex items-center gap-6">
            {links.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <link.icon className="w-4 h-4" />
                <span className="border-b border-transparent group-hover:border-primary transition-colors duration-300">
                  {link.label}
                </span>
              </motion.a>
            ))}
          </div>

          <div className="on-line" />
          <div className="on-line" />
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="on-line border-t border-border" />
          <p className="on-line font-mono text-[10px] text-muted-foreground tracking-wider">
            © 2026 — Built with care
          </p>
          <div className="on-line" />
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
