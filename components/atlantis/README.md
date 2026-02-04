# Atlantis Components Library

Complete component library for Pratishruti 2026: Atlas of Atlantis theme.

## Core Page Components

### Navigation
```tsx
import Navigation from '@/components/atlantis/Navigation';
```
- Sticky header with scroll-based styling
- Sound toggle and depth gauge
- Responsive mobile menu
- Props: `scrollProgress: number`

### Hero
```tsx
import Hero from '@/components/atlantis/Hero';
```
- Landing section with parallax effects
- Animated marine creatures
- Floating bubbles and particles
- CTA buttons for exploration

### ShallowWaters
```tsx
import ShallowWaters from '@/components/atlantis/ShallowWaters';
```
- Event categories grid (6 categories)
- Ocean floor background imagery
- Marine SVG decorations
- Hover effects and animations

### RuinsSection
```tsx
import RuinsSection from '@/components/atlantis/RuinsSection';
```
- Timeline of event schedule
- Atlantis ruins background
- Animated timeline markers
- Ancient atmospheric effects

### DeepSea
```tsx
import DeepSea from '@/components/atlantis/DeepSea';
```
- Sponsors and partners section
- Deep ocean background
- Bioluminescent glow effects
- Theme mythology content

### TreasureVault
```tsx
import TreasureVault from '@/components/atlantis/TreasureVault';
```
- Interactive treasure chest reveal
- Treasure-themed decorations
- Registration CTA
- Media partners grid

### Footer
```tsx
import Footer from '@/components/atlantis/Footer';
```
- Brand information
- Quick links
- Contact information
- Social media links
- Marine decorations

### ScrollProgress
```tsx
import ScrollProgress from '@/components/atlantis/ScrollProgress';
```
- Side-mounted progress bar
- Depth gauge with percentage
- Current location indicator
- Props: `progress: number`

## SVG Component Libraries

### MarineSVGs
```tsx
import {
  Coral,
  Starfish,
  Bubble,
  Fish,
  Jellyfish,
  Seaweed,
  Seahorse,
  Pearl,
  TreasureChest,
} from '@/components/atlantis/MarineSVGs';
```

All components accept:
- `className?: string` - Tailwind classes for sizing and positioning
- Standard SVG attributes

**Example Usage:**
```tsx
<Coral className="w-16 h-24 opacity-40" />
<Pearl className="absolute w-8 h-8 top-20 left-1/4" />
```

### OceanPatterns
```tsx
import {
  LightRays,
  WaterCaustics,
  FloatingParticles,
  BioluminescentGlow,
  TurbulentWater,
  AncientRunes,
} from '@/components/atlantis/OceanPatterns';
```

All components accept:
- `className?: string` - Tailwind classes
- Additional props vary by component

**FloatingParticles specific:**
```tsx
<FloatingParticles 
  count={10}                    // Number of particles
  className="absolute w-full"
/>
```

### Separators
```tsx
import {
  WaveSeparator,
  DecorationDivider,
  RunePattern,
  CoralFlourish,
  GlowingDots,
} from '@/components/atlantis/Separators';
```

All components accept:
- `className?: string` - Tailwind classes

## Optional Showcase Component

### MarineShowcase
```tsx
import MarineShowcase from '@/components/atlantis/MarineShowcase';
```
- Gallery of all marine elements
- Pattern demonstrations
- Statistics and information
- Great for feature showcase or reference

## Usage Patterns

### Adding Marine Elements to a Section

```tsx
import { Coral, Fish, Pearl } from '@/components/atlantis/MarineSVGs';

export function MySection() {
  return (
    <section className="relative">
      {/* Decorative layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Coral className="absolute w-20 h-32 opacity-40 bottom-10 left-5" />
        <Fish className="absolute w-12 h-8 opacity-30 top-1/3 right-20" />
        <Pearl className="absolute w-8 h-8 opacity-35 top-40 right-40" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Your content here */}
      </div>
    </section>
  );
}
```

### Adding Background Patterns

```tsx
import { BioluminescentGlow, FloatingParticles } from '@/components/atlantis/OceanPatterns';

export function MySection() {
  return (
    <section className="relative">
      <div className="absolute inset-0 pointer-events-none">
        <FloatingParticles count={8} className="absolute w-full h-full opacity-40" />
        <BioluminescentGlow className="absolute w-32 h-32 top-1/4 right-1/4 opacity-50" />
      </div>

      {/* Content */}
    </section>
  );
}
```

### Using Section Dividers

```tsx
import { WaveSeparator, DecorationDivider } from '@/components/atlantis/Separators';

export function PageStructure() {
  return (
    <>
      <Section1 />
      <WaveSeparator className="w-full h-20" />
      <Section2 />
      <DecorationDivider className="w-32 h-10 mx-auto my-8" />
      <Section3 />
    </>
  );
}
```

## Styling Guidelines

### Sizing
- Small: `w-8 h-8` to `w-12 h-12`
- Medium: `w-16 h-16` to `w-24 h-24`
- Large: `w-32 h-32` to `w-48 h-48`

### Opacity
- Subtle background: `opacity-15` to `opacity-25`
- Prominent decoration: `opacity-35` to `opacity-50`
- Highlighted element: `opacity-60` to `opacity-80`

### Positioning
- Use Tailwind positioning classes: `absolute`, `relative`
- Use placement classes: `top-10`, `right-5`, `bottom-20`, `left-1/4`
- Use `pointer-events-none` on decoration containers

### Colors
- All elements respond to current text color
- Use color utilities: `text-accent`, `text-bio-cyan`, `text-gold-accent`
- Opacity modifiers adjust all colors: `opacity-40`

## Performance Tips

1. **Use `pointer-events-none`** on purely decorative containers
2. **Limit FloatingParticles count** - Start with 5-10, increase carefully
3. **Use opacity overlays** on background images instead of full opacity
4. **Batch animations** - Use Framer Motion's `variants` for grouped animations
5. **Consider mobile** - Reduce decoration count on smaller screens

## Responsive Considerations

Most components adapt well to mobile:
- Scale SVGs smaller on mobile: `md:w-20 w-12`
- Reduce opacity on mobile for clarity: `md:opacity-40 opacity-25`
- Hide some decorations on mobile: `hidden md:block`

## Accessibility

All decorative elements are correctly marked:
- SVG components have no alt text (decorative)
- Use `aria-hidden="true"` if needed for screen readers
- Core content remains accessible without decorations
- Text contrasts maintained over all backgrounds

## Troubleshooting

### SVG not rendering
- Check className includes sizing: `w-16 h-16`
- Ensure parent has relative positioning if using absolute
- Verify all imports are correct

### Animation too fast/slow
- Modify `duration` prop in Framer Motion code
- Check for conflicting CSS animations
- Verify browser hardware acceleration is enabled

### Opacity issues
- Use Tailwind opacity scale: `opacity-20`, `opacity-40`, etc.
- Combine with `text-` or `bg-` utilities
- Check z-index layering for visibility

### Performance lag
- Reduce ParticleCount
- Remove unnecessary animations
- Use `will-change: transform` on animated elements
- Profile with DevTools Performance tab

## Color System

```css
/* Available in globals.css */
--sand: oklch(0.8 0.12 70);
--shallow-water: oklch(0.5 0.18 200);
--deep-ocean: oklch(0.15 0.02 250);
--bio-cyan: oklch(0.7 0.2 190);
--gold-accent: oklch(0.65 0.18 45);
--glow-blue: oklch(0.75 0.25 190);
```

All components use these theme colors for consistency.

## Extended Documentation

For comprehensive design guidelines, see:
- `/ATLANTIS_DESIGN_GUIDE.md` - Complete design system
- `/ENHANCEMENTS.md` - Visual enhancement details

---

**Pratishruti 2026 - Atlas of Atlantis**
**RCOEM, Nagpur**
