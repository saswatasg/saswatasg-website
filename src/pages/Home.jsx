import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import WhatIDoSection from '@/components/home/WhatIDoSection';
import PageMeta from '@/components/PageMeta';

const Home = () => {
  return (
    <>
      <PageMeta />
      <div className="home-page-wrapper flex-grow flex flex-col">
        <HeroSection />
        <WhatIDoSection />
      </div>
    </>
  );
};

export default Home;
