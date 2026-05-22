import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Layout from '@/components/Layout';
import RoutesConfig from '@/config/RoutesConfig';
import { ThemeProvider } from '@/contexts/ThemeContext';


function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Layout>
          <RoutesConfig />
        </Layout>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
