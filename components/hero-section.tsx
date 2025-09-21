'use client';

import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { PackageCheck, Rocket, ShieldCheck } from 'lucide-react'; // Added PackageCheck, Rocket, and ShieldCheck icon imports
import { Reveal } from './reveal';
import { BlurPanel } from './blur-panel';

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.05, 0.95]); // Reduced hero image shrink from 15% to 5%
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Slideshow state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const heroImages = [
    '/hero/1.jpg',
    '/hero/2.jpg',
    '/hero/3.jpg',
    '/hero/4.jpg',
    '/hero/5.jpg',
    '/hero/bridal-hero.jpg',
    '/hero/glam-hero.jpg',
    '/hero/makeup-artist-hero.jpg',
    '/hero/makeup-hero-bg.jpg',
  ];

  // Auto-advance slideshow every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const AnimatedText = ({
    text,
    delay = 0,
  }: {
    text: string;
    delay?: number;
  }) => {
    return (
      <span>
        {text.split('').map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: delay + index * 0.03,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </span>
    );
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative h-screen overflow-hidden"
    >
      {/* Background Slideshow with Cinematic Effects */}
      <motion.div
        className="absolute inset-0"
        style={{ scale: imageScale, y: imageY }}
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <Image
              src={heroImages[currentImageIndex]}
              alt={`LushLooks Studio - Hero image ${currentImageIndex + 1}`}
              fill
              className="object-cover"
              priority={currentImageIndex === 0}
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/20" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 h-full flex items-center justify-center"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="container-custom text-center text-white px-4">
          <Reveal>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight tracking-tight mb-4 sm:mb-6">
              <AnimatedText text="Professional makeup" delay={0.5} />
              <br />
              <span className="italic font-light">
                <AnimatedText text="for every occasion." delay={1.1} />
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <motion.p
              className="text-base sm:text-lg md:text-xl text-white/90 mb-8 sm:mb-12 leading-relaxed max-w-4xl mx-auto px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.7,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
            >
              Expert artistry, premium products — enhancing your natural beauty
              for every special moment.
            </motion.p>
          </Reveal>
        </div>
      </motion.div>

      {/* Slideshow Indicators */}
      <motion.div
        className="absolute bottom-16 sm:bottom-20 md:bottom-24 left-1/2 transform -translate-x-1/2 z-20 flex gap-1 sm:gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 1.2,
          ease: [0.21, 0.47, 0.32, 0.98],
        }}
      >
        {heroImages.map((_, index) => (
          <button
            key={index}
            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
              index === currentImageIndex
                ? 'bg-white scale-125'
                : 'bg-white/40 hover:bg-white/60'
            }`}
            onClick={() => setCurrentImageIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </motion.div>
    </section>
  );
}
