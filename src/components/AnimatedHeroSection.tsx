import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, SearchCheck, Sparkles, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeUp } from "@/components/SectionWrapper";
import { useIsMobile } from "@/hooks/use-mobile";

const heroBackgroundLoop = "/animations/hero-background-original.mp4";
const heroBackgroundLoopMobile = "/animations/mo-hero-video.mp4";
const heroBackgroundPoster = "/animations/hero-background-poster.jpg";


const AnimatedHeroSection = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    setIsMuted(true);
    const video = videoRef.current;
    if (!video) {
      return;
    }
    video.muted = true;
    video.volume = 1;
    video.load();
    const playPromise = video.play();
    if (playPromise) {
      playPromise.catch(() => {
        video.muted = true;
        void video.play().catch(() => {});
      });
    }
  }, [isMobile, mounted]);

  const handleToggleSound = async () => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    if (isMuted) {
      try {
        video.muted = false;
        video.volume = 1;
        await video.play();
        setIsMuted(false);
      } catch {
        video.muted = true;
        setIsMuted(true);
      }

      return;
    }

    video.muted = true;
    setIsMuted(true);
  };

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden pb-16 pt-28 md:pb-20 md:pt-36 lg:min-h-screen lg:pb-24 lg:pt-40">
      <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[linear-gradient(180deg,rgba(241,245,249,0.28),rgba(226,232,240,0.2))]">
        {mounted && (
          <video
            key={isMobile ? "mobile-video" : "desktop-video"}
            ref={videoRef}
            autoPlay
            loop
            playsInline
            preload="auto"
            poster={heroBackgroundPoster}
            disablePictureInPicture
            className="absolute inset-0 h-full w-full object-cover object-center opacity-[0.9] [transform:translateZ(0)]"
          >
            <source
              key={isMobile ? "mobile-source" : "desktop-source"}
              src={
                (isMobile ? heroBackgroundLoopMobile : heroBackgroundLoop) + (import.meta.env.DEV ? `?t=${Date.now()}` : "")
              }
              type="video/mp4"
            />
          </video>
        )}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,250,252,0.26),rgba(241,245,249,0.08),rgba(226,232,240,0.24))]" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-3xl lg:min-h-[calc(100vh-10rem)] lg:flex lg:items-center">
          <div className="p-6 sm:p-8 lg:p-10">
            <FadeUp>
              <span className="mb-6 inline-block rounded-full bg-slate-950 px-3 py-1.5 font-mono text-[12px] uppercase tracking-widest text-white shadow-[0_16px_32px_rgba(15,23,42,0.14)]">
                Custom Software / Web Apps / Digital Systems
              </span>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h1 className="mb-6 text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight text-slate-950 [text-shadow:0_1px_0_rgba(255,255,255,0.18)] sm:text-5xl lg:text-[60px]">
                Shaping future-ready digital systems
              </h1>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="mb-4 max-w-[55ch] text-lg font-semibold leading-relaxed text-slate-950 [text-shadow:0_1px_0_rgba(255,255,255,0.14)]">
                Nexaform is a software development company in Nepal that designs and develops
                custom web applications, scalable software, and modern digital systems for
                businesses that want to operate smarter and grow with confidence.
              </p>
            </FadeUp>
            <FadeUp delay={0.25}>
              <p className="mb-8 max-w-[55ch] text-base font-medium leading-relaxed text-slate-900 [text-shadow:0_1px_0_rgba(255,255,255,0.12)]">
                From idea validation and product design to engineering, deployment, and long-term
                improvement, we help businesses turn complex workflows and ambitious ideas into
                reliable digital products.
              </p>
            </FadeUp>
            <FadeUp delay={0.3}>
              <div className="mb-5 flex flex-wrap gap-3">
                <Link to="/digital-fairness-campaign">
                  <Button variant="gradient" size="lg">
                    Rs. 6,999 Website Package
                  </Button>
                </Link>
                <Link to="/free-audit">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-slate-400 bg-white/90 text-slate-950 hover:bg-white"
                  >
                    <SearchCheck size={18} />
                    Free SEO/AI Audit
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-slate-400 bg-white/90 text-slate-950 hover:bg-white"
                  >
                    Start a Project
                  </Button>
                </Link>
              </div>
            </FadeUp>
            <FadeUp delay={0.31}>
              <div className="mb-5 grid max-w-2xl gap-3 sm:grid-cols-2">
                <div className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white/92 p-4 text-sm font-semibold leading-6 text-slate-900 shadow-sm backdrop-blur">
                  <Sparkles size={18} className="mt-0.5 shrink-0 text-sky-700" />
                  Digital Fairness Campaign for Nepali businesses and professionals.
                </div>
                <div className="flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50/94 p-4 text-sm font-semibold leading-6 text-emerald-900 shadow-sm backdrop-blur">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-600" />
                  Free SEO, AEO and GEO audit included with the offer.
                </div>
              </div>
            </FadeUp>
            <FadeUp delay={0.32}>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => void handleToggleSound()}
                className="border-slate-400 bg-white/90 text-slate-950 hover:bg-white"
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                {isMuted ? "Enable Hero Sound" : "Mute Hero Sound"}
              </Button>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimatedHeroSection;
