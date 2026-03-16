const Logo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-2.5 ${className}`}>
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3B82F6" />
          <stop offset="0.55" stopColor="#22D3EE" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      <path d="M6 26V6l10 10L26 6v20L16 16 6 26Z" fill="url(#logoGrad)" fillRule="evenodd" />
    </svg>
    <span className="font-display font-semibold text-lg text-foreground tracking-tight">Nexaform</span>
  </div>
);

export default Logo;
