'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { cn } from '@/lib/utils';
import {
  Calendar,
  Clock,
  Star,
  User,
  CheckCircle,
  XCircle,
  RotateCcw,
  Eye,
  Plus,
} from 'lucide-react';

// Mock booking data
const mockBookings = [
  {
    id: 'booking-1',
    artistId: 'priya-sharma',
    artistName: 'Priya Sharma',
    artistImage: '/artists/priya-sharma.png',
    category: 'Casual/Everyday',
    subcategory: 'Office Look',
    date: '2024-03-20',
    time: '10:00 AM',
    price: '€180',
    status: 'Confirmed',
    type: 'upcoming',
  },
  {
    id: 'booking-2',
    artistId: 'anjali-singh',
    artistName: 'Anjali Singh',
    artistImage: '/artists/anjali-singh.png',
    category: 'Bridal',
    subcategory: 'Traditional Bridal',
    date: '2024-03-25',
    time: '09:00 AM',
    price: '€450',
    status: 'Confirmed',
    type: 'upcoming',
  },
  {
    id: 'booking-3',
    artistId: 'meera-joshi',
    artistName: 'Meera Joshi',
    artistImage: '/artists/meera-joshi.png',
    category: 'Party & Glam',
    subcategory: 'Red Carpet Glam',
    date: '2024-02-15',
    time: '06:00 PM',
    price: '€280',
    status: 'Completed',
    type: 'past',
  },
  {
    id: 'booking-4',
    artistId: 'riya-kapoor',
    artistName: 'Riya Kapoor',
    artistImage: '/artists/riya-kapoor.png',
    category: 'Fashion & Editorial',
    subcategory: 'Photoshoot',
    date: '2024-02-10',
    time: '02:00 PM',
    price: '€350',
    status: 'Completed',
    type: 'past',
  },
  {
    id: 'booking-5',
    artistId: 'kavya-patel',
    artistName: 'Kavya Patel',
    artistImage: '/artists/kavya-patel.png',
    category: 'Bridal',
    subcategory: 'Contemporary Bridal',
    date: '2024-04-05',
    time: '08:00 AM',
    price: '€400',
    status: 'Confirmed',
    type: 'upcoming',
  },
];

export default function MyBookingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  // Filter bookings based on active tab
  const filteredBookings = mockBookings.filter(
    (booking) => booking.type === activeTab
  );

  const handleViewArtist = (artistId: string) => {
    router.push(`/artists/${artistId}`);
  };

  const handleBookArtist = (artistId: string) => {
    router.push(`/booking?artist=${artistId}`);
  };

  const handleCancelBooking = (bookingId: string) => {
    // In a real app, this would make an API call
    console.log('Cancel booking:', bookingId);
    alert('Booking cancellation feature coming soon!');
  };

  const handleRebook = (artistId: string) => {
    router.push(`/booking?artist=${artistId}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-neutral-50 to-white">
        <div className="container-custom">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4"
            >
              My <span className="italic font-light">Bookings</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg text-neutral-600 max-w-2xl mx-auto"
            >
              View all your upcoming and past makeup bookings.
            </motion.p>
          </div>
        </div>
      </section>

      <div className="container-custom pb-20">
        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-white rounded-2xl p-2 shadow-sm border border-neutral-200/50">
            <div className="flex gap-2">
              <motion.button
                onClick={() => setActiveTab('upcoming')}
                className={cn(
                  'px-6 py-3 rounded-xl font-medium transition-all duration-200',
                  activeTab === 'upcoming'
                    ? 'bg-neutral-900 text-white shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Upcoming Bookings
              </motion.button>
              <motion.button
                onClick={() => setActiveTab('past')}
                className={cn(
                  'px-6 py-3 rounded-xl font-medium transition-all duration-200',
                  activeTab === 'past'
                    ? 'bg-neutral-900 text-white shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Past Bookings
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bookings Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <AnimatePresence mode="wait">
            {filteredBookings.length > 0 ? (
              <motion.div
                key="bookings"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredBookings.map((booking, index) => (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{
                      y: -8,
                      scale: 1.03,
                      transition: {
                        duration: 0.4,
                        ease: [0.25, 0.46, 0.45, 0.94],
                        type: 'spring',
                        stiffness: 100,
                        damping: 15,
                      },
                    }}
                    className="relative rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden"
                  >
                    {/* Main Ticket Section */}
                    <div className="flex h-64">
                      {/* Left Section - Main Content */}
                      <div className="flex-1 p-6 flex flex-col justify-between bg-black">
                        {/* Header */}
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-xs">
                              LS
                            </span>
                          </div>
                          <span className="text-white font-medium text-sm">
                            {booking.location} • LushLooks
                          </span>
                        </div>

                        {/* Time */}
                        <div className="mb-4">
                          <p className="text-white/80 text-xs mb-1">Time</p>
                          <p className="text-white font-bold text-lg">
                            {booking.time}
                          </p>
                        </div>

                        {/* Booking ID & Price */}
                        <div className="flex justify-between items-end mb-4">
                          <div>
                            <p className="text-white/80 text-xs mb-1">
                              Booking ID
                            </p>
                            <p className="text-white font-bold text-base">
                              {booking.id.toUpperCase()}
                            </p>
                          </div>
                          <div>
                            <p className="text-white/80 text-xs mb-1">Price</p>
                            <p className="text-white font-bold text-base">
                              {booking.price}
                            </p>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 mt-4">
                          {activeTab === 'upcoming' ? (
                            <>
                              <motion.button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleViewArtist(booking.artistId);
                                }}
                                className="flex-1 bg-white/90 text-gray-700 py-2 px-3 rounded-lg text-xs font-medium hover:bg-white transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                View
                              </motion.button>
                              <motion.button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCancelBooking(booking.id);
                                }}
                                className="flex-1 bg-red-500 text-white py-2 px-3 rounded-lg text-xs font-medium hover:bg-red-600 transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                Cancel
                              </motion.button>
                            </>
                          ) : (
                            <motion.button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRebook(booking.artistId);
                              }}
                              className="w-full bg-white/90 text-gray-700 py-2 px-3 rounded-lg text-xs font-medium hover:bg-white transition-colors"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Rebook
                            </motion.button>
                          )}
                        </div>
                      </div>

                      {/* Perforated Line */}
                      <div className="relative w-8 flex items-center justify-center">
                        <div className="flex flex-col space-y-1">
                          {[...Array(8)].map((_, i) => (
                            <div
                              key={i}
                              className="w-1 h-1 bg-white/30 rounded-full"
                            />
                          ))}
                        </div>
                      </div>

                      {/* Right Section - Date */}
                      <div className="w-20 bg-white flex flex-col items-center justify-center p-4">
                        <p className="text-gray-600 text-xs font-medium mb-1">
                          {new Date(booking.date)
                            .toLocaleDateString('en-US', { month: 'short' })
                            .toUpperCase()}
                        </p>
                        <p className="text-black text-3xl font-bold">
                          {new Date(booking.date)
                            .getDate()
                            .toString()
                            .padStart(2, '0')}
                        </p>
                        <p className="text-gray-600 text-xs font-medium mt-1">
                          {new Date(booking.date).getFullYear()}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="text-center py-20"
              >
                <div className="max-w-md mx-auto">
                  {activeTab === 'upcoming' ? (
                    <>
                      <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Calendar size={32} className="text-neutral-400" />
                      </div>
                      <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                        No Upcoming Bookings
                      </h3>
                      <p className="text-neutral-600 mb-8">
                        You don't have any upcoming bookings. Book an artist
                        today to get started!
                      </p>
                      <motion.button
                        onClick={() => router.push('/artists')}
                        className="inline-flex items-center gap-2 bg-neutral-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-neutral-800 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Plus size={20} />
                        Book Now
                      </motion.button>
                    </>
                  ) : (
                    <>
                      <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={32} className="text-neutral-400" />
                      </div>
                      <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                        No Past Bookings
                      </h3>
                      <p className="text-neutral-600 mb-8">
                        No past bookings found. Your booking history will appear
                        here after your first session.
                      </p>
                      <motion.button
                        onClick={() => router.push('/artists')}
                        className="inline-flex items-center gap-2 bg-neutral-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-neutral-800 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Plus size={20} />
                        Book Your First Session
                      </motion.button>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
