import { Link } from "react-router-dom";
import { CheckCircle2, SearchCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeUp } from "@/components/SectionWrapper";
import NeuralNetworkBackground from "@/components/NeuralNetworkBackground";

const AnimatedHeroSection = () => {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden pb-16 pt-28 md:pb-20 md:pt-36 lg:min-h-screen lg:pb-24 lg:pt-40">
      {/* Neural Network background replaces the old video */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <NeuralNetworkBackground />
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,8,0.30),rgba(5,5,8,0.10),rgba(5,5,8,0.35))]" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-3xl lg:min-h-[calc(100vh-10rem)] lg:flex lg:items-center">
          <div className="p-6 sm:p-8 lg:p-10">
            <FadeUp>
              <span className="mb-6 inline-block rounded-full bg-white/10 backdrop-blur-md border border-white/15 px-3 py-1.5 font-mono text-[12px] uppercase tracking-widest text-white/90 shadow-[0_16px_32px_rgba(0,0,0,0.3)]">
                Custom Software / Web Apps / Digital Systems
              </span>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h1 className="mb-6 text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight text-white [text-shadow:0_2px_16px_rgba(79,172,254,0.25)] sm:text-5xl lg:text-[60px]">
                Shaping future-ready digital systems
              </h1>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="mb-4 max-w-[55ch] text-lg font-semibold leading-relaxed text-white/90 [text-shadow:0_1px_8px_rgba(0,0,0,0.4)]">
                Nexaform is a software development company in Nepal that designs and develops
                custom web applications, scalable software, and modern digital systems for
                businesses that want to operate smarter and grow with confidence.
              </p>
            </FadeUp>
            <FadeUp delay={0.25}>
              <p className="mb-8 max-w-[55ch] text-base font-medium leading-relaxed text-white/70 [text-shadow:0_1px_8px_rgba(0,0,0,0.3)]">
                From idea validation and product design to engineering, deployment, and long-term
                improvement, we help businesses turn complex workflows and ambitious ideas into
                reliable digital products.
              </p>
            </FadeUp>
            <FadeUp delay={0.3}>
              <div className="mb-5 flex flex-wrap gap-3">
                <Link to="/digital-fairness-campaign">
                  <Button variant="gradient" size="lg">
                    Digital Fairness Campaign
                  </Button>
                </Link>
                <Link to="/free-audit">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:border-white/30"
                  >
                    <SearchCheck size={18} />
                    Free SEO/AI Audit
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:border-white/30"
                  >
                    Start a Project
                  </Button>
                </Link>
              </div>
            </FadeUp>
            <FadeUp delay={0.31}>
              <div className="mb-5 grid max-w-2xl gap-3 sm:grid-cols-2">
                <div className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 p-4 text-sm font-semibold leading-6 text-white/90 shadow-sm backdrop-blur-md">
                  <Sparkles size={18} className="mt-0.5 shrink-0 text-sky-400" />
                  Digital Fairness Campaign for Nepali businesses and professionals, with free hosting. Terms and conditions applied.
                </div>
                <div className="flex items-start gap-3 rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm font-semibold leading-6 text-emerald-200 shadow-sm backdrop-blur-md">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-400" />
                  Free SEO, AEO and GEO audit included with the campaign.
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimatedHeroSection;
