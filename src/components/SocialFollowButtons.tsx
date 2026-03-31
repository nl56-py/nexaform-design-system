import { ArrowUpRight, Facebook, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { socialLinks } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const socialIcons = {
  LinkedIn: Linkedin,
  Facebook,
  X: Twitter,
} as const;

type SocialFollowButtonsProps = {
  className?: string;
  buttonClassName?: string;
};

const SocialFollowButtons = ({ className, buttonClassName }: SocialFollowButtonsProps) => (
  <div className={cn("flex flex-wrap gap-3", className)}>
    {socialLinks.map((social) => {
      const Icon = socialIcons[social.platform];

      return (
        <Button
          key={social.platform}
          asChild
          variant="outline"
          size="sm"
          className={cn(
            "justify-start gap-2 rounded-full border-border/60 bg-background/70 px-4 hover:border-primary/30 hover:bg-background",
            buttonClassName,
          )}
        >
          <a href={social.href} target="_blank" rel="noreferrer" aria-label={social.label}>
            <Icon size={16} />
            <span>{social.platform}</span>
            <ArrowUpRight size={14} />
          </a>
        </Button>
      );
    })}
  </div>
);

export default SocialFollowButtons;
