'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CheckCircle, Calendar, Clock, User, ArrowRight } from 'lucide-react';

export default function BookingConfirmationPage() {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Testimonial images for background slideshow
  const testimonialImages = [
    '/testimonials/1.jpeg',
    '/testimonials/2.jpeg',
    '/testimonials/3.jpeg',
    '/testimonials/4.jpg',
  ];

  // Auto-advance slideshow
  useEffect(() => {
    console.log('Slideshow started with images:', testimonialImages);
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % testimonialImages.length
      );
    }, 3500); // Change image every 3.5 seconds for smoother flow
    return () => clearInterval(interval);
  }, [testimonialImages.length]);

  const handleBackToArtists = () => {
    router.push('/artists');
  };

  return (
    <div className="min-h-screen relative overflow-hidden pb-20">
      {/* Background Slideshow */}
      <div className="fixed inset-0 z-0">
        {/* Preload all images to prevent white flash */}
        {testimonialImages.map((image, index) => (
          <Image
            key={`preload-${index}`}
            src={image}
            alt=""
            fill
            className={`absolute inset-0 object-cover transition-opacity duration-700 ease-in-out ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            priority={index === 0}
            sizes="100vw"
          />
        ))}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      </div>

      {/* Confirmation Section */}
      <section className="pt-32 pb-12 relative z-10">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <div className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <CheckCircle size={40} className="text-green-600" />
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                Booking <span className="italic font-light">Confirmed!</span>
              </h1>

              <p className="text-lg text-white/90 mb-8 drop-shadow-md">
                Thank you for booking with LushLooks! We've received your
                booking request and will contact you shortly to confirm the
                details.
              </p>
            </motion.div>

            {/* Booking Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/30 mb-6"
            >
              <h3 className="text-xl font-bold text-neutral-900 mb-6">
                Booking Summary
              </h3>

              <div className="space-y-4 text-left">
                <div className="flex items-center gap-3">
                  <User size={20} className="text-neutral-400" />
                  <span className="text-neutral-600">Artist:</span>
                  <span className="font-medium text-neutral-900">
                    Priya Sharma
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar size={20} className="text-neutral-400" />
                  <span className="text-neutral-600">Date:</span>
                  <span className="font-medium text-neutral-900">
                    March 15, 2024
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Clock size={20} className="text-neutral-400" />
                  <span className="text-neutral-600">Time:</span>
                  <span className="font-medium text-neutral-900">10:00 AM</span>
                </div>
              </div>
            </motion.div>

            {/* Next Steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-lg border border-white/30"
            >
              <h4 className="text-lg font-semibold text-neutral-900 mb-4">
                What's Next?
              </h4>
              <ul className="text-neutral-600 space-y-2 text-left">
                <li>• You'll receive a confirmation email within 24 hours</li>
                <li>
                  • Our artist will contact you to discuss your preferences
                </li>
                <li>• Any special requirements or allergies will be noted</li>
                <li>
                  • Final confirmation will be sent 48 hours before your session
                </li>
              </ul>
            </motion.div>

            {/* Action Button */}
            <motion.button
              onClick={handleBackToArtists}
              className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm text-neutral-900 px-6 py-3 rounded-lg font-medium hover:bg-white transition-colors shadow-lg border border-white/30"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Browse More Artists
              <ArrowRight size={16} />
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
}
