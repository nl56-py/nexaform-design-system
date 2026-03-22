interface WaveDividerProps {
  variant?: "blue" | "purple" | "cyan";
  flip?: boolean;
  className?: string;
}

const gradients = {
  blue: ["hsl(var(--primary))", "hsl(var(--accent))"],
  purple: ["hsl(var(--highlight))", "hsl(var(--primary))"],
  cyan: ["hsl(var(--accent))", "hsl(var(--highlight))"],
};

const WaveDivider = ({ variant = "blue", flip = false, className = "" }: WaveDividerProps) => {
  const id = `wave-${variant}-${flip ? "f" : "n"}`;
  const [c1, c2] = gradients[variant];

  return (
    <div className={`w-full overflow-hidden leading-[0] ${flip ? "rotate-180" : ""} ${className}`}>
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="w-full h-[40px] md:h-[60px] lg:h-[80px]"
      >
        <defs>
          <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={c1} stopOpacity="0.15" />
            <stop offset="50%" stopColor={c2} stopOpacity="0.08" />
            <stop offset="100%" stopColor={c1} stopOpacity="0.15" />
          </linearGradient>
        </defs>
        <path
          d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
          fill={`url(#${id})`}
        />
        <path
          d="M0,50 C360,10 720,70 1080,30 C1260,10 1380,40 1440,50 L1440,80 L0,80 Z"
          fill={`url(#${id})`}
          opacity="0.5"
        />
      </svg>
    </div>
  );
};

export default WaveDivider;
