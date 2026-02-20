# How to Add an Easter Egg

This guide explains how to hide easter eggs throughout the site that reveal pieces of a **hidden puzzle**. When a user discovers all 4 pieces, the full image (`/images/easterEgg.png`) is shown with a congratulations message.

---

## How It Works

1. A single image (`public/images/easterEgg.png`) is split into **4 quadrants** (Top-Left, Top-Right, Bottom-Left, Bottom-Right).
2. Each time an easter egg is triggered, the **assembled puzzle board** pops up as an overlay (~3 seconds) showing all collected pieces so far (uncollected pieces are greyed out with a lock icon), then auto-dismisses.
3. Progress is saved to `localStorage` so it survives page refreshes.
4. When the **final piece** is found, the full completed image appears with a congratulations message. This overlay does **not** auto-dismiss — the user must click "Close" to dismiss it.

---

## Quick Start (3 Steps)

### Step 1 — Import the hook

In any `'use client'` component:

```tsx
import { usePuzzle } from '@/hooks/use-puzzle'
```

### Step 2 — Call the hook

```tsx
const { revealPiece } = usePuzzle()
```

### Step 3 — Trigger it on your easter egg interaction

```tsx
<button onClick={revealPiece}>🐣</button>
```

That's it. The overlay animation, persistence, and deduplication are all handled automatically.

---

## Full Example — Secret Click Easter Egg

Create a component that reveals a puzzle piece when the user clicks a specific hidden element:

```tsx
'use client'

import { usePuzzle } from '@/hooks/use-puzzle'

export default function SecretTreasure() {
  const { revealPiece, collected, total } = usePuzzle()

  return (
    <div
      onClick={revealPiece}
      className="cursor-pointer opacity-30 hover:opacity-100 transition-opacity"
      title="You found a secret!"
    >
      <span className="text-2xl">🔱</span>
    </div>
  )
}
```

---

## Full Example — Konami Code Easter Egg

Reveal a puzzle piece when the user types a specific key sequence:

```tsx
'use client'

import { useEffect, useRef } from 'react'
import { usePuzzle } from '@/hooks/use-puzzle'

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

export default function KonamiEasterEgg() {
  const { revealPiece } = usePuzzle()
  const buffer = useRef<string[]>([])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      buffer.current.push(e.key)
      buffer.current = buffer.current.slice(-KONAMI.length)

      if (buffer.current.join(',') === KONAMI.join(',')) {
        revealPiece()
        buffer.current = []
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [revealPiece])

  return null // invisible component
}
```

Mount it anywhere:

```tsx
<KonamiEasterEgg />
```

---

## Full Example — Multi-Click Easter Egg

Reveal a piece when the user clicks an element 5 times in rapid succession:

```tsx
'use client'

import { useRef } from 'react'
import { usePuzzle } from '@/hooks/use-puzzle'

export default function MultiClickSecret({ children }: { children: React.ReactNode }) {
  const { revealPiece } = usePuzzle()
  const clickCount = useRef(0)
  const timer = useRef<ReturnType<typeof setTimeout>>()

  const handleClick = () => {
    clickCount.current++
    clearTimeout(timer.current)

    if (clickCount.current >= 5) {
      revealPiece()
      clickCount.current = 0
    } else {
      timer.current = setTimeout(() => {
        clickCount.current = 0
      }, 800)
    }
  }

  return <div onClick={handleClick}>{children}</div>
}
```

---

## API Reference

The `usePuzzle()` hook returns:

| Property         | Type           | Description                                    |
| ---------------- | -------------- | ---------------------------------------------- |
| `revealPiece`    | `() => void`   | Call to reveal the next uncollected piece       |
| `collected`      | `number`       | How many pieces have been found (0–4)          |
| `total`          | `number`       | Total number of pieces (always 4)              |
| `collectedPieces`| `Set<number>`  | Set of collected piece indices (0–3)           |
| `isComplete`     | `boolean`      | `true` when all 4 pieces are collected         |
| `reset`          | `() => void`   | Clear all progress (useful for dev/testing)    |

---

## Important Notes

- **One piece per call** — `revealPiece()` always reveals the next piece in order (0 → 1 → 2 → 3). Calling it when the overlay is already visible is a no-op.
- **Persistence** — Progress is saved in `localStorage` under the key `pratishruti-puzzle-pieces`. Pieces survive page refreshes.
- **Deduplication** — If all pieces are found, further calls to `revealPiece()` do nothing.
- **Image** — Place your puzzle image at `public/images/easterEgg.png`. Use a square image for best results.
- **Auto-dismiss** — Partial-progress overlays disappear after ~3 seconds. The final completion overlay stays until manually closed.

---

## File Structure

```
hooks/
  use-puzzle.ts               ← the hook you import
components/atlantis/
  PuzzleProvider.tsx           ← context + state management (mounted in layout)
  PuzzleOverlay.tsx            ← animated overlay that pops up on reveal
public/images/
  easterEgg.png                ← your puzzle image (place this here)
```
