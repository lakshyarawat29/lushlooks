'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  // Handle hash navigation when component mounts or pathname changes
  useEffect(() => {
    const handleHashNavigation = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && pathname === '/') {
        // Wait a bit for the page to render, then scroll to the section
        setTimeout(() => {
          scrollToElement(hash);
        }, 100);
      }
    };

    // Handle initial load
    handleHashNavigation();

    // Handle browser back/forward navigation
    window.addEventListener('hashchange', handleHashNavigation);

    return () => {
      window.removeEventListener('hashchange', handleHashNavigation);
    };
  }, [pathname]);

  const scrollToSection = (sectionId: string) => {
    // Close mobile menu when navigating
    setIsMobileMenuOpen(false);

    if (pathname !== '/') {
      // If not on home page, navigate to home page with hash
      router.push(`/#${sectionId}`);
    } else {
      // If on home page, scroll directly
      scrollToElement(sectionId);
    }
  };

  const scrollToElement = (sectionId: string) => {
    // Function to recursively try to find and scroll to element
    const attemptScroll = (attempts = 0) => {
      const element = document.getElementById(sectionId);
      if (element) {
        // Get the element's position and account for the fixed header
        const elementPosition =
          element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - 80; // 80px offset for header and some spacing

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      } else if (attempts < 10) {
        // Retry up to 10 times with increasing delays
        setTimeout(() => attemptScroll(attempts + 1), 100 * (attempts + 1));
      } else {
        console.warn(`Element with id "${sectionId}" not found`);
      }
    };

    attemptScroll();
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

  const handleNavigation = (url: string) => {
    setIsMobileMenuOpen(false);
    if (url.startsWith('/')) {
      router.push(url);
    } else {
      window.location.href = url;
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
        className="fixed bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-12 left-1/2 transform -translate-x-1/2 z-50"
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        {/* Desktop Navigation */}
        <div className="hidden sm:block bg-white/95 backdrop-blur-md rounded-full px-4 sm:px-6 md:px-6 md:py-4 shadow-xl border border-white/30">
          <div className="flex items-center gap-4 md:gap-6 lg:gap-8">
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
              onClick={() => handleNavigation('/artists')}
              className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Artists
            </motion.button>

            <motion.button
              onClick={() => handleNavigation('/my-bookings')}
              className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              My Bookings
            </motion.button>

            {/* CTA Button */}
            <motion.button
              className="bg-neutral-900 text-white px-4 py-2 md:px-5 md:py-2.5 rounded-full text-sm font-medium hover:bg-neutral-800 transition-colors"
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

        {/* Mobile Hamburger Menu */}
        <div className="sm:hidden">
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="bg-white/95 backdrop-blur-md rounded-full p-4 shadow-xl border border-white/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} className="text-neutral-700" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} className="text-neutral-700" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Mobile Menu Overlay */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <>
                {/* Backdrop */}
                <motion.div
                  className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                />

                {/* Menu Panel */}
                <motion.div
                  className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-80 max-w-[calc(100vw-2rem)] bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/30 p-6 z-50"
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.9 }}
                  transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
                >
                  <div className="space-y-4">
                    {/* Navigation Items */}
                    <motion.button
                      onClick={() => scrollToSection('hero')}
                      className="w-full text-left px-4 py-3 rounded-xl text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 transition-colors font-medium"
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Home
                    </motion.button>

                    <motion.button
                      onClick={() => scrollToSection('categories')}
                      className="w-full text-left px-4 py-3 rounded-xl text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 transition-colors font-medium"
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Categories
                    </motion.button>

                    <motion.button
                      onClick={() => handleNavigation('/artists')}
                      className="w-full text-left px-4 py-3 rounded-xl text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 transition-colors font-medium"
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Artists
                    </motion.button>

                    <motion.button
                      onClick={() => handleNavigation('/my-bookings')}
                      className="w-full text-left px-4 py-3 rounded-xl text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 transition-colors font-medium"
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      My Bookings
                    </motion.button>

                    {/* Divider */}
                    <div className="border-t border-neutral-200 my-4" />

                    {/* CTA Button */}
                    <motion.button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        console.log('Book Now clicked');
                      }}
                      className="w-full bg-neutral-900 text-white px-4 py-3 rounded-xl font-medium hover:bg-neutral-800 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Book Now
                    </motion.button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </>
  );
}
