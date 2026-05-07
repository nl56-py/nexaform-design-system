import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  ArrowLeft,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  Loader2,
  MapPin,
  Send,
  Upload,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { createTitle } from "@/lib/seo";
import { getPublishedPosition, submitJobApplication, uploadResume } from "@/lib/careers";

const CareerDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const {
    data: position,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["position", slug],
    queryFn: () => getPublishedPosition(slug!),
    enabled: !!slug,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!position || submitting) return;

    const form = new FormData(e.currentTarget);
    const fullName = (form.get("fullName") as string).trim();
    const email = (form.get("email") as string).trim();
    const phone = (form.get("phone") as string).trim() || null;
    const portfolioUrl = (form.get("portfolioUrl") as string).trim() || null;
    const coverLetter = (form.get("coverLetter") as string).trim() || null;
    const experienceYears = (form.get("experienceYears") as string).trim() || null;
    const currentRole = (form.get("currentRole") as string).trim() || null;

    if (!fullName || !email) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setSubmitting(true);

    try {
      let resumeUrl: string | null = null;

      if (resumeFile) {
        resumeUrl = await uploadResume(resumeFile);
      }

      await submitJobApplication({
        position_id: position.id,
        full_name: fullName,
        email,
        phone,
        portfolio_url: portfolioUrl,
        cover_letter: coverLetter,
        resume_url: resumeUrl,
        experience_years: experienceYears,
        current_role: currentRole,
      });

      setSubmitted(true);
      toast.success("Application submitted successfully!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to submit application.");
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !position) {
    return (
      <div className="container pb-20 pt-32">
        <div className="mx-auto max-w-2xl rounded-2xl border border-destructive/20 bg-destructive/5 px-6 py-16 text-center">
          <h2 className="font-display text-xl font-semibold text-foreground">Position not found</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            This position may no longer be available.
          </p>
          <Button asChild className="mt-6" variant="outline">
            <Link to="/careers">
              <ArrowLeft size={16} />
              Back to Careers
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <>
        <Seo
          title={createTitle(`Applied – ${position.title}`)}
          description="Application submitted successfully."
          path={`/careers/${slug}`}
          noindex
        />
        <div className="container pb-20 pt-32">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10">
              <CheckCircle2 className="h-10 w-10 text-emerald-500" />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Application Submitted!
            </h1>
            <p className="mx-auto mt-4 max-w-md text-muted-foreground">
              Thank you for applying for <strong>{position.title}</strong>. We'll review your
              application and get back to you soon.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild variant="gradient">
                <Link to="/careers">Explore More Positions</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/">Back to Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Seo
        title={createTitle(position.title)}
        description={`Apply for ${position.title} at Nexaform. ${position.department} · ${position.location} · ${position.employment_type}`}
        path={`/careers/${slug}`}
      />

      <div className="relative overflow-hidden pb-14 pt-28 md:pb-20 md:pt-32">
        <div className="absolute inset-0 gradient-glow-bg pointer-events-none" />
        <div className="container relative z-10">
          <Button
            variant="ghost"
            className="mb-6 -ml-2 text-muted-foreground hover:text-foreground"
            onClick={() => navigate("/careers")}
          >
            <ArrowLeft size={16} />
            All Positions
          </Button>

          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge
                variant="outline"
                className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
              >
                {position.employment_type}
              </Badge>
              <Badge variant="outline" className="text-muted-foreground">
                {position.experience_level}
              </Badge>
              {position.deadline && (
                <Badge variant="outline" className="gap-1 text-muted-foreground">
                  <Calendar size={12} />
                  Deadline{" "}
                  {formatDistanceToNow(new Date(position.deadline), { addSuffix: true })}
                </Badge>
              )}
            </div>

            <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              {position.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Building2 size={16} />
                {position.department}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={16} />
                {position.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Briefcase size={16} />
                {position.experience_level}
              </span>
              {position.salary_range && (
                <span className="font-medium text-foreground">{position.salary_range}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <section className="section-padding">
        <div className="container">
          <div className="grid gap-10 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)]">
            {/* Left: Details */}
            <div className="space-y-8">
              {position.description && (
                <div>
                  <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                    About the Role
                  </h2>
                  <div
                    className="prose prose-sm max-w-none text-muted-foreground prose-headings:text-foreground prose-a:text-primary prose-strong:text-foreground"
                    dangerouslySetInnerHTML={{ __html: position.description }}
                  />
                </div>
              )}

              {position.requirements && (
                <div>
                  <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                    Requirements
                  </h2>
                  <div
                    className="prose prose-sm max-w-none text-muted-foreground prose-headings:text-foreground prose-a:text-primary prose-strong:text-foreground"
                    dangerouslySetInnerHTML={{ __html: position.requirements }}
                  />
                </div>
              )}

              {position.benefits && (
                <div>
                  <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                    Benefits & Perks
                  </h2>
                  <div
                    className="prose prose-sm max-w-none text-muted-foreground prose-headings:text-foreground prose-a:text-primary prose-strong:text-foreground"
                    dangerouslySetInnerHTML={{ __html: position.benefits }}
                  />
                </div>
              )}
            </div>

            {/* Right: Application Form */}
            <div className="xl:sticky xl:top-24 xl:self-start">
              <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-[0_12px_36px_rgba(0,0,0,0.04)]">
                <div className="flex items-center gap-2 text-primary mb-5">
                  <Send size={18} />
                  <h3 className="font-display text-lg font-semibold">Apply Now</h3>
                </div>

                <form
                  ref={formRef}
                  onSubmit={(e) => void handleSubmit(e)}
                  className="space-y-4"
                  id="application-form"
                >
                  <div>
                    <label htmlFor="fullName" className="text-sm font-medium text-foreground">
                      Full Name <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      className="mt-1.5 w-full rounded-xl border border-border/60 bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="text-sm font-medium text-foreground">
                      Email <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="mt-1.5 w-full rounded-xl border border-border/60 bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="text-sm font-medium text-foreground">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      className="mt-1.5 w-full rounded-xl border border-border/60 bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
                      placeholder="+977 98XXXXXXXX"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="experienceYears"
                        className="text-sm font-medium text-foreground"
                      >
                        Experience
                      </label>
                      <select
                        id="experienceYears"
                        name="experienceYears"
                        className="mt-1.5 w-full rounded-xl border border-border/60 bg-background px-4 py-2.5 text-sm text-foreground focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
                      >
                        <option value="">Select</option>
                        <option value="0-1 years">0-1 years</option>
                        <option value="1-3 years">1-3 years</option>
                        <option value="3-5 years">3-5 years</option>
                        <option value="5-8 years">5-8 years</option>
                        <option value="8+ years">8+ years</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="currentRole" className="text-sm font-medium text-foreground">
                        Current Role
                      </label>
                      <input
                        id="currentRole"
                        name="currentRole"
                        type="text"
                        className="mt-1.5 w-full rounded-xl border border-border/60 bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
                        placeholder="Frontend Developer"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="portfolioUrl" className="text-sm font-medium text-foreground">
                      Portfolio / LinkedIn URL
                    </label>
                    <input
                      id="portfolioUrl"
                      name="portfolioUrl"
                      type="url"
                      className="mt-1.5 w-full rounded-xl border border-border/60 bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
                      placeholder="https://linkedin.com/in/johndoe"
                    />
                  </div>

                  {/* Resume Upload */}
                  <div>
                    <label className="text-sm font-medium text-foreground">
                      Resume / CV
                    </label>
                    <div
                      className="mt-1.5 cursor-pointer rounded-xl border-2 border-dashed border-border/60 bg-secondary/30 p-5 text-center transition-colors hover:border-primary/30 hover:bg-primary/5"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0] ?? null;
                          setResumeFile(file);
                        }}
                      />
                      {resumeFile ? (
                        <div className="flex items-center justify-center gap-2 text-sm text-primary">
                          <FileText size={18} />
                          <span className="font-medium">{resumeFile.name}</span>
                          <span className="text-muted-foreground">
                            ({(resumeFile.size / 1024 / 1024).toFixed(1)} MB)
                          </span>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <Upload className="mx-auto h-8 w-8 text-muted-foreground/50" />
                          <p className="text-sm text-muted-foreground">
                            Click to upload PDF, DOC, or DOCX
                          </p>
                          <p className="text-xs text-muted-foreground/60">Max 10 MB</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="coverLetter" className="text-sm font-medium text-foreground">
                      Cover Letter
                    </label>
                    <textarea
                      id="coverLetter"
                      name="coverLetter"
                      rows={4}
                      className="mt-1.5 w-full resize-none rounded-xl border border-border/60 bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
                      placeholder="Tell us why you're a great fit for this role..."
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="gradient"
                    className="w-full"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Submit Application
                      </>
                    )}
                  </Button>

                  <p className="text-center text-xs text-muted-foreground/60">
                    By submitting, you agree to our data handling practices for recruitment purposes.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CareerDetail;
