import { motion } from "framer-motion";
import { Github, Mail, Twitter } from "lucide-react";

const links = [
  { icon: Github, label: "GitHub", href: "https://github.com" },
  { icon: Mail, label: "Email", href: "mailto:hello@akinkunmi.dev" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
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
