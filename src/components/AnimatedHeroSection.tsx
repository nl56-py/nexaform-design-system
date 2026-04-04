import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeUp } from "@/components/SectionWrapper";

const heroBackgroundLoop = "/animations/hero-background-original.mp4";
const heroBackgroundPoster = "/animations/hero-background-poster.jpg";

const AnimatedHeroSection = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    video.muted = false;
    video.volume = 1;

    const playPromise = video.play();
    if (playPromise) {
      playPromise.catch(() => {
        // Most browsers block autoplay with sound; keep the background playing if that happens.
        video.muted = true;
        void video.play().catch(() => {});
      });
    }
  }, []);

  return (
    <section className="relative isolate overflow-hidden pb-16 pt-28 md:pb-20 md:pt-36 lg:min-h-screen lg:pb-24 lg:pt-40">
      <video
        ref={videoRef}
        autoPlay
        loop
        playsInline
        preload="auto"
        poster={heroBackgroundPoster}
        disablePictureInPicture
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-[0.68] [transform:translateZ(0)]"
      >
        <source src={heroBackgroundLoop} type="video/mp4" />
      </video>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(248,250,252,0.98)_0%,rgba(248,250,252,0.93)_28%,rgba(248,250,252,0.66)_56%,rgba(248,250,252,0.34)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(34,211,238,0.1),transparent_21%),radial-gradient(circle_at_78%_18%,rgba(59,130,246,0.09),transparent_23%),linear-gradient(180deg,rgba(248,250,252,0.24),rgba(248,250,252,0.5))]" />

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
              <div className="mb-8 flex flex-wrap gap-3">
                <Link to="/contact">
                  <Button variant="gradient" size="lg">
                    Start a Project
                  </Button>
                </Link>
                <Link to="/projects">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-slate-400 bg-white/70 text-slate-950 hover:bg-white"
                  >
                    View Projects
                  </Button>
                </Link>
              </div>
            </FadeUp>
            <FadeUp delay={0.35}>
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 [text-shadow:0_1px_0_rgba(255,255,255,0.12)]">
                <CheckCircle2 size={16} className="text-accent" />
                Software solutions built for clarity, performance, and scale.
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimatedHeroSection;
