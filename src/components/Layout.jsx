import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CursorFollower from '@/components/CursorFollower';
import { Toaster } from '@/components/ui/toaster';

const Layout = ({ children }) => {
  const location = useLocation();

  const isContactPage = location.pathname === '/contact';

  return (
    <div className={`min-h-screen flex flex-col`}>
      <CursorFollower />
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className={`container mx-auto pt-24 md:pt-32 flex-grow flex flex-col ${isContactPage ? 'pb-24 md:pb-0' : ''}`}>
        {children}
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Layout;