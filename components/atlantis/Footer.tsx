"use client";

import { motion } from "framer-motion";

export default function DeepSeaFooter() {
  return (
    <footer className="relative w-full min-h-[520px] overflow-hidden bg-[#020617] text-white">

      {/* Background */}
      <div className="absolute inset-0 bg-[url('/footer/footerbg.png')] bg-cover bg-center opacity-90" />

      {/* Jellyfish */}
      <motion.img
        src="/footer/jellyfish.png"
        className="absolute left-6 top-8 w-28 sm:w-36 md:w-40 pointer-events-none"
        animate={{ y: [0, -40, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Angler Fish Top */}
      <motion.img
        src="/footer/angler.png"
        className="absolute right-6 top-16 w-32 sm:w-40 md:w-44 pointer-events-none"
        animate={{ y: [2, 15, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* LEFT PLANTS */}
      <motion.img
        src="/footer/plant-left.png"
        className="absolute bottom-16 left-2 w-44 sm:w-60 md:w-72 pointer-events-none"
        animate={{
          rotate: [0, 6, -12, 4, 0],
          x: [0, 4, -6, 2, 0],
          y: [0, -3, 2, -2, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.img
        src="/footer/plant-left.png"
        className="absolute bottom-0 left-10 w-44 sm:w-60 md:w-72 pointer-events-none"
        animate={{
          rotate: [0, 6, -12, 4, 0],
          x: [0, 4, -6, 2, 0],
          y: [0, -3, 2, -2, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.img
        src="/footer/plant-left.png"
        className="absolute bottom-0 left-0 w-40 sm:w-52 md:w-72 pointer-events-none"
        animate={{ rotate: [0, 4, -4, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Bottom Angler */}
      <motion.img
        src="/footer/angler.png"
        className="absolute left-1/2 -translate-x-1/2 md:left-80 md:translate-x-0 bottom-16 w-32 sm:w-40 md:w-44 pointer-events-none"
        animate={{ y: [1, 19, 4] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Small Jellyfish */}
      <motion.img
        src="/footer/bio.png"
        className="absolute right-40 lg:left-160 top-48 -translate-x-1/2 md:left-[180px] md:translate-x-0 w-24 sm:w-28 md:w-32 pointer-events-none"
        animate={{ y: [0, -40, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* RIGHT PLANTS */}
      <motion.img
        src="/footer/plant-right.png"
        className="absolute bottom-12 right-0 w-44 sm:w-60 md:w-72 pointer-events-none"
        animate={{ rotate: [9, -8, 2, 8] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.img
        src="/footer/plant-right.png"
        className="absolute bottom-0 right-0 w-40 sm:w-52 md:w-72 pointer-events-none"
        animate={{ rotate: [9, -8, 2, 8] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* CONTENT */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-16
                      grid gap-10
                      text-center md:text-left
                      md:grid-cols-3">

        {/* Brand */}
        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-semibold text-cyan-300">
            Pratishruti
          </h2>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-sm mx-auto md:mx-0">
            Celebrating culture, creativity, and innovation through the
            legendary lens of Atlantis.
          </p>
        </div>

        {/* Links */}
        <div className="space-y-3">
          <h3 className="font-semibold text-white">Quick Links</h3>
          <ul className="space-y-2 text-gray-300 text-sm sm:text-base">
            <li>Events</li>
            <li>Timeline</li>
            <li>Register</li>
            <li>Sponsors</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-3">
          <h3 className="font-semibold text-white">Contact</h3>
          <p className="text-gray-300 text-sm sm:text-base">
            info@pratishruti.com
          </p>
        </div>
      </div>
    </footer>
  );
}
