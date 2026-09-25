import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  Check,
  CheckCircle2,
  ClipboardList,
  Globe2,
  HeartHandshake,
  LayoutDashboard,
  Mail,
  MessageCircle,
  MonitorSmartphone,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Wrench,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

import Seo from "@/components/Seo";
import SectionWrapper, { FadeUp, StaggerContainer, StaggerItem } from "@/components/SectionWrapper";
import { Button } from "@/components/ui/button";
import digitalFairnessHero from "@/assets/digital-fairness-campaign-hero.png";
import freeAuditHero from "@/assets/free-ai-seo-audit-hero.png";
import { submitDigitalFairnessBooking } from "@/lib/campaign-leads";
import { absoluteUrl, buildBreadcrumbSchema, buildWebPageSchema, createTitle, toMetaDescription } from "@/lib/seo";
import { siteContact } from "@/lib/site-config";
import { getSupabaseErrorMessage } from "@/lib/supabase-errors";

const packageFeatures = [
  {
    title: "Brand-First Responsive Experience",
    description: "Tailored hero section, typography, logo placement, and modern styling shaped around your business identity.",
    icon: BadgeCheck,
  },
  {
    title: "Self-Managed Admin Control",
    description: "Upload high-res photos, videos, blogs, service offerings, and team updates directly from your own admin dashboard.",
    icon: LayoutDashboard,
  },
  {
    title: "Direct Client Booking Flow",
    description: "Enable customers to explore services, choose options, and submit consultation or appointment inquiries with ease.",
    icon: CalendarCheck,
  },
  {
    title: "Lead Capture & Inquiries",
    description: "Integrated contact capture forms hooked directly to your admin pipeline and WhatsApp for rapid conversions.",
    icon: ClipboardList,
  },
  {
    title: "Mobile-First Architecture",
    description: "Engineered specifically for lightning-fast mobile performance on Nepali networks, then scaled beautifully to desktops.",
    icon: MonitorSmartphone,
  },
  {
    title: "Official .np Domain Guidance",
    description: "Full coordination with Mercantile for eligible free .com.np, .edu.np, or name-based personal .np domain registrations.",
    icon: Globe2,
  },
  {
    title: "Starter Hosting Support",
    description: "Reliable starter hosting included under campaign terms and conditions, allowing you to launch without initial hosting barriers.",
    icon: ShieldCheck,
  },
  {
    title: "Ongoing Maintenance & Care",
    description: "Direct engineering support with post-launch onboarding. Zero hidden retainer fees or surprise maintenance charges.",
    icon: Wrench,
  },
  {
    title: "AI & Search Discovery Engine",
    description: "Engineered with clean schema metadata, sitemap automation, and an included free SEO/AEO/GEO readiness audit.",
    icon: SearchCheck,
  },
];

const audiences = [
  { title: "Local Businesses & Retail", desc: "Showcase products, store locations, and let customers reach out directly via WhatsApp." },
  { title: "Doctors, Clinics & Health", desc: "Build patient trust with clinic credentials, department listings, and appointment forms." },
  { title: "Lawyers & Consultants", desc: "Establish digital authority, display legal expertise, and accept confidential inquiries." },
  { title: "Schools & Educational Academies", desc: "Highlight programs, faculty, admission procedures, and eligible .edu.np web identity." },
  { title: "Hospitality & Local Services", desc: "Attract local and tourist clientele with clear service packages and instant bookings." },
  { title: "Personal Brands & Founders", desc: "Own your Google and AI search footprint with a sleek personal portfolio and blog." },
];

const packageIncludes = [
  "Bespoke mobile-first landing experience",
  "Brand-aligned color palette & visual assets",
  "Dedicated services & package inquiry path",
  "Self-hosted admin panel for photos, blogs & updates",
  "WhatsApp direct conversion integration",
  "Full technical SEO and AI engine indexing setup",
  "Eligible .np Mercantile domain registration assistance",
  "Starter hosting included (Terms & Conditions applied)",
  "Free SEO, AEO, and GEO AI readiness audit included",
  "Transparent guidance with zero lock-ins",
];

const comparisonPoints = [
  {
    title: "Upfront Financial Cost",
    traditional: "Heavy quotes of NPR 30,000 to 50,000+ for basic starter websites.",
    campaign: "Subsidized, highly accessible campaign tier created to democratize web access.",
  },
  {
    title: "Content & Admin Control",
    traditional: "Code lock-in or complicated CMS setups requiring continuous agency invoices.",
    campaign: "Full ownership via an intuitive built-in admin panel to upload images, blogs, and edits.",
  },
  {
    title: "Domain Setup (.np)",
    traditional: "Often left unassisted or upcharged despite Mercantile providing free .np domains.",
    campaign: "Hands-on document coordination for eligible .com.np, .edu.np, or personal domains.",
  },
  {
    title: "Hosting & Maintenance",
    traditional: "Surprise monthly hosting bills, renewal markups, and unannounced fees.",
    campaign: "Starter hosting support included (T&C applied) with completely transparent onboarding.",
  },
  {
    title: "Search & AI Readiness",
    traditional: "Static markup lacking modern schema, invisible to ChatGPT and Gemini.",
    campaign: "Included comprehensive SEO/AEO/GEO audit to ensure humans and AI find you.",
  },
];

const campaignWhatsAppHref = `https://wa.me/977${siteContact.whatsappNumber}?text=${encodeURIComponent(
  "Hello Nexaform, I want to join the Digital Fairness Campaign and get my professional website live.",
)}`;

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-950 transition-all placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-4 focus:ring-sky-100";
const labelClass = "mb-1.5 block text-sm font-semibold text-slate-800";

const DigitalFairnessCampaign = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    category: "",
    domainNeed: "",
    timeline: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      await submitDigitalFairnessBooking({
        name: form.name,
        email: form.email,
        phone: form.phone,
        organization: form.organization,
        businessCategory: form.category,
        domainSupport: form.domainNeed,
        preferredTimeline: form.timeline,
        servicesDescription: form.message,
      });

      toast.success("Campaign booking request received. Nexaform will contact you soon.");
      setForm({
        name: "",
        email: "",
        phone: "",
        organization: "",
        category: "",
        domainNeed: "",
        timeline: "",
        message: "",
      });
    } catch (error) {
      console.error("Campaign booking submit error:", error);
      toast.error(getSupabaseErrorMessage(error, "Something went wrong. Please try again."));
    } finally {
      setSubmitting(false);
    }
  };

  const pageTitle = createTitle("Digital Fairness Campaign - Accessible Websites for Nepal");
  const pageDescription = toMetaDescription(
    "Nexaform Digital Fairness Campaign empowers Nepali businesses, clinics, institutions, and professionals with accessible, mobile-first websites, admin panel control, domain guidance, starter hosting support, and a free SEO/AEO/GEO audit.",
  );
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Digital Fairness Campaign", path: "/digital-fairness-campaign" },
  ]);
  const structuredData = [
    breadcrumbSchema,
    buildWebPageSchema({
      title: pageTitle,
      description: pageDescription,
      path: "/digital-fairness-campaign",
      image: digitalFairnessHero,
      breadcrumbId: `${absoluteUrl("/digital-fairness-campaign")}#breadcrumb`,
    }),
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${absoluteUrl("/digital-fairness-campaign")}#campaign-service`,
      name: "Nexaform Digital Fairness Campaign",
      serviceType: "Website Design and Development Initiative",
      description:
        "Subsidized, mobile-first professional web development initiative for Nepali businesses with full admin control, .np domain guidance, starter hosting support, and search audit.",
      provider: {
        "@type": "Organization",
        name: "Nexaform",
        url: absoluteUrl("/"),
      },
      areaServed: "Nepal",
      url: absoluteUrl("/digital-fairness-campaign"),
    },
  ];

  return (
    <div className="bg-slate-50 text-slate-950">
      <Seo
        title={pageTitle}
        description={pageDescription}
        path="/digital-fairness-campaign"
        image={digitalFairnessHero}
        structuredData={structuredData}
      />

      {/* Hero Section */}
      <section className="relative isolate flex min-h-[92svh] items-center overflow-hidden pb-16 pt-24 sm:pt-28 lg:min-h-[88vh]">
        <img
          src={digitalFairnessHero}
          alt="Nexaform Digital Fairness Campaign website package visual"
          className="absolute inset-0 h-full w-full object-cover object-center"
          loading="eager"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(248,250,252,0.98)_0%,rgba(248,250,252,0.92)_38%,rgba(248,250,252,0.48)_68%,rgba(248,250,252,0.2)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-50 to-transparent" />

        <div className="container relative z-10">
          <div className="max-w-3xl">
            <FadeUp>
              <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/90 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.24em] text-sky-700 shadow-sm backdrop-blur">
                <Sparkles size={14} className="text-amber-500" />
                Digital Fairness Campaign
              </span>
            </FadeUp>
            <FadeUp delay={0.08}>
              <h1 className="mt-6 max-w-2xl text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Democratizing professional web presence for Nepal.
              </h1>
            </FadeUp>
            <FadeUp delay={0.16}>
              <p className="mt-5 max-w-[62ch] text-base font-medium leading-7 text-slate-700 sm:text-lg">
                High agency costs should never block Nepali businesses from being found online.
                Nexaform launched the Digital Fairness Campaign to eliminate the barrier of paying
                Rs. 30,000 to Rs. 50,000 for a website. We deliver modern web infrastructure,
                complete admin ownership, .np domain guidance, and starter hosting without hidden traps.
              </p>
            </FadeUp>
            <FadeUp delay={0.22}>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <div className="rounded-xl border border-sky-200 bg-white/90 px-4 py-3 shadow-sm backdrop-blur">
                  <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-sky-700 font-semibold">
                    <HeartHandshake size={13} />
                    Mission-Driven
                  </div>
                  <div className="font-display text-lg font-bold text-slate-950">Subsidized Starter Tier</div>
                </div>
                <div className="rounded-xl border border-emerald-200 bg-emerald-50/90 px-4 py-3 text-sm font-semibold text-emerald-800 shadow-sm backdrop-blur">
                  Free SEO, AEO & GEO audit included
                </div>
                <div className="rounded-xl border border-sky-100 bg-white/85 px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur">
                  Starter hosting included (T&C applied)
                </div>
              </div>
            </FadeUp>
            <FadeUp delay={0.3}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="#campaign-booking">
                  <Button variant="gradient" size="lg">
                    Join Fairness Campaign <ArrowRight size={18} />
                  </Button>
                </a>
                <Link to="/free-audit">
                  <Button size="lg" variant="outline" className="border-slate-300 bg-white/90 text-slate-950 shadow-sm hover:bg-white">
                    <SearchCheck size={18} />
                    Get Free SEO/AI Audit
                  </Button>
                </Link>
                <a href={campaignWhatsAppHref} target="_blank" rel="noreferrer">
                  <Button variant="outline" size="lg" className="border-emerald-200 bg-emerald-50 text-emerald-800 shadow-sm hover:bg-emerald-100">
                    <MessageCircle size={18} />
                    WhatsApp
                  </Button>
                </a>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Package Feature Grid */}
      <SectionWrapper className="bg-slate-50">
        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <FadeUp>
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-sky-700 font-semibold">
              The Campaign Package
            </span>
            <h2 className="mt-3 max-w-xl font-display text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
              Everything your business needs to launch with authority.
            </h2>
            <p className="mt-4 max-w-[62ch] leading-7 text-slate-600">
              Your visual brand, services, booking pathways, and lead forms are built into a high-performance,
              mobile-first architecture that establishes legitimate credibility in Nepal and beyond.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {packageIncludes.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-500" />
                  <span className="text-sm font-medium leading-snug text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </FadeUp>

          <StaggerContainer className="grid gap-4 sm:grid-cols-2">
            {packageFeatures.map((feature) => {
              const Icon = feature.icon;

              return (
                <StaggerItem key={feature.title}>
                  <article className="group h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-sky-200 hover:shadow-md">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-700 transition-colors group-hover:bg-sky-600 group-hover:text-white">
                      <Icon size={20} />
                    </div>
                    <h3 className="font-display text-base font-semibold text-slate-950">{feature.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{feature.description}</p>
                  </article>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </SectionWrapper>

      {/* Comparison: Traditional Agency vs Digital Fairness */}
      <section className="relative overflow-hidden bg-white py-16 md:py-24">
        <div className="container">
          <FadeUp className="text-center max-w-3xl mx-auto mb-14">
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-sky-700 font-semibold">
              Transparent Accountability
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
              Traditional Agency Barriers vs. Digital Fairness
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Why we started this campaign: to eliminate unnecessary gatekeeping and provide an honest,
              modern software foundation for Nepali enterprise.
            </p>
          </FadeUp>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {comparisonPoints.map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-lg font-bold text-slate-950 mb-4">{item.title}</h3>

                  <div className="space-y-4">
                    <div className="rounded-xl border border-rose-100 bg-rose-50/60 p-3.5 text-xs">
                      <div className="flex items-center gap-1.5 font-semibold text-rose-700 mb-1">
                        <XCircle size={14} />
                        The Traditional Barrier
                      </div>
                      <p className="text-slate-600 leading-relaxed">{item.traditional}</p>
                    </div>

                    <div className="rounded-xl border border-emerald-100 bg-emerald-50/70 p-3.5 text-xs">
                      <div className="flex items-center gap-1.5 font-semibold text-emerald-800 mb-1">
                        <Check size={14} className="stroke-[3]" />
                        The Digital Fairness Standard
                      </div>
                      <p className="text-slate-700 leading-relaxed font-medium">{item.campaign}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Built For Section */}
      <SectionWrapper className="bg-slate-50">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <FadeUp>
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-sky-700 font-semibold">
              Empowering Sectors
            </span>
            <h2 className="mt-3 max-w-xl font-display text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
              Engineered for real businesses, practices, and institutions in Nepal.
            </h2>
            <p className="mt-4 max-w-[64ch] leading-7 text-slate-600">
              Whether you are launching a new clinic, registering a school, growing a law practice,
              or taking your local brand digital, the Digital Fairness Campaign equips you with
              a battle-tested website and verified .np domain guidance.
            </p>
            <div className="mt-6 p-4 rounded-xl border border-sky-100 bg-white/90 text-sm text-slate-700 space-y-2">
              <div className="flex items-center gap-2 font-semibold text-sky-900">
                <Globe2 size={18} className="text-sky-600" />
                Free .np Domain Guidance Included
              </div>
              <p className="text-xs leading-relaxed text-slate-600">
                Registered companies are guided on official Mercantile .com.np registration. Educational
                institutions receive .edu.np guidance. Personal brand leaders receive assistance with
                name-based official .np domains at no extra charge.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.12}>
            <div className="grid gap-3 sm:grid-cols-2">
              {audiences.map((audience) => (
                <div key={audience.title} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex items-center gap-2 font-display text-sm font-bold text-slate-950">
                    <ShieldCheck size={18} className="text-sky-600 shrink-0" />
                    {audience.title}
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">{audience.desc}</p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </SectionWrapper>

      {/* Synergy with Free Audit */}
      <SectionWrapper className="bg-[linear-gradient(180deg,#f8fcff_0%,#f1f8ff_100%)]">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <FadeUp>
            <img
              src={freeAuditHero}
              alt="Nexaform free SEO AEO GEO audit dashboard visual"
              className="aspect-[16/10] w-full rounded-2xl border border-white object-cover shadow-[0_28px_70px_rgba(59,130,246,0.13)]"
              loading="lazy"
            />
          </FadeUp>
          <FadeUp delay={0.12}>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-emerald-700 shadow-sm">
              <SearchCheck size={14} />
              Included Search & AI Audit
            </span>
            <h2 className="mt-5 max-w-2xl font-display text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
              Be discoverable on Google and conversational AI engines.
            </h2>
            <p className="mt-4 max-w-[64ch] leading-7 text-slate-600">
              Having a website is only step one. Customers increasingly search on ChatGPT, Gemini, Grok,
              and AI answer engines. Nexaform audits your search signals (SEO), answer engine optimization (AEO),
              and generative engine optimization (GEO) for free so you stay visible.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/free-audit">
                <Button variant="gradient" size="lg">
                  Request Free Audit <ArrowRight size={18} />
                </Button>
              </Link>
              <a href={campaignWhatsAppHref} target="_blank" rel="noreferrer">
                <Button variant="outline" size="lg" className="border-slate-300 bg-white text-slate-950 hover:bg-slate-50">
                  <MessageCircle size={18} />
                  WhatsApp Nexaform
                </Button>
              </a>
            </div>
          </FadeUp>
        </div>
      </SectionWrapper>

      {/* Campaign Application / Booking Form */}
      <section id="campaign-booking" className="bg-white py-16 md:py-24">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <FadeUp>
              <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-sky-700 font-semibold">
                Join The Movement
              </span>
              <h2 className="mt-3 max-w-xl font-display text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
                Apply for the Digital Fairness Campaign.
              </h2>
              <p className="mt-4 max-w-[58ch] leading-7 text-slate-600">
                Submit your business details below. Our engineering team reviews each application,
                confirms domain eligibility, and schedules a transparent onboarding call within 24 hours.
              </p>
              <div className="mt-7 space-y-4">
                <a
                  href={campaignWhatsAppHref}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 text-emerald-950 transition-colors hover:bg-emerald-100/70"
                >
                  <MessageCircle size={22} className="mt-0.5 shrink-0 text-emerald-600" />
                  <span>
                    <span className="block text-sm font-semibold">WhatsApp Direct: {siteContact.whatsappNumber}</span>
                    <span className="mt-1 block text-xs text-emerald-800 leading-relaxed">
                      Instant communication with Nexaform leads team for immediate answers.
                    </span>
                  </span>
                </a>
                <a
                  href={siteContact.emailHref}
                  className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-800 transition-colors hover:bg-slate-100"
                >
                  <Mail size={22} className="mt-0.5 shrink-0 text-sky-700" />
                  <span>
                    <span className="block text-sm font-semibold">{siteContact.email}</span>
                    <span className="mt-1 block text-xs text-slate-600 leading-relaxed">
                      Send your existing brand collateral, registration documents, or requirements.
                    </span>
                  </span>
                </a>
              </div>
            </FadeUp>

            <FadeUp delay={0.12}>
              <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-6 shadow-sm sm:p-8">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-100 text-sky-700">
                    <Sparkles size={16} />
                  </span>
                  <h3 className="font-display text-xl font-bold text-slate-950">
                    Campaign Application Form
                  </h3>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Fill out this brief application. We will follow up with your customized onboarding
                  checklist, domain coordination steps, and rapid development timeline.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className={labelClass}>Full name *</label>
                      <input
                        className={inputClass}
                        value={form.name}
                        onChange={(event) => setForm({ ...form, name: event.target.value })}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Email address *</label>
                      <input
                        type="email"
                        className={inputClass}
                        value={form.email}
                        onChange={(event) => setForm({ ...form, email: event.target.value })}
                        placeholder="you@company.com"
                        required
                      />
                    </div>
                    <div>
                      <label className={labelClass}>WhatsApp or mobile number *</label>
                      <input
                        className={inputClass}
                        value={form.phone}
                        onChange={(event) => setForm({ ...form, phone: event.target.value })}
                        placeholder="98XXXXXXXX"
                        required
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Business / Organization</label>
                      <input
                        className={inputClass}
                        value={form.organization}
                        onChange={(event) => setForm({ ...form, organization: event.target.value })}
                        placeholder="Organization or brand name"
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Business category *</label>
                      <select
                        className={inputClass}
                        value={form.category}
                        onChange={(event) => setForm({ ...form, category: event.target.value })}
                        required
                      >
                        <option value="">Select category</option>
                        <option>Business owner</option>
                        <option>Doctor / clinic</option>
                        <option>Lawyer / consultant</option>
                        <option>School / college</option>
                        <option>Personal brand</option>
                        <option>Other professional service</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Domain requirement</label>
                      <select
                        className={inputClass}
                        value={form.domainNeed}
                        onChange={(event) => setForm({ ...form, domainNeed: event.target.value })}
                      >
                        <option value="">Select option</option>
                        <option>Need .com.np registration help</option>
                        <option>Need .edu.np registration help</option>
                        <option>Need personal .np domain help</option>
                        <option>Already have an active domain</option>
                        <option>Not sure yet</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className={labelClass}>Target launch timeline</label>
                      <select
                        className={inputClass}
                        value={form.timeline}
                        onChange={(event) => setForm({ ...form, timeline: event.target.value })}
                      >
                        <option value="">Select timeline</option>
                        <option>As soon as possible</option>
                        <option>Within 2 weeks</option>
                        <option>Within 1 month</option>
                        <option>Planning for later</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>What services or products do you provide? *</label>
                    <textarea
                      className={`${inputClass} min-h-[120px] resize-y`}
                      value={form.message}
                      onChange={(event) => setForm({ ...form, message: event.target.value })}
                      placeholder="Briefly describe your services, target audience, booking requirements, or any specific media/blog content you want featured."
                      required
                    />
                  </div>

                  <div className="pt-2">
                    <Button type="submit" variant="gradient" size="lg" className="w-full sm:w-auto" disabled={submitting}>
                      {submitting ? "Submitting Application..." : "Submit Campaign Application"}
                    </Button>
                  </div>
                </form>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DigitalFairnessCampaign;
