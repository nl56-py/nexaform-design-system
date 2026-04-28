import type { HTMLAttributes } from "react";
import logoImage from "@/assets/nflogo.png?url";
import { cn } from "@/lib/utils";

type LogoProps = HTMLAttributes<HTMLDivElement> & {
  hideText?: boolean;
  imageClassName?: string;
  textClassName?: string;
};

const Logo = ({
  className,
  hideText = false,
  imageClassName,
  textClassName,
  ...props
}: LogoProps) => (
  <div className={cn("flex items-center gap-3", className)} {...props}>
    <img
      src={logoImage}
      alt={hideText ? "Nexaform" : ""}
      aria-hidden={hideText ? undefined : true}
      className={cn("h-9 w-auto shrink-0 object-contain", imageClassName)}
      decoding="async"
    />
    {!hideText ? (
      <span
        className={cn(
          "font-display text-lg font-semibold tracking-tight text-foreground",
          textClassName,
        )}
      >
        Nexaform
      </span>
    ) : null}
  </div>
);

export default Logo;
