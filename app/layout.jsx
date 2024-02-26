import Script from 'next/script'
import { Raleway } from 'next/font/google';
import { twMerge } from 'tailwind-merge';
import { ClerkProvider } from '@clerk/nextjs';

import './globals.css';
import ToastProvider from '@/contexts/ToastProvider';

const raleway = Raleway({ subsets: ['latin'] });

export const metadata = {
  title: 'Know Yourself',
  description:
    'Welcome to Know Yourself - where self-discovery meets AI-driven guidance. Our mission is to empower you with personalized insights and recommendations to enhance your daily life. Experience a blend of empathy, curiosity, and innovative technology, designed to help you make informed decisions and achieve personal growth. Engage with an AI companion that understands your needs, offering a supportive, ethical, and adaptive environment. Dive into a world of intuitive, inclusive, and continuously evolving interactions, all aimed at promoting your well-being. Join us in our journey towards a happier, healthier, and more meaningful life with technology as your ally.',
};

export const viewport = {
  viewportFit: 'cover',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang='en' className='light'>
        <body
          className={twMerge(
            'bg-gradient-background bg-no-repeat bg-cover text-white min-h-screen',
            raleway.className
          )}
        >
          <ToastProvider />
          {children}
        </body>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-03N6S72LY2" />
        <Script id="google-analytics-tag">{`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-03N6S72LY2');`}</Script>
      </html>
    </ClerkProvider>
  );
}
