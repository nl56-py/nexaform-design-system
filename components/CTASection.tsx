import { PrimaryButton } from './PrimaryButton';
import { SecondaryButton } from './SecondaryButton';

type CTASectionProps = {
  headline: string;
  paragraph: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  className?: string;
};

export function CTASection({
  headline,
  paragraph,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  className,
}: CTASectionProps) {
  return (
    <section
      className={`section-grid relative overflow-hidden rounded-[2rem] border border-border bg-panel p-10 shadow-panel ${className ?? ''}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(92,89,228,0.08),transparent_24%),radial-gradient(circle_at_85%_20%,rgba(56,108,244,0.08),transparent_26%)]" />
      <div className="relative max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accentPrimary">Consult with us</p>
        <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-textPrimary sm:text-4xl">
          {headline}
        </h2>
        <p className="mt-4 text-base text-textSecondary">{paragraph}</p>
      </div>

      <div className="relative mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <PrimaryButton href={primaryHref}>{primaryLabel}</PrimaryButton>
        {secondaryLabel && secondaryHref && (
          <SecondaryButton href={secondaryHref}>{secondaryLabel}</SecondaryButton>
        )}
      </div>
    </section>
  );
}
