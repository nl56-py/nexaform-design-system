import type { ComponentType, SVGProps } from "react";

type TechLogoProps = SVGProps<SVGSVGElement>;

type TechStackItem = {
  name: string;
  logo: ComponentType<TechLogoProps>;
  toneClassName: string;
};

const ReactLogo = (props: TechLogoProps) => (
  <svg viewBox="0 0 64 64" fill="none" {...props}>
    <circle cx="32" cy="32" r="4.5" fill="#61DAFB" />
    <ellipse cx="32" cy="32" rx="23" ry="9.5" stroke="#61DAFB" strokeWidth="2.8" />
    <ellipse
      cx="32"
      cy="32"
      rx="23"
      ry="9.5"
      stroke="#61DAFB"
      strokeWidth="2.8"
      transform="rotate(60 32 32)"
    />
    <ellipse
      cx="32"
      cy="32"
      rx="23"
      ry="9.5"
      stroke="#61DAFB"
      strokeWidth="2.8"
      transform="rotate(120 32 32)"
    />
  </svg>
);

const NextLogo = (props: TechLogoProps) => (
  <svg viewBox="0 0 64 64" fill="none" {...props}>
    <circle cx="32" cy="32" r="24" fill="#FFFFFF" />
    <circle cx="32" cy="32" r="24" stroke="#111111" strokeWidth="2" />
    <path d="M22 20H28.5L40 35.5V20H42V44H35.5L24 28.5V44H22V20Z" fill="#111111" />
    <path d="M37.5 20L42 26.5" stroke="#111111" strokeLinecap="round" strokeWidth="2.6" />
  </svg>
);

const NodeLogo = (props: TechLogoProps) => (
  <svg viewBox="0 0 64 64" fill="none" {...props}>
    <path d="M32 6.5 52.2 18.2v27.6L32 57.5 11.8 45.8V18.2L32 6.5Z" fill="#68A063" />
    <path d="M24.8 20H30L39.2 34V20H41.8V44H36.6L27.4 30V44H24.8V20Z" fill="#FFFFFF" />
  </svg>
);

const PostgreSQLLogo = (props: TechLogoProps) => (
  <svg viewBox="0 0 64 64" fill="none" {...props}>
    <circle cx="32" cy="32" r="24" fill="#336791" />
    <path
      d="M31.7 16.5c-4.8 0-8.9 3.5-9.6 8.2-1.2.7-4.1 2.9-4.1 7.4 0 3.7 1.9 6.4 4.6 8 1 5 4.8 7.9 9.3 7.9 4.8 0 8.5-3.1 9.5-8.1 2.6-1.5 4.6-4.2 4.6-8 0-4.5-2.9-6.7-4.1-7.4-.7-4.7-4.8-8-9.6-8Z"
      fill="#FFFFFF"
    />
    <circle cx="26.2" cy="28.1" r="2.1" fill="#336791" />
    <circle cx="37.8" cy="28.1" r="2.1" fill="#336791" />
    <path
      d="M28.5 35.2c1 1 2.2 1.6 3.5 1.6 1.4 0 2.6-.6 3.6-1.6v5.5c0 2-1.6 3.6-3.6 3.6-2 0-3.5-1.6-3.5-3.6v-5.5Z"
      fill="#336791"
    />
    <path
      d="M24 22.5c-1.5 1.1-2.7 2.7-3.2 4.8 1.7-.8 3.1-.9 4.3-.5"
      stroke="#336791"
      strokeLinecap="round"
      strokeWidth="1.8"
    />
    <path
      d="M40 22.5c1.5 1.1 2.7 2.7 3.2 4.8-1.7-.8-3.1-.9-4.3-.5"
      stroke="#336791"
      strokeLinecap="round"
      strokeWidth="1.8"
    />
  </svg>
);

const TailwindLogo = (props: TechLogoProps) => (
  <svg viewBox="0 0 64 64" fill="none" {...props}>
    <path
      d="M20.4 25.2c2.9-3.8 6.1-5.7 9.8-5.7 6.1 0 6.9 4.6 9.9 5.1 2 .3 3.9-.5 5.8-2.5-2.9 3.8-6.2 5.7-9.8 5.7-6.1 0-6.9-4.6-9.9-5.1-2-.3-3.9.5-5.8 2.5Zm-6.2 13.4c2.9-3.8 6.2-5.7 9.8-5.7 6.1 0 6.9 4.6 9.9 5.1 2 .3 3.9-.5 5.8-2.5-2.9 3.8-6.1 5.7-9.8 5.7-6.1 0-6.9-4.6-9.9-5.1-2-.3-3.9.5-5.8 2.5Z"
      fill="#38BDF8"
    />
  </svg>
);

const SupabaseLogo = (props: TechLogoProps) => (
  <svg viewBox="0 0 64 64" fill="none" {...props}>
    <path
      d="M36.8 8.5c-1.2 0-2.3.6-2.9 1.7L17.8 37.9c-1.3 2.2.3 5.1 2.9 5.1h8.6L46.2 14c1.3-2.2-.3-5.1-2.9-5.1h-6.5Z"
      fill="#3ECF8E"
    />
    <path
      d="M27.2 55.5c1.2 0 2.3-.6 2.9-1.7L46.2 26c1.3-2.2-.3-5.1-2.9-5.1h-8.6L17.8 50c-1.3 2.2.3 5.1 2.9 5.1h6.5Z"
      fill="#249361"
    />
  </svg>
);

const VercelLogo = (props: TechLogoProps) => (
  <svg viewBox="0 0 64 64" fill="none" {...props}>
    <circle cx="32" cy="32" r="24" fill="#FFFFFF" />
    <path d="M32 18 46 42H18L32 18Z" fill="#111111" />
  </svg>
);

const DockerLogo = (props: TechLogoProps) => (
  <svg viewBox="0 0 64 64" fill="none" {...props}>
    <rect x="19" y="21" width="6" height="6" rx="1" fill="#2496ED" />
    <rect x="27" y="21" width="6" height="6" rx="1" fill="#2496ED" />
    <rect x="35" y="21" width="6" height="6" rx="1" fill="#2496ED" />
    <rect x="27" y="13" width="6" height="6" rx="1" fill="#2496ED" />
    <rect x="35" y="13" width="6" height="6" rx="1" fill="#2496ED" />
    <path
      d="M14 31.5h29.2c1.3 0 2.6.4 3.6 1.2 1.5 1.1 2.4 2.9 2.6 4.8 1.6.2 3.1-.2 4.2-1.1.8-.7 1.4-1.6 1.7-2.7l.4-1.3 1.2.7c1.9 1 2.6 3.4 1.9 5.8-1 3.6-4.3 6.2-8.1 6.2H27.5c-7 0-12.8-5.3-13.5-12.3Z"
      fill="#2496ED"
    />
    <circle cx="24.2" cy="35.9" r="1.5" fill="#FFFFFF" />
    <path
      d="M17.3 42.1c.8 0 1.5.4 2 1 .6.7.8 1.5.8 2.3 1.8 0 3-.8 3.6-2.4.6 1 1.7 1.7 3 1.7 1.2 0 2.3-.6 3-1.6.8 1.2 2.1 2 3.6 2 2 0 3.8-1.2 4.4-3.1 1 .4 1.7 1.5 1.7 2.7 0 1.6-1.3 3-3 3H24.8c-4.1 0-7.5-3.3-7.5-7.6Z"
      fill="#2496ED"
    />
  </svg>
);

const techStack: TechStackItem[] = [
  {
    name: "React",
    logo: ReactLogo,
    toneClassName: "bg-gradient-to-br from-sky-400/20 via-cyan-400/10 to-transparent",
  },
  {
    name: "Next.js",
    logo: NextLogo,
    toneClassName: "bg-gradient-to-br from-zinc-100/90 via-zinc-100/70 to-zinc-200/40",
  },
  {
    name: "Node.js",
    logo: NodeLogo,
    toneClassName: "bg-gradient-to-br from-emerald-500/20 via-lime-400/10 to-transparent",
  },
  {
    name: "PostgreSQL",
    logo: PostgreSQLLogo,
    toneClassName: "bg-gradient-to-br from-blue-500/20 via-sky-400/10 to-transparent",
  },
  {
    name: "Tailwind CSS",
    logo: TailwindLogo,
    toneClassName: "bg-gradient-to-br from-sky-400/20 via-cyan-300/10 to-transparent",
  },
  {
    name: "Supabase",
    logo: SupabaseLogo,
    toneClassName: "bg-gradient-to-br from-emerald-500/20 via-green-400/10 to-transparent",
  },
  {
    name: "Vercel",
    logo: VercelLogo,
    toneClassName: "bg-gradient-to-br from-zinc-100/90 via-zinc-100/70 to-zinc-200/40",
  },
  {
    name: "Docker",
    logo: DockerLogo,
    toneClassName: "bg-gradient-to-br from-sky-500/20 via-blue-400/10 to-transparent",
  },
];

const TechStackShowcase = () => (
  <div className="relative overflow-hidden py-4">
    <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
    <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />

    <div className="logo-scroll flex w-max gap-5 sm:gap-6 lg:gap-8">
      {[...techStack, ...techStack].map(({ name, logo: Logo, toneClassName }, index) => {
        const isDuplicate = index >= techStack.length;

        return (
          <article
            key={`${name}-${index}`}
            aria-hidden={isDuplicate}
            className="group flex min-w-[11.5rem] shrink-0 items-center gap-4 rounded-[1.4rem] border border-white/10 bg-card/80 px-5 py-4 shadow-[0_18px_45px_-32px_rgba(14,165,233,0.38)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1"
          >
            <div
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.05rem] border border-white/10 ${toneClassName}`}
            >
              <Logo className="h-8 w-8" aria-hidden="true" />
            </div>

            <div className="min-w-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground/65">
                Tech Stack
              </p>
              <p className="mt-1 text-sm font-semibold text-foreground sm:text-[15px]">{name}</p>
            </div>
          </article>
        );
      })}
    </div>
  </div>
);

export default TechStackShowcase;
