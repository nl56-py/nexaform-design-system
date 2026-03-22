interface DeviceMockupProps {
  type?: "laptop" | "phone";
  accentColor?: string;
  className?: string;
}

const DeviceMockup = ({ type = "laptop", accentColor = "primary", className = "" }: DeviceMockupProps) => {
  if (type === "phone") {
    return (
      <div className={`relative mx-auto w-[140px] ${className}`}>
        <div className="rounded-[20px] border-2 border-border/50 bg-secondary p-2 shadow-2xl">
          <div className="w-8 h-1 bg-border/30 rounded-full mx-auto mb-2" />
          <div className="rounded-xl bg-card overflow-hidden space-y-2 p-2">
            <div className={`h-3 w-16 rounded bg-${accentColor}/20`} />
            <div className="h-12 rounded bg-muted/10" />
            <div className="grid grid-cols-2 gap-1.5">
              <div className={`h-8 rounded bg-${accentColor}/10`} />
              <div className="h-8 rounded bg-muted/10" />
            </div>
            <div className="h-2 w-12 rounded bg-muted/20" />
            <div className="h-2 w-20 rounded bg-muted/10" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <div className="rounded-xl border border-border/40 bg-secondary shadow-2xl overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center gap-1.5 px-3 py-2 bg-card/50 border-b border-border/30">
          <div className="w-2 h-2 rounded-full bg-destructive/50" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
          <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
          <div className="flex-1 mx-8">
            <div className="h-3 bg-muted/10 rounded-full max-w-[160px] mx-auto" />
          </div>
        </div>
        {/* Screen content */}
        <div className="p-4 space-y-3">
          <div className="flex gap-3">
            {/* Sidebar */}
            <div className="hidden sm:block w-24 space-y-2 flex-shrink-0">
              <div className={`h-3 w-16 rounded bg-${accentColor}/20`} />
              <div className="h-2 w-12 rounded bg-muted/15" />
              <div className="h-2 w-14 rounded bg-muted/10" />
              <div className="h-2 w-10 rounded bg-muted/10" />
              <div className={`h-2 w-12 rounded bg-${accentColor}/10 mt-3`} />
            </div>
            {/* Main area */}
            <div className="flex-1 space-y-3">
              <div className="flex gap-2">
                <div className={`h-14 flex-1 rounded-lg bg-${accentColor}/10`} />
                <div className="h-14 flex-1 rounded-lg bg-muted/10" />
                <div className="h-14 flex-1 rounded-lg bg-accent/10 hidden md:block" />
              </div>
              <div className={`h-20 rounded-lg bg-${accentColor}/5 border border-${accentColor}/10`} />
              <div className="grid grid-cols-3 gap-2">
                {[60, 80, 45].map((h, i) => (
                  <div key={i} className="space-y-1">
                    <div className={`rounded bg-${accentColor}/15`} style={{ height: `${h * 0.4}px` }} />
                    <div className="h-1.5 w-8 rounded bg-muted/15" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Stand */}
      <div className="mx-auto w-24 h-3 bg-border/20 rounded-b-lg" />
    </div>
  );
};

export default DeviceMockup;
