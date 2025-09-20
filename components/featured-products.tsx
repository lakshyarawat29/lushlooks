'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ProductCard } from './product-card';
import { QuickLookModal } from './quick-look-modal';
import { Reveal } from './reveal';

const featuredProducts = [
  {
    id: 'bridal-package',
    name: 'Bridal Makeup Package',
    price: '€450',
    image: '/categories/traditonal-bridal.jpg',
    badge: 'Popular' as const,
    materials: ['Premium Foundation', 'Long-lasting Lipstick'],
    swatches: [
      { name: 'Natural', color: '#F5E6D3' },
      { name: 'Warm', color: '#E8B4A0' },
      { name: 'Cool', color: '#D4C5C9' },
    ],
    quickLookImages: [
      '/categories/traditonal-bridal.jpg',
      '/categories/contemporary-bridal-makeup.jpg',
      '/placeholder.svg?height=600&width=600',
    ],
    dimensions: 'Full Day Service • Touch-ups Included',
  },
  {
    id: 'party-glam-package',
    name: 'Party Glam Package',
    price: '€280',
    image: '/categories/red-carpet-glam.jpg',
    badge: 'Trending' as const,
    materials: ['HD Foundation', 'Waterproof Mascara'],
    swatches: [
      { name: 'Dramatic', color: '#2C1810' },
      { name: 'Smoky', color: '#4A4A4A' },
      { name: 'Glam', color: '#8B4513' },
    ],
    quickLookImages: [
      '/categories/red-carpet-glam.jpg',
      '/categories/evening-party-looks.jpg',
      '/placeholder.svg?height=600&width=600',
    ],
    dimensions: '4-Hour Service • Photo-Ready Finish',
  },
  {
    id: 'editorial-package',
    name: 'Editorial Makeup',
    price: '€350',
    image: '/categories/creative-makeup.jpg',
    badge: 'Artistic' as const,
    materials: ['Professional Palette', 'Airbrush Foundation'],
    swatches: [
      { name: 'Creative', color: '#FF6B9D' },
      { name: 'Bold', color: '#FF1744' },
      { name: 'Unique', color: '#9C27B0' },
    ],
    quickLookImages: [
      '/categories/creative-makeup.jpg',
      '/categories/photoshoot-makeup.jpg',
      '/placeholder.svg?height=600&width=600',
    ],
    dimensions: '6-Hour Session • Creative Freedom',
  },
];

export function FeaturedProducts() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleQuickLook = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <section className="py-20 lg:py-32" id="featured-products">
      <div className="container-custom">
        <Reveal>
          <div className="text-left mb-16">
            <h2 className="text-4xl text-neutral-900 mb-4 lg:text-6xl">
              Featured <span className="italic font-light">Services</span>
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl">
              Discover our most popular makeup packages, each designed with
              professional expertise and premium products for your special
              occasions.
            </p>
          </div>
        </Reveal>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.3,
              },
            },
          }}
        >
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.8,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  },
                },
              }}
            >
              <Reveal delay={index * 0.1}>
                <ProductCard product={product} onQuickLook={handleQuickLook} />
              </Reveal>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <QuickLookModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </section>
  );
}
