import { ReactNode } from "react";

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const ServiceCard = ({ icon, title, description }: ServiceCardProps) => (
  <div className="card-surface card-surface-hover rounded-card p-8 group">
    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-5 transition-transform duration-200 group-hover:-translate-y-0.5">
      {icon}
    </div>
    <h3 className="font-display font-semibold text-lg text-foreground mb-3">{title}</h3>
    <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
  </div>
);

export default ServiceCard;
