'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogoClick = () => {
    if (pathname === '/') {
      // If on home page, scroll to hero section
      scrollToSection('hero');
    } else {
      // If on other pages, navigate to home page
      router.push('/');
    }
  };

  return (
    <>
      {/* Main Header */}
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          'backdrop-blur-md border-b border-white/[0.02]',
          isScrolled ? 'bg-white/[0.02]' : 'bg-white/[0.02]'
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <div className="container-custom">
          <div className="flex items-center justify-center h-12 lg:h-16 relative">
            {/* Logo */}
            <motion.div
              className="flex-shrink-0"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <button
                onClick={handleLogoClick}
                className={cn(
                  'text-xl lg:text-2xl font-bold tracking-tight transition-colors',
                  isScrolled
                    ? 'text-neutral-900 hover:text-neutral-700'
                    : 'text-white hover:text-white/80'
                )}
                aria-label="LushLooks Home"
              >
                LUSHLOOKS
              </button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Bottom Floating Navigation */}
      <motion.nav
        className="fixed bottom-12 left-1/2 transform -translate-x-1/2 z-50"
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <div className="bg-white/95 backdrop-blur-md rounded-full px-6 py-4 shadow-xl border border-white/30">
          <div className="flex items-center gap-8">
            {/* Navigation Items */}
            <motion.button
              onClick={() => scrollToSection('hero')}
              className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Home
            </motion.button>

            <motion.button
              onClick={() => scrollToSection('categories')}
              className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Categories
            </motion.button>

            <motion.button
              onClick={() => {
                // Navigate to artists page
                window.location.href = '/artists';
              }}
              className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Artists
            </motion.button>

            <motion.button
              onClick={() => {
                // Navigate to my bookings page
                window.location.href = '/my-bookings';
              }}
              className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              My Bookings
            </motion.button>

            {/* CTA Button */}
            <motion.button
              className="bg-neutral-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-neutral-800 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                // Add your booking logic here
                console.log('Book Now clicked');
              }}
            >
              Book Now
            </motion.button>
          </div>
        </div>
      </motion.nav>
    </>
  );
}
