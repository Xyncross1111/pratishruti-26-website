"use client";

import { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { PuzzleContext } from "@/components/atlantis/PuzzleProvider";

const TOTAL_PIECES = 4;

const PIECE_POSITIONS: Record<number, string> = {
  0: "top-0 left-0",
  1: "top-0 right-0",
  2: "bottom-0 left-0",
  3: "bottom-0 right-0",
};

export default function PuzzleOverlay() {
  const context = useContext(PuzzleContext);
  if (!context) return null;

  const { showingOverlay, collectedPieces, justCompleted, dismissOverlay } =
    context;

  return (
    <AnimatePresence>
      {showingOverlay && (
        <motion.div
          key="puzzle-overlay"
          className={`fixed inset-0 z-9999 flex items-center justify-center ${
            justCompleted ? "pointer-events-auto" : "pointer-events-none"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-deep-ocean/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={justCompleted ? dismissOverlay : undefined}
          />

          {/* Content */}
          <motion.div
            className="relative flex flex-col items-center gap-6"
            initial={{ scale: 0.5, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: -20 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 22,
            }}
          >
            {/* Glow behind the board */}
            <div className="absolute -inset-6 rounded-3xl bg-accent/15 blur-2xl" />

            {/* Puzzle board (2×2 grid) */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80">
              {/* Grid lines */}
              <div className="absolute inset-0 z-10 pointer-events-none">
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-accent/20" />
                <div className="absolute top-1/2 left-0 right-0 h-px bg-accent/20" />
              </div>

              {/* Border frame */}
              <div
                className={`absolute -inset-1 rounded-2xl border transition-colors duration-500 ${
                  justCompleted
                    ? "border-accent poseidon-glow"
                    : "border-accent/30"
                }`}
              />

              {/* Pieces */}
              {Array.from({ length: TOTAL_PIECES }).map((_, i) => {
                const found = collectedPieces.has(i);
                return (
                  <motion.div
                    key={i}
                    className={`absolute w-1/2 h-1/2 ${PIECE_POSITIONS[i]} overflow-hidden`}
                    initial={false}
                    animate={{ opacity: found ? 1 : 0.12 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div
                      className="relative w-full h-full"
                      style={{ overflow: "hidden" }}
                    >
                      {/* Full image scaled to show correct quadrant */}
                      <div
                        className="absolute"
                        style={{
                          width: "200%",
                          height: "200%",
                          top: i >= 2 ? "-100%" : "0",
                          left: i % 2 === 1 ? "-100%" : "0",
                        }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="/images/easterEgg.png"
                          alt={`Puzzle piece ${i + 1}`}
                          className="w-full h-full object-cover"
                          style={{
                            filter: found
                              ? "none"
                              : "grayscale(1) brightness(0.2)",
                          }}
                        />
                      </div>

                      {/* Lock icon for missing pieces */}
                      {!found && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-accent/25"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Label: piece count or congrats */}
            {justCompleted ? (
              <motion.div
                className="relative z-10 flex flex-col items-center gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <span className="text-accent text-xl sm:text-2xl font-bold tracking-wide">
                  ✦ Artifact Restored ✦
                </span>
                <p className="text-muted-foreground text-sm text-center max-w-xs">
                  You found all the hidden pieces and restored the ancient
                  Atlantean artifact. Congratulations!
                </p>
                <motion.button
                  onClick={dismissOverlay}
                  className="mt-2 px-6 py-2.5 rounded-full border border-accent/50 bg-accent/10 text-accent text-sm font-medium hover:bg-accent/20 transition-colors pointer-events-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Close
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                className="relative z-10"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <span className="text-accent text-sm font-bold tracking-wide uppercase">
                  Piece {collectedPieces.size} / {TOTAL_PIECES} found
                </span>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
