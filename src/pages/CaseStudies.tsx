import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/PageHero";
import SectionWrapper, { FadeUp, StaggerContainer, StaggerItem } from "@/components/SectionWrapper";
import CaseStudyCard from "@/components/CaseStudyCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const CaseStudies = () => {
  const { data: caseStudies = [], isLoading } = useQuery({
    queryKey: ["case-studies"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("case_studies")
        .select("*")
        .eq("published", true)
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  return (
    <div>
      <PageHero
        headline="Case studies and digital solutions"
        subheadline="Explore how Nexaform approaches software challenges, product design, and business workflows through structured, future-ready digital systems."
        paragraph="Our case studies show how custom web applications, internal tools, dashboards, and modern platforms can improve efficiency, usability, and business growth."
      />

      <SectionWrapper>
        <FadeUp>
          <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight text-foreground mb-3">
            Work shaped by real needs
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-[65ch] mb-10">
            Every project is different, but the goal is the same: to solve meaningful problems with thoughtful design and reliable engineering.
          </p>
        </FadeUp>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card-surface rounded-card p-6 animate-pulse">
                <div className="h-4 w-3/4 bg-muted-foreground/10 rounded mb-4" />
                <div className="h-3 w-full bg-muted-foreground/10 rounded mb-2" />
                <div className="h-3 w-2/3 bg-muted-foreground/10 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseStudies.map((cs) => (
              <StaggerItem key={cs.id}>
                <CaseStudyCard
                  title={cs.title}
                  description={cs.description}
                  outcome={cs.outcome}
                  tags={cs.tags || []}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </SectionWrapper>

      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-highlight/10 pointer-events-none" />
        <div className="container relative z-10 text-center max-w-2xl mx-auto">
          <FadeUp>
            <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight gradient-text mb-5">
              Need a similar solution?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              We build software systems designed around the way businesses actually work — with the flexibility to grow over time.
            </p>
            <Link to="/contact">
              <Button variant="gradient" size="lg">Talk to Nexaform</Button>
            </Link>
          </FadeUp>
        </div>
      </section>
    </div>
  );
};

export default CaseStudies;
