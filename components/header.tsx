"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

type LocationKey =
  | "about"
  | "events"
  | "artists"
  | "gallery"
  | "register";

const MAP_LOCATIONS: {
  key: LocationKey;
  x: string;
  y: string;
}[] = [
  { key: "about",  x: "35%", y: "28%" },
  { key: "events", x: "69%", y: "37%" },
  { key: "artists", x: "47%", y: "46%" },
  { key: "gallery",  x: "57%", y: "67%" },
  { key: "register", x: "36%", y: "59%" },
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
        scaleY: 0,
        y: -200,
        opacity: 0.8,
      },
      {
        scaleY: 1,
        y: 0,
        opacity: 1,
        duration: 1.6,
        ease: "power4.out",
      }
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
    `[data-location="${key}"]`
  ) as HTMLElement;

  if (!el || !mapRef.current) return;

  const bounds = el.getBoundingClientRect();
  const centerX = bounds.left + bounds.width / 2;
  const centerY = bounds.top + bounds.height / 2;

  const tl = gsap.timeline({
    defaults: { ease: "power4.inOut" },
  });

  tl.to(mapRef.current, {
    scale: 2.4,
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
      0.6
    )
    .to(
      parchmentRef.current,
      {
        y: "-100%",
        duration: 1,
        ease: "power4.in",
      },
      1.2
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

  const router= useRouter();

  return (
    <>

      {/* PREMIUM FLOATING CAPSULE NAVBAR */}
<motion.header
  initial={{ y: -60, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
  className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
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
      gap-12
      rounded-full
      w-[92vw] max-w-5xl
    "
  >

    {/* AQUAMARINE WAVE GLASS BACKGROUND */}
<div className="
  absolute inset-0 rounded-full
  bg-[linear-gradient(120deg,rgba(0,180,200,0.25),rgba(0,120,180,0.2),rgba(0,200,255,0.25))]
  border border-white/20
  shadow-[0_8px_30px_rgba(0,150,200,0.25)]
  backdrop-blur-md
" />

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
    height={50}
    width={120}
    alt="Pratishruti Logo"
    className="object-contain"
  />
</motion.div>


    <motion.button
  onClick={openMap}
  animate={{
    scale: scrolled ? 0.92 : 1,
  }}
  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
  className="
    relative px-6 py-2.5
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
            className="absolute top-6 right-6 z-50 text-white hover:rotate-90 transition"
          >
            <X size={32} />
          </button>

          {/* PARCHMENT */}
          <div
            ref={parchmentRef}
            className="absolute inset-0 origin-top"
          >
            <div
              ref={mapRef}
              className="relative w-full h-full bg-[url('/images/treasure-map.svg')] bg-contain bg-center bg-no-repeat
                         filter sepia-[0.35] contrast-[1.1]
                         transition-transform duration-700"
              style={{
                perspective: "1200px",
              }}
            >
              {/* VIGNETTE */}
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.75))]" />

              {/* LOCATIONS */}
              {MAP_LOCATIONS.map((loc) => (
  <div
    key={loc.key}
    data-location={loc.key}
    className="absolute group cursor-pointer"
    style={{ left: loc.x, top: loc.y }}
    onClick={() => zoomToLocation(loc.key)}
  >

    {/* FLAG CONTAINER (for perspective) */}
    <div
      className="absolute -top-14 left-1/2 -translate-x-1/2"
      style={{
        perspective: "800px",
      }}
    >
      <motion.div
        className="relative w-24 h-14 bg-contain bg-center bg-no-repeat
                   drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] hover:scale-105 transition duration-300"
        style={{
          backgroundImage: "url('/images/pirate-flag.png')",
          transformOrigin: "left center",
        }}
        initial={{ rotateY: 0 }}
        animate={{
          rotateZ: [0, 1.5, -1.5, 1, 0],
          rotateY: [0, 3, -3, 2, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{
          scale: 1.1,
          rotateY: 8,
        }}
      >
        
      </motion.div>
    </div>
  </div>
))}
x
              {/* COMPASS */}
<motion.div
  className="absolute top-37 left-84 w-29 h-28 bg-[url('/images/compass-2.svg')] bg-cover"
  whileHover={{ rotate: 360 }}
  transition={{
    duration: 0.5,   // fast spin
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
