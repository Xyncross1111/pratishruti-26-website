"use client";

import { motion } from "framer-motion";

export default function DeepSeaFooter() {
  return (
    <footer className="relative w-full h-[500px] overflow-hidden bg-[#020617] text-white">

      {/* Background particles */}
      <div className="absolute inset-0 bg-[url('/footer/footerbg.png')] bg-cover bg-center opacity-90" />

      {/* Jellyfish */}
      <motion.img
        src="/footer/jellyfish.png"
        className="absolute left-10 top-10 w-40 pointer-events-none"
        animate={{ y: [0, -40, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Angler Fish */}
      <motion.img
        src="/footer/angler.png"
        className="absolute right-16 top-20 w-44 pointer-events-none"
        animate={{ y: [2, 15, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />



{/* Left Plants */}
      <motion.img
        src="/footer/plant-left.png"
        className="absolute bottom-16 left-4 w-72 pointer-events-none"
        animate={{ rotate: [0, 2, -8, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Left Plants */}
      <motion.img
        src="/footer/plant-left.png"
        className="absolute bottom-0 left-0 w-72 pointer-events-none"
        animate={{ rotate: [0, 4, -8, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />


      {/* Left Plants */}
      <motion.img
        src="/footer/plant-left.png"
        className="absolute bottom-0 left-0 w-72 pointer-events-none"
        animate={{ rotate: [0, 4, -4, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

{/* Angler Fish */}
      <motion.img
        src="/footer/angler.png"
        className="absolute left-80 bottom-20 w-44 pointer-events-none"
        animate={{ y: [1, 19, 4] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />



      {/* Jellyfish */}
      <motion.img
        src="/footer/bio.png"
        className="absolute left-180 top-40 w-32 pointer-events-none"
        animate={{ y: [0, -40, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />


{/* Right Plants */}
      <motion.img
        src="/footer/plant-right.png"
        className="absolute bottom-12 right-0 w-72 pointer-events-none"
        animate={{ rotate: [9, -8, 2, 8] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />


      {/* Right Plants */}
      <motion.img
        src="/footer/plant-right.png"
        className="absolute bottom-0 right-0 w-72 pointer-events-none"
        animate={{ rotate: [9, -8, 2, 8] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Footer Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-40 grid md:grid-cols-3 gap-10">
        <div>
          <h2 className="text-2xl font-semibold text-cyan-300">Pratishruti</h2>
          <p className="text-gray-300 mt-3">
            Celebrating culture, creativity, and innovation through the
            legendary lens of Atlantis.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li>Events</li>
            <li>Timeline</li>
            <li>Register</li>
            <li>Sponsors</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-3">Contact</h3>
          <p className="text-gray-300">info@pratishruti.com</p>
        </div>
      </div>
    </footer>
  );
}
