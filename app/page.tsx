'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const logoScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const logoOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  return (
    <main ref={containerRef} className="min-h-screen bg-[#020817]">
      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center relative">
        <motion.div 
          style={{ scale: logoScale, opacity: logoOpacity }}
          className="text-center"
        >
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
            NEAL B
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mt-4">
            GENERATIVE DESIGN & DEVELOPMENT
          </p>
        </motion.div>
      </section>

      {/* Portfolio Grid */}
      <section className="px-4 py-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: item * 0.1 }}
              className="relative aspect-square bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-lg overflow-hidden group"
            >
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white text-xl font-bold">Project {item}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Let's Create Something Amazing
          </h2>
          <a
            href="#contact"
            className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-bold hover:from-purple-700 hover:to-pink-700 transition-colors"
          >
            Get in Touch
          </a>
        </motion.div>
      </section>
    </main>
  );
}
