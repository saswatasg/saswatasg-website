import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import HeroSection from '@/components/home/HeroSection';
import WhatIDoSection from '@/components/home/WhatIDoSection';
import Marquee from '@/components/Marquee';
import TestimonialCarousel from '@/components/home/TestimonialCarousel';
import PageMeta from '@/components/PageMeta';

const Home = () => {
  const [bannerDismissed, setBannerDismissed] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('upcore-banner-dismissed')) {
      setBannerDismissed(true);
    }
  }, []);

  const dismissBanner = () => {
    sessionStorage.setItem('upcore-banner-dismissed', 'true');
    setBannerDismissed(true);
  };

  return (
    <>
      <PageMeta />
      <div className="flex-grow flex flex-col">
        {!bannerDismissed && (
          <div className="w-full bg-lemon border-b-2 border-black py-2 px-4 flex items-center justify-center relative">
            <span className="text-xs font-black text-ink text-center">
              🟡 Currently: Product Manager at Upcore Technologies · Building AI agent discovery pipelines
            </span>
            <button
              onClick={dismissBanner}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-transparent cursor-pointer hover:opacity-60"
              aria-label="Dismiss banner"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
        <HeroSection />
        <div className="mt-6">
          <Marquee />
        </div>
        <TestimonialCarousel />
        <div className="pb-16">
          <WhatIDoSection />
        </div>
      </div>
    </>
  );
};

export default Home;
