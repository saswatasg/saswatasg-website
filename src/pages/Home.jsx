import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import WhatIDoSection from '@/components/home/WhatIDoSection';
import Marquee from '@/components/Marquee';
import PageMeta from '@/components/PageMeta';

const Home = () => {
  return (
    <>
      <PageMeta />
      <div className="flex-grow flex flex-col">
        <HeroSection />
        <div className="mt-6">
          <Marquee />
        </div>
        <div className="mt-6 pb-16">
          <WhatIDoSection />
        </div>
      </div>
    </>
  );
};

export default Home;
