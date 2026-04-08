import { motion } from "framer-motion";

const experiences = [
  {
    period: "2025 — Present",
    role: "Software Engineer",
    company: "OutRay",
    description: "Building developer tools for monitoring and observability platforms.",
  },
  {
    period: "2024 — 2025",
    role: "Software Engineer Intern",
    company: "TechCorp",
    description: "Developed internal tools and contributed to core product features.",
  },
  {
    period: "2024",
    role: "Freelance Developer",
    company: "Self-employed",
    description: "Built web applications and automated workflows for clients.",
  },
];

const certifications = [
  { year: "2025", title: "AWS Cloud Practitioner" },
  { year: "2025", title: "Meta Frontend Developer" },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-32 px-6 bg-card">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-sans text-3xl md:text-4xl font-bold mb-2 text-foreground">
            Experience
          </h2>
          <div className="w-16 h-px bg-primary mb-16" />
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-[120px] top-0 bottom-0 w-px bg-border" />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-6 md:pl-0 md:grid md:grid-cols-[120px_1fr] md:gap-8"
              >
                {/* Dot */}
                <div className="absolute left-[-3px] md:left-[117px] top-1.5 w-[7px] h-[7px] bg-primary rounded-full" />

                <span className="font-mono text-xs text-muted-foreground tracking-wider block mb-2 md:mb-0 md:text-right md:pt-0.5">
                  {exp.period}
                </span>
                <div className="md:pl-8">
                  <h3 className="font-sans text-lg font-semibold text-foreground">
                    {exp.role}
                  </h3>
                  <p className="font-mono text-xs text-primary tracking-wider mb-2">
                    {exp.company}
                  </p>
                  <p className="text-muted-foreground font-sans text-sm leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20"
        >
          <h3 className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-6">
            CERTIFICATIONS
          </h3>
          <div className="space-y-3">
            {certifications.map((cert, i) => (
              <div key={i} className="flex items-baseline gap-4">
                <span className="font-mono text-xs text-muted-foreground">{cert.year}</span>
                <span className="font-sans text-sm text-foreground">{cert.title}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
