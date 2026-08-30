import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Layout from '@/components/Layout';
import RoutesConfig from '@/config/RoutesConfig';
import { ThemeProvider } from '@/contexts/ThemeContext';
import ErrorBoundary from '@/components/ErrorBoundary';


function App({ helmetContext }) {
  return (
    <HelmetProvider context={helmetContext}>
      <ThemeProvider>
        <ErrorBoundary>
          <Layout>
            <RoutesConfig />
          </Layout>
        </ErrorBoundary>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
