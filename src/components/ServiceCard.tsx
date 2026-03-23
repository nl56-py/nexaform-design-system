import { ReactNode } from "react";

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
}

const ServiceCard = ({ icon, title, description, image, imageAlt }: ServiceCardProps) => (
  <div className="card-surface card-surface-hover group flex h-full flex-col overflow-hidden rounded-card">
    {image ? (
      <div className="relative aspect-[16/9] overflow-hidden border-b border-border/60 bg-muted/10">
        <img
          src={image}
          alt={imageAlt || title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/35 via-transparent to-transparent" />
        <div className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-xl border border-white/40 bg-white/85 text-accent shadow-[0_10px_24px_rgba(22,34,71,0.16)] backdrop-blur-sm">
          {icon}
        </div>
      </div>
    ) : (
      <div className="px-6 pt-6 sm:px-7 sm:pt-7 lg:px-8 lg:pt-8">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent transition-transform duration-200 group-hover:-translate-y-0.5">
          {icon}
        </div>
      </div>
    )}

    <div className="flex flex-1 flex-col p-6 sm:p-7 lg:p-8">
      <h3 className="mb-3 font-display text-lg font-semibold text-foreground">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
    </div>
  </div>
);

export default ServiceCard;
