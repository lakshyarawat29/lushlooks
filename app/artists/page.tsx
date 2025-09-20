'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { cn } from '@/lib/utils';
import { Star, MapPin, Award, Calendar } from 'lucide-react';

const categories = [
  'All',
  'Bridal',
  'Party & Glam',
  'Casual/Everyday',
  'Fashion & Editorial',
  'Festive/Cultural',
  'Specialty',
];

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
    portfolio: ['/artists/1.jpeg', '/artists/2.jpeg'],
    rating: 5,
    experience: '6 years',
    location: 'Delhi',
    price: '€320',
    specialties: ['Diwali/Eid/Christmas', 'Navratri/Garba', 'Regional Styles'],
    description:
      'Expert in traditional and cultural makeup for festivals and celebrations.',
  },
  {
    id: 'sophia-chen',
    name: 'Sophia Chen',
    category: 'Specialty',
    image: '/artists/3.jpeg',
    portfolio: ['/artists/4.jpeg', '/artists/5.jpeg'],
    rating: 5,
    experience: '9 years',
    location: 'Bangalore',
    price: '€500',
    specialties: ['HD/Camera Ready', 'Airbrush', 'Theatrical/Stage'],
    description:
      'Specialized in HD and camera-ready makeup for professional photography and events.',
  },
  {
    id: 'alex-kumar',
    name: 'Alex Kumar',
    category: 'Party & Glam',
    image: '/artists/6.jpeg',
    portfolio: ['/artists/7.jpeg', '/artists/8.jpeg'],
    rating: 5,
    experience: '5 years',
    location: 'Mumbai',
    price: '€300',
    specialties: ['Cocktail Party', 'Red Carpet Glam', 'Evening Party'],
    description:
      'Professional makeup artist specializing in glamorous party and event looks.',
  },
  {
    id: 'maya-reddy',
    name: 'Maya Reddy',
    category: 'Casual/Everyday',
    image: '/artists/9.jpeg',
    portfolio: ['/artists/10.jpeg', '/artists/11.jpeg'],
    rating: 5,
    experience: '3 years',
    location: 'Chennai',
    price: '€150',
    specialties: ['Office Look', 'Minimal/Natural', 'Day Out/Brunch'],
    description:
      'Fresh talent with expertise in natural, everyday makeup looks.',
  },
  {
    id: 'zara-khan',
    name: 'Zara Khan',
    category: 'Fashion & Editorial',
    image: '/artists/12.jpeg',
    portfolio: ['/artists/13.jpeg', '/artists/14.jpeg'],
    rating: 5,
    experience: '6 years',
    location: 'Delhi',
    price: '€380',
    specialties: ['Runway', 'Photoshoot', 'Creative/High Fashion'],
    description:
      'Innovative artist known for pushing boundaries in fashion and editorial makeup.',
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

export default function ArtistsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam && categories.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  const filteredArtists =
    selectedCategory === 'All'
      ? artists
      : artists.filter((artist) => artist.category === selectedCategory);

  const handleBookArtist = (artistId: string, specialty?: string) => {
    const params = new URLSearchParams();
    params.set('artist', artistId);
    if (specialty) {
      params.set('specialty', specialty);
    }
    router.push(`/booking?${params.toString()}`);
  };

  const handleViewArtist = (artistId: string) => {
    router.push(`/artists/${artistId}`);
  };

  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-neutral-50 to-white">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 mb-4">
              Our <span className="italic font-light">Artists</span>
            </h1>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Meet our talented makeup artists, each specializing in different
              styles and occasions. Find the perfect artist for your special
              moment.
            </p>
          </div>
        </div>
      </section>

      <div className="container-custom pb-20">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <div className="sticky top-24">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                Filter by Category
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={cn(
                      'w-full text-left px-4 py-3 rounded-lg transition-all duration-200',
                      selectedCategory === category
                        ? 'bg-neutral-900 text-white'
                        : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Artists Grid */}
          <main className="flex-1 pb-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                {selectedCategory === 'All'
                  ? 'All Artists'
                  : `${selectedCategory} Artists`}
              </h2>
              <p className="text-neutral-600">
                {filteredArtists.length}{' '}
                {filteredArtists.length === 1 ? 'artist' : 'artists'} found
              </p>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredArtists.map((artist, index) => (
                  <motion.div
                    key={artist.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm border border-neutral-200/50 hover:shadow-lg transition-all duration-300 cursor-pointer"
                    onClick={() => handleViewArtist(artist.id)}
                  >
                    {/* Artist Image */}
                    <div className="relative h-64">
                      <Image
                        src={artist.image}
                        alt={artist.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-sm font-medium text-neutral-900">
                          {artist.price}
                        </span>
                      </div>
                    </div>

                    {/* Artist Info */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-neutral-900 mb-1">
                            {artist.name}
                          </h3>
                          <div className="flex items-center gap-1 mb-2">
                            <MapPin size={14} className="text-neutral-400" />
                            <span className="text-sm text-neutral-600">
                              {artist.location}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star
                            size={16}
                            className="text-yellow-400 fill-current"
                          />
                          <span className="text-sm font-medium text-neutral-900">
                            {artist.rating}
                          </span>
                        </div>
                      </div>

                      <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
                        {artist.description}
                      </p>

                      <div className="flex items-center justify-between text-xs text-neutral-500 mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar size={12} />
                          <span>{artist.experience}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Award size={12} />
                          <span>{artist.category}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {artist.specialties.slice(0, 2).map((specialty) => (
                          <span
                            key={specialty}
                            className="px-2 py-1 bg-neutral-100 text-neutral-700 text-xs rounded-full"
                          >
                            {specialty}
                          </span>
                        ))}
                        {artist.specialties.length > 2 && (
                          <span className="px-2 py-1 bg-neutral-100 text-neutral-700 text-xs rounded-full">
                            +{artist.specialties.length - 2} more
                          </span>
                        )}
                      </div>

                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBookArtist(artist.id, artist.specialties[0]);
                        }}
                        className="w-full bg-neutral-900 text-white py-3 rounded-lg font-medium hover:bg-neutral-800 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Book Now
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}
