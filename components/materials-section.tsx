'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 'sarah-johnson',
    name: 'Sarah J.',
    testimonial: 'Made me feel like a princess on my wedding day!',
    rating: 5,
    service: 'Bridal',
    color: 'bg-pink-100',
  },
  {
    id: 'priya-patel',
    name: 'Priya P.',
    testimonial: 'Perfect office look for my important presentation.',
    rating: 5,
    service: 'Office',
    color: 'bg-blue-100',
  },
  {
    id: 'maya-kumar',
    name: 'Maya K.',
    testimonial: 'Incredible party glam that everyone noticed!',
    rating: 5,
    service: 'Party',
    color: 'bg-purple-100',
  },
  {
    id: 'alex-chen',
    name: 'Alex C.',
    testimonial: 'Amazing editorial shoot experience.',
    rating: 5,
    service: 'Editorial',
    color: 'bg-green-100',
  },
  {
    id: 'neha-sharma',
    name: 'Neha S.',
    testimonial: 'Perfect Diwali look that lasted all night!',
    rating: 5,
    service: 'Festive',
    color: 'bg-yellow-100',
  },
  {
    id: 'lisa-rodriguez',
    name: 'Lisa R.',
    testimonial: 'Professional theatrical makeup for my performance.',
    rating: 5,
    service: 'Theatrical',
    color: 'bg-indigo-100',
  },
  {
    id: 'emma-wilson',
    name: 'Emma W.',
    testimonial: 'Stunning red carpet look for the awards!',
    rating: 5,
    service: 'Red Carpet',
    color: 'bg-rose-100',
  },
  {
    id: 'sofia-garcia',
    name: 'Sofia G.',
    testimonial: 'Natural beauty look for my photoshoot.',
    rating: 5,
    service: 'Natural',
    color: 'bg-teal-100',
  },
  {
    id: 'jessica-brown',
    name: 'Jessica B.',
    testimonial: "Gorgeous bridesmaid makeup for my best friend's wedding.",
    rating: 5,
    service: 'Bridesmaid',
    color: 'bg-orange-100',
  },
  {
    id: 'michelle-lee',
    name: 'Michelle L.',
    testimonial: 'Creative runway look that turned heads!',
    rating: 5,
    service: 'Runway',
    color: 'bg-violet-100',
  },
];

export function TestimonialsSection() {
  // Duplicate testimonials for seamless infinite scroll
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section
      className="pt-16 sm:pt-20 pb-24 sm:pb-32 lg:pt-32 lg:pb-40 bg-neutral-50"
      id="testimonials"
    >
      {/* Section Header */}
      <div className="container-custom mb-12 sm:mb-16">
        <div className="text-center px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-4">
            Happy <span className="italic font-light">Customers</span>
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto">
            See what our clients say about their LushLooks experience
          </p>
        </div>
      </div>

      {/* Infinite Scrolling Testimonials Tape */}
      <div className="overflow-hidden">
        <motion.div
          className="flex gap-4 sm:gap-6 py-6 sm:py-8"
          animate={{
            x: [0, -100 * testimonials.length],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 30,
              ease: 'linear',
            },
          }}
          style={{
            width: `${testimonials.length * 2 * 280}px`, // Adjusted for mobile
          }}
        >
          {duplicatedTestimonials.map((testimonial, index) => (
            <motion.div
              key={`${testimonial.id}-${index}`}
              className="flex-shrink-0 w-64 sm:w-72 md:w-80 h-40 sm:h-44 md:h-48 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-lg border border-neutral-200/50"
              style={{
                background: testimonial.color,
              }}
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <div className="flex flex-col h-full justify-between">
                {/* Quote Icon */}
                <Quote className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-400 mb-2 sm:mb-3" />

                {/* Testimonial Text */}
                <p className="text-neutral-700 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 flex-1">
                  "{testimonial.testimonial}"
                </p>

                {/* Bottom Section */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-neutral-900 text-xs sm:text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-neutral-500">
                      {testimonial.service} Client
                    </p>
                  </div>

                  {/* Star Rating */}
                  <div className="flex gap-0.5 sm:gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className="text-yellow-400 fill-current sm:w-3.5 sm:h-3.5"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Stats Section */}
      <div className="container-custom mt-12 sm:mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 text-center px-4">
          <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-sm border border-neutral-200/50">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
              500+
            </div>
            <div className="text-sm sm:text-base text-neutral-600">
              Happy Clients
            </div>
          </div>
          <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-sm border border-neutral-200/50">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
              1000+
            </div>
            <div className="text-sm sm:text-base text-neutral-600">
              Events Completed
            </div>
          </div>
          <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-sm border border-neutral-200/50">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
              5★
            </div>
            <div className="text-sm sm:text-base text-neutral-600">
              Average Rating
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
