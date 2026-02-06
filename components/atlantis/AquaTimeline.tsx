"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Fish, Bubble, Pearl, Seahorse } from "./MarineSVGs";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

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

const categoryColors: Record<string, string> = {
  Cultural: "from-pink-500/20 to-purple-500/20 border-pink-500/40",
  Literary: "from-indigo-500/20 to-blue-500/20 border-indigo-500/40",
  "Pro Shows": "from-yellow-500/20 to-orange-500/20 border-yellow-500/40",
  "Tech Events": "from-green-500/20 to-teal-500/20 border-green-500/40",
  Competitions: "from-red-500/20 to-rose-500/20 border-red-500/40",
  Workshops: "from-cyan-500/20 to-blue-500/20 border-cyan-500/40",
  Ceremony: "from-accent/20 to-gold-accent/20 border-accent/40",
};

const registrationStatusConfig = {
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

export default function AquaTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const fishProgress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const bubblesOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, 1, 1, 0],
  );

  // Calculate fish horizontal position following the wave
  const fishX = useTransform(scrollYProgress, (latest) => {
    const waveX = 100 + 40 * Math.sin(latest * Math.PI * 8);
    return waveX - 100;
  });

  const categories = [
    "All",
    ...Array.from(new Set(events.map((e) => e.category))),
  ];

  const filteredEvents =
    selectedCategory === "All"
      ? events
      : events.filter((e) => e.category === selectedCategory);

  return (
    <section
      id="events-timeline"
      ref={containerRef}
      className="relative py-20 md:py-32 px-4 overflow-hidden"
    >
      {/* Background with aqua gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-deep-ocean via-primary/10 to-deep-ocean" />

      {/* Underwater caustic light effect */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(112,200,220,0.2),transparent_50%),radial-gradient(ellipse_at_50%_100%,rgba(112,200,220,0.15),transparent_50%)]"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Underwater depth fog layers */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(112,200,220,0.08),transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(70,130,180,0.06),transparent_40%)]" />

      {/* Floating particles - like plankton */}
      {isMounted &&
        [
          { left: 15, top: 20, x: 10, duration: 9, delay: 0 },
          { left: 85, top: 15, x: -15, duration: 11, delay: 1 },
          { left: 30, top: 45, x: 8, duration: 10, delay: 2 },
          { left: 70, top: 60, x: -12, duration: 8, delay: 1.5 },
          { left: 50, top: 30, x: 15, duration: 12, delay: 3 },
          { left: 25, top: 75, x: -8, duration: 9, delay: 2.5 },
          { left: 90, top: 40, x: 12, duration: 10, delay: 4 },
          { left: 10, top: 85, x: -10, duration: 11, delay: 0.5 },
          { left: 60, top: 10, x: 18, duration: 8, delay: 3.5 },
          { left: 40, top: 90, x: -14, duration: 9, delay: 1 },
          { left: 75, top: 25, x: 10, duration: 10, delay: 4.5 },
          { left: 20, top: 55, x: -16, duration: 12, delay: 2 },
          { left: 95, top: 70, x: 8, duration: 8, delay: 3 },
          { left: 35, top: 5, x: -12, duration: 11, delay: 0.8 },
          { left: 65, top: 80, x: 14, duration: 9, delay: 4.2 },
        ].map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent/40 rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [0, -100, -200, -300],
              x: [0, particle.x, 0],
              opacity: [0, 0.6, 0.8, 0],
              scale: [0, 1, 1.2, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}

      {/* Animated bubbles - enhanced */}
      <motion.div
        className="absolute left-[10%] top-[20%] z-0"
        style={{ opacity: bubblesOpacity }}
      >
        <Bubble delay={0} className="w-8 h-8" />
      </motion.div>
      <motion.div
        className="absolute right-[15%] top-[40%] z-0"
        style={{ opacity: bubblesOpacity }}
      >
        <Bubble delay={1.5} className="w-6 h-6" />
      </motion.div>
      <motion.div
        className="absolute left-[20%] top-[60%] z-0"
        style={{ opacity: bubblesOpacity }}
      >
        <Bubble delay={3} className="w-10 h-10" />
      </motion.div>
      <motion.div
        className="absolute right-[25%] top-[30%] z-0"
        style={{ opacity: bubblesOpacity }}
      >
        <Bubble delay={2} className="w-7 h-7" />
      </motion.div>
      <motion.div
        className="absolute left-[30%] top-[70%] z-0"
        style={{ opacity: bubblesOpacity }}
      >
        <Bubble delay={4} className="w-9 h-9" />
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ rotate: [0, 10, 0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-block mb-4"
          >
            <Pearl className="w-16 h-16 mx-auto" />
          </motion.div>

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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all transform hover:scale-105 ${
                selectedCategory === category
                  ? "bg-accent text-deep-ocean shadow-lg poseidon-glow"
                  : "bg-primary/30 text-foreground hover:bg-primary/50 border border-accent/20"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Timeline container with animated fish guide */}
        <div className="relative" style={{ minHeight: "200vh" }}>
          {/* Wavy vertical aqua flow line - centered with moderate amplitude */}
          <div
            className="absolute left-1/2 top-0 bottom-0 transform -translate-x-1/2 pointer-events-none"
            style={{ width: "200px" }}
          >
            <svg
              className="w-full h-full"
              viewBox="0 0 200 1000"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient
                  id="waveGradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="rgba(112, 200, 220, 0)" />
                  <stop offset="10%" stopColor="rgba(112, 200, 220, 0.4)" />
                  <stop offset="50%" stopColor="rgba(112, 200, 220, 0.6)" />
                  <stop offset="90%" stopColor="rgba(112, 200, 220, 0.4)" />
                  <stop offset="100%" stopColor="rgba(112, 200, 220, 0)" />
                </linearGradient>
              </defs>

              {/* Wavy path oscillating left and right */}
              <motion.path
                d="M100 0 C60 62.5, 140 125, 100 187.5 S60 312.5, 100 375 S140 500, 100 562.5 S60 687.5, 100 750 S140 875, 100 937.5 S60 1000, 100 1000"
                stroke="url(#waveGradient)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                viewport={{ once: true }}
              />

              {/* Subtle glow effect */}
              <motion.path
                d="M100 0 C60 62.5, 140 125, 100 187.5 S60 312.5, 100 375 S140 500, 100 562.5 S60 687.5, 100 750 S140 875, 100 937.5 S60 1000, 100 1000"
                stroke="rgba(112, 200, 220, 0.3)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, ease: "easeInOut", delay: 0.1 }}
                viewport={{ once: true }}
                style={{ filter: "blur(4px)" }}
              />
            </svg>
          </div>

          {/* Animated fish indicator */}
          <motion.div
            className="hidden md:block absolute z-20"
            style={{
              top: fishProgress,
              left: "50%",
              x: fishX,
            }}
          >
            <Fish className="w-16 h-12 text-accent drop-shadow-lg" />
          </motion.div>

          {/* Timeline events */}
          <div className="space-y-8 md:space-y-16">
            {filteredEvents.map((event, index) => {
              const isLeft = index % 2 === 0;
              const categoryColor =
                categoryColors[event.category] || categoryColors.Cultural;

              // Calculate the wave position for this event
              // Only apply wave offset on client to avoid hydration mismatch
              const totalEvents = filteredEvents.length;
              const progress = index / Math.max(1, totalEvents - 1);
              const waveOffsetPx = isMounted
                ? 100 + 40 * Math.sin(progress * Math.PI * 8) - 100
                : 0;

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.15 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="relative flex items-center"
                  onMouseEnter={() => setHoveredEvent(event.id)}
                  onMouseLeave={() => setHoveredEvent(null)}
                >
                  {/* Center dot - positioned at screen center */}
                  <div className="absolute left-1/2 flex items-center justify-center z-20">
                    <motion.div
                      className="w-5 h-5 rounded-full bg-accent border-4 border-deep-ocean shadow-lg"
                      style={{
                        boxShadow:
                          "0 0 20px rgba(112, 200, 220, 0.6), inset 0 0 10px rgba(112, 200, 220, 0.3)",
                        transform: `translateX(calc(-50% + ${waveOffsetPx}px))`,
                      }}
                      animate={{
                        y: hoveredEvent === event.id ? 0 : [0, -3, 0],
                        scale: hoveredEvent === event.id ? [1, 1.5, 1] : 1,
                        boxShadow:
                          hoveredEvent === event.id
                            ? [
                                "0 0 20px rgba(112, 200, 220, 0.8), inset 0 0 10px rgba(112, 200, 220, 0.5)",
                                "0 0 30px rgba(112, 200, 220, 0.4), inset 0 0 15px rgba(112, 200, 220, 0.3)",
                                "0 0 20px rgba(112, 200, 220, 0.8), inset 0 0 10px rgba(112, 200, 220, 0.5)",
                              ]
                            : "0 0 20px rgba(112, 200, 220, 0.6), inset 0 0 10px rgba(112, 200, 220, 0.3)",
                      }}
                      transition={{
                        duration: hoveredEvent === event.id ? 0.6 : 2,
                        repeat: hoveredEvent === event.id ? 0 : Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </div>

                  {/* Event card container */}
                  <div
                    className={`w-full flex items-center gap-4 md:gap-8 ${
                      isLeft ? "flex-row" : "flex-row-reverse"
                    }`}
                  >
                    {/* Event card */}
                    <div
                      className={`flex-1 max-w-md mx-auto md:mx-0 ${isLeft ? "md:ml-auto md:mr-8 md:text-right" : "md:mr-auto md:ml-8 md:text-left"}`}
                      style={{
                        transform: `translateX(${waveOffsetPx}px)`,
                      }}
                    >
                      <motion.div
                        className={`relative p-6 rounded-xl border-2 bg-linear-to-br ${categoryColor} backdrop-blur-md hover:scale-[1.02] transition-all duration-300 group cursor-pointer overflow-hidden`}
                        style={{
                          boxShadow:
                            "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(112, 200, 220, 0.2)",
                        }}
                        whileHover={{
                          y: -5,
                          boxShadow:
                            "0 12px 40px rgba(112, 200, 220, 0.3), inset 0 1px 0 rgba(112, 200, 220, 0.3)",
                        }}
                      >
                        {/* Underwater shimmer effect */}
                        <motion.div
                          className="absolute inset-0 bg-linear-to-r from-transparent via-accent/10 to-transparent"
                          animate={{
                            x: ["-100%", "100%"],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            repeatDelay: 2,
                            ease: "easeInOut",
                          }}
                        />

                        {/* Bioluminescent corner glow */}
                        <div className="absolute top-0 right-0 w-20 h-20 bg-accent/5 rounded-full blur-2xl" />
                        <div className="absolute bottom-0 left-0 w-16 h-16 bg-primary/5 rounded-full blur-xl" />
                        {/* Category badge */}
                        <div
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3 border ${
                            isLeft
                              ? "md:float-right md:ml-3"
                              : "md:float-left md:mr-3"
                          }`}
                          style={{
                            background: "rgba(112, 200, 220, 0.1)",
                            borderColor: "rgba(112, 200, 220, 0.3)",
                          }}
                        >
                          {event.category}
                        </div>

                        {/* Event title */}
                        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                          {event.title}
                        </h3>

                        {/* Event details */}
                        <div
                          className={`space-y-2 mb-4 ${isLeft ? "md:items-end" : "md:items-start"} flex flex-col`}
                        >
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="w-4 h-4 text-accent" />
                            <span className="text-sm">{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="w-4 h-4 text-accent" />
                            <span className="text-sm">{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="w-4 h-4 text-accent" />
                            <span className="text-sm">{event.venue}</span>
                          </div>
                          {event.capacity && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Users className="w-4 h-4 text-accent" />
                              <span className="text-sm">{event.capacity}</span>
                            </div>
                          )}
                        </div>

                        {/* Description */}
                        <p className="text-muted-foreground text-sm mb-4">
                          {event.description}
                        </p>

                        {/* Registration status */}
                        {event.registrationStatus && (
                          <div
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${
                              registrationStatusConfig[event.registrationStatus]
                                .color
                            }`}
                          >
                            {
                              registrationStatusConfig[event.registrationStatus]
                                .label
                            }
                          </div>
                        )}

                        {/* Hover effect - corner accent */}
                        <motion.div
                          className="absolute -bottom-1 -right-1 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity"
                          initial={{ scale: 0 }}
                          whileHover={{ scale: 1 }}
                        >
                          <Seahorse className="w-8 h-8 text-accent" />
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="mb-6">
            <p className="text-muted-foreground mb-2">Ready to dive in?</p>
            <p className="text-foreground text-lg font-medium">
              Register now and be part of the legendary festival
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-accent text-deep-ocean font-bold rounded-lg hover:bg-accent/90 transition-all transform poseidon-glow"
          >
            View Full Schedule
          </motion.button>
        </motion.div>
      </div>

      {/* Decorative marine elements */}
      <motion.div
        className="hidden md:block absolute bottom-10 left-10"
        animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <Seahorse className="w-20 h-24 text-accent/30" />
      </motion.div>

      <motion.div
        className="hidden md:block absolute top-20 right-10"
        animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <Pearl className="w-16 h-16 text-accent/20" />
      </motion.div>
    </section>
  );
}
