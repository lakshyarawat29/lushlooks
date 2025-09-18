import type React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'LushLooks — Professional makeup artistry for every occasion.',
  description:
    'Expert makeup services for bridal, party, and special events—enhancing your natural beauty.',
  generator: 'v0.app',
  alternates: {
    canonical: 'https://lushlooks.example/',
  },
  openGraph: {
    siteName: 'LushLooks',
    title: 'Professional makeup artistry for every occasion. | LushLooks',
    description:
      'Expert makeup services for bridal, party, and special events—enhancing your natural beauty.',
    type: 'website',
    url: 'https://lushlooks.example/',
    images: [
      {
        url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/opengraph-katachi.jpg-7vz2r3hxZA6woukGOmH115Fg7Piyjs.jpeg',
        alt: 'LushLooks makeup artistry — professional beauty services for every occasion',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Professional makeup artistry for every occasion. | LushLooks',
    description:
      'Expert makeup services for bridal, party, and special events—enhancing your natural beauty.',
    images: [
      {
        url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/opengraph-katachi.jpg-7vz2r3hxZA6woukGOmH115Fg7Piyjs.jpeg',
        alt: 'LushLooks makeup artistry — professional beauty services for every occasion',
      },
    ],
    site: '@lushlooks',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="font-sans bg-neutral-50 text-neutral-900 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
