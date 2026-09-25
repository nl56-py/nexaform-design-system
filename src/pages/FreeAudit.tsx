import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  ClipboardCheck,
  FileSearch,
  Gauge,
  Globe2,
  ListChecks,
  MessageCircle,
  SearchCheck,
  Sparkles,
  Target,
} from "lucide-react";
import { toast } from "sonner";

import Seo from "@/components/Seo";
import SectionWrapper, { FadeUp, StaggerContainer, StaggerItem } from "@/components/SectionWrapper";
import { Button } from "@/components/ui/button";
import freeAuditHero from "@/assets/free-ai-seo-audit-hero.png";
import digitalFairnessHero from "@/assets/digital-fairness-campaign-hero.png";
import { submitFreeAuditRequest } from "@/lib/campaign-leads";
import { absoluteUrl, buildBreadcrumbSchema, buildWebPageSchema, createTitle, toMetaDescription } from "@/lib/seo";
import { siteContact } from "@/lib/site-config";
import { getSupabaseErrorMessage } from "@/lib/supabase-errors";

const auditChecks = [
  {
    title: "SEO foundation",
    description: "Technical structure, metadata, headings, indexability, sitemap, speed, and search snippets.",
    icon: SearchCheck,
  },
  {
    title: "AEO readiness",
    description: "Whether your pages answer direct customer questions in a format AI answer engines can understand.",
    icon: Bot,
  },
  {
    title: "GEO visibility",
    description: "Content and authority signals that help generative engines reference your business correctly.",
    icon: Globe2,
  },
  {
    title: "Local intent gaps",
    description: "How well your site matches high-intent searches like doctor near me, clinic, school, or service area.",
    icon: Target,
  },
  {
    title: "Content opportunities",
    description: "Missing service pages, proof sections, FAQs, blog topics, and trust signals that customers need.",
    icon: FileSearch,
  },
  {
    title: "Action report",
    description: "A clear audit report with prioritized fixes instead of vague SEO jargon.",
    icon: ClipboardCheck,
  },
];

const auditFlow = [
  "Submit your website and business details",
  "We check SEO, AEO, and GEO visibility signals",
  "You receive a clear report with priority fixes",
  "You decide whether to improve it yourself or work with Nexaform",
];

const auditWhatsAppHref = `https://wa.me/977${siteContact.whatsappNumber}?text=${encodeURIComponent(
  "Hello Nexaform, I want a free SEO, AEO and GEO audit for my website.",
)}`;

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 transition-all placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100";
const labelClass = "mb-1.5 block text-sm font-semibold text-slate-800";

const FreeAudit = () => {
  const [form, setForm] = useState({
    name: "",
    businessName: "",
    businessCategory: "",
    services: "",
    websiteUrl: "",
    contactNumber: "",
    email: "",
    location: "",
    goal: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      await submitFreeAuditRequest({
        name: form.name,
        businessName: form.businessName,
        businessCategory: form.businessCategory,
        services: form.services,
        websiteUrl: form.websiteUrl,
        contactNumber: form.contactNumber,
        email: form.email,
        serviceArea: form.location,
        primaryGoal: form.goal,
        notes: form.notes,
      });

      toast.success("Free audit request submitted. Nexaform will review your site soon.");
      setForm({
        name: "",
        businessName: "",
        businessCategory: "",
        services: "",
        websiteUrl: "",
        contactNumber: "",
        email: "",
        location: "",
        goal: "",
        notes: "",
      });
    } catch (error) {
      console.error("Free audit submit error:", error);
      toast.error(getSupabaseErrorMessage(error, "Something went wrong. Please try again."));
    } finally {
      setSubmitting(false);
    }
  };

  const pageTitle = createTitle("Free SEO, AEO and GEO Audit for Nepali Businesses");
  const pageDescription = toMetaDescription(
    "Get a free Nexaform audit to check whether your website is ready for Google search, AI answer engines, and generative AI discovery across SEO, AEO, and GEO signals.",
  );
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Free SEO AEO GEO Audit", path: "/free-audit" },
  ]);
  const structuredData = [
    breadcrumbSchema,
    buildWebPageSchema({
      title: pageTitle,
      description: pageDescription,
      path: "/free-audit",
      image: freeAuditHero,
      breadcrumbId: `${absoluteUrl("/free-audit")}#breadcrumb`,
    }),
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${absoluteUrl("/free-audit")}#service`,
      name: "Free SEO, AEO and GEO Audit",
      provider: {
        "@type": "Organization",
        name: "Nexaform Pvt. Ltd.",
      },
      areaServed: "Nepal",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "NPR",
        url: absoluteUrl("/free-audit"),
      },
    },
  ];

  return (
    <div className="bg-slate-50 text-slate-950">
      <Seo title={pageTitle} description={pageDescription} path="/free-audit" image={freeAuditHero} structuredData={structuredData} />

      <section className="relative isolate flex min-h-[92svh] items-center overflow-hidden pb-14 pt-24 sm:pt-28 lg:min-h-[88vh]">
        <img
          src={freeAuditHero}
          alt="Nexaform free SEO AEO GEO audit visual"
          className="absolute inset-0 h-full w-full object-cover object-center"
          loading="eager"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(248,250,252,0.99)_0%,rgba(248,250,252,0.94)_36%,rgba(248,250,252,0.52)_68%,rgba(248,250,252,0.18)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-50 to-transparent" />

        <div className="container relative z-10">
          <div className="max-w-3xl">
            <FadeUp>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/88 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.24em] text-emerald-700 shadow-sm backdrop-blur">
                <Sparkles size={14} />
                Free SEO / AEO / GEO Audit
              </span>
            </FadeUp>
            <FadeUp delay={0.08}>
              <h1 className="mt-6 max-w-2xl text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Find out what Google and AI actually understand about your business.
              </h1>
            </FadeUp>
            <FadeUp delay={0.16}>
              <p className="mt-5 max-w-[64ch] text-base font-medium leading-7 text-slate-700 sm:text-lg">
                Customers now search beyond Google. They also use ChatGPT, Gemini, Grok, and other
                AI engines. Having a website is not enough; if AI systems cannot understand your
                site, your business is harder to discover.
              </p>
            </FadeUp>
            <FadeUp delay={0.24}>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#audit-form">
                  <Button variant="gradient" size="lg">
                    Request Free Audit <ArrowRight size={18} />
                  </Button>
                </a>
                <Link to="/digital-fairness-campaign">
                  <Button size="lg" variant="outline" className="border-slate-300 bg-white/80 text-slate-950 hover:bg-white">
                    Digital Fairness Campaign
                  </Button>
                </Link>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <SectionWrapper className="bg-slate-50">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <FadeUp>
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-sky-700">
              Website does not equal visibility
            </span>
            <h2 className="mt-3 max-w-xl font-display text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
              We check the signals that decide whether customers find you.
            </h2>
            <p className="mt-4 max-w-[62ch] leading-7 text-slate-600">
              Proper Search Engine Optimization, AI Engine Optimization, and Generative Engine
              Optimization help your website become understandable, quotable, and discoverable.
              Nexaform checks those signals for free under the Digital Fairness Campaign.
            </p>
            <div className="mt-7 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-2 font-display text-lg font-semibold text-slate-950">
                <ListChecks size={20} className="text-sky-700" />
                Simple audit flow
              </div>
              <div className="grid gap-3">
                {auditFlow.map((step, index) => (
                  <div key={step} className="grid grid-cols-[2rem_1fr] items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-50 font-mono text-xs font-semibold text-sky-700">
                      {index + 1}
                    </div>
                    <p className="pt-1 text-sm font-medium leading-6 text-slate-700">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          <StaggerContainer className="grid gap-4 sm:grid-cols-2">
            {auditChecks.map((check) => {
              const Icon = check.icon;

              return (
                <StaggerItem key={check.title}>
                  <article className="h-full rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition-transform duration-200 hover:-translate-y-0.5">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                      <Icon size={20} />
                    </div>
                    <h3 className="font-display text-base font-semibold text-slate-950">{check.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{check.description}</p>
                  </article>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </SectionWrapper>

      <section id="audit-form" className="bg-white py-14 md:py-20">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <FadeUp>
              <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-sky-700">
                Start the audit
              </span>
              <h2 className="mt-3 max-w-xl font-display text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
                Submit your site for a zero-risk visibility report.
              </h2>
              <p className="mt-4 max-w-[58ch] leading-7 text-slate-600">
                You should not have to pay thousands just to understand whether your website can be
                found. Share your business details once and we will review how your website performs
                for Google, AI answers, and generative search visibility.
              </p>
              <div className="mt-7 grid gap-3">
                <div className="flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
                  <CheckCircle2 size={20} className="mt-0.5 shrink-0" />
                  <span className="text-sm leading-6">
                    Free report covering SEO, AEO, and GEO readiness.
                  </span>
                </div>
                <a
                  href={auditWhatsAppHref}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-slate-800 transition-colors hover:bg-slate-100"
                >
                  <MessageCircle size={20} className="mt-0.5 shrink-0 text-sky-700" />
                  <span>
                    <span className="block text-sm font-semibold">WhatsApp: {siteContact.whatsappNumber}</span>
                    <span className="mt-1 block text-sm text-slate-600">
                      Send your website link directly if you prefer.
                    </span>
                  </span>
                </a>
              </div>
            </FadeUp>

            <FadeUp delay={0.12}>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 shadow-sm sm:p-6">
                <h3 className="font-display text-xl font-semibold text-slate-950">
                  Free audit request form
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Give us enough context to check your search and AI visibility properly.
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
                      <label className={labelClass}>Business / Brand name</label>
                      <input
                        className={inputClass}
                        value={form.businessName}
                        onChange={(event) => setForm({ ...form, businessName: event.target.value })}
                        placeholder="Business name"
                        required
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Business category</label>
                      <select
                        className={inputClass}
                        value={form.businessCategory}
                        onChange={(event) => setForm({ ...form, businessCategory: event.target.value })}
                        required
                      >
                        <option value="">Select category</option>
                        <option>Clinic / doctor</option>
                        <option>School / college</option>
                        <option>Law firm / consultant</option>
                        <option>Local business</option>
                        <option>Professional service</option>
                        <option>Online product / ecommerce</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Website URL</label>
                      <input
                        type="url"
                        className={inputClass}
                        value={form.websiteUrl}
                        onChange={(event) => setForm({ ...form, websiteUrl: event.target.value })}
                        placeholder="https://yourwebsite.com"
                        required
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Contact number</label>
                      <input
                        className={inputClass}
                        value={form.contactNumber}
                        onChange={(event) => setForm({ ...form, contactNumber: event.target.value })}
                        placeholder="98XXXXXXXX"
                        required
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Email address</label>
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
                      <label className={labelClass}>City / Service area</label>
                      <input
                        className={inputClass}
                        value={form.location}
                        onChange={(event) => setForm({ ...form, location: event.target.value })}
                        placeholder="Kathmandu, Pokhara, Nepal..."
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Primary goal</label>
                      <select
                        className={inputClass}
                        value={form.goal}
                        onChange={(event) => setForm({ ...form, goal: event.target.value })}
                      >
                        <option value="">Select goal</option>
                        <option>Rank higher on Google</option>
                        <option>Show up in AI answers</option>
                        <option>Get more booking inquiries</option>
                        <option>Improve local visibility</option>
                        <option>Understand what is wrong</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Services or products you provide</label>
                    <textarea
                      className={`${inputClass} min-h-[108px] resize-y`}
                      value={form.services}
                      onChange={(event) => setForm({ ...form, services: event.target.value })}
                      placeholder="Describe your main services/products and ideal customers."
                      required
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Anything else we should know?</label>
                    <textarea
                      className={`${inputClass} min-h-[108px] resize-y`}
                      value={form.notes}
                      onChange={(event) => setForm({ ...form, notes: event.target.value })}
                      placeholder="Share competitors, target keywords, current issues, or recent website changes."
                    />
                  </div>

                  <Button type="submit" variant="gradient" size="lg" className="w-full sm:w-auto" disabled={submitting}>
                    {submitting ? "Submitting..." : "Submit Free Audit Request"}
                  </Button>
                </form>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#f8fcff_0%,#eef8ff_100%)] py-14 md:py-20">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <FadeUp>
              <img
                src={digitalFairnessHero}
                alt="Nexaform Digital Fairness Campaign website package"
                className="aspect-[16/10] w-full rounded-lg border border-white object-cover shadow-[0_28px_70px_rgba(59,130,246,0.13)]"
                loading="lazy"
              />
            </FadeUp>
            <FadeUp delay={0.12}>
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.24em] text-sky-700">
                <Gauge size={15} />
                Need a website first?
              </div>
              <h2 className="mt-3 max-w-xl font-display text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
                No website yet? Join the Digital Fairness Campaign.
              </h2>
              <p className="mt-4 max-w-[58ch] leading-7 text-slate-600">
                Search and AI visibility starts with a proper digital presence. Through our Digital
                Fairness Campaign, get an accessible, mobile-first website with full admin content ownership,
                booking flow, contact capture, .np domain coordination, and starter hosting support.
              </p>
              <div className="mt-7">
                <Link to="/digital-fairness-campaign">
                  <Button variant="gradient" size="lg">
                    Explore Digital Fairness Campaign <ArrowRight size={18} />
                  </Button>
                </Link>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FreeAudit;
