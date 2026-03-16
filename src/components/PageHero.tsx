import { ReactNode } from "react";

interface PageHeroProps {
  badge?: string;
  headline: string;
  subheadline: string;
  paragraph?: string;
  children?: ReactNode;
}

const PageHero = ({ badge, headline, subheadline, paragraph, children }: PageHeroProps) => (
  <section className="relative pt-32 pb-16 md:pb-24 overflow-hidden">
    <div className="absolute inset-0 gradient-glow-bg pointer-events-none" />
    <div className="container relative z-10 max-w-3xl">
      {badge && (
        <div className="inline-block mb-6">
          <span className="font-mono text-[12px] tracking-widest uppercase text-accent bg-accent/10 px-3 py-1.5 rounded-full border border-accent/20">
            {badge}
          </span>
        </div>
      )}
      <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight gradient-text text-balance mb-5">
        {headline}
      </h1>
      <p className="text-lg text-muted-foreground leading-relaxed mb-4 max-w-2xl">
        {subheadline}
      </p>
      {paragraph && (
        <p className="text-base text-muted-foreground/80 leading-relaxed max-w-2xl">
          {paragraph}
        </p>
      )}
      {children && <div className="mt-8">{children}</div>}
    </div>
  </section>
);

export default PageHero;
