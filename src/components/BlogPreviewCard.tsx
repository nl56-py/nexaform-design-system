import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface BlogPreviewCardProps {
  category: string;
  coverImage?: string | null;
  excerpt: string;
  slug: string;
  title: string;
  className?: string;
}

const BlogPreviewCard = ({
  category,
  coverImage,
  excerpt,
  slug,
  title,
  className = "",
}: BlogPreviewCardProps) => (
  <article
    className={cn(
      "group card-surface card-surface-hover flex h-full flex-col overflow-hidden rounded-card",
      className,
    )}
  >
    <div className="relative aspect-[16/10] overflow-hidden border-b border-border/40 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.14),transparent_42%)]">
      {coverImage ? (
        <div className="flex h-full w-full items-center justify-center bg-secondary/30 p-4 sm:p-5">
          <img
            src={coverImage}
            alt={title}
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center p-6">
          <div className="w-full max-w-[16rem] rounded-[1.5rem] border border-white/60 bg-white/80 p-5 shadow-[0_18px_44px_rgba(79,95,173,0.12)] backdrop-blur-sm">
            <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary/80">
              Blog Preview
            </div>
            <div className="mt-4 h-3 w-28 rounded-full bg-primary/15" />
            <div className="mt-2 h-3 w-40 rounded-full bg-muted/15" />
            <div className="mt-5 h-24 rounded-2xl bg-[linear-gradient(135deg,rgba(59,130,246,0.12),rgba(34,211,238,0.12),rgba(139,92,246,0.14))]" />
          </div>
        </div>
      )}
    </div>

    <div className="flex flex-1 flex-col p-6">
      <div className="mb-3 font-mono text-[11px] uppercase tracking-widest text-primary">
        {category}
      </div>
      <Link to={`/blog/${slug}`} className="mb-3 inline-block transition-colors hover:text-primary">
        <h3 className="font-display font-semibold text-foreground">{title}</h3>
      </Link>
      <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{excerpt}</p>
      <Link
        to={`/blog/${slug}`}
        className="mt-4 inline-flex items-center gap-1 text-sm text-primary transition-all duration-200 hover:gap-2"
      >
        Read more <ArrowRight size={14} />
      </Link>
    </div>
  </article>
);

export default BlogPreviewCard;
