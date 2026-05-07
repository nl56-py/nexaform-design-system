import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  Briefcase,
  Building2,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import PageHero from "@/components/PageHero";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { createTitle } from "@/lib/seo";
import { listPublishedPositions } from "@/lib/careers";

const employmentColors: Record<string, string> = {
  "Full-time": "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  "Part-time": "bg-amber-500/10 text-amber-600 border-amber-500/20",
  Contract: "bg-sky-500/10 text-sky-600 border-sky-500/20",
  Internship: "bg-violet-500/10 text-violet-600 border-violet-500/20",
};

const Careers = () => {
  const {
    data: positions = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["published-positions"],
    queryFn: listPublishedPositions,
  });

  return (
    <>
      <Seo
        title={createTitle("Careers")}
        description="Join Nexaform and build the future of digital innovation. Explore open positions across engineering, design, and strategy."
        path="/careers"
      />

      <PageHero
        badge="We're Hiring"
        headline="Build the future with us"
        subheadline="Explore open roles at Nexaform. We're looking for passionate minds who thrive on solving real problems with modern technology."
      >
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 gap-1.5">
            <Sparkles size={14} />
            {positions.length} Open Position{positions.length !== 1 ? "s" : ""}
          </Badge>
          <span>Remote-friendly &middot; Competitive pay &middot; Growth-focused</span>
        </div>
      </PageHero>

      <section className="section-padding">
        <div className="container">
          {/* Why Join Section */}
          <div className="mb-16">
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: TrendingUp,
                  title: "Growth Culture",
                  description:
                    "We invest in your development. Mentorship, learning budgets, and exposure to cutting-edge projects.",
                },
                {
                  icon: Building2,
                  title: "Modern Stack",
                  description:
                    "Work with React, Next.js, Supabase, AI tools, and modern deployment pipelines daily.",
                },
                {
                  icon: Clock,
                  title: "Flexible Work",
                  description:
                    "Remote-friendly culture with async communication and flexible working hours.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="group relative rounded-2xl border border-border/60 bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_12px_36px_rgba(59,130,246,0.08)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                    <item.icon size={22} />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Positions List */}
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
              Open Positions
            </h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Find a role that fits your skills and aspirations. Click on any position to learn more
              and apply.
            </p>

            <div className="mt-8 space-y-4">
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="animate-pulse rounded-2xl border border-border/40 bg-card p-6"
                    >
                      <div className="h-6 w-1/3 rounded-lg bg-muted" />
                      <div className="mt-3 h-4 w-1/2 rounded-lg bg-muted/60" />
                      <div className="mt-4 flex gap-3">
                        <div className="h-7 w-20 rounded-full bg-muted/40" />
                        <div className="h-7 w-24 rounded-full bg-muted/40" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : error ? (
                <div className="rounded-2xl border border-destructive/20 bg-destructive/5 px-6 py-8 text-center text-sm text-destructive">
                  {error instanceof Error ? error.message : "Failed to load positions."}
                </div>
              ) : positions.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border/60 bg-secondary/30 px-6 py-16 text-center">
                  <Briefcase className="mx-auto h-12 w-12 text-muted-foreground/40" />
                  <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                    No open positions right now
                  </h3>
                  <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                    We're not currently hiring, but we're always looking for talented people. Check
                    back soon or{" "}
                    <Link to="/contact" className="text-primary underline">
                      reach out
                    </Link>{" "}
                    with your profile.
                  </p>
                </div>
              ) : (
                positions.map((position) => (
                  <Link
                    key={position.id}
                    to={`/careers/${position.slug}`}
                    className="group block rounded-2xl border border-border/60 bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_16px_40px_rgba(59,130,246,0.08)]"
                    id={`position-${position.slug}`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-display text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
                          {position.title}
                        </h3>
                        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                          <span className="inline-flex items-center gap-1.5">
                            <Building2 size={14} />
                            {position.department}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin size={14} />
                            {position.location}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <Briefcase size={14} />
                            {position.experience_level}
                          </span>
                          {position.salary_range && (
                            <span className="font-medium text-foreground">
                              {position.salary_range}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <Badge
                          variant="outline"
                          className={
                            employmentColors[position.employment_type] ??
                            "bg-muted text-muted-foreground"
                          }
                        >
                          {position.employment_type}
                        </Badge>
                        {position.deadline && (
                          <Badge variant="outline" className="gap-1 text-muted-foreground">
                            <Calendar size={12} />
                            {formatDistanceToNow(new Date(position.deadline), {
                              addSuffix: true,
                            })}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <p className="line-clamp-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                        {position.description.replace(/<[^>]*>/g, "").slice(0, 200)}
                        {position.description.length > 200 ? "…" : ""}
                      </p>
                      <Button
                        variant="ghost"
                        className="shrink-0 text-primary opacity-0 transition-opacity group-hover:opacity-100"
                        tabIndex={-1}
                      >
                        View & Apply →
                      </Button>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Careers;
