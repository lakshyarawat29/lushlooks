'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Reveal } from './reveal';

const categories = [
  // Bridal Makeup Category
  {
    id: 'traditional-bridal',
    name: 'TRADITIONAL BRIDAL',
    image: '/categories/traditonal-bridal.jpg',
    category: 'Bridal',
  },
  {
    id: 'contemporary-bridal',
    name: 'CONTEMPORARY BRIDAL',
    image: '/categories/contemporary-bridal-makeup.jpg',
    category: 'Bridal',
  },
  {
    id: 'destination-wedding',
    name: 'DESTINATION WEDDING LOOKS',
    image: '/categories/destination-wedding-look.jpg',
    category: 'Bridal',
  },
  // Party & Glam Makeup Category
  {
    id: 'cocktail-party',
    name: 'COCKTAIL PARTY',
    image: '/categories/cocktail-party-makeup.jpg',
    category: 'Party & Glam',
  },
  {
    id: 'red-carpet-glam',
    name: 'RED CARPET GLAM',
    image: '/categories/red-carpet-glam.jpg',
    category: 'Party & Glam',
  },
  {
    id: 'evening-party',
    name: 'EVENING PARTY LOOKS',
    image: '/categories/evening-party-looks.jpg',
    category: 'Party & Glam',
  },
  // Casual/Everyday Makeup Category
  {
    id: 'office-look',
    name: 'OFFICE LOOK',
    image: '/categories/office-makeup-looks.jpg',
    category: 'Casual/Everyday',
  },
  {
    id: 'minimal-natural',
    name: 'MINIMAL/NATURAL',
    image: '/categories/minimal-natural-looks.jpg',
    category: 'Casual/Everyday',
  },
  {
    id: 'day-out-brunch',
    name: 'DAY OUT/BRUNCH',
    image: '/categories/dayout-brunch-looks.jpg',
    category: 'Casual/Everyday',
  },
  // Fashion & Editorial Makeup Category
  {
    id: 'runway',
    name: 'RUNWAY',
    image: '/categories/runway makeup.jpg',
    category: 'Fashion & Editorial',
  },
  {
    id: 'photoshoot-makeup',
    name: 'PHOTOSHOOT MAKEUP',
    image: '/categories/photoshoot-makeup.jpg',
    category: 'Fashion & Editorial',
  },
  {
    id: 'creative-high-fashion',
    name: 'CREATIVE/HIGH FASHION',
    image: '/categories/creative-makeup.jpg',
    category: 'Fashion & Editorial',
  },
  // Festive/Cultural Makeup Category
  {
    id: 'diwali-eid-christmas',
    name: 'DIWALI/EID/CHRISTMAS LOOKS',
    image: '/categories/eid-makeup .jpg',
    category: 'Festive/Cultural',
  },
  {
    id: 'navratri-garba',
    name: 'NAVRATRI/GARBA',
    image: '/categories/navratri-looks.jpeg',
    category: 'Festive/Cultural',
  },
  {
    id: 'regional-styles',
    name: 'REGIONAL STYLES',
    image: '/categories/regional-style.jpeg',
    category: 'Festive/Cultural',
  },
  // Specialty Makeup Category
  {
    id: 'hd-camera-ready',
    name: 'HD/CAMERA READY',
    image: '/categories/hd-camera-makeup.jpeg',
    category: 'Specialty',
  },
  {
    id: 'airbrush-makeup',
    name: 'AIRBRUSH MAKEUP',
    image: '/categories/airbrush-makeup.jpeg',
    category: 'Specialty',
  },
  {
    id: 'theatrical-stage',
    name: 'THEATRICAL/STAGE',
    image: '/categories/theatrical-makeup.jpeg',
    category: 'Specialty',
  },
];

export function CollectionStrip() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const itemWidth = 400; // 400px (w-96) + 32px gap = 432px per item
  const totalWidth = categories.length * (itemWidth + 32) - 32; // subtract last gap
  const containerWidth =
    typeof window !== 'undefined' ? window.innerWidth : 1200;
  const maxDrag = Math.max(0, totalWidth - containerWidth + 48); // add padding

  return (
    <section ref={containerRef} className="py-20 lg:py-32 overflow-hidden">
      <div className="mb-12">
        <Reveal>
          <div className="container-custom text-center">
            <h2 className="text-neutral-900 mb-4 text-6xl font-normal">
              Categories
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Explore our extensive range of makeup looks, from bridal to
              everyday, each crafted to enhance your natural beauty for every
              occasion.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="relative">
        <motion.div
          className="flex gap-8 px-6"
          style={{ x }}
          drag="x"
          dragConstraints={{ left: -maxDrag, right: 0 }}
          dragElastic={0.1}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              className="flex-shrink-0 w-96 group cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4">
                <motion.div
                  className="relative w-full h-full"
                  whileHover={{ filter: 'blur(1px)' }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={category.image || '/placeholder.svg'}
                    alt={category.name}
                    fill
                    className="object-cover"
                    sizes="400px"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300" />
                </motion.div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="text-center text-white px-6"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-2xl lg:text-3xl font-bold tracking-wider mb-3 leading-tight">
                      {category.name}
                    </h3>
                    <p className="text-sm opacity-80 font-medium">
                      {category.category}
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="text-center mt-8">
        <p className="text-sm text-neutral-500">
          ← Drag to explore categories →
        </p>
      </div>
    </section>
  );
}
