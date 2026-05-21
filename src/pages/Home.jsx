import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import HeroSection from '@/components/home/HeroSection';
import WhatIDoSection from '@/components/home/WhatIDoSection';
import Marquee from '@/components/Marquee';
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
        <div className="w-full bg-white border-y-2 border-black py-5">
          <div className="max-w-[1200px] mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-0">
            <div className="text-center">
              <div className="font-display font-black text-2xl md:text-3xl text-ink text-center">$594K / mo</div>
              <p className="text-xs font-bold text-ink/40 text-center mt-0.5">Revenue impact · Sierra Living</p>
            </div>
            <div className="hidden md:block h-10 w-px bg-ink/10 mx-10" />
            <div className="text-center">
              <div className="font-display font-black text-2xl md:text-3xl text-ink text-center">17 : 1</div>
              <p className="text-xs font-bold text-ink/40 text-center mt-0.5">Adoption gap diagnosed · LiveKeeping</p>
            </div>
            <div className="hidden md:block h-10 w-px bg-ink/10 mx-10" />
            <div className="text-center">
              <div className="font-display font-black text-2xl md:text-3xl text-ink text-center">478 / mo</div>
              <p className="text-xs font-bold text-ink/40 text-center mt-0.5">Webinar sign-ups · Upcore</p>
            </div>
          </div>
        </div>
        <div className="mt-6 pb-16">
          <WhatIDoSection />
        </div>
      </div>
    </>
  );
};

export default Home;
