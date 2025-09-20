'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import { Header } from '@/components/header';
import { cn } from '@/lib/utils';
import { Star, ArrowLeft, Calendar, MapPin, Award, Quote } from 'lucide-react';

// Artist data (same as in artists page - you could move this to a shared file)
const artists = [
  {
    id: 'anjali-singh',
    name: 'Anjali Singh',
    category: 'Bridal',
    image: '/artists/anjali-singh.png',
    portfolio: [
      '/artists/anjali-portfolio-1.jpg',
      '/artists/anjali-portfolio-2.jpg',
    ],
    rating: 5,
    experience: '8 years',
    location: 'Mumbai',
    price: '€450',
    specialties: [
      'Traditional Bridal',
      'Contemporary Bridal',
      'Destination Wedding',
    ],
    description:
      'Specialized in creating timeless bridal looks that enhance natural beauty while maintaining cultural authenticity.',
  },
  {
    id: 'kavya-patel',
    name: 'Kavya Patel',
    category: 'Bridal',
    image: '/artists/kavya-patel.png',
    portfolio: [
      '/artists/kavya-portfolio-1.jpg',
      '/artists/kavya-portfolio-2.jpg',
    ],
    rating: 5,
    experience: '6 years',
    location: 'Delhi',
    price: '€400',
    specialties: ['Contemporary Bridal', 'Party & Glam'],
    description:
      'Expert in modern bridal makeup with a flair for glamorous party looks.',
  },
  {
    id: 'meera-joshi',
    name: 'Meera Joshi',
    category: 'Party & Glam',
    image: '/artists/meera-joshi.png',
    portfolio: [
      '/artists/meera-portfolio-1.jpg',
      '/artists/meera-portfolio-2.jpg',
    ],
    rating: 5,
    experience: '5 years',
    location: 'Bangalore',
    price: '€280',
    specialties: ['Red Carpet Glam', 'Evening Party', 'Editorial'],
    description:
      'Known for creating show-stopping glam looks perfect for special occasions.',
  },
  {
    id: 'priya-sharma',
    name: 'Priya Sharma',
    category: 'Casual/Everyday',
    image: '/artists/priya-sharma.png',
    portfolio: [
      '/artists/priya-portfolio-1.jpg',
      '/artists/priya-portfolio-2.jpg',
    ],
    rating: 5,
    experience: '4 years',
    location: 'Pune',
    price: '€180',
    specialties: ['Office Look', 'Minimal/Natural', 'Day Out/Brunch'],
    description:
      'Master of natural, everyday makeup that enhances your features subtly.',
  },
  {
    id: 'riya-kapoor',
    name: 'Riya Kapoor',
    category: 'Fashion & Editorial',
    image: '/artists/riya-kapoor.png',
    portfolio: [
      '/artists/riya-portfolio-1.jpg',
      '/artists/riya-portfolio-2.jpg',
    ],
    rating: 5,
    experience: '7 years',
    location: 'Mumbai',
    price: '€350',
    specialties: ['Runway', 'Photoshoot', 'Creative/High Fashion'],
    description:
      'Creative artist specializing in bold, editorial looks for fashion and photography.',
  },
  {
    id: 'neha-verma',
    name: 'Neha Verma',
    category: 'Festive/Cultural',
    image: '/artists/neha-verma.png',
    portfolio: [
      '/artists/neha-portfolio-1.jpg',
      '/artists/neha-portfolio-2.jpg',
    ],
    rating: 5,
    experience: '6 years',
    location: 'Delhi',
    price: '€320',
    specialties: ['Diwali/Eid/Christmas', 'Navratri/Garba', 'Regional Styles'],
    description:
      'Expert in traditional and cultural makeup for festivals and celebrations.',
  },
  {
    id: 'sophia-rodriguez',
    name: 'Sophia Rodriguez',
    category: 'Bridal',
    image: '/artists/1.jpeg',
    portfolio: ['/artists/1.jpeg', '/artists/2.jpeg'],
    rating: 5,
    experience: '7 years',
    location: 'Pune',
    price: '€420',
    specialties: ['Traditional Bridal', 'Destination Wedding'],
    description:
      'Passionate about creating elegant bridal looks that celebrate cultural heritage.',
  },
  {
    id: 'zara-khan-glam',
    name: 'Zara Khan',
    category: 'Party & Glam',
    image: '/artists/3.jpeg',
    portfolio: ['/artists/3.jpeg', '/artists/4.jpeg'],
    rating: 5,
    experience: '4 years',
    location: 'Mumbai',
    price: '€250',
    specialties: ['Red Carpet Glam', 'Evening Party', 'Cocktail Party'],
    description:
      'Specialized in creating show-stopping glam looks for special occasions.',
  },
  {
    id: 'maya-krishnan',
    name: 'Maya Krishnan',
    category: 'Casual/Everyday',
    image: '/artists/5.jpeg',
    portfolio: ['/artists/5.jpeg', '/artists/6.jpeg'],
    rating: 5,
    experience: '3 years',
    location: 'Chennai',
    price: '€160',
    specialties: ['Office Look', 'Minimal/Natural', 'Day Out/Brunch'],
    description:
      'Expert in natural, everyday makeup that enhances your features subtly.',
  },
  {
    id: 'isabella-chen',
    name: 'Isabella Chen',
    category: 'Fashion & Editorial',
    image: '/artists/7.jpeg',
    portfolio: ['/artists/7.jpeg', '/artists/8.jpeg'],
    rating: 5,
    experience: '6 years',
    location: 'Delhi',
    price: '€320',
    specialties: ['Runway', 'Photoshoot', 'Creative/High Fashion'],
    description:
      'Creative visionary specializing in bold, artistic makeup for fashion industry.',
  },
  {
    id: 'aaradhya-gupta',
    name: 'Aaradhya Gupta',
    category: 'Festive/Cultural',
    image: '/artists/9.jpeg',
    portfolio: ['/artists/9.jpeg', '/artists/10.jpeg'],
    rating: 5,
    experience: '5 years',
    location: 'Kolkata',
    price: '€300',
    specialties: ['Diwali/Eid/Christmas', 'Navratri/Garba', 'Regional Styles'],
    description:
      'Master of traditional and cultural makeup for festivals and celebrations.',
  },
  {
    id: 'emma-wilson',
    name: 'Emma Wilson',
    category: 'Specialty',
    image: '/artists/11.jpeg',
    portfolio: ['/artists/11.jpeg', '/artists/12.jpeg'],
    rating: 5,
    experience: '9 years',
    location: 'Bangalore',
    price: '€480',
    specialties: ['HD/Camera Ready', 'Airbrush Makeup', 'Theatrical/Stage'],
    description:
      'Professional makeup artist specializing in camera-ready and theatrical looks.',
  },
  {
    id: 'sakshi-mishra',
    name: 'Sakshi Mishra',
    category: 'Bridal',
    image: '/artists/13.jpeg',
    portfolio: ['/artists/13.jpeg', '/artists/14.jpeg'],
    rating: 5,
    experience: '6 years',
    location: 'Hyderabad',
    price: '€380',
    specialties: ['Contemporary Bridal', 'Traditional Bridal'],
    description:
      'Skilled in both traditional and contemporary bridal makeup styles.',
  },
  {
    id: 'lily-anderson',
    name: 'Lily Anderson',
    category: 'Party & Glam',
    image: '/artists/15.jpeg',
    portfolio: ['/artists/15.jpeg', '/artists/16.jpeg'],
    rating: 5,
    experience: '4 years',
    location: 'Mumbai',
    price: '€270',
    specialties: ['Evening Party', 'Cocktail Party', 'Red Carpet Glam'],
    description:
      'Expert in creating glamorous party looks that make you shine.',
  },
];

// Mock reviews data
const mockReviews = [
  {
    id: 1,
    name: 'Ritu',
    rating: 5,
    comment: 'Loved her work for my wedding, highly professional!',
    date: '2 months ago',
  },
  {
    id: 2,
    name: 'Ananya',
    rating: 4,
    comment: 'Great party look, quick and friendly.',
    date: '1 month ago',
  },
  {
    id: 3,
    name: 'Priya',
    rating: 5,
    comment: 'Amazing attention to detail and beautiful results.',
    date: '3 weeks ago',
  },
];

export default function ArtistDetailPage() {
  const router = useRouter();
  const params = useParams();
  const artistId = params.id as string;

  // Find the selected artist
  const artist = artists.find((a) => a.id === artistId);

  const handleBookNow = () => {
    router.push(
      `/booking?artist=${artistId}&specialty=${artist?.specialties[0]}`
    );
  };

  const handleBackToArtists = () => {
    router.push('/artists');
  };

  if (!artist) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">
            Artist Not Found
          </h2>
          <p className="text-neutral-600 mb-6">
            The artist you're looking for doesn't exist.
          </p>
          <motion.button
            onClick={handleBackToArtists}
            className="bg-neutral-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-neutral-800 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Back to Artists
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-neutral-50 to-white">
        <div className="container-custom">
          <motion.button
            onClick={handleBackToArtists}
            className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors mb-8"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={16} />
            Back to Artists
          </motion.button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Artist Profile Section */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-200/50 sticky top-24"
              >
                <div className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <Image
                      src={artist.image}
                      alt={artist.name}
                      fill
                      className="object-cover rounded-full"
                      sizes="128px"
                    />
                  </div>

                  <h1 className="text-2xl font-bold text-neutral-900 mb-2">
                    {artist.name}
                  </h1>

                  <p className="text-neutral-600 mb-4 font-medium">
                    {artist.category} Expert
                  </p>

                  <div className="flex items-center justify-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className="text-yellow-400 fill-current"
                      />
                    ))}
                    <span className="text-lg font-medium text-neutral-700 ml-2">
                      {artist.rating}/5
                    </span>
                  </div>

                  <div className="space-y-3 text-sm text-neutral-600 mb-6">
                    <div className="flex items-center justify-center gap-2">
                      <Calendar size={16} />
                      <span>{artist.experience} experience</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <MapPin size={16} />
                      <span>{artist.location}</span>
                    </div>
                  </div>

                  <div className="text-3xl font-bold text-neutral-900 mb-6">
                    {artist.price}
                  </div>

                  <motion.button
                    onClick={handleBookNow}
                    className="w-full bg-neutral-900 text-white py-4 px-6 rounded-lg font-medium hover:bg-neutral-800 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Book Now
                  </motion.button>
                </div>
              </motion.div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* About Section */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                  About {artist.name}
                </h2>
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-200/50">
                  <p className="text-lg text-neutral-600 leading-relaxed">
                    {artist.name} is a professional makeup artist with{' '}
                    {artist.experience} of experience in{' '}
                    {artist.category.toLowerCase()} makeup. {artist.description}
                  </p>
                </div>
              </motion.section>

              {/* Services Section */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                  Services Offered
                </h2>
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-200/50">
                  <div className="space-y-6">
                    {artist.specialties.map((specialty, index) => (
                      <motion.div
                        key={specialty}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                        className="flex items-center gap-4"
                      >
                        <div className="w-2 h-2 bg-neutral-900 rounded-full" />
                        <span className="text-lg text-neutral-700 font-medium">
                          {specialty}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.section>

              {/* Portfolio Section */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                  Portfolio Highlights
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {artist.portfolio.map((image, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                      className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg group"
                    >
                      <Image
                        src={image}
                        alt={`${artist.name} portfolio ${index + 1}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* Reviews Section */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                  Client Reviews
                </h2>
                <div className="space-y-6">
                  {mockReviews.map((review, index) => (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                      className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200/50"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <Quote size={24} className="text-neutral-400" />
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={`${
                                i < review.rating
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-neutral-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-neutral-700 mb-4 italic">
                        "{review.comment}"
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-neutral-900">
                          — {review.name}
                        </span>
                        <span className="text-sm text-neutral-500">
                          {review.date}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* Call to Action */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-center pt-8"
              >
                <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 rounded-2xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-4">
                    Ready to Book Your Session?
                  </h3>
                  <p className="text-neutral-300 mb-6">
                    Let {artist.name} help you look and feel your best for your
                    special occasion.
                  </p>
                  <motion.button
                    onClick={handleBookNow}
                    className="bg-white text-neutral-900 px-8 py-4 rounded-lg font-medium hover:bg-neutral-100 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Book Now - {artist.price}
                  </motion.button>
                </div>
              </motion.section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
