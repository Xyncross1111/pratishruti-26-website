'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram, Twitter, Linkedin } from 'lucide-react';
import { Coral, Seaweed, Pearl, Starfish } from './MarineSVGs';

export default function Footer() {
  return (
    <footer className="relative bg-deep-ocean/80 backdrop-blur-sm border-t border-accent/30 py-16 px-4 overflow-hidden">
      {/* Decorative marine elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Coral className="absolute w-16 h-24 opacity-20 top-10 left-5" />
        <Coral className="absolute w-12 h-20 opacity-15 bottom-16 right-8" />
        <Seaweed className="absolute w-6 h-20 opacity-20 top-1/2 right-1/4" />
        <Pearl className="absolute w-8 h-8 opacity-20 top-1/4 left-1/3" />
        <Starfish className="absolute w-10 h-10 opacity-15 bottom-1/3 right-1/3" />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12"
        >
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="text-2xl font-bold text-accent">Ⱦ</div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Pratishruti</h3>
                <p className="text-xs text-muted-foreground">Atlas of Atlantis</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Celebrating culture, creativity, and innovation through the legendary lens of Atlantis.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#events" className="hover:text-accent transition-colors">
                  Events
                </a>
              </li>
              <li>
                <a href="#timeline" className="hover:text-accent transition-colors">
                  Timeline
                </a>
              </li>
              <li>
                <a href="#register" className="hover:text-accent transition-colors">
                  Register
                </a>
              </li>
              <li>
                <a href="#sponsors" className="hover:text-accent transition-colors">
                  Sponsors
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wide">
              Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors">
                <Mail size={16} />
                <a href="mailto:info@pratishruti.com">info@pratishruti.com</a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors">
                <Phone size={16} />
                <a href="tel:+919876543210">+91 9876543210</a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <MapPin size={16} />
                <span>RCOEM, Nagpur</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wide">
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
        <div className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent my-8" />

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="text-sm text-muted-foreground">
            © 2026 Pratishruti. All rights reserved. Atlas of Atlantis.
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-accent transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              Code of Conduct
            </a>
          </div>
        </motion.div>

        {/* Atlantis rune footer decoration */}
        <motion.div
          className="mt-8 text-center text-accent/20 text-3xl tracking-widest"
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          Ⱦ Ⱦ Ⱦ
        </motion.div>
      </div>
    </footer>
  );
}
