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
      className="pt-20 pb-32 lg:pt-32 lg:pb-40 bg-neutral-50"
      id="testimonials"
    >
      {/* Section Header */}
      <div className="container-custom mb-16">
        <div className="text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-neutral-900 mb-4">
            Happy <span className="italic font-light">Customers</span>
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            See what our clients say about their LushLooks experience
          </p>
        </div>
      </div>

      {/* Infinite Scrolling Testimonials Tape */}
      <div className="overflow-hidden">
        <motion.div
          className="flex gap-6 py-8"
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
            width: `${testimonials.length * 2 * 320}px`, // Double width for seamless loop
          }}
        >
          {duplicatedTestimonials.map((testimonial, index) => (
            <motion.div
              key={`${testimonial.id}-${index}`}
              className="flex-shrink-0 w-80 h-48 rounded-2xl p-6 shadow-lg border border-neutral-200/50"
              style={{
                background: testimonial.color,
              }}
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <div className="flex flex-col h-full justify-between">
                {/* Quote Icon */}
                <Quote className="w-6 h-6 text-neutral-400 mb-3" />

                {/* Testimonial Text */}
                <p className="text-neutral-700 text-sm leading-relaxed mb-4 flex-1">
                  "{testimonial.testimonial}"
                </p>

                {/* Bottom Section */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-neutral-900 text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-neutral-500">
                      {testimonial.service} Client
                    </p>
                  </div>

                  {/* Star Rating */}
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className="text-yellow-400 fill-current"
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
      <div className="container-custom mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-200/50">
            <div className="text-4xl font-bold text-neutral-900 mb-2">500+</div>
            <div className="text-neutral-600">Happy Clients</div>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-200/50">
            <div className="text-4xl font-bold text-neutral-900 mb-2">
              1000+
            </div>
            <div className="text-neutral-600">Events Completed</div>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-200/50">
            <div className="text-4xl font-bold text-neutral-900 mb-2">5★</div>
            <div className="text-neutral-600">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
}
