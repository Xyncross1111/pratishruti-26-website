"use client";

import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_KEY = "pratishruti-puzzle-pieces";
const TOTAL_PIECES = 4;

export interface PuzzleContextValue {
  /** Set of piece indices (0–3) the user has collected */
  collectedPieces: Set<number>;
  /** Whether the overlay is currently visible */
  showingOverlay: boolean;
  /** Whether this reveal completed the puzzle */
  justCompleted: boolean;
  /** Whether all pieces have been found */
  isComplete: boolean;
  /** Reveal the next uncollected piece */
  revealPiece: () => void;
  /** Manually dismiss the overlay (used for completion screen) */
  dismissOverlay: () => void;
  /** Reset all progress */
  reset: () => void;
}

export const PuzzleContext = createContext<PuzzleContextValue | null>(null);

function loadPieces(): Set<number> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const arr: number[] = JSON.parse(raw);
    return new Set(arr.filter((n) => n >= 0 && n < TOTAL_PIECES));
  } catch {
    return new Set();
  }
}

function savePieces(pieces: Set<number>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...pieces]));
  } catch {
    // silently fail if storage is unavailable
  }
}

export function PuzzleProvider({ children }: { children: React.ReactNode }) {
  const [collectedPieces, setCollectedPieces] = useState<Set<number>>(
    new Set(),
  );
  const [showingOverlay, setShowingOverlay] = useState(false);
  const [justCompleted, setJustCompleted] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    setCollectedPieces(loadPieces());
  }, []);

  const isComplete = collectedPieces.size >= TOTAL_PIECES;

  const revealPiece = useCallback(() => {
    // Don't reveal if already showing overlay or already complete
    if (showingOverlay) return;

    setCollectedPieces((prev) => {
      if (prev.size >= TOTAL_PIECES) return prev;

      // Find the next uncollected piece (ordered 0-3)
      let nextPiece = -1;
      for (let i = 0; i < TOTAL_PIECES; i++) {
        if (!prev.has(i)) {
          nextPiece = i;
          break;
        }
      }

      if (nextPiece === -1) return prev;

      const updated = new Set(prev);
      updated.add(nextPiece);
      savePieces(updated);

      // Check if this piece completes the puzzle
      const completed = updated.size >= TOTAL_PIECES;
      setJustCompleted(completed);

      // Show the overlay
      setShowingOverlay(true);

      return updated;
    });
  }, [showingOverlay]);

  const dismissOverlay = useCallback(() => {
    setShowingOverlay(false);
    setJustCompleted(false);
  }, []);

  // Auto-dismiss after 3s ONLY if the puzzle is NOT just completed
  useEffect(() => {
    if (!showingOverlay || justCompleted) return;
    const timer = setTimeout(() => {
      setShowingOverlay(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [showingOverlay, justCompleted]);

  const value = useMemo<PuzzleContextValue>(
    () => ({
      collectedPieces,
      showingOverlay,
      justCompleted,
      isComplete,
      revealPiece,
      dismissOverlay,
      reset: () => {
        setCollectedPieces(new Set());
        setShowingOverlay(false);
        setJustCompleted(false);
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch {
          // ignore
        }
      },
    }),
    [
      collectedPieces,
      showingOverlay,
      justCompleted,
      isComplete,
      revealPiece,
      dismissOverlay,
    ],
  );

  return (
    <PuzzleContext.Provider value={value}>{children}</PuzzleContext.Provider>
  );
}
