"use client";

import { useCallback, useContext } from "react";

import { PuzzleContext } from "@/components/atlantis/PuzzleProvider";

/**
 * Hook to interact with the Easter Egg puzzle system.
 *
 * Call `revealPiece()` anywhere an easter egg is discovered to
 * reveal the next hidden puzzle piece as a brief overlay.
 *
 * @example
 * ```tsx
 * const { revealPiece } = usePuzzle()
 *
 * function handleSecretClick() {
 *   revealPiece()
 * }
 * ```
 */
export function usePuzzle() {
  const context = useContext(PuzzleContext);

  if (!context) {
    throw new Error("usePuzzle must be used within a <PuzzleProvider>");
  }

  const {
    collectedPieces,
    revealPiece: contextReveal,
    isComplete,
    reset,
  } = context;

  const revealPiece = useCallback(() => {
    contextReveal();
  }, [contextReveal]);

  return {
    /** Set of collected piece indices (0–3) */
    collectedPieces,
    /** Total number of pieces collected so far */
    collected: collectedPieces.size,
    /** Total pieces in the puzzle */
    total: 4,
    /** Whether all 4 pieces have been found */
    isComplete,
    /** Call this when the user discovers an easter egg */
    revealPiece,
    /** Reset all progress (clears localStorage too) */
    reset,
  };
}
