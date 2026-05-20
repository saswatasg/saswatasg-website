import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Stickman from '@/components/Stickman';
import ChatBot from '@/components/WhatsAppChat';
import { Toaster } from '@/components/ui/toaster';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <a href="#main-content" className="skip-link hover:bg-ink hover:text-white transition-colors duration-200">
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-grow flex flex-col">
        {children}
      </main>
      <Stickman />
      <ChatBot />
      <Footer />
      <Toaster />
    </div>
  );
};

export default Layout;
