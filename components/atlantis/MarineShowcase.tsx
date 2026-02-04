'use client';

import { motion } from 'framer-motion';
import {
  Coral,
  Starfish,
  Bubble,
  Fish,
  Jellyfish,
  Seaweed,
  TreasureChest,
  Pearl,
  Seahorse,
} from './MarineSVGs';
import {
  LightRays,
  WaterCaustics,
  FloatingParticles,
  BioluminescentGlow,
  AncientRunes,
} from './OceanPatterns';
import { WaveSeparator, DecorationDivider, GlowingDots, CoralFlourish, RunePattern } from './Separators';

export default function MarineShowcase() {
  const marineElements = [
    { name: 'Coral', component: <Coral className="w-16 h-24" /> },
    { name: 'Starfish', component: <Starfish className="w-16 h-16" /> },
    { name: 'Fish', component: <Fish className="w-16 h-10" /> },
    { name: 'Jellyfish', component: <Jellyfish className="w-12 h-20" /> },
    { name: 'Seaweed', component: <Seaweed className="w-8 h-24" /> },
    { name: 'Seahorse', component: <Seahorse className="w-8 h-16" /> },
    { name: 'Pearl', component: <Pearl className="w-10 h-10" /> },
    { name: 'Treasure Chest', component: <TreasureChest className="w-20 h-16" /> },
  ];

  const backgroundPatterns = [
    { name: 'Light Rays', component: <LightRays className="w-32 h-48" /> },
    { name: 'Water Caustics', component: <WaterCaustics className="w-32 h-32" /> },
    { name: 'Bioluminescent Glow', component: <BioluminescentGlow className="w-32 h-32" /> },
    { name: 'Ancient Runes', component: <AncientRunes className="w-48 h-16" /> },
  ];

  const separators = [
    { name: 'Wave Separator', component: <WaveSeparator className="w-full h-16" /> },
    { name: 'Decoration Divider', component: <DecorationDivider className="w-32 h-10" /> },
    { name: 'Glowing Dots', component: <GlowingDots className="w-24 h-6" /> },
    { name: 'Coral Flourish', component: <CoralFlourish className="w-24 h-20" /> },
  ];

  return (
    <section className="relative min-h-screen bg-deep-ocean py-20 px-4 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingParticles count={15} className="absolute w-full h-full opacity-40" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">Marine Elements Showcase</h1>
          <p className="text-muted-foreground text-lg">
            Explore the oceanic and bioluminescent visual system
          </p>
        </motion.div>

        {/* Marine Creatures Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-bold text-foreground">Marine Creatures</h2>
            <RunePattern className="w-16 h-8" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {marineElements.map((element, index) => (
              <motion.div
                key={element.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="flex flex-col items-center gap-4 p-6 bg-primary/10 border border-accent/30 rounded-lg hover:border-accent/60 transition-colors"
              >
                <div className="flex items-center justify-center h-32 w-full text-accent">
                  {element.component}
                </div>
                <p className="text-sm text-muted-foreground font-semibold">{element.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Separator */}
        <WaveSeparator className="w-full h-20 my-12" />

        {/* Background Patterns Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-bold text-foreground">Ocean Patterns</h2>
            <RunePattern className="w-16 h-8" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {backgroundPatterns.map((pattern, index) => (
              <motion.div
                key={pattern.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="flex flex-col items-center gap-4 p-8 bg-primary/10 border border-accent/30 rounded-lg hover:border-accent/60 transition-colors"
              >
                <div className="flex items-center justify-center h-40 w-full text-accent">
                  {pattern.component}
                </div>
                <p className="text-sm text-muted-foreground font-semibold">{pattern.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Separator */}
        <WaveSeparator className="w-full h-20 my-12" />

        {/* Decorative Elements Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-bold text-foreground">Separators & Dividers</h2>
            <RunePattern className="w-16 h-8" />
          </div>

          <div className="space-y-8">
            {separators.map((separator, index) => (
              <motion.div
                key={separator.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="p-8 bg-primary/10 border border-accent/30 rounded-lg hover:border-accent/60 transition-colors"
              >
                <p className="text-sm text-muted-foreground font-semibold mb-4">{separator.name}</p>
                <div className="flex items-center justify-center text-accent">
                  {separator.component}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 pt-12 border-t border-accent/30"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-accent mb-2">9+</h3>
              <p className="text-muted-foreground">Marine SVG Components</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-accent mb-2">6+</h3>
              <p className="text-muted-foreground">Ocean Pattern Effects</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-accent mb-2">4+</h3>
              <p className="text-muted-foreground">PNG Background Images</p>
            </div>
          </div>

          <p className="text-center text-muted-foreground mt-8 max-w-2xl mx-auto">
            All elements are fully animated and integrated throughout the Pratishruti 2026 website. Each component is optimized
            for performance and accessibility, creating an immersive underwater experience as you scroll through the Atlas of
            Atlantis.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
