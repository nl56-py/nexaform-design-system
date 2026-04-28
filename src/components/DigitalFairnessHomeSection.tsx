import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Globe2, MessageCircle, SearchCheck, Sparkles } from "lucide-react";

import SectionWrapper, { FadeUp } from "@/components/SectionWrapper";
import { Button } from "@/components/ui/button";
import digitalFairnessHero from "@/assets/digital-fairness-campaign-hero.png";
import { siteContact } from "@/lib/site-config";

const highlights = [
  "Mobile-first website with brand-matched hero design",
  "Admin panel for photos, videos, blogs, and service updates",
  "Booking inquiry flow, contact form, and WhatsApp CTA",
  "Eligible .com.np, .edu.np, or personal .np domain coordination with Mercantile support",
  "Free hosting included with terms and conditions applied",
];

const whatsappHref = `https://wa.me/977${siteContact.whatsappNumber}?text=${encodeURIComponent(
  "Hello Nexaform, I want details about the Digital Fairness Campaign Rs. 6,999 website package.",
)}`;

const DigitalFairnessHomeSection = () => (
  <SectionWrapper className="relative overflow-hidden bg-[linear-gradient(180deg,#f8fcff_0%,#eef8ff_100%)]">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_20%,rgba(34,211,238,0.12),transparent_26%),radial-gradient(circle_at_84%_18%,rgba(59,130,246,0.1),transparent_28%)]" />

    <div className="relative z-10 grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
      <FadeUp>
        <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/88 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.24em] text-sky-700 shadow-sm backdrop-blur">
          <Sparkles size={14} />
          Digital Fairness Campaign
        </span>
        <h2 className="mt-5 max-w-2xl font-display text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
          Stop paying 40k just to get a professional digital identity.
        </h2>
        <p className="mt-4 max-w-[64ch] leading-7 text-slate-600">
          Nexaform is launching a fair Rs. 6,999 website package for Nepali businesses and
          professionals, plus a free SEO, AEO, and GEO audit so your site can be found by Google
          and AI search engines. Free hosting is included with terms and conditions applied.
        </p>

        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          {highlights.map((highlight) => (
            <div key={highlight} className="flex items-start gap-3 rounded-lg border border-white bg-white/86 p-4 shadow-sm backdrop-blur">
              <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-500" />
              <span className="text-sm font-medium leading-6 text-slate-700">{highlight}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/digital-fairness-campaign">
            <Button variant="gradient" size="lg">
              View Rs. 6,999 Package <ArrowRight size={18} />
            </Button>
          </Link>
          <Link to="/free-audit">
            <Button variant="outline" size="lg" className="border-slate-300 bg-white/80 text-slate-950 hover:bg-white">
              <SearchCheck size={18} />
              Free SEO/AI Audit
            </Button>
          </Link>
          <a href={whatsappHref} target="_blank" rel="noreferrer">
            <Button variant="outline" size="lg" className="border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100">
              <MessageCircle size={18} />
              WhatsApp
            </Button>
          </a>
        </div>
      </FadeUp>

      <FadeUp delay={0.12}>
        <div className="relative">
          <img
            src={digitalFairnessHero}
            alt="Digital Fairness Campaign website package visual"
            className="aspect-[16/11] w-full rounded-lg border border-white object-cover shadow-[0_28px_70px_rgba(59,130,246,0.15)]"
            loading="lazy"
          />
          <div className="absolute bottom-4 left-4 right-4 grid gap-3 rounded-lg border border-white bg-white/95 p-4 shadow-sm backdrop-blur sm:grid-cols-2">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500">Campaign price</div>
              <div className="mt-1 font-display text-2xl font-bold text-slate-950">Rs. 6,999</div>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Globe2 size={18} className="text-sky-700" />
              Eligible .np domain guidance plus free hosting with terms and conditions applied
            </div>
          </div>
        </div>
      </FadeUp>
    </div>
  </SectionWrapper>
);

export default DigitalFairnessHomeSection;
