import { motion } from "framer-motion";
import { Github, Mail, Twitter } from "lucide-react";

const links = [
  { icon: Github, label: "GitHub", href: "https://github.com" },
  { icon: Mail, label: "Email", href: "mailto:hello@akinkunmi.dev" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
];

const ContactSection = () => {
  return (
    <section id="contact" className="py-32 px-6">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-sans text-3xl md:text-4xl font-bold mb-2 text-foreground">
            Get in Touch
          </h2>
          <div className="w-16 h-px bg-primary mb-10" />

          <p className="text-muted-foreground font-sans text-lg leading-relaxed mb-10 max-w-lg">
            Interested in working together or just want to say hello? Feel free to reach out.
          </p>

          <div className="flex items-center gap-6">
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
                className="group flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <link.icon className="w-4 h-4" />
                <span className="border-b border-transparent group-hover:border-primary transition-colors duration-300">
                  {link.label}
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-32 pt-8 border-t border-border"
        >
          <p className="font-mono text-xs text-muted-foreground tracking-wider">
            © 2026 — Built with care
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
