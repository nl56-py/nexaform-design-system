import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  description: string;
  outcome: string;
  tags?: string[] | null;
  industry?: string | null;
  coverImage?: string | null;
  className?: string;
}

const ProjectCard = ({
  title,
  description,
  outcome,
  tags,
  industry,
  coverImage,
  className = "",
}: ProjectCardProps) => (
  <article className={cn("group card-surface card-surface-hover overflow-hidden rounded-card", className)}>
    <div className="relative aspect-[16/10] overflow-hidden bg-secondary/60">
      {coverImage ? (
        <>
          <img
            src={coverImage}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-foreground/5 to-transparent" />
        </>
      ) : (
        <div className="flex h-full w-full items-end bg-[linear-gradient(135deg,rgba(59,130,246,0.18),rgba(34,211,238,0.12),rgba(139,92,246,0.18))] p-6">
          <div className="w-full rounded-2xl border border-white/60 bg-white/70 p-5 shadow-[0_18px_42px_rgba(79,95,173,0.12)] backdrop-blur-sm">
            <div className="font-mono text-[11px] tracking-[0.24em] uppercase text-highlight/80">
              Project Preview
            </div>
            <div className="mt-3 h-3 w-24 rounded-full bg-primary/20" />
            <div className="mt-2 h-3 w-40 rounded-full bg-muted/20" />
            <div className="mt-5 grid grid-cols-3 gap-2">
              <div className="h-12 rounded-xl bg-primary/15" />
              <div className="h-12 rounded-xl bg-accent/15" />
              <div className="h-12 rounded-xl bg-highlight/15" />
            </div>
          </div>
        </div>
      )}

      <div className="absolute left-4 top-4 flex flex-wrap gap-2">
        {(tags ?? []).slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/60 bg-white/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/75 backdrop-blur-sm"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>

    <div className="space-y-4 p-5 sm:p-6">
      <div className="space-y-2">
        {industry && (
          <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">
            {industry}
          </div>
        )}
        <h3 className="font-display text-xl font-semibold leading-tight text-foreground">{title}</h3>
      </div>

      <p className="text-sm leading-7 text-muted-foreground">{description}</p>

      <div className="rounded-2xl border border-border/50 bg-secondary/55 p-4">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">Outcome</div>
        <p className="mt-2 text-sm leading-6 text-foreground/85">{outcome}</p>
      </div>
    </div>
  </article>
);

export default ProjectCard;
