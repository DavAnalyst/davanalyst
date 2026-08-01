import { motion, useReducedMotion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { projects } from '../data/content';

function GithubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function ProjectCard({
  name,
  description,
  demo,
  repo,
  gradient,
  image,
  index,
}: {
  name: string;
  description: string;
  stack: string[];
  demo: string;
  repo: string | null;
  gradient: string;
  image?: string;
  index: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      initial={{ opacity: 0, y: reduce ? 0 : 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
      whileHover={reduce ? {} : { y: -5 }}
      className="group flex flex-col rounded-2xl bg-surface border border-border shadow-elevated overflow-hidden transition-all duration-300 hover:border-cyan/50 hover:shadow-[0_0_32px_rgba(232,196,107,0.15)]"
    >
      {/* Preview — imagen real o gradiente */}
      <div className="relative h-52 overflow-hidden">
        {image ? (
          <>
            <img
              src={image}
              alt={`Preview de ${name}`}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Nombre visible en reposo (mobile-safe, sin hover) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 group-hover:opacity-0" />
            <span className="absolute bottom-3 left-4 font-display font-bold text-xl text-white drop-shadow-lg transition-opacity duration-300 group-hover:opacity-0">
              {name}
            </span>
            {/* Overlay glass al hacer hover */}
            <div className="absolute inset-0 flex flex-col justify-end p-5 bg-surface/75 backdrop-blur-md border-t border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="font-display font-bold text-xl text-white mb-1.5">{name}</span>
              <span className="inline-flex items-center gap-1.5 text-sm text-cyan font-semibold">
                <ExternalLink size={14} />
                Ver proyecto
              </span>
            </div>
          </>
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />
            <span className="font-display font-bold text-2xl text-white/90 tracking-tight drop-shadow-lg">
              {name}
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-display font-semibold text-lg text-text mb-2">{name}</h3>
        <p className="text-muted text-sm leading-relaxed flex-1">{description}</p>

        {/* Links */}
        <div className="flex items-center gap-3 pt-4 mt-4 border-t border-border">
          <a
            href={demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 text-sm font-semibold text-primary hover:text-cyan transition-colors py-3 rounded-lg hover:bg-primary/10"
          >
            <ExternalLink size={14} />
            Ver Web
          </a>
          {repo && (
            <a
              href={repo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 text-sm font-semibold text-muted hover:text-text transition-colors py-3 rounded-lg hover:bg-surface"
            >
              <GithubIcon size={14} />
              Código
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Portfolio() {
  const reduce = useReducedMotion();

  return (
    <section id="portafolio" className="py-24 px-5 sm:px-8 bg-surface/20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-cyan text-sm font-semibold tracking-widest uppercase">
            Proyectos reales
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-text mt-3 mb-4">
            Portafolio
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            Una selección de proyectos desplegados en producción con tecnologías modernas.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.name} {...project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
