interface CaseStudyCardProps {
  title: string;
  description: string;
  outcome: string;
  tags?: string[];
}

const CaseStudyCard = ({ title, description, outcome, tags }: CaseStudyCardProps) => (
  <div className="card-surface card-surface-hover rounded-card p-8 flex flex-col">
    {tags && (
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[12px] tracking-widest uppercase text-accent bg-accent/10 px-2.5 py-1 rounded-md"
          >
            {tag}
          </span>
        ))}
      </div>
    )}
    <h3 className="font-display font-semibold text-xl text-foreground mb-3">{title}</h3>
    <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{description}</p>
    <div className="pt-4 border-t border-border/30">
      <p className="text-sm">
        <span className="text-accent font-medium">Outcome:</span>{" "}
        <span className="text-muted-foreground">{outcome}</span>
      </p>
    </div>
  </div>
);

export default CaseStudyCard;
