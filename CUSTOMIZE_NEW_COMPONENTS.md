# Customization Guide - New Components

## Quick Customization Reference

### 1. Event Carousel

**File**: `/components/atlantis/EventCarousel.tsx`

#### Add/Edit Events
```tsx
const events = [
  {
    id: 1,
    name: 'Your Event Name',
    venue: 'Venue Location',
    time: '2:00 PM - 5:00 PM',
    category: 'Category Name',
  },
  // Add more events...
];
```

#### Customize Display
- Change `itemsToShow`: Set how many events display (currently 1 mobile, 3 desktop)
- Modify card styling in the `.group` div with `className`
- Edit button text: Find `[Learn More]` button

#### Color Changes
- Card borders: `border-accent/30` → adjust opacity
- Card background: `from-primary/20` → adjust colors
- Button color: `bg-accent/20` → change to any Tailwind color

---

### 2. About Section

**File**: `/components/atlantis/AboutSection.tsx`

#### Edit Content
Three main sections use `<Crown>` icons:
1. "Realm of Poseidon" - Change text in `<h3>` and `<p>` tags
2. "Atlantis Reborn" - Same structure
3. "Cultural Odyssey" - Same structure

#### Customize Info Cards
```tsx
<div className="p-6 rounded-lg border border-accent/30...">
  <h4 className="text-accent text-sm uppercase">📅 When</h4>
  <p className="text-foreground font-semibold">March 1-8, 2026</p>
```

Change:
- Emoji: `📅` → any emoji
- Date: `March 1-8, 2026` → your dates
- Description text below

#### Add More Info Cards
Copy-paste the `<div>` structure and update content

---

### 3. Jellyfish Timeline

**File**: `/components/atlantis/JellyfishTimeline.tsx`

#### Edit Timeline Events
```tsx
const timelineEvents = [
  {
    date: 'March 1-3',
    phase: 'Opening Ceremony',
    description: 'Dive into the mystical world...',
  },
  // Add more events...
];
```

#### Customize Jellyfish
```tsx
<Jellyfish className="w-12 h-16 text-accent drop-shadow-lg" />
```

Change:
- `w-12 h-16` → jellyfish size
- `text-accent` → color (use Tailwind colors)
- `drop-shadow-lg` → shadow intensity

#### Adjust Timeline Line
Look for the background line:
```tsx
<div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-accent/30 to-accent/10" />
```

Change:
- `w-1` → line width
- `from-accent/30` → starting color
- `to-accent/10` → ending color

---

### 4. Sponsors Carousel

**File**: `/components/atlantis/SponsorsCarousel.tsx`

#### Add/Edit Sponsors
```tsx
const sponsors = [
  { id: 1, name: 'Company Name', category: 'Sponsor Type' },
  // Add more sponsors...
];
```

#### Replace Logo Placeholders
Current code shows initials:
```tsx
<span className="text-2xl font-bold text-accent">
  {sponsor.name[0]}  // Shows first letter
</span>
```

To add images:
```tsx
<img 
  src={`/images/sponsors/${sponsor.name.toLowerCase()}.png`}
  alt={sponsor.name}
  className="w-16 h-16 object-contain"
/>
```

#### Customize Items Per View
```tsx
const itemsPerView = typeof window !== 'undefined' && window.innerWidth < 768 ? 2 : 4;
```

Change `2` for mobile count, `4` for desktop count

---

### 5. Animated Treasure Box

**File**: `/components/atlantis/AnimatedTreasureBox.tsx`

#### Edit Box Colors
Main box color (gradient):
```tsx
className="... bg-gradient-to-b from-orange-600 to-amber-700 ..."
```

Change gradient colors:
- `from-orange-600` → start color
- `to-amber-700` → end color

Lid color:
```tsx
className="... bg-gradient-to-b from-amber-500 to-orange-600 ..."
```

#### Customize Gems
```tsx
<motion.div
  className="... w-4 h-4 rounded-full bg-red-400 shadow-lg shadow-red-500/60 ..."
/>
```

Each gem:
- `w-4 h-4` → gem size
- `bg-red-400` → gem color
- `shadow-red-500/60` → shadow color
- Position: `top-1/3 left-1/4` → move gems around

#### Edit Register Content
```tsx
<h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
  Register Now
</h3>
<p className="text-muted-foreground mb-6">
  Secure your place in the legends of Atlantis...
</p>
<button className="px-8 py-4 bg-accent text-deep-ocean...">
  Claim Your Spot
</button>
```

#### Customize Statistics
```tsx
<div className="grid grid-cols-3 gap-4">
  <div className="text-center">
    <p className="text-2xl font-bold text-accent">500</p>
    <p className="text-xs text-muted-foreground uppercase">Spots Left</p>
  </div>
  // Edit numbers and labels...
</div>
```

---

## Global Customizations

### Colors in `globals.css`

```css
:root {
  --accent: oklch(0.7 0.2 190);      /* Cyan glow */
  --gold-accent: oklch(0.65 0.18 45); /* Gold color */
  --deep-ocean: oklch(0.15 0.02 250); /* Dark blue */
}
```

To change theme colors globally, edit these values.

### Custom CSS Classes

New utility classes in `globals.css`:
```css
.atlantis-card { /* For cards */ }
.poseidon-glow { /* For cyan glow */ }
.treasure-glow { /* For gold glow */ }
.bioluminescent { /* For background glow */ }
```

Use in components:
```tsx
<div className="atlantis-card">Content</div>
```

---

## Animation Customization

### Scroll-Driven Animations

**Jellyfish Timeline**:
```tsx
const jellyfishProgress = useTransform(scrollYProgress, [0, 1], [0, 100]);
```

Change `[0, 100]` to adjust speed (larger numbers = faster)

**Treasure Box**:
```tsx
const lidRotation = useTransform(scrollYProgress, [0.3, 0.7], [0, -75]);
```

- `[0.3, 0.7]` = scroll range (start and end)
- `[0, -75]` = rotation range in degrees

### Transition Speeds

All motion animations use:
```tsx
transition={{ duration: 0.6 }}
```

Change `0.6` (seconds) to make faster (0.3) or slower (1.2)

---

## Responsive Adjustments

### Breakpoint Sizes

Tailwind breakpoints used:
- `md:` = 768px (tablet)
- `lg:` = 1024px (desktop)

Example:
```tsx
className="text-sm md:text-lg lg:text-xl"
```

### Mobile-First

All components start mobile and enhance upward:
1. Base styles (mobile)
2. Add `md:` for tablet changes
3. Add `lg:` for desktop changes

---

## Connecting to Backend

### Event Carousel
Replace hardcoded events with API:
```tsx
const [events, setEvents] = useState([]);

useEffect(() => {
  fetch('/api/events')
    .then(r => r.json())
    .then(data => setEvents(data));
}, []);
```

### Sponsors
```tsx
const [sponsors, setSponsors] = useState([]);

useEffect(() => {
  fetch('/api/sponsors')
    .then(r => r.json())
    .then(data => setSponsors(data));
}, []);
```

### Registration CTA
Add onclick to treasure box button:
```tsx
<button 
  onClick={() => window.location.href = '/register'}
  className="..."
>
  Claim Your Spot
</button>
```

---

## Tips & Tricks

### Change Font Sizes
Most headings use Tailwind classes:
- `text-5xl md:text-6xl` → size on mobile and tablet
- Change to `text-4xl md:text-5xl` for smaller text

### Adjust Spacing
Use Tailwind spacing:
- `py-20 md:py-32` = padding vertical
- `gap-6` = gap between items
- `mb-4` = margin bottom

### Shadow Effects
- `shadow-lg` = large shadow
- `shadow-accent/50` = colored shadow
- Remove for flat design

### Opacity
- `opacity-30` = 30% visible
- `opacity-60` = 60% visible
- Increase for more prominent elements

---

## Common Changes Checklist

- [ ] Update event names and times
- [ ] Change sponsor names and logos
- [ ] Edit about section text
- [ ] Customize treasure box colors
- [ ] Update register button link
- [ ] Change theme colors in globals.css
- [ ] Update footer contact info
- [ ] Add sponsor images
- [ ] Connect to event API
- [ ] Test on mobile devices

---

## Need Help?

Check these files for examples:
- `/components/atlantis/Hero.tsx` - Scroll animations
- `/components/atlantis/Footer.tsx` - Layout patterns
- `/components/atlantis/MarineSVGs.tsx` - SVG customization
- `/app/globals.css` - Color and typography system

All components use standard React/Framer Motion patterns and are fully commented!
