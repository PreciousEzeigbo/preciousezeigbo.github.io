import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Better Secrets",
    url: "better-secrets.xyz",
    description: "A better way to manage GitHub Actions secrets.",
    tech: ["React", "TypeScript", "GitHub API"],
  },
  {
    title: "FireFlow",
    url: "fireflow.run",
    description: "Create automated workflows using natural language.",
    tech: ["Next.js", "AI", "Workflow Engine"],
  },
  {
    title: "OutRay",
    url: "outray.io",
    description: "Developer tooling for monitoring and observability.",
    tech: ["React", "Node.js", "Real-time"],
  },
  {
    title: "Document Q&A",
    url: "#",
    description: "AI-powered document question and answer system with RAG.",
    tech: ["Python", "LangChain", "Vector DB"],
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-12 px-4">
      <div className="max-w-3xl mx-auto notebook-lines notebook-margin notebook-holes paper-texture bg-card rounded-sm border border-border px-6 pl-20 py-0">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="pt-8"
        >
          <div className="on-line font-mono text-xs tracking-wider text-primary">
            SECTION: PROJECTS
          </div>
          <h2 className="on-line-lg font-handwriting text-4xl md:text-5xl font-bold text-foreground">
            Projects
          </h2>
          <div className="on-line" /> {/* blank line */}
        </motion.div>

        <div>
          {projects.map((project, i) => (
            <motion.a
              key={project.title}
              href={project.url === "#" ? "#" : `https://${project.url}`}
              target={project.url === "#" ? undefined : "_blank"}
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group block"
            >
              <div className="on-line flex items-baseline justify-between gap-2">
                <span className="font-handwriting text-2xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                  {i + 1}. {project.title}
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors duration-300 flex-shrink-0" />
              </div>
              <div className="on-line font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                {project.url}
              </div>
              <div className="on-line font-handwriting text-lg text-foreground/70">
                {project.description}
              </div>
              <div className="on-line flex flex-wrap gap-2 items-center">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] tracking-wider px-2 py-0.5 border border-border text-muted-foreground rounded-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="on-line" /> {/* blank line separator */}
            </motion.a>
          ))}
        </div>

        <div className="on-line" />
      </div>
    </section>
  );
};

export default ProjectsSection;
