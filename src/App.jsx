import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Layout from '@/components/Layout';
import RoutesConfig from '@/config/RoutesConfig';
import { Toaster } from '@/components/ui/toaster';
import { useGradientBackground } from '@/hooks/useGradientBackground';
import PageMeta from '@/components/PageMeta';
import { ThemeProvider } from '@/contexts/ThemeContext';
import WhatsAppButton from '@/components/WhatsAppButton';

function App() {
  useGradientBackground();

  return (
    <HelmetProvider>
      <ThemeProvider>
        <PageMeta />
        <Layout>
          <RoutesConfig />
        </Layout>
        <Toaster />
        <WhatsAppButton />
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;