"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useMemo, useRef } from "react";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { Pearl, Bubble } from "./MarineSVGs";

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
        className="relative px-8 rounded-2xl overflow-hidden border border-cyan-500/20"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          boxShadow:
            "0 8px 32px rgba(0, 20, 40, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
        }}
        animate={{
          background: isHovered
            ? "rgba(10, 30, 50, 0.08)"
            : "rgba(10, 30, 50, 0.2)",
          backdropFilter: isHovered ? "blur(25px)" : "blur(20px)",
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
            backgroundPosition: isHovered ? ["200% 0", "-200% 0"] : "200% 0",
          }}
          transition={{ duration: 1.3, ease: "easeInOut" }}
        />

        {/* Rising bubbles */}
        {isHovered && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[0, 1, 2, 3].map((i) => {
              const size = 10 + Math.random() * 8;
              return (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    left: `${20 + i * 20}%`,
                    width: size,
                    height: size,
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
                    x: [(Math.random() - 0.5) * 30],
                  }}
                  transition={{
                    duration: 2.5 + Math.random(),
                    delay: i * 0.2,
                    ease: "easeOut",
                  }}
                />
              );
            })}
          </div>
        )}

        {/* Subtle glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{
            boxShadow: isHovered
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

          {event.registrationStatus && (
            <span
              className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold border ${statusConfig[event.registrationStatus].color}`}
            >
              {statusConfig[event.registrationStatus].label}
            </span>
          )}
        </div>

        {/* Water gradient at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-cyan-900/15 to-transparent pointer-events-none" />
      </motion.div>

      {/* Shadow */}
      <motion.div
        className="absolute inset-0 -z-10 rounded-2xl bg-black/40 blur-xl"
        animate={{
          y: isHovered ? 12 : 8,
          opacity: isHovered ? 0.5 : 0.3,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
    </motion.div>
  );
}

export default function AquaTimelineNew() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    ...Array.from(new Set(events.map((e) => e.category))),
  ];

  const filteredEvents =
    selectedCategory === "All"
      ? events
      : events.filter((e) => e.category === selectedCategory);

  // Memoized wave path - shorter with more pronounced waves
  const wobblyPath = useMemo(() => {
    const steps = filteredEvents.length * 8;
    let path = "M 50 5";
    for (let i = 0; i <= steps; i++) {
      const y = 5 + (i / steps) * 90;
      const x = Math.round((50 + 30 * Math.sin(i * 0.25)) * 100) / 100;
      path += ` L ${x} ${y}`;
    }
    return path;
  }, [filteredEvents.length]);

  const wobblyPath2 = useMemo(() => {
    const steps = filteredEvents.length * 8;
    let path = "M 50 5";
    for (let i = 0; i <= steps; i++) {
      const y = 5 + (i / steps) * 90;
      const x = Math.round((50 + 30 * Math.sin(i * 0.25)) * 100) / 100;
      path += ` L ${x} ${y}`;
    }
    return path;
  }, [filteredEvents.length]);

  // Wave offset for event positioning
  const getWaveOffset = (index: number) => {
    const progress = index / Math.max(filteredEvents.length - 1, 1);
    return (
      Math.round(
        30 * Math.sin(progress * filteredEvents.length * 0.25 * 8) * 100,
      ) / 100
    );
  };

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

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all hover:scale-105 ${
                selectedCategory === category
                  ? "bg-accent text-deep-ocean shadow-lg"
                  : "bg-primary/30 text-foreground hover:bg-primary/50 border border-accent/20"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Timeline container */}
        <div className="relative">
          {/* Wave SVG */}
          <svg
            className="absolute left-8 md:left-1/2 md:-translate-x-1/2 top-0 h-full w-32 md:w-48 pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              {/* Vertical fade for ends */}
              <linearGradient
                id="verticalFade"
                x1="0%"
                y1="10%"
                x2="0%"
                y2="90%"
              >
                <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                <stop offset="10%" stopColor="rgba(255,255,255,1)" />
                <stop offset="90%" stopColor="rgba(255,255,255,1)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </linearGradient>
              {/* 3D water tube - horizontal gradient for depth */}
              <linearGradient id="waveCore" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(15, 45, 70, 0.95)" />
                <stop offset="25%" stopColor="rgba(50, 120, 160, 0.9)" />
                <stop offset="50%" stopColor="rgba(100, 180, 210, 1)" />
                <stop offset="75%" stopColor="rgba(160, 220, 240, 0.95)" />
                <stop offset="100%" stopColor="rgba(200, 240, 255, 0.85)" />
              </linearGradient>
              {/* Shadow layer */}
              <linearGradient
                id="waveShadow"
                x1="0%"
                y1="100%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="rgba(5, 20, 35, 0.9)" />
                <stop offset="50%" stopColor="rgba(20, 50, 80, 0.6)" />
                <stop offset="100%" stopColor="rgba(40, 80, 110, 0.3)" />
              </linearGradient>
              {/* Highlight layer */}
              <linearGradient
                id="waveHighlight"
                x1="0%"
                y1="0%"
                x2="50%"
                y2="0%"
              >
                <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                <stop offset="70%" stopColor="rgba(220,250,255,0.5)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.9)" />
              </linearGradient>
              {/* Glow filter */}
              {/* <filter
                id="waveGlow"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="2"
                  result="blur"
                />
                <feColorMatrix
                  in="blur"
                  type="matrix"
                  values="0 0 0 0 0.35
                          0 0 0 0 0.7
                          0 0 0 0 0.85
                          0 0 0 0.6 0"
                />
              </filter> 
              <filter id="shadow">
                <feDropShadow
                  dx="2"
                  dy="3"
                  stdDeviation="2"
                  floodColor="rgba(0,0,0,0.5)"
                />
              </filter>
              */}
              <mask id="fadeMask">
                <rect
                  x="0"
                  y="0"
                  width="100"
                  height="100"
                  fill="url(#verticalFade)"
                />
              </mask>
            </defs>

            <g mask="url(#fadeMask)">
              {/* Outer glow */}
              <path
                d={wobblyPath}
                stroke="rgba(80, 180, 220, 0.4)"
                strokeWidth="10"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#waveGlow)"
              />
              {/* Deep shadow - back layer */}
              {/*}
              <path
                d={wobblyPath}
                stroke="url(#waveShadow)"
                strokeWidth="7"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="translate(1.5, 0.8)"
              />/*}
              {/* Main wave body */}
              <path
                d={wobblyPath}
                stroke="url(#waveCore)"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Highlight edge */}
              {[0, 1.5, 3].map((offset, i) => (
                <path
                  key={i}
                  d={wobblyPath2}
                  fill="none"
                  stroke="rgba(159,223,255,0.4)"
                  strokeWidth={2 - i * 0.4}
                  transform={`translate(${offset},0)`}
                />
              ))}
              {/* 
              <path
                d={wobblyPath}
                stroke="rgba(255, 255, 255, 0.6)"
                strokeWidth="0.8"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="translate(-0.8, -0.4)"
              /> */}
            </g>
          </svg>

          {/* Events */}
          <div className="space-y-12 md:space-y-16">
            {filteredEvents.map((event, index) => {
              const waveOffset = getWaveOffset(index);

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="relative pl-20 md:pl-0"
                  style={{ transform: `translateX(${waveOffset}px)` }}
                >
                  <div
                    className={`md:w-5/12 ${index % 2 === 0 ? "md:ml-auto md:pl-12" : "md:mr-auto md:pr-12"}`}
                  >
                    <EventCard event={event} index={index} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <p className="text-muted-foreground mb-2">Ready to dive in?</p>
          <p className="text-foreground text-lg font-medium mb-6">
            Register now and be part of the legendary festival
          </p>
          <button className="px-10 py-4 bg-accent text-deep-ocean font-bold rounded-lg hover:bg-accent/90 transition-all hover:scale-105">
            View Full Schedule
          </button>
        </motion.div>
      </div>
    </section>
  );
}
