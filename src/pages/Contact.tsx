import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/PageHero";
import SectionWrapper, { FadeUp } from "@/components/SectionWrapper";
import { Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [form, setForm] = useState({
    name: "", email: "", company: "", projectType: "", budget: "", timeline: "", message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you! We'll be in touch soon.");
    setForm({ name: "", email: "", company: "", projectType: "", budget: "", timeline: "", message: "" });
  };

  const inputClass = "w-full bg-secondary border border-border/50 rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all duration-200";
  const labelClass = "block text-sm font-medium text-foreground mb-1.5";

  return (
    <div>
      <PageHero
        headline="Contact Nexaform"
        subheadline="Tell us about your business challenge, product idea, or software project. We'd love to explore how we can help."
        paragraph="Whether you need a custom web application, a modern business platform, or a digital system built around your workflow, Nexaform is here to help you move forward with clarity."
      />

      <SectionWrapper>
        <FadeUp>
          <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight text-foreground mb-3">
            Start the conversation
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-[65ch] mb-10">
            Looking for a software development company in Nepal for custom software, web applications, or digital systems? Share your project details and we'll get back to you with the next best step.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <FadeUp className="lg:col-span-2">
            <div className="card-surface rounded-card p-8">
              <h3 className="font-display font-semibold text-xl text-foreground mb-6">Tell us about your project</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Full Name</label>
                    <input className={inputClass} placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                  </div>
                  <div>
                    <label className={labelClass}>Email Address</label>
                    <input type="email" className={inputClass} placeholder="you@company.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                  </div>
                  <div>
                    <label className={labelClass}>Company Name</label>
                    <input className={inputClass} placeholder="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
                  </div>
                  <div>
                    <label className={labelClass}>Project Type</label>
                    <select className={inputClass} value={form.projectType} onChange={(e) => setForm({ ...form, projectType: e.target.value })}>
                      <option value="">Select type</option>
                      <option>Web Application</option>
                      <option>Custom Software</option>
                      <option>UI/UX Design</option>
                      <option>API & Backend</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Budget Range</label>
                    <select className={inputClass} value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })}>
                      <option value="">Select budget</option>
                      <option>Under $5,000</option>
                      <option>$5,000 – $15,000</option>
                      <option>$15,000 – $50,000</option>
                      <option>$50,000+</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Project Timeline</label>
                    <select className={inputClass} value={form.timeline} onChange={(e) => setForm({ ...form, timeline: e.target.value })}>
                      <option value="">Select timeline</option>
                      <option>1 – 3 months</option>
                      <option>3 – 6 months</option>
                      <option>6+ months</option>
                      <option>Ongoing</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Message</label>
                  <textarea className={`${inputClass} min-h-[120px] resize-y`} placeholder="Tell us what you want to build, what challenge you are facing, and what kind of support you need." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
                </div>
                <Button type="submit" variant="gradient" size="lg" className="w-full md:w-auto">
                  Send Inquiry
                </Button>
              </form>
            </div>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div className="space-y-6">
              <h3 className="font-display font-semibold text-xl text-foreground">Contact details</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail size={18} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Email</div>
                    <div className="text-sm text-foreground">hello@nexaform.com</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Location</div>
                    <div className="text-sm text-foreground">Nepal</div>
                  </div>
                </div>
              </div>
              <div className="card-surface rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="available-dot" />
                  <span className="text-sm text-foreground font-medium">Available for projects</span>
                </div>
                <p className="text-sm text-muted-foreground">Available for local and international projects.</p>
              </div>
            </div>
          </FadeUp>
        </div>
      </SectionWrapper>

      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-highlight/10 pointer-events-none" />
        <div className="container relative z-10 text-center max-w-2xl mx-auto">
          <FadeUp>
            <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight gradient-text mb-5">
              Ready to shape something meaningful?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Let's build a digital system that supports real work, real users, and real growth.
            </p>
            <Link to="/contact">
              <Button variant="gradient" size="lg">Start a Project</Button>
            </Link>
          </FadeUp>
        </div>
      </section>
    </div>
  );
};

export default Contact;
