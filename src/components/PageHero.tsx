import { ReactNode } from "react";

interface PageHeroProps {
  badge?: string;
  headline: string;
  subheadline: string;
  paragraph?: string;
  children?: ReactNode;
}

const PageHero = ({ badge, headline, subheadline, paragraph, children }: PageHeroProps) => (
  <section className="relative overflow-hidden pb-14 pt-28 md:pb-20 md:pt-32 lg:pb-24">
    <div className="absolute inset-0 gradient-glow-bg pointer-events-none" />
    <div className="container relative z-10">
      <div className="max-w-4xl xl:max-w-[56rem]">
        {badge && (
          <div className="inline-block mb-6">
            <span className="font-mono text-[12px] tracking-widest uppercase text-accent bg-accent/10 px-3 py-1.5 rounded-full border border-accent/20">
              {badge}
            </span>
          </div>
        )}
        <h1 className="mb-5 font-display text-3xl font-bold tracking-tight gradient-text text-balance sm:text-4xl md:text-5xl lg:text-6xl">
          {headline}
        </h1>
        <p className="mb-4 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {subheadline}
        </p>
        {paragraph && (
          <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground/80 sm:text-base">
            {paragraph}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </div>
  </section>
);

export default PageHero;
