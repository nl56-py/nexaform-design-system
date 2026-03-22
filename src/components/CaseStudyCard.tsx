interface CaseStudyCardProps {
  title: string;
  description: string;
  outcome: string;
  tags?: string[];
  accentColor?: "primary" | "accent" | "highlight";
}

const accentStyles = {
  primary: {
    bar: "bg-primary/30",
    dot: "bg-primary",
    block1: "bg-primary/15",
    block2: "bg-primary/10",
    glow: "group-hover:shadow-[inset_0_0_0_1px_rgba(59,130,246,0.3)]",
  },
  accent: {
    bar: "bg-accent/30",
    dot: "bg-accent",
    block1: "bg-accent/15",
    block2: "bg-accent/10",
    glow: "group-hover:shadow-[inset_0_0_0_1px_rgba(34,211,238,0.3)]",
  },
  highlight: {
    bar: "bg-highlight/30",
    dot: "bg-highlight",
    block1: "bg-highlight/15",
    block2: "bg-highlight/10",
    glow: "group-hover:shadow-[inset_0_0_0_1px_rgba(139,92,246,0.3)]",
  },
};

const CaseStudyCard = ({ title, description, outcome, tags, accentColor = "primary" }: CaseStudyCardProps) => {
  const a = accentStyles[accentColor];

  return (
    <div className={`group card-surface card-surface-hover rounded-card flex flex-col overflow-hidden ${a.glow} transition-shadow duration-300`}>
      {/* Mockup area */}
      <div className="relative p-4 bg-secondary/50">
        <div className="rounded-lg bg-card/60 border border-border/20 p-3 space-y-2">
          <div className="flex items-center gap-1.5 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-destructive/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/40" />
          </div>
          <div className="flex gap-2">
            <div className={`h-8 flex-1 rounded ${a.block1}`} />
            <div className="h-8 flex-[2] rounded bg-muted/10" />
          </div>
          <div className={`h-3 w-20 rounded ${a.bar}`} />
          <div className="grid grid-cols-3 gap-1.5">
            <div className={`h-5 rounded ${a.block2}`} />
            <div className="h-5 rounded bg-muted/8" />
            <div className={`h-5 rounded ${a.block2}`} />
          </div>
        </div>
        {/* Gradient overlay on hover */}
        <div className={`absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none`} />
      </div>

      <div className="p-6 flex flex-col flex-1">
        {tags && (
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[11px] tracking-widest uppercase text-accent bg-accent/10 px-2 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <h3 className="font-display font-semibold text-lg text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{description}</p>
        <div className="pt-3 border-t border-border/20">
          <p className="text-sm">
            <span className="text-accent font-medium">Outcome:</span>{" "}
            <span className="text-muted-foreground">{outcome}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyCard;
