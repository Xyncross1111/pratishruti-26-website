"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Image, { StaticImageData } from "next/image";
import { useMemo, useRef } from "react";
import { twMerge } from "tailwind-merge";
import icon from "../public/icon.svg";

// Register plugins
gsap.registerPlugin(useGSAP, ScrollTrigger);

/* -------------------- Types -------------------- */

interface InfiniteScrollProps {
  isReversed?: boolean;
  className?: string;
}

interface ElementItem {
  icon: StaticImageData;
  label: string;
}

/* -------------------- Data -------------------- */

const TECHNOLOGY_ICONS: StaticImageData[] = [
  icon,
  icon,
  icon,
  icon,
  icon,
];

const LABELS: string[] = [
  "Sponsor Partner",
  "Associate Partner",
  "Brand Collaborator",
  "Community Partner",
  "Media Partner",
];

const ELEMENTS: ElementItem[] = TECHNOLOGY_ICONS.map((icon, i) => ({
  icon,
  label: LABELS[i],
}));

const DOUBLE_ELEMENTS: ElementItem[] = [...ELEMENTS, ...ELEMENTS];

/* -------------------- Component -------------------- */

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  isReversed = false,
  className,
}) => {
  const movingContainer = useRef<HTMLDivElement | null>(null);

  const timeline = useRef<gsap.core.Timeline | null>(null);

  const timelineTimeScaleTween = useRef<gsap.core.Tween | null>(null);

  /* -------------------- GSAP -------------------- */

  useGSAP(
    () => {
      if (!movingContainer.current) return;

      const setupInfiniteMarqueeTimeline = () => {
        gsap.set(movingContainer.current!, {
          xPercent: isReversed ? -50 : 0,
        });

        timeline.current = gsap
          .timeline({
            defaults: { ease: "none" },
            repeat: -1,
          })
          .to(movingContainer.current!, {
            xPercent: isReversed ? 0 : -50,
            duration: 20,
          })
          .set(movingContainer.current!, { xPercent: 0 });
      };

      setupInfiniteMarqueeTimeline();
    },
    {
      dependencies: [isReversed],
    }
  );

  /* -------------------- Hover Controls -------------------- */

  const onPointerEnter = (): void => {
    if (!timeline.current) return;

    timelineTimeScaleTween.current?.kill();

    timelineTimeScaleTween.current = gsap.to(timeline.current, {
      timeScale: 0.25,
      duration: 0.4,
    });
  };

  const onPointerLeave = (): void => {
    if (!timeline.current) return;

    timelineTimeScaleTween.current?.kill();

    timelineTimeScaleTween.current = gsap.to(timeline.current, {
      timeScale: 1,
      duration: 0.2,
    });
  };

  /* -------------------- List -------------------- */

  const list = useMemo(() => {
    return (
      <div className="flex w-fit items-center gap-18 px-10">
        {DOUBLE_ELEMENTS.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-9 text-white text-lg font-medium w-62.5 text-center leading-tight"
            style={{
              whiteSpace: "normal",
              wordWrap: "break-word",
            }}
          >
            <Image
              src={item.icon}
              alt={item.label}
              height={34}
              width={34}
              className="object-contain"
            />

            <span>{item.label}</span>
          </div>
        ))}
      </div>
    );
  }, []);

  /* -------------------- Render -------------------- */

  return (
    <div className="relative mx-auto text-center">
    <h2 className="text-accent text-sm font-semibold tracking-widest uppercase mb-2">
            Our Sponsors & Partners
          </h2>
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            Our Collaborators
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Thank you for supporting Pratishruti and the spirit of student-led initiatives.
          </p>
    <div
      className={twMerge(
        "relative w-full overflow-hidden select-none z-40 py-2 sm:py-4 px-6 sm:px-8",
        className
      )}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      style={{
        position: "relative",
        top: "60px",
        backgroundColor: "var(--accent)",
        transform: "rotate(-1deg)",
        transformOrigin: "center",
        boxShadow: "0 4px 25px rgba(0,0,0,0.3)",
        maskImage:
          "linear-gradient(to right, transparent 1%, black 15%, black 85%, transparent 100%)",
        borderRadius: "12px",
      }}
    >
        
      <div
        ref={movingContainer}
        className="flex w-fit items-center gap-8 sm:gap-14 px-6 sm:px-10"
        style={{
          height: "100%",
        }}
      >
        {list}
      </div>
    </div>

    <div
         
          className="mt-25 p-6 text-center border-t border-accent/20 pt-8"
        >
    <p className="text-muted-foreground mb-4">
            Interested in sponsoring Pratishruti?
          </p>
          <button className="px-6 py-2 bg-accent/20 hover:bg-accent/40 text-accent rounded-lg text-sm font-semibold transition-colors">
            Become a Sponsor
          </button>
          </div>
    </div>
    
  );
};

export default InfiniteScroll;