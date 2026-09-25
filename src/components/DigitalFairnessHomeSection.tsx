import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Globe2, MessageCircle, SearchCheck, ShieldCheck, Sparkles } from "lucide-react";

import SectionWrapper, { FadeUp } from "@/components/SectionWrapper";
import { Button } from "@/components/ui/button";
import digitalFairnessHero from "@/assets/digital-fairness-campaign-hero.png";
import { siteContact } from "@/lib/site-config";

const highlights = [
  "Mobile-first responsive website tailored to your brand",
  "Self-managed admin panel for photos, blogs, and updates",
  "Customer booking flows, contact forms, and instant WhatsApp chat",
  "Eligible .com.np, .edu.np, or personal .np Mercantile domain coordination",
  "Starter hosting support included (terms and conditions applied)",
  "Complimentary SEO, AEO, and GEO artificial intelligence search audit",
];

const whatsappHref = `https://wa.me/977${siteContact.whatsappNumber}?text=${encodeURIComponent(
  "Hello Nexaform, I want details about the Digital Fairness Campaign website initiative.",
)}`;

const DigitalFairnessHomeSection = () => (
  <SectionWrapper className="relative overflow-hidden bg-[linear-gradient(180deg,#f8fcff_0%,#eef8ff_100%)]">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_20%,rgba(34,211,238,0.12),transparent_26%),radial-gradient(circle_at_84%_18%,rgba(59,130,246,0.1),transparent_28%)]" />

    <div className="relative z-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
      <FadeUp>
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/90 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.24em] text-sky-700 shadow-sm backdrop-blur">
          <Sparkles size={14} className="text-amber-500" />
          Digital Fairness Campaign
        </div>

        <h2 className="mt-5 max-w-2xl font-display text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl md:text-[2.6rem] md:leading-[1.15]">
          Breaking the barrier to professional digital identity in Nepal.
        </h2>

        <p className="mt-4 max-w-[64ch] text-base leading-7 text-slate-600 sm:text-lg">
          Exorbitant agency fees should never stand between a Nepali business and its digital presence.
          Nexaform launched the Digital Fairness Campaign to provide accessible, high-performance web
          infrastructure—including complete admin control, .np domain coordination, starter hosting
          support, and full search readiness.
        </p>

        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          {highlights.map((highlight) => (
            <div
              key={highlight}
              className="flex items-start gap-3 rounded-xl border border-sky-100 bg-white/90 p-3.5 shadow-sm backdrop-blur transition-all duration-200 hover:border-sky-200"
            >
              <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-500" />
              <span className="text-sm font-medium leading-snug text-slate-700">{highlight}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link to="/digital-fairness-campaign">
            <Button variant="gradient" size="lg">
              Explore Campaign <ArrowRight size={18} />
            </Button>
          </Link>
          <Link to="/free-audit">
            <Button
              variant="outline"
              size="lg"
              className="border-slate-300 bg-white/90 text-slate-950 shadow-sm hover:bg-white"
            >
              <SearchCheck size={18} />
              Free SEO/AI Audit
            </Button>
          </Link>
          <a href={whatsappHref} target="_blank" rel="noreferrer">
            <Button
              variant="outline"
              size="lg"
              className="border-emerald-200 bg-emerald-50 text-emerald-800 shadow-sm hover:bg-emerald-100"
            >
              <MessageCircle size={18} />
              WhatsApp Us
            </Button>
          </a>
        </div>
      </FadeUp>

      <FadeUp delay={0.12}>
        <div className="relative rounded-2xl p-2 bg-gradient-to-tr from-sky-100/60 via-white to-blue-100/40 shadow-[0_28px_70px_rgba(59,130,246,0.12)]">
          <div className="relative overflow-hidden rounded-xl border border-white">
            <img
              src={digitalFairnessHero}
              alt="Digital Fairness Campaign website package visual"
              className="aspect-[16/11] w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-3 left-3 right-3 rounded-xl border border-white/20 bg-slate-950/85 p-4 text-white shadow-xl backdrop-blur-md sm:bottom-4 sm:left-4 sm:right-4">
              <div className="grid gap-3 sm:grid-cols-2 sm:items-center">
                <div>
                  <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-sky-300">
                    <ShieldCheck size={13} />
                    Community Initiative
                  </div>
                  <div className="mt-1 font-display text-lg font-bold text-white">
                    Accessible Web For Nepal
                  </div>
                </div>
                <div className="flex items-center gap-2 border-t border-white/10 pt-2 text-xs font-medium text-slate-200 sm:border-l sm:border-t-0 sm:pl-3 sm:pt-0">
                  <Globe2 size={16} className="shrink-0 text-sky-400" />
                  <span>Mercantile .np domain support, starter hosting (T&C apply) & zero hidden fees.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeUp>
    </div>
  </SectionWrapper>
);

export default DigitalFairnessHomeSection;
