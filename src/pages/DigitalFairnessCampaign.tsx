import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  FileText,
  Globe2,
  LayoutDashboard,
  Mail,
  MessageCircle,
  MonitorSmartphone,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";
import { toast } from "sonner";

import Seo from "@/components/Seo";
import SectionWrapper, { FadeUp, StaggerContainer, StaggerItem } from "@/components/SectionWrapper";
import { Button } from "@/components/ui/button";
import digitalFairnessHero from "@/assets/digital-fairness-campaign-hero.png";
import freeAuditHero from "@/assets/free-ai-seo-audit-hero.png";
import { supabase } from "@/integrations/supabase/client";
import { absoluteUrl, buildBreadcrumbSchema, buildWebPageSchema, createTitle, toMetaDescription } from "@/lib/seo";
import { siteContact } from "@/lib/site-config";
import { getSupabaseErrorMessage } from "@/lib/supabase-errors";

const packageFeatures = [
  {
    title: "Brand-first landing page",
    description: "Hero section, colors, logo placement, and copy shaped around your own business identity.",
    icon: BadgeCheck,
  },
  {
    title: "Admin panel content control",
    description: "Upload website photos, videos, blogs, service updates, and campaign content from your own admin area.",
    icon: LayoutDashboard,
  },
  {
    title: "Service booking flow",
    description: "Let customers choose services, share details, and request a booking or consultation from the website.",
    icon: CalendarCheck,
  },
  {
    title: "Contact and inquiry forms",
    description: "Capture leads with forms connected to the admin contact area for clean follow-up.",
    icon: ClipboardList,
  },
  {
    title: "Mobile-first design",
    description: "Built first for phones, then expanded for laptop and desktop browsing.",
    icon: MonitorSmartphone,
  },
  {
    title: "Domain coordination",
    description: "Registered organization lai .com.np, education sector lai .edu.np, personal brand lai name-based .np domain - Mercantile coordination support included for eligible cases.",
    icon: Globe2,
  },
  {
    title: "Maintenance support",
    description: "Post-launch support is included. No surprise maintenance bill hiding behind the offer.",
    icon: Wrench,
  },
  {
    title: "SEO-ready foundation",
    description: "Clean structure, metadata, fast pages, and a path into the free SEO/AEO/GEO audit.",
    icon: SearchCheck,
  },
];

const audiences = [
  "Business owners",
  "Doctors and clinics",
  "Lawyers and consultants",
  "Schools and colleges",
  "Local service providers",
  "Personal brands",
];

const packageIncludes = [
  "Professional campaign-style landing page",
  "Business logo and brand-aligned hero design",
  "Services section with booking inquiry path",
  "Photo, video, and blog publishing from admin",
  "Contact form and WhatsApp call-to-action",
  "Mobile-first responsive experience",
  "Basic technical SEO setup",
  "Eligible .np domain and starter hosting setup guidance",
  "Free SEO/AEO/GEO audit offer included",
];

const campaignWhatsAppHref = `https://wa.me/977${siteContact.whatsappNumber}?text=${encodeURIComponent(
  "Hello Nexaform, I want to join the Digital Fairness Campaign Rs. 6,999 website package.",
)}`;

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 transition-all placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100";
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
      const { error } = await supabase.functions.invoke("submit-digital-fairness-booking", {
        body: {
          name: form.name,
          email: form.email,
          phone: form.phone,
          organization: form.organization,
          businessCategory: form.category,
          domainSupport: form.domainNeed,
          preferredTimeline: form.timeline,
          servicesDescription: form.message,
        },
      });

      if (error) throw error;

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

  const pageTitle = createTitle("Digital Fairness Campaign - Rs. 6,999 Website Package");
  const pageDescription = toMetaDescription(
    "Nexaform Digital Fairness Campaign helps Nepali businesses and professionals launch a mobile-first professional website with admin panel, booking, contact forms, domain coordination, maintenance support, and a free SEO/AEO/GEO audit for Rs. 6,999.",
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
      "@type": "Offer",
      "@id": `${absoluteUrl("/digital-fairness-campaign")}#offer`,
      name: "Nexaform Digital Fairness Website Package",
      price: "6999",
      priceCurrency: "NPR",
      availability: "https://schema.org/InStock",
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

      <section className="relative isolate flex min-h-[92svh] items-center overflow-hidden pb-14 pt-24 sm:pt-28 lg:min-h-[88vh]">
        <img
          src={digitalFairnessHero}
          alt="Nexaform Digital Fairness Campaign website package visual"
          className="absolute inset-0 h-full w-full object-cover object-center"
          loading="eager"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(248,250,252,0.98)_0%,rgba(248,250,252,0.9)_35%,rgba(248,250,252,0.42)_66%,rgba(248,250,252,0.16)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-50 to-transparent" />

        <div className="container relative z-10">
          <div className="max-w-3xl">
            <FadeUp>
              <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/85 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.24em] text-sky-700 shadow-sm backdrop-blur">
                <Sparkles size={14} />
                Digital Fairness Campaign
              </span>
            </FadeUp>
            <FadeUp delay={0.08}>
              <h1 className="mt-6 max-w-2xl text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Professional website for Nepal, in just Rs. 6,999.
              </h1>
            </FadeUp>
            <FadeUp delay={0.16}>
              <p className="mt-5 max-w-[62ch] text-base font-medium leading-7 text-slate-700 sm:text-lg">
                Agency haru lai 30,000 to 40,000 tirna parne barrier todna Nexaform le yo
                campaign launch gareko ho. This is not just a business deal. It is a campaign for
                digital fairness.
              </p>
            </FadeUp>
            <FadeUp delay={0.22}>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <div className="rounded-lg border border-slate-200 bg-white/88 px-4 py-3 shadow-sm backdrop-blur">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500">
                    Campaign price
                  </div>
                  <div className="font-display text-2xl font-bold text-slate-950">Rs. 6,999</div>
                </div>
                <div className="rounded-lg border border-emerald-200 bg-emerald-50/90 px-4 py-3 text-sm font-semibold text-emerald-800 shadow-sm backdrop-blur">
                  Free SEO, AEO and GEO audit included
                </div>
              </div>
            </FadeUp>
            <FadeUp delay={0.3}>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#campaign-booking">
                  <Button variant="gradient" size="lg">
                    Book Rs. 6,999 Package <ArrowRight size={18} />
                  </Button>
                </a>
                <Link to="/free-audit">
                  <Button size="lg" variant="outline" className="border-slate-300 bg-white/80 text-slate-950 hover:bg-white">
                    Get Free SEO/AI Audit
                  </Button>
                </Link>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <SectionWrapper className="bg-slate-50">
        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <FadeUp>
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-sky-700">
              The package
            </span>
            <h2 className="mt-3 max-w-xl font-display text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
              Everything a serious professional website needs to go live.
            </h2>
            <p className="mt-4 max-w-[62ch] leading-7 text-slate-600">
              Tapaiko brand, logo, services, booking flow, content updates, and contact capture -
              all shaped into a mobile-first website that gives your business a proper digital
              identity.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {packageIncludes.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-500" />
                  <span className="text-sm font-medium leading-6 text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </FadeUp>

          <StaggerContainer className="grid gap-4 sm:grid-cols-2">
            {packageFeatures.map((feature) => {
              const Icon = feature.icon;

              return (
                <StaggerItem key={feature.title}>
                  <article className="h-full rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition-transform duration-200 hover:-translate-y-0.5">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-sky-50 text-sky-700">
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

      <section className="relative overflow-hidden bg-white py-14 md:py-20">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <FadeUp>
              <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-sky-700">
                Why this exists
              </span>
              <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
                Professional website pricing should not block Nepali businesses from being found.
              </h2>
              <p className="mt-4 max-w-[68ch] leading-7 text-slate-600">
                Kunai agency lai professional website ko rate sodhnu bhayo bhane, common answer
                30,000 to 40,000 huncha. For many businesses and professionals, that is not just a
                price. It is a barrier. Nexaform is here to break that barrier with a fair launch
                package.
              </p>
              <p className="mt-4 max-w-[68ch] leading-7 text-slate-600">
                Yo project profit ko lagi matra haina. Nepal ko businesses, doctors, clinics,
                lawyers, schools, colleges, and professionals lai proper digital identity dina
                launch gareko ho.
              </p>
              <p className="mt-4 max-w-[68ch] leading-7 text-slate-600">
                Registered organization ho bhane .com.np, education sector lai .edu.np, ya personal
                brand ko lagi name-based .np domain chahiyo bhane, Mercantile sanga coordinate garna
                pani hami help garchhau. Eligible cases ma setup support campaign bhitrai parchha.
              </p>
            </FadeUp>

            <FadeUp delay={0.12}>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 shadow-sm">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500">
                  Built for
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {audiences.map((audience) => (
                    <div key={audience} className="flex items-center gap-3 rounded-lg bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm">
                      <ShieldCheck size={17} className="text-sky-600" />
                      {audience}
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <SectionWrapper className="bg-[linear-gradient(180deg,#f8fcff_0%,#f1f8ff_100%)]">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <FadeUp>
            <img
              src={freeAuditHero}
              alt="Nexaform free SEO AEO GEO audit dashboard visual"
              className="aspect-[16/10] w-full rounded-lg border border-white object-cover shadow-[0_28px_70px_rgba(59,130,246,0.13)]"
              loading="lazy"
            />
          </FadeUp>
          <FadeUp delay={0.12}>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-emerald-700 shadow-sm">
              <SearchCheck size={14} />
              Free Audit Offer
            </span>
            <h2 className="mt-5 max-w-2xl font-display text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
              Your website should be readable by Google and AI engines.
            </h2>
            <p className="mt-4 max-w-[64ch] leading-7 text-slate-600">
              Website bhayera matra bhayena. In 2026, customers search on Google, ChatGPT, Gemini,
              and Grok-style AI engines. Nexaform will check your SEO, AEO, and GEO readiness and
              send an in-depth report for free.
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

      <section id="campaign-booking" className="bg-white py-14 md:py-20">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <FadeUp>
              <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-sky-700">
                Book the package
              </span>
              <h2 className="mt-3 max-w-xl font-display text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
                Send your details. We will guide the next step.
              </h2>
              <p className="mt-4 max-w-[58ch] leading-7 text-slate-600">
                If you are a business owner, doctor, clinic owner, lawyer, school owner, college
                owner, or any professional wanting to enhance your digital identity at a fair cost,
                fill this form or message us directly on WhatsApp.
              </p>
              <div className="mt-7 space-y-4">
                <a
                  href={campaignWhatsAppHref}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-emerald-900 transition-colors hover:bg-emerald-100"
                >
                  <MessageCircle size={20} className="mt-0.5 shrink-0" />
                  <span>
                    <span className="block text-sm font-semibold">WhatsApp: {siteContact.whatsappNumber}</span>
                    <span className="mt-1 block text-sm text-emerald-800">
                      Fastest way to join the Digital Fairness Campaign.
                    </span>
                  </span>
                </a>
                <a
                  href={siteContact.emailHref}
                  className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-slate-800 transition-colors hover:bg-slate-100"
                >
                  <Mail size={20} className="mt-0.5 shrink-0 text-sky-700" />
                  <span>
                    <span className="block text-sm font-semibold">{siteContact.email}</span>
                    <span className="mt-1 block text-sm text-slate-600">
                      Share documents, brand assets, or organization details by email.
                    </span>
                  </span>
                </a>
              </div>
            </FadeUp>

            <FadeUp delay={0.12}>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 shadow-sm sm:p-6">
                <h3 className="font-display text-xl font-semibold text-slate-950">
                  Digital Fairness booking form
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Fill this once. We will contact you with the checklist, domain guidance, and launch
                  process.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className={labelClass}>Full name</label>
                      <input
                        className={inputClass}
                        value={form.name}
                        onChange={(event) => setForm({ ...form, name: event.target.value })}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Gmail / Email</label>
                      <input
                        type="email"
                        className={inputClass}
                        value={form.email}
                        onChange={(event) => setForm({ ...form, email: event.target.value })}
                        placeholder="you@gmail.com"
                        required
                      />
                    </div>
                    <div>
                      <label className={labelClass}>WhatsApp / Contact number</label>
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
                        placeholder="Business name"
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Business category</label>
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
                      <label className={labelClass}>Domain support</label>
                      <select
                        className={inputClass}
                        value={form.domainNeed}
                        onChange={(event) => setForm({ ...form, domainNeed: event.target.value })}
                      >
                        <option value="">Select option</option>
                        <option>Need .com.np help</option>
                        <option>Need .edu.np help</option>
                        <option>Need personal .np domain help</option>
                        <option>Already have a domain</option>
                        <option>Not sure yet</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className={labelClass}>Preferred launch timeline</label>
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
                    <label className={labelClass}>What services or products do you provide?</label>
                    <textarea
                      className={`${inputClass} min-h-[124px] resize-y`}
                      value={form.message}
                      onChange={(event) => setForm({ ...form, message: event.target.value })}
                      placeholder="Tell us about your services, target customers, booking needs, and any photo/video/blog content you want on the website."
                      required
                    />
                  </div>

                  <Button type="submit" variant="gradient" size="lg" className="w-full sm:w-auto" disabled={submitting}>
                    {submitting ? "Sending..." : "Book Campaign Package"}
                  </Button>
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
