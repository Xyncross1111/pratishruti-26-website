"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

type LocationKey = "about" | "events" | "artists" | "gallery" | "register";

const MAP_LOCATIONS: {
  key: LocationKey;
  desktop: { x: string; y: string };
  mobile: { x: string; y: string };
}[] = [
  {
    key: "about",
    desktop: { x: "35%", y: "28%" },
    mobile: { x: "80%", y: "27%" },
  },
  {
    key: "events",
    desktop: { x: "69%", y: "37%" },
    mobile: { x: "230%", y: "37%" },
  },
  {
    key: "artists",
    desktop: { x: "47%", y: "46%" },
    mobile: { x: "133%", y: "46%" },
  },
  {
    key: "gallery",
    desktop: { x: "36%", y: "60%" },
    mobile: { x: "85%", y: "60%" },
  },
  {
    key: "register",
    desktop: { x: "57.5%", y: "67%" },
    mobile: { x: "179%", y: "67%" },
  },
];

export default function Header() {
  const [mapOpen, setMapOpen] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const parchmentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (mapOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mapOpen]);

  const openMap = () => {
    setMapOpen(true);

    requestAnimationFrame(() => {
      gsap.fromTo(
        parchmentRef.current,
        {
          scaleY: 0.1,
          transformOrigin: "top center",

          y: -200,
          opacity: 0.8,
        },
        {
          scaleY: 1,
          y: 0,
          opacity: 1,
          duration: 1.6,
          ease: "power4.out",
        },
      );
    });
  };

  const closeMap = () => {
    gsap.to(parchmentRef.current, {
      y: "-100%",
      scaleY: 0.2,
      duration: 1,
      ease: "power4.in",
      onComplete: () => setMapOpen(false),
    });
  };

  const zoomToLocation = (key: LocationKey) => {
    const el = document.querySelector(
      `[data-location="${key}"]`,
    ) as HTMLElement;

    if (!el || !mapRef.current) return;

    const bounds = el.getBoundingClientRect();
    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.top + bounds.height / 2;

    const tl = gsap.timeline({
      defaults: { ease: "power4.inOut" },
    });
    const isMobile = window.innerWidth < 768;
    const zoomScale = isMobile ? 1.8 : 2.4;

    tl.to(mapRef.current, {
      scale: zoomScale,
      x: -(centerX - window.innerWidth / 2),
      y: -(centerY - window.innerHeight / 2),
      rotateX: 8,
      rotateY: -8,
      duration: 1.4,
    })
      .to(
        mapRef.current,
        {
          filter: "brightness(0.7)",
          duration: 0.6,
        },
        0.6,
      )
      .to(
        parchmentRef.current,
        {
          y: "-100%",
          duration: 1,
          ease: "power4.in",
        },
        1.2,
      )
      .add(() => {
        setMapOpen(false);
        router.push(`/${key}`);
      });
  };
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mapOpen ? "hidden" : "auto";
  }, [mapOpen]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const compassPosition = isMobile
    ? { top: "24%", left: "32%" } // mobile position
    : { top: "21.5%", left: "22.6%" }; // desktop position
  const router = useRouter();

  return (
    <>
      {/* PREMIUM FLOATING CAPSULE NAVBAR */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed
top-4 sm:top-6
left-1/2 -translate-x-1/2
z-50"
      >
        <motion.div
          animate={{
            paddingTop: scrolled ? 8 : 14,
            paddingBottom: scrolled ? 8 : 14,
            paddingLeft: scrolled ? 24 : 32,
            paddingRight: scrolled ? 24 : 32,
          }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
relative flex items-center justify-between
gap-4 sm:gap-8
rounded-full
w-[94vw] sm:w-[92vw]
max-w-5xl
"
        >
          {/* AQUAMARINE WAVE GLASS BACKGROUND */}
          <div
            className="
  absolute inset-0 rounded-full
  bg-[linear-gradient(120deg,rgba(0,180,200,0.25),rgba(0,120,180,0.2),rgba(0,200,255,0.25))]
  border border-white/20
  shadow-[0_8px_30px_rgba(0,150,200,0.25)]
  backdrop-blur-md
"
          />

          {/* Subtle Moving Wave Layer */}
          <motion.div
            animate={{ backgroundPositionX: ["0%", "100%"] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="
    absolute inset-0 rounded-full opacity-30 pointer-events-none
    bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.4),transparent_60%)]
    bg-[length:200%_200%]
  "
          />

          <motion.div
            animate={{
              scale: scrolled ? 0.85 : 1,
            }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-10 flex items-center"
          >
            <Image
              src="/Pratishruti-icon.png"
              height={40}
              width={100}
              className="object-contain sm:h-[50px] sm:w-[120px]"
              alt="Pratishruti Logo"
            />
          </motion.div>

          <motion.button
            onClick={openMap}
            animate={{
              scale: scrolled ? 0.92 : 1,
            }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="
    relative px-4 py-2 sm:px-6 sm:py-2.5
text-sm sm:text-base
    rounded-full
    bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400
    text-black font-semibold tracking-wide
    hover:scale-105
    active:scale-95
    transition-all duration-300
    shadow-[0_6px_25px_rgba(0,200,255,0.35)]
  "
          >
            <span className="relative z-10">P'26 Map</span>
          </motion.button>
        </motion.div>
      </motion.header>

      {/* MAP OVERLAY */}
      {mapOpen && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md">
          {/* CLOSE */}
          <button
            onClick={closeMap}
            className="absolute
top-4 right-4
sm:top-6 sm:right-6
z-50
text-white
hover:rotate-90
transition"
          >
            <X size={32} />
          </button>

          {/* PARCHMENT */}
          <div ref={parchmentRef} className="absolute inset-0 origin-top">
            <div
              ref={mapRef}
              className="
    relative
    w-screen h-screen
    overflow-x-auto md:overflow-hidden
    overflow-y-hidden
    touch-pan-x md:touch-none
    filter sepia-[0.35] contrast-[1.1]
  "
              style={{
                perspective: "1200px",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {/* DESKTOP MAP */}
              <div className="hidden md:block relative w-full h-full">
                <Image
                  src="/images/desktop-map.jpg"
                  alt="Treasure Map"
                  fill
                  className="object-cover object-center"
                  priority
                />
              </div>
              {/* MOBILE MAP */}
              <div className="md:hidden relative h-full w-[300vw]">
                <Image
                  src="/images/phone-map.svg"
                  alt="Phone Map"
                  fill
                  className="object-cover object-left"
                  priority
                />
              </div>
              {/* LOCATIONS */}
              {MAP_LOCATIONS.map((loc) => {
                const isMobile =
                  typeof window !== "undefined" && window.innerWidth < 768;
                const position = isMobile ? loc.mobile : loc.desktop;
                const floatOffset = Math.random() * 10;

                return (
                  <div
                    key={loc.key}
                    data-location={loc.key}
                    className="absolute group cursor-pointer"
                    style={{ left: position.x, top: position.y }}
                    onClick={() => zoomToLocation(loc.key)}
                  >
                    {/* FLAG CONTAINER (for perspective) */}
                    <div
                      className="absolute
-top-10 sm:-top-12 md:-top-14
left-1/2 -translate-x-1/2"
                      style={{
                        perspective: "800px",
                      }}
                    >
                      {/* <p className="absolute">{loc.key}</p> */}
                      <motion.div
  className="relative
w-16 h-10
sm:w-20 sm:h-12
md:w-24 md:h-14
bg-contain bg-center bg-no-repeat
drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)]
"

  style={{
    backgroundImage: "url('/images/pirate-flag.png')",
    transformOrigin: "left center",
  }}
 animate={{
  y: [0, -6 - floatOffset, 0, 4 + floatOffset, 0],
  rotateZ: [0, 2, -2, 1, 0],
  rotateY: [0, 6, -6, 3, 0],
}}

  transition={{
    duration: 4 + Math.random() * 2,  // slightly different timing per flag
    repeat: Infinity,
    ease: "easeInOut",
  }}
  whileHover={{
    scale: 1.15,
    rotateY: 12,
    y: -12,
  }}
/>
                    </div>
                  </div>
                );
              })}
              x{/* COMPASS */}
              <motion.div
                className="
    absolute
    w-16 h-16
    sm:w-20 sm:h-20
    md:w-28 md:h-28
    bg-[url('/images/compass-2.svg')] bg-cover
  "
                style={{
                  top: compassPosition.top,
                  left: compassPosition.left,
                }}
                whileHover={{ rotate: 360 }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
