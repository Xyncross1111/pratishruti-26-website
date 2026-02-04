# Pratishruti 2026: Atlas of Atlantis - Design Guide

## 🌊 Visual System Overview

This comprehensive guide documents the marine and oceanic visual elements integrated into the Pratishruti 2026 website.

## Marine SVG Components

### MarineSVGs.tsx
Animated marine creatures and decorative elements used throughout the site:

- **Coral** - Branching coral formations with animated polyps, used as section decorations
- **Starfish** - Five-armed starfish with rotation animations, represents ocean floor diversity
- **Bubble** - Floating bubbles with rising animation, creates depth effect
- **Fish** - Swimming fish with gentle horizontal motion, adds life to sections
- **Jellyfish** - Pulsing jellyfish with tentacle animations, mystical deep-sea element
- **Seaweed** - Swaying kelp forest elements, natural ocean decorations
- **TreasureChest** - Ornate chest with opening animation, centerpiece for treasure sections
- **Pearl** - Glowing pearls with scaling animation, luxurious accent elements
- **Seahorse** - Vertical floating seahorse, elegant deep-sea creature

### Ocean Patterns (OceanPatterns.tsx)
Large-scale animated background patterns and effects:

- **LightRays** - Angled light rays penetrating water, creates depth and atmosphere
- **WaterCaustics** - Ripple and turbulence effects simulating water surface distortion
- **FloatingParticles** - Drifting plankton-like particles for immersive effect
- **BioluminescentGlow** - Pulsing concentric circles representing deep-sea bioluminescence
- **TurbulentWater** - Animated wave patterns with displacement filter
- **AncientRunes** - Atlantean rune patterns fading in and out

### Decorative Separators (Separators.tsx)
Visual dividers and section breaks:

- **WaveSeparator** - Animated wave dividers between sections
- **DecorationDivider** - Ornate line dividers with glowing center elements
- **RunePattern** - Pulsing Atlantean runes as visual anchors
- **CoralFlourish** - Curved branch patterns with animated decorative nodes
- **GlowingDots** - Sequential pulsing dots, creates rhythm and flow

## PNG Background Images

### Generated Assets
High-resolution background images for major sections:

- **/public/images/atlantis-ruins.png** - Ancient underwater ruins with broken columns and glowing runes
- **/public/images/treasure-chest.png** - Golden treasure overflowing with gems and jewels
- **/public/images/ocean-floor.png** - Coral gardens with bioluminescent creatures
- **/public/images/atlantis-structure.png** - Massive pyramid temples with mystical architecture

## Color Palette

### Theme Colors (oklch format)
```
--deep-ocean: oklch(0.15 0.02 250)      // Deep dark blue
--shallow-water: oklch(0.5 0.18 200)    // Lighter ocean blue
--bio-cyan: oklch(0.7 0.2 190)          // Bioluminescent cyan
--gold-accent: oklch(0.65 0.18 45)      // Atlantean gold
--glow-blue: oklch(0.75 0.25 190)       // Bright cyan glow
--sand: oklch(0.8 0.12 70)              // Sandy accent
```

## Component Integration Guide

### Hero Section
- Includes: Bubbles, Coral, Seaweed, Fish, Jellyfish
- Background: Sky-to-water gradient with light rays
- Effect: Immersive scroll parallax

### Shallow Waters (Events)
- Includes: Ocean floor background image, Coral, Starfish, Pearl, Seaweed, Fish
- Background: coral_floor.png at 30% opacity
- Grid: Event categories with glow effects

### Ruins Section
- Includes: Atlantis ruins background image
- Background: atlantis-ruins.png with darkening overlay
- Effect: Timeline with ancient pillar decorations

### Deep Sea Section
- Includes: Atlantis structure background, Jellyfish, Seahorse, Pearl, Bubbles
- Background: atlantis-structure.png with bioluminescent glows
- Effect: Darkening background on scroll

### Treasure Vault
- Includes: Treasure chest image, SVG treasure elements, Pearls, Starfish, Coral
- Background: treasure-chest.png at 25% opacity
- Centerpiece: Interactive 3D chest animation

### Footer
- Includes: Coral, Seaweed, Pearl, Starfish decorations
- Effect: Atmospheric marine elements in background

## Animation Patterns

### Floating/Bobbing
- Duration: 2-4 seconds
- Range: 5-30px vertical movement
- Used for: Bubbles, Jellyfishes, Seahorses

### Pulsing/Breathing
- Duration: 2.5-3.5 seconds
- Opacity range: 0.5-1 or 0.3-0.8
- Used for: Glows, Pearls, Runes, Jellyfish

### Swaying
- Duration: 3 seconds
- X-axis rotation: 2-5deg
- Used for: Seaweed, Fish, Coral

### Swimming
- Duration: 3 seconds
- X-axis translation: 0-10px with loop
- Used for: Fish

### Opening/Rotating
- Duration: 1-2 seconds
- Range: 0-1 transform
- Used for: Treasure Chest

## Usage Examples

### Adding Coral to a Component
```tsx
import { Coral } from './MarineSVGs';

<Coral className="absolute w-20 h-32 opacity-40 bottom-10 left-5" />
```

### Background Image Integration
```tsx
<div
  style={{
    backgroundImage: 'url(/images/ocean-floor.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.3,
  }}
/>
```

### Adding Ocean Patterns
```tsx
import { LightRays, BioluminescentGlow } from './OceanPatterns';

<div className="absolute inset-0 pointer-events-none">
  <LightRays className="absolute w-full h-full opacity-40" />
  <BioluminescentGlow className="absolute w-32 h-32 top-1/4 right-1/4" />
</div>
```

## Performance Considerations

- SVGs are optimized with minimal paths and efficient animations
- Background images use opacity overlays to reduce visual impact
- Animations use `transform` and `opacity` for GPU acceleration
- Framer Motion handles all animations with optimized frame rates
- Pointer-events-none used on decoration layers to prevent interaction blocking

## Accessibility Notes

- All SVG elements are decorative (no alt text needed)
- Background images are visual only, not content-critical
- Text maintains sufficient contrast over backgrounds
- Animations respect prefers-reduced-motion preferences
- Navigation remains fully accessible under all visual effects

## Customization Tips

### Adjusting Opacity
- For subtle effects: 0.2-0.3
- For prominent decorations: 0.4-0.6
- For background layers: 0.15-0.3

### Scaling Elements
- Mobile: 0.7x-0.8x scale
- Desktop: 1x-1.2x scale
- Use Tailwind width/height classes: `w-12 h-12`, `w-16 h-24`, etc.

### Color Variations
- Use Tailwind opacity modifiers: `opacity-20`, `opacity-40`, `opacity-60`
- Combine with bg/text color tokens: `text-accent`, `bg-accent/30`

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- SVG animations via Framer Motion
- CSS gradients and filters
- CSS Grid and Flexbox layouts
- Background-blend-modes for advanced effects

---

**Created for Pratishruti 2026 - Atlas of Atlantis Theme**
