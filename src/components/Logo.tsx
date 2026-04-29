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
  <div className={cn("flex items-center gap-2.5", className)} {...props}>
    <img
      src={logoImage}
      alt={hideText ? "Nexaform" : ""}
      aria-hidden={hideText ? undefined : true}
      className={cn("aspect-square h-9 w-auto shrink-0 rounded-full bg-transparent object-cover select-none", imageClassName)}
      loading="eager"
      fetchPriority="high"
      decoding="sync"
    />
    {!hideText ? (
      <span
        className={cn(
          "font-display text-lg font-extrabold tracking-normal leading-none",
          textClassName,
        )}
      >
        <span className="text-[#0A84D6]">Nexa</span>
        <span className="text-white">form</span>
      </span>
    ) : null}
  </div>
);

export default Logo;
