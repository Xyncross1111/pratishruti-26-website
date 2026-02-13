"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
} from "framer-motion";
import { useState, useMemo, useRef, useEffect } from "react";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { Pearl, Bubble } from "./MarineSVGs";
import { useIsMobile } from "@/hooks/use-mobile";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  venue: string;
  category: string;
  description: string;
  capacity?: string;
  registrationStatus?: "open" | "closed" | "soon";
}

const events: Event[] = [
  {
    id: 1,
    title: "Underwater Dance Battle",
    date: "March 1, 2026",
    time: "2:00 PM - 5:00 PM",
    venue: "Grand Hall",
    category: "Cultural",
    description:
      "Experience the rhythmic waves as teams compete in an electrifying dance showdown",
    capacity: "500 participants",
    registrationStatus: "open",
  },
  {
    id: 2,
    title: "Poetry Slam: Voices of the Abyss",
    date: "March 2, 2026",
    time: "6:00 PM - 8:00 PM",
    venue: "Coral Theater",
    category: "Literary",
    description:
      "Dive deep into emotions with powerful spoken word performances from the depths",
    capacity: "200 participants",
    registrationStatus: "open",
  },
  {
    id: 3,
    title: "Neon Glow Concert",
    date: "March 3, 2026",
    time: "8:00 PM - 11:00 PM",
    venue: "Main Stage",
    category: "Pro Shows",
    description:
      "Bioluminescent beats and neon lights merge in an unforgettable musical journey",
    capacity: "1000+ attendees",
    registrationStatus: "soon",
  },
  {
    id: 4,
    title: "Coding Marathon: Atlantis Edition",
    date: "March 4, 2026",
    time: "10:00 AM - 6:00 PM",
    venue: "Tech Lab",
    category: "Tech Events",
    description:
      "Build innovative solutions while exploring ancient algorithms of Atlantis",
    capacity: "150 teams",
    registrationStatus: "open",
  },
  {
    id: 5,
    title: "Treasure Hunt Quest",
    date: "March 5, 2026",
    time: "3:00 PM - 7:00 PM",
    venue: "Beach & Ocean",
    category: "Competitions",
    description:
      "Follow the clues through coral reefs and hidden chambers to discover lost treasures",
    capacity: "300 participants",
    registrationStatus: "open",
  },
  {
    id: 6,
    title: "Marine Art & Craft Workshop",
    date: "March 6, 2026",
    time: "11:00 AM - 1:00 PM",
    venue: "Amphitheater",
    category: "Workshops",
    description:
      "Create stunning ocean-inspired art pieces with expert guidance",
    capacity: "100 participants",
    registrationStatus: "closed",
  },
  {
    id: 7,
    title: "Fashion Show: Oceanic Elegance",
    date: "March 7, 2026",
    time: "7:00 PM - 9:00 PM",
    venue: "Grand Stage",
    category: "Pro Shows",
    description:
      "Witness breathtaking designs inspired by the mysteries of the deep sea",
    capacity: "800 attendees",
    registrationStatus: "soon",
  },
  {
    id: 8,
    title: "Grand Closing Ceremony",
    date: "March 8, 2026",
    time: "6:00 PM - 10:00 PM",
    venue: "Main Arena",
    category: "Ceremony",
    description:
      "Celebrate the festival with awards, performances, and the grand treasure reveal",
    capacity: "Open to all",
    registrationStatus: "open",
  },
];

const statusConfig = {
  open: {
    label: "Open",
    color: "bg-green-500/20 text-green-400 border-green-500/40",
  },
  closed: {
    label: "Closed",
    color: "bg-red-500/20 text-red-400 border-red-500/40",
  },
  soon: {
    label: "Coming Soon",
    color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/40",
  },
};

// 3D Interactive Event Card Component
function EventCard({ event, index }: { event: Event; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();
  const isInView = useInView(cardRef, {
    once: false,
    margin: "-20% 0px -20% 0px",
  });
  const [mobileActivated, setMobileActivated] = useState(false);

  // On mobile, auto-trigger effects when card scrolls into view
  useEffect(() => {
    if (!isMobile) return;
    if (isInView && !mobileActivated) {
      setMobileActivated(true);
      // Reset after animation completes so it can re-trigger on next scroll-in
      const timer = setTimeout(() => setMobileActivated(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isMobile, isInView, mobileActivated]);

  const showEffects = isHovered || (isMobile && mobileActivated);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - (rect.left + rect.width / 2)) / rect.width);
    mouseY.set((e.clientY - (rect.top + rect.height / 2)) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative cursor-pointer"
      style={{ transformStyle: "preserve-3d", perspective: "350px" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <motion.div
        className="relative px-8 py-4 rounded-2xl overflow-hidden border border-cyan-500/20 backdrop-blur-sm md:backdrop-blur-[20px]"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          boxShadow:
            "0 8px 32px rgba(0, 20, 40, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
          background: showEffects
            ? "rgba(10, 30, 50, 0.05)"
            : "rgba(10, 30, 50, 0.15)",
        }}
        animate={{
          background: showEffects
            ? "rgba(10, 30, 50, 0.05)"
            : "rgba(10, 30, 50, 0.15)",
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Light sweep */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(100deg, transparent 40%, rgba(255, 255, 255, 0.35) 50%, transparent 60%)",
            backgroundSize: "200% 100%",
          }}
          animate={{
            backgroundPosition: showEffects ? ["200% 0", "-200% 0"] : "200% 0",
          }}
          transition={{ duration: 1.3, ease: "easeInOut" }}
        />

        {/* Rising bubbles */}
        {showEffects && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[
              { size: 12, left: 20, xDrift: -8, duration: 2.8 },
              { size: 15, left: 40, xDrift: 5, duration: 3.1 },
              { size: 11, left: 60, xDrift: -12, duration: 2.6 },
              { size: 16, left: 80, xDrift: 10, duration: 3.3 },
            ].map((bubble, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  left: `${bubble.left}%`,
                  width: bubble.size,
                  height: bubble.size,
                  bottom: -20,
                  background:
                    "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.5), rgba(150, 230, 255, 0.2))",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  boxShadow:
                    "inset -1px -1px 2px rgba(255, 255, 255, 0.3), 0 0 8px rgba(80, 200, 230, 0.3)",
                }}
                initial={{ y: 0, opacity: 0 }}
                animate={{
                  y: -350,
                  opacity: [0, 0.7, 0],
                  x: [bubble.xDrift],
                }}
                transition={{
                  duration: bubble.duration,
                  delay: i * 0.2,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>
        )}

        {/* Subtle glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{
            boxShadow: showEffects
              ? "0 0 25px rgba(100, 200, 230, 0.15), inset 0 0 20px rgba(255, 255, 255, 0.03)"
              : "0 0 0 rgba(100, 200, 230, 0)",
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Content */}
        <div
          className="relative z-10"
          style={{
            transform: "translateZ(25px)",
            transformStyle: "preserve-3d",
          }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4 bg-cyan-500/15 border border-cyan-400/30 text-cyan-300">
            {event.category}
          </span>

          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            {event.title}
          </h3>

          <div className="space-y-2.5 mb-5 text-sm">
            <div className="flex items-center gap-3 text-cyan-100/80">
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-3 text-cyan-100/80">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-3 text-cyan-100/80">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span>{event.venue}</span>
            </div>
            {event.capacity && (
              <div className="flex items-center gap-3 text-cyan-100/80">
                <Users className="w-4 h-4 text-cyan-400" />
                <span>{event.capacity}</span>
              </div>
            )}
          </div>

          <p className="text-cyan-100/75 text-sm mb-5 leading-relaxed">
            {event.description}
          </p>

          <div className="flex items-center gap-3 flex-wrap">
            {event.registrationStatus && (
              <span
                className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold border ${statusConfig[event.registrationStatus].color}`}
              >
                {statusConfig[event.registrationStatus].label}
              </span>
            )}

            {event.registrationStatus === "open" && (
              <button className="px-6 py-2 bg-accent text-deep-ocean font-semibold rounded-lg hover:bg-accent/90 transition-all hover:scale-105 text-sm shadow-lg">
                Register Now
              </button>
            )}
          </div>
        </div>

        {/* Water gradient at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-cyan-900/15 to-transparent pointer-events-none" />
      </motion.div>

      {/* Shadow */}
      <motion.div
        className="absolute inset-0 -z-10 rounded-2xl bg-black/40 blur-xl"
        animate={{
          y: showEffects ? 12 : 8,
          opacity: showEffects ? 0.5 : 0.3,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
    </motion.div>
  );
}

export default function AquaTimelineNew() {
  // Generate flowing water stream path that bends toward each event
  const { streamPath, eventPoints } = useMemo(() => {
    const n = events.length;
    if (n === 0) return { streamPath: "M 50 0 L 50 100", eventPoints: [] };

    const topPad = 4;
    const bottomPad = 4;
    const usable = 100 - topPad - bottomPad;
    const gap = n > 1 ? usable / (n - 1) : 0;
    const bendAmount = 25;

    const pts: { x: number; y: number }[] = [];
    for (let i = 0; i < n; i++) {
      const y = n > 1 ? topPad + i * gap : 50;
      const dir = i % 2 === 0 ? 1 : -1;
      pts.push({ x: 50 + dir * bendAmount, y });
    }

    // Build smooth S-curve path
    let d = `M 50 0`;

    // Entry curve to first event
    const p0 = pts[0];
    d += ` C 50 ${p0.y * 0.35}, ${50 + (p0.x - 50) * 0.5} ${p0.y * 0.65}, ${p0.x} ${p0.y}`;

    // S-curves between consecutive events
    for (let i = 0; i < pts.length - 1; i++) {
      const curr = pts[i];
      const next = pts[i + 1];
      const dy = next.y - curr.y;
      d += ` C ${curr.x} ${curr.y + dy * 0.45}, ${next.x} ${next.y - dy * 0.45}, ${next.x} ${next.y}`;
    }

    // Exit curve from last event to bottom center
    const pLast = pts[pts.length - 1];
    const remY = 100 - pLast.y;
    d += ` C ${pLast.x} ${pLast.y + remY * 0.35}, 50 ${pLast.y + remY * 0.65}, 50 100`;

    return { streamPath: d, eventPoints: pts };
  }, [events.length]);

  return (
    <section
      id="events-timeline"
      className="relative py-20 md:py-32 px-4 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-b from-deep-ocean via-primary/10 to-deep-ocean" />

      {/* Floating bubbles */}
      <div className="absolute left-[10%] top-[20%] z-0">
        <Bubble delay={0} className="w-8 h-8" />
      </div>
      <div className="absolute right-[15%] top-[60%] z-0">
        <Bubble delay={2} className="w-6 h-6" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Pearl className="w-16 h-16 mx-auto mb-4" />
          <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-2">
            Journey Through Time
          </p>
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            Events Timeline
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Swim through the aquatic calendar and discover the treasures of
            Pratishruti
          </p>
        </motion.div>

        {/* Timeline container */}
        <div className="relative">
          {/* Water Stream SVG */}
          <svg
            className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-32 md:w-56 pointer-events-none z-0"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="streamFade" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(80,200,240,0)" />
                <stop offset="8%" stopColor="rgba(80,200,240,0.6)" />
                <stop offset="92%" stopColor="rgba(80,200,240,0.6)" />
                <stop offset="100%" stopColor="rgba(80,200,240,0)" />
              </linearGradient>
            </defs>

            {/* The visible water stream */}
            <path
              d={streamPath}
              stroke="url(#streamFade)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Events */}
          <div className="space-y-12 md:space-y-16">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true, margin: "-50px" }}
                className="relative"
              >
                <div
                  className={`w-full max-w-lg mx-auto md:max-w-none md:w-5/12 md:mx-0 ${index % 2 === 0 ? "md:ml-auto md:pl-12" : "md:mr-auto md:pr-12"}`}
                >
                  <EventCard event={event} index={index} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
