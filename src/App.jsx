import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Layout from '@/components/Layout';
import RoutesConfig from '@/config/RoutesConfig';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { CaseStudyPopupProvider } from '@/contexts/CaseStudyPopupContext';


function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <CaseStudyPopupProvider>
          <Layout>
            <RoutesConfig />
          </Layout>
        </CaseStudyPopupProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
