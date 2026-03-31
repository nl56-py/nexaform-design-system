import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, MapPin } from "lucide-react";
import { toast } from "sonner";
import PageHero from "@/components/PageHero";
import Seo from "@/components/Seo";
import SectionWrapper, { FadeUp } from "@/components/SectionWrapper";
import SocialFollowButtons from "@/components/SocialFollowButtons";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { siteContact } from "@/lib/site-config";
import { getSupabaseErrorMessage } from "@/lib/supabase-errors";
import {
  absoluteUrl,
  buildBreadcrumbSchema,
  buildWebPageSchema,
  createTitle,
  toMetaDescription,
} from "@/lib/seo";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke("submit-contact", {
        body: {
          name: form.name,
          email: form.email,
          company: form.company,
          projectType: form.projectType,
          budget: form.budget,
          timeline: form.timeline,
          message: form.message,
        },
      });

      if (error) throw error;

      toast.success("Thank you! We'll be in touch soon.");
      setForm({
        name: "",
        email: "",
        company: "",
        projectType: "",
        budget: "",
        timeline: "",
        message: "",
      });
    } catch (err) {
      console.error("Submit error:", err);
      toast.error(getSupabaseErrorMessage(err, "Something went wrong. Please try again."));
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-border/50 bg-secondary px-4 py-3 text-sm text-foreground transition-all duration-200 placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20";
  const labelClass = "mb-1.5 block text-sm font-medium text-foreground";
  const pageTitle = createTitle("Contact Nexaform");
  const pageDescription = toMetaDescription(
    "Contact Nexaform to discuss custom software development, web applications, AI automation, or digital systems for your business.",
  );
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ]);
  const structuredData = [
    breadcrumbSchema,
    buildWebPageSchema({
      title: pageTitle,
      description: pageDescription,
      path: "/contact",
      type: "ContactPage",
      breadcrumbId: `${absoluteUrl("/contact")}#breadcrumb`,
    }),
    {
      "@context": "https://schema.org",
      "@type": "ContactPoint",
      "@id": `${absoluteUrl("/contact")}#contact-point`,
      contactType: "sales",
      email: siteContact.email,
      areaServed: siteContact.areaServed,
      availableLanguage: "English",
      url: absoluteUrl("/contact"),
    },
  ];

  return (
    <div>
      <Seo title={pageTitle} description={pageDescription} path="/contact" structuredData={structuredData} />

      <PageHero
        headline="Contact Nexaform"
        subheadline="Tell us about your business challenge, product idea, or software project. We'd love to explore how we can help."
        paragraph="Whether you need a custom web application, a modern business platform, or a digital system built around your workflow, Nexaform is here to help you move forward with clarity."
      />

      <SectionWrapper>
        <FadeUp>
          <h2 className="mb-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Start the conversation
          </h2>
          <p className="mb-10 max-w-[65ch] leading-relaxed text-muted-foreground">
            Looking for a software development company in Nepal for custom software, web
            applications, or digital systems? Share your project details and we'll get back to you
            with the next best step.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <FadeUp className="lg:col-span-2">
            <div className="card-surface rounded-card p-8">
              <h3 className="mb-6 font-display text-xl font-semibold text-foreground">
                Tell us about your project
              </h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <label className={labelClass}>Full Name</label>
                    <input
                      className={inputClass}
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Email Address</label>
                    <input
                      type="email"
                      className={inputClass}
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Company Name</label>
                    <input
                      className={inputClass}
                      placeholder="Company"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Project Type</label>
                    <select
                      className={inputClass}
                      value={form.projectType}
                      onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                    >
                      <option value="">Select type</option>
                      <option>Web Application</option>
                      <option>Custom Software</option>
                      <option>AI Literacy</option>
                      <option>AI Automation</option>
                      <option>API & Backend</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Budget Range</label>
                    <select
                      className={inputClass}
                      value={form.budget}
                      onChange={(e) => setForm({ ...form, budget: e.target.value })}
                    >
                      <option value="">Select budget</option>
                      <option>Under $5,000</option>
                      <option>$5,000 - $15,000</option>
                      <option>$15,000 - $50,000</option>
                      <option>$50,000+</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Project Timeline</label>
                    <select
                      className={inputClass}
                      value={form.timeline}
                      onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                    >
                      <option value="">Select timeline</option>
                      <option>1 - 3 months</option>
                      <option>3 - 6 months</option>
                      <option>6+ months</option>
                      <option>Ongoing</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Message</label>
                  <textarea
                    className={`${inputClass} min-h-[120px] resize-y`}
                    placeholder="Tell us what you want to build, what challenge you are facing, and what kind of support you need."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  variant="gradient"
                  size="lg"
                  className="w-full md:w-auto"
                  disabled={submitting}
                >
                  {submitting ? "Sending..." : "Send Inquiry"}
                </Button>
              </form>
            </div>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div className="space-y-6">
              <h3 className="font-display text-xl font-semibold text-foreground">
                Contact details
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Mail size={18} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Email</div>
                    <a
                      href={siteContact.emailHref}
                      className="text-sm text-foreground transition-colors duration-200 hover:text-primary"
                    >
                      {siteContact.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <MapPin size={18} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Location</div>
                    <div className="text-sm text-foreground">{siteContact.location}</div>
                  </div>
                </div>
              </div>
              <div className="card-surface rounded-xl p-5">
                <div className="text-sm font-medium text-foreground">Follow us on</div>
                <p className="mt-2 text-sm text-muted-foreground">
                  See the latest updates, launches, and company news from Nexaform.
                </p>
                <SocialFollowButtons className="mt-4" />
              </div>
              <div className="card-surface rounded-xl p-5">
                <div className="mb-2 flex items-center gap-2">
                  <span className="available-dot" />
                  <span className="text-sm font-medium text-foreground">Available for projects</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Available for local and international projects.
                </p>
              </div>
            </div>
          </FadeUp>
        </div>
      </SectionWrapper>

      <section className="relative overflow-hidden section-padding">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-highlight/10" />
        <div className="container relative z-10 mx-auto max-w-2xl text-center">
          <FadeUp>
            <h2 className="mb-5 font-display text-3xl font-bold tracking-tight gradient-text md:text-4xl">
              Ready to shape something meaningful?
            </h2>
            <p className="mb-8 leading-relaxed text-muted-foreground">
              Let's build a digital system that supports real work, real users, and real growth.
            </p>
            <Link to="/contact">
              <Button variant="gradient" size="lg">
                Start a Project
              </Button>
            </Link>
          </FadeUp>
        </div>
      </section>
    </div>
  );
};

export default Contact;
