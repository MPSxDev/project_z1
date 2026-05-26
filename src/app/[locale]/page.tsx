'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import StickyCTA from '@/components/StickyCTA';

// Lazy load below-the-fold components
const ServicesNew = dynamic(() => import('@/components/sections/ServicesNew'), {
  loading: () => <div className="min-h-screen" />,
});

const ValueProps = dynamic(() => import('@/components/sections/ValueProps'), {
  loading: () => <div className="min-h-[400px]" />,
});

const Results = dynamic(() => import('@/components/sections/Results'), {
  loading: () => <div className="min-h-[400px]" />,
});

const Applications = dynamic(() => import('@/components/sections/Applications'), {
  loading: () => <div className="min-h-[400px]" />,
});

const Collaborations = dynamic(() => import('@/components/sections/Collaborations'), {
  loading: () => <div className="min-h-[400px]" />,
});

const ContactForm = dynamic(() => import('@/components/solutions/enterprise/EnterpriseContactForm'), {
  loading: () => <div className="min-h-[400px]" />,
});

const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => <div className="min-h-[400px]" />,
});

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-[#1F5CFF] focus:text-white focus:rounded-full focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>

      <Navbar />
      <StickyCTA />

      {/* Hero - Above the fold */}
      <Hero />

      {/* Main content sections */}
      <main id="main-content">
        {/* Services (Core Capabilities) */}
        <ServicesNew />

        {/* Value Proposition */}
        <ValueProps />

        {/* Results (Transformation Statements) */}
        <Results />

        {/* Applications (High-Demand Environments) */}
        <Applications />

        {/* Collaborations (Company Logos) */}
        <Collaborations />

        {/* Contact Form */}
        <ContactForm />
      </main>

      <Footer />
    </div>
  );
}
