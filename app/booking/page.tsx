'use client';

import { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { cn } from '@/lib/utils';
import {
  Star,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  ArrowLeft,
} from 'lucide-react';

// Artist data (same as in artists page - you could move this to a shared file)
const artists = [
  {
    id: 'anjali-singh',
    name: 'Anjali Singh',
    category: 'Bridal',
    image: '/artists/anjali-singh.png',
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
    rating: 5,
    experience: '4 years',
    location: 'Mumbai',
    price: '€270',
    specialties: ['Evening Party', 'Cocktail Party', 'Red Carpet Glam'],
    description:
      'Expert in creating glamorous party looks that make you shine.',
  },
];

const timeSlots = [
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '01:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
  '06:00 PM',
  '07:00 PM',
  '08:00 PM',
];

function BookingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get artist ID and specialty from URL params
  const artistId = searchParams.get('artist');
  const specialty = searchParams.get('specialty') || '';

  // Find the selected artist
  const selectedArtist = artists.find((artist) => artist.id === artistId);

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    date: '',
    time: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Redirect if no artist selected
  useEffect(() => {
    if (!selectedArtist) {
      router.push('/artists');
    }
  }, [selectedArtist, router]);

  // Handle form input changes
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.date) {
      newErrors.date = 'Please select a date';
    }

    if (!formData.time) {
      newErrors.time = 'Please select a time';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Here you would typically send the booking data to your backend
      console.log('Booking submitted:', {
        artist: selectedArtist,
        specialty,
        ...formData,
      });

      // Redirect to confirmation page (you'll need to create this)
      router.push('/booking/confirmation');
    }
  };

  // Handle cancel/back
  const handleCancel = () => {
    router.push('/artists');
  };

  if (!selectedArtist) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">
            Loading...
          </h2>
          <p className="text-neutral-600">
            Please wait while we load the booking page.
          </p>
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
          <div className="text-center">
            <motion.button
              onClick={handleCancel}
              className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors mb-6"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={16} />
              Back to Artists
            </motion.button>

            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
              Book Your{' '}
              <span className="italic font-light">Makeup Session</span>
            </h1>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Fill in your details to confirm your booking with your chosen
              artist.
            </p>
          </div>
        </div>
      </section>

      <div className="container-custom pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Artist Profile Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200/50">
                  <div className="text-center">
                    <div className="relative w-24 h-24 mx-auto mb-4">
                      <Image
                        src={selectedArtist.image}
                        alt={selectedArtist.name}
                        fill
                        className="object-cover rounded-full"
                        sizes="96px"
                      />
                    </div>

                    <h3 className="text-xl font-bold text-neutral-900 mb-2">
                      {selectedArtist.name}
                    </h3>

                    <div className="flex items-center justify-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className="text-yellow-400 fill-current"
                        />
                      ))}
                      <span className="text-sm font-medium text-neutral-700 ml-1">
                        {selectedArtist.rating}
                      </span>
                    </div>

                    <div className="space-y-2 text-sm text-neutral-600 mb-4">
                      <div className="flex items-center justify-center gap-2">
                        <Calendar size={14} />
                        <span>{selectedArtist.experience}</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <User size={14} />
                        <span>{selectedArtist.category}</span>
                      </div>
                    </div>

                    <div className="text-2xl font-bold text-neutral-900">
                      {selectedArtist.price}
                    </div>

                    {specialty && (
                      <div className="mt-3">
                        <span className="inline-block px-3 py-1 bg-neutral-100 text-neutral-700 text-xs rounded-full">
                          {specialty}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-200/50">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* User Details Section */}
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-4">
                      Your Details
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Full Name */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User
                            size={18}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400"
                          />
                          <input
                            type="text"
                            value={formData.fullName}
                            onChange={(e) =>
                              handleInputChange('fullName', e.target.value)
                            }
                            className={cn(
                              'w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all duration-200',
                              errors.fullName
                                ? 'border-red-300 focus:ring-red-500'
                                : 'border-neutral-300'
                            )}
                            placeholder="Enter your full name"
                          />
                        </div>
                        {errors.fullName && (
                          <p className="text-red-600 text-sm mt-1">
                            {errors.fullName}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail
                            size={18}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400"
                          />
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              handleInputChange('email', e.target.value)
                            }
                            className={cn(
                              'w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all duration-200',
                              errors.email
                                ? 'border-red-300 focus:ring-red-500'
                                : 'border-neutral-300'
                            )}
                            placeholder="your@email.com"
                          />
                        </div>
                        {errors.email && (
                          <p className="text-red-600 text-sm mt-1">
                            {errors.email}
                          </p>
                        )}
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Phone Number *
                        </label>
                        <div className="relative">
                          <Phone
                            size={18}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400"
                          />
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) =>
                              handleInputChange('phone', e.target.value)
                            }
                            className={cn(
                              'w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all duration-200',
                              errors.phone
                                ? 'border-red-300 focus:ring-red-500'
                                : 'border-neutral-300'
                            )}
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                        {errors.phone && (
                          <p className="text-red-600 text-sm mt-1">
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Booking Details Section */}
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-4">
                      Booking Details
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Selected Artist */}
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Selected Artist
                        </label>
                        <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                          <span className="text-neutral-900">
                            {selectedArtist.name}
                          </span>
                        </div>
                      </div>

                      {/* Category/Subcategory */}
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Category / Subcategory
                        </label>
                        <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                          <span className="text-neutral-900">
                            {selectedArtist.category}{' '}
                            {specialty && `→ ${specialty}`}
                          </span>
                        </div>
                      </div>

                      {/* Price */}
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Price
                        </label>
                        <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                          <span className="text-neutral-900 font-semibold">
                            {selectedArtist.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Schedule Section */}
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-4">
                      Schedule
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Date Picker */}
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Date *
                        </label>
                        <div className="relative">
                          <Calendar
                            size={18}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400"
                          />
                          <input
                            type="date"
                            value={formData.date}
                            onChange={(e) =>
                              handleInputChange('date', e.target.value)
                            }
                            min={new Date().toISOString().split('T')[0]} // Prevent past dates
                            className={cn(
                              'w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all duration-200',
                              errors.date
                                ? 'border-red-300 focus:ring-red-500'
                                : 'border-neutral-300'
                            )}
                          />
                        </div>
                        {errors.date && (
                          <p className="text-red-600 text-sm mt-1">
                            {errors.date}
                          </p>
                        )}
                      </div>

                      {/* Time Picker */}
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Time *
                        </label>
                        <div className="relative">
                          <Clock
                            size={18}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400"
                          />
                          <select
                            value={formData.time}
                            onChange={(e) =>
                              handleInputChange('time', e.target.value)
                            }
                            className={cn(
                              'w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all duration-200',
                              errors.time
                                ? 'border-red-300 focus:ring-red-500'
                                : 'border-neutral-300'
                            )}
                          >
                            <option value="">Select a time</option>
                            {timeSlots.map((time) => (
                              <option key={time} value={time}>
                                {time}
                              </option>
                            ))}
                          </select>
                        </div>
                        {errors.time && (
                          <p className="text-red-600 text-sm mt-1">
                            {errors.time}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <motion.button
                      type="submit"
                      className="flex-1 bg-neutral-900 text-white py-4 px-6 rounded-lg font-medium hover:bg-neutral-800 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Submit Booking
                    </motion.button>

                    <motion.button
                      type="button"
                      onClick={handleCancel}
                      className="flex-1 bg-white text-neutral-900 py-4 px-6 rounded-lg font-medium border border-neutral-300 hover:bg-neutral-50 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Cancel / Go Back
                    </motion.button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Create a dynamic component for the booking content
const DynamicBookingContent = dynamic(() => Promise.resolve(BookingContent), {
  loading: () => (
    <div className="min-h-screen bg-neutral-50 pb-20">
      <Header />
      <section className="pt-24 pb-16 bg-gradient-to-b from-neutral-50 to-white">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 mb-4">
              Book Your{' '}
              <span className="italic font-light">Makeup Session</span>
            </h1>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Loading booking form...
            </p>
          </div>
        </div>
      </section>
    </div>
  ),
  ssr: false,
});

export default function BookingPage() {
  return <DynamicBookingContent />;
}
