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
        <div className="mt-1">
          <Marquee />
        </div>
        <WhatIDoSection />
      </div>
    </>
  );
};

export default Home;
