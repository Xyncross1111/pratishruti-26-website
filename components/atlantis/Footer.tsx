"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Instagram, Twitter, Linkedin } from "lucide-react";

export default function DeepSeaFooter() {
  return (
    <footer className="relative py-10 sm:py-12 px-4 overflow-hidden border-t border-accent/20 backdrop-blur-sm footer-bg-texture">
      <div className="absolute inset-0 bg-deep-ocean/75 pointer-events-none" />

      {/* Animated marine elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.img
          src="/footer/jellyfish.png"
          className="absolute left-2 sm:left-6 top-8 w-24 sm:w-28 md:w-36 opacity-70"
          animate={{ y: [0, -18, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.img
          src="/footer/angler.png"
          className="absolute right-2 sm:right-8 top-10 w-28 sm:w-32 md:w-40 opacity-70"
          animate={{ y: [0, 10, 0], x: [0, -8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.img
          src="/footer/angler.png"
          className="absolute left-[22%] bottom-16 w-16 sm:w-20 md:w-24 opacity-60 hidden sm:block"
          animate={{ y: [0, 8, 0], x: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.img
          src="/footer/bio.png"
          className="absolute left-1/3 top-6 w-16 sm:w-20 md:w-24 opacity-60 hidden sm:block"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.img
          src="/footer/bio.png"
          className="absolute right-[28%] top-14 w-14 sm:w-20 md:w-20 opacity-55 hidden md:block"
          animate={{ y: [0, -10, 0], x: [0, -6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.img
          src="/footer/orange.png"
          className="absolute bottom-20 left-[-18vw] w-16 sm:w-20 md:w-24 opacity-75"
          animate={{ x: ["0vw", "130vw"], y: [0, -6, 3, 0], rotate: [0, 2, -2, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />

        <motion.img
          src="/footer/orange.png"
          className="absolute bottom-28 right-[-20vw] w-14 sm:w-20 md:w-20 opacity-70 hidden sm:block"
          animate={{ x: ["0vw", "-130vw"], y: [0, 5, -4, 0], rotate: [0, -2, 2, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 2 }}
        />

        <motion.img
          src="/footer/plant-left.png"
          className="absolute bottom-0 left-0 w-24 sm:w-36 md:w-52 opacity-65"
          animate={{ rotate: [0, 3, -2, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.img
          src="/footer/plant-left.png"
          className="absolute bottom-0 left-10 sm:left-20 w-16 sm:w-24 md:w-32 opacity-45"
          animate={{ rotate: [0, 2, -2, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.img
          src="/footer/plant-right.png"
          className="absolute bottom-0 right-0 w-24 sm:w-36 md:w-52 opacity-65"
          animate={{ rotate: [2, -3, 2] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.img
          src="/footer/plant-right.png"
          className="absolute bottom-0 right-8 sm:right-16 w-16 sm:w-24 md:w-32 opacity-45"
          animate={{ rotate: [1, -2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-7 sm:gap-8 mb-8"
        >
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="text-2xl font-bold text-accent">Ⱦ</div>
              <div>
                <h3 className="text-lg font-bold text-foreground">
                  Pratishruti
                </h3>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Celebrating culture, creativity, and innovation through the
              legendary lens of Atlantis.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-5 sm:gap-8">
            {/* Quick Links */}
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-foreground mb-3 sm:mb-4 uppercase tracking-wide">
                Quick Links
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                <li>
                  <a
                    href="#events"
                    className="hover:text-accent transition-colors"
                  >
                    Events
                  </a>
                </li>
                <li>
                  <a
                    href="#timeline"
                    className="hover:text-accent transition-colors"
                  >
                    Timeline
                  </a>
                </li>
                <li>
                  <a
                    href="#sponsors"
                    className="hover:text-accent transition-colors"
                  >
                    Sponsors
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-foreground mb-3 sm:mb-4 uppercase tracking-wide">
                Contact
              </h4>
              <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                <li className="flex items-start gap-2 text-muted-foreground hover:text-accent transition-colors">
                  <Mail size={16} className="shrink-0 mt-0.5" />
                  <a href="mailto:info@pratishruti.com" className="break-all">info@pratishruti.com</a>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground hover:text-accent transition-colors">
                  <Phone size={16} className="shrink-0 mt-0.5" />
                  <a href="tel:+919876543210">+91 9876543210</a>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <MapPin size={16} className="shrink-0 mt-0.5" />
                  <span>RCOEM, Nagpur</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-foreground mb-3 sm:mb-4 uppercase tracking-wide">
              Follow Us
            </h4>
            <div className="flex gap-3">
              <motion.a
                href="#"
                className="p-2 rounded-lg bg-accent/10 border border-accent/30 text-accent hover:bg-accent/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Instagram size={18} />
              </motion.a>
              <motion.a
                href="#"
                className="p-2 rounded-lg bg-accent/10 border border-accent/30 text-accent hover:bg-accent/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Twitter size={18} />
              </motion.a>
              <motion.a
                href="#"
                className="p-2 rounded-lg bg-accent/10 border border-accent/30 text-accent hover:bg-accent/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin size={18} />
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-linear-to-r from-transparent via-accent/30 to-transparent my-5" />

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex items-center justify-center px-2 text-center"
        >
          <div className="text-xs sm:text-sm text-muted-foreground">
            © 2026 Pratishruti. All rights reserved.
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
