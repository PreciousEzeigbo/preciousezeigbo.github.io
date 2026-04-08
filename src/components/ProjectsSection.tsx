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
    <section id="projects" className="py-32 px-6">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-sans text-3xl md:text-4xl font-bold mb-2 text-foreground">
            Projects
          </h2>
          <div className="w-16 h-px bg-primary mb-16" />
        </motion.div>

        <div className="space-y-0">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group border-b border-border py-8 first:pt-0"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-sans text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300 mb-1">
                    {project.title}
                  </h3>
                  <p className="font-mono text-xs tracking-[0.15em] text-muted-foreground uppercase mb-3">
                    {project.url}
                  </p>
                  <p className="text-muted-foreground font-sans leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] tracking-wider px-2 py-1 bg-secondary text-secondary-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-300 mt-1 flex-shrink-0" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
