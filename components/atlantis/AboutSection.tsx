"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

/* ─── Stat counter (no random, SSR-safe) ─── */
function AnimatedStat({
  value,
  label,
  inView,
}: {
  value: string;
  label: string;
  inView: boolean;
}) {
  const numericPart = value.replace(/[^0-9]/g, "");
  const suffix = value.replace(/[0-9]/g, "");
  const target = parseInt(numericPart, 10);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf: number;
    const duration = 1400;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return (
    <div className="text-center px-4">
      <span className="block text-3xl md:text-4xl font-bold text-accent tabular-nums">
        {count}
        {suffix}
      </span>
      <span className="text-xs md:text-sm text-muted-foreground mt-1 block">
        {label}
      </span>
    </div>
  );
}

/* ─── Info card ─── */
function InfoCard({
  title,
  text,
  delay,
}: {
  title: string;
  text: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true, amount: 0.3 }}
      className="rounded-xl border border-border bg-card/60 backdrop-blur-sm p-6 md:p-8 hover:border-accent/40 transition-colors"
    >
      <h3 className="text-lg md:text-xl font-bold text-foreground mb-3">
        {title}
      </h3>
      <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
        {text}
      </p>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   Water overlay — covers entire section, drains on scroll
   Wave sits at the surface; everything below is "submerged"
   ═══════════════════════════════════════════ */
function WaterOverlay({
  sectionRef,
}: {
  sectionRef: React.RefObject<HTMLElement | null>;
}) {
  const [drain, setDrain] = useState(0); // 0 = full, 1 = fully drained

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      const start = rect.top - vh * 0.5;
      const end = rect.bottom - vh * 0.6;
      const range = end - start;
      if (range <= 0) {
        setDrain(1);
        return;
      }

      const p = -start / range;
      setDrain(Math.max(0, Math.min(1, p)));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [sectionRef]);

  const waterTranslateY = drain * 100;
  const waterOpacity = Math.max(0, 1 - drain * 0.3);

  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none z-30 overflow-hidden"
      style={{
        mixBlendMode: "color-dodge",
      }}
    >
      {/* Fade Wrapper */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, white 0%, white 85%, transparent 100%)",
          maskImage:
            "linear-gradient(to bottom, white 0%, white 85%, transparent 100%)",
        }}
      >
        {/* The water body — slides down as user scrolls */}
        <div
          className="absolute left-0 w-full"
          style={{
            top: 0,
            height: "120%",
            transform: `translateY(${waterTranslateY}%)`,
            opacity: waterOpacity,
            willChange: "transform, opacity",
          }}
        >
          {/* Animated wave surface — two layers flowing in opposite directions */}
          <div className="relative w-full h-[60px] md:h-[80px] lg:h-[100px] -mb-[1px]">
            {/* Back wave — flows right */}
            <svg
              viewBox="0 0 2880 180"
              preserveAspectRatio="none"
              className="absolute inset-0 w-[200%] h-full block"
              style={{ animation: "waveFlowRight 8s linear infinite" }}
            >
              <path
                d="M0,100 C180,70 360,130 540,100 C720,70 900,130 1080,100 C1260,70 1440,130 1620,100 C1800,70 1980,130 2160,100 C2340,70 2520,130 2700,100 L2880,100 L2880,180 L0,180 Z"
                fill="rgba(150,225,240,0.18)"
              />
            </svg>
            {/* Front wave — flows left */}
            <svg
              viewBox="0 0 2880 180"
              preserveAspectRatio="none"
              className="absolute inset-0 w-[200%] h-full block"
              style={{ animation: "waveFlowLeft 6s linear infinite" }}
            >
              <path
                d="M0,110 C160,80 320,140 480,110 C640,80 800,140 960,110 C1120,80 1280,140 1440,110 C1600,80 1760,140 1920,110 C2080,80 2240,140 2400,110 C2560,80 2720,140 2880,110 L2880,180 L0,180 Z"
                fill="rgba(170,235,250,0.22)"
              />
            </svg>
          </div>

          {/* Water body fill */}
          <div
            className="w-full"
            style={{
              height: "calc(100% - 60px)",
              background:
                "linear-gradient(180deg, rgba(170,235,250,0.22) 0%, rgba(140,215,240,0.15) 30%, rgba(120,200,230,0.10) 70%, rgba(100,180,220,0.06) 100%)",
            }}
          />
        </div>

        {/* Inline keyframes for wave flow */}
        <style>{`
        @keyframes waveFlowRight {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes waveFlowLeft {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   AboutSection
   ═══════════════════════════════════════════ */
const stats = [
  { value: "40+", label: "Years of Excellence" },
  { value: "8000+", label: "Footfall" },
  { value: "35+", label: "Events" },
  { value: "29", label: "Editions" },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.4 });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative pt-16 md:pt-24 pb-20 md:pb-28 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8">
        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-accent text-xs md:text-sm font-semibold tracking-[0.2em] uppercase mb-2">
            Pratishruti &apos;26
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground">
            About Us
          </h2>
        </motion.div>

        {/* ── Info cards ── */}
        <div className="grid md:grid-cols-3 gap-5 md:gap-6 mb-14 md:mb-16">
          <InfoCard
            title="Ramdeobaba University"
            text="Established in 1984 in Nagpur, RBU (formerly RCOEM) is one of Central India's top institutions — nurturing competent professionals through innovation, research, and experiential learning across 50+ programs."
            delay={0}
          />
          <InfoCard
            title="Pratishruti — 29th Edition"
            text="Central India's largest cultural festival — a multi-day celebration of competitions, live performances, fine arts, film, photography, pop-culture, workshops, and campus-wide engagement."
            delay={0.1}
          />
          <InfoCard
            title="The Legacy — SRC"
            text="The Students' Representative Council drives Pratishruti. As RBU's apex student body, SRC bridges students and administration, building leadership and an inclusive campus culture for three decades."
            delay={0.2}
          />
        </div>

        {/* ── Stats row ── */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-6 md:gap-10 py-8 rounded-xl border border-border bg-card/40 backdrop-blur-sm"
        >
          {stats.map((s) => (
            <AnimatedStat
              key={s.label}
              value={s.value}
              label={s.label}
              inView={statsInView}
            />
          ))}
        </motion.div>
      </div>

      {/* ── Water overlay — covers entire section, drains on scroll ── */}
      <WaterOverlay sectionRef={sectionRef} />
    </section>
  );
}
