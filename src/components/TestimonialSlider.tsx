import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeUp } from "@/components/SectionWrapper";

const testimonials = [
  {
    quote: "Nexaform transformed our scattered internal processes into a streamlined digital system. The team's clarity and technical depth made the entire journey smooth and predictable.",
    name: "Sarah Chen",
    role: "Head of Operations",
    company: "Vertex Solutions",
    initials: "SC",
    accent: "primary",
  },
  {
    quote: "Working with Nexaform felt like having a true technology partner. They didn't just build what we asked — they helped us think through the right solution for our business.",
    name: "Mark Rivera",
    role: "Founder & CEO",
    company: "Streamline AI",
    initials: "MR",
    accent: "accent",
  },
  {
    quote: "The web platform Nexaform delivered exceeded our expectations in both design and performance. Our conversion rate improved significantly within the first month.",
    name: "Priya Kapoor",
    role: "Marketing Director",
    company: "Elevate Digital",
    initials: "PK",
    accent: "highlight",
  },
];

const accentMap: Record<string, string> = {
  primary: "bg-primary/20 text-primary",
  accent: "bg-accent/20 text-accent",
  highlight: "bg-highlight/20 text-highlight",
};

const TestimonialSlider = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  const t = testimonials[current];

  return (
    <FadeUp>
      <div className="max-w-3xl mx-auto">
        <div className="card-surface relative rounded-card p-6 sm:p-8 md:p-12">
          <Quote size={32} className="text-primary/20 absolute top-6 left-6" />

          <div className="text-center">
            <p className="mb-8 text-base italic leading-relaxed text-foreground/90 sm:text-lg md:text-xl">
              "{t.quote}"
            </p>

            <div className="flex items-center justify-center gap-3 mb-6">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-display font-semibold text-sm ${accentMap[t.accent]}`}>
                {t.initials}
              </div>
              <div className="text-left">
                <div className="font-display font-semibold text-foreground text-sm">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}, {t.company}</div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2">
              <Button variant="ghost" size="icon" onClick={prev} className="h-8 w-8">
                <ChevronLeft size={16} />
              </Button>
              <div className="flex gap-1.5">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === current ? "bg-primary w-6" : "bg-border"
                    }`}
                  />
                ))}
              </div>
              <Button variant="ghost" size="icon" onClick={next} className="h-8 w-8">
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </FadeUp>
  );
};

export default TestimonialSlider;
