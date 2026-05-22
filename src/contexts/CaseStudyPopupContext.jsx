import React, { createContext, useContext, useState, useCallback } from 'react';
import CaseStudyPopup from '@/components/CaseStudyPopup';

const CaseStudyPopupContext = createContext();

export function CaseStudyPopupProvider({ children }) {
  const [slug, setSlug] = useState(null);

  const openCaseStudy = useCallback((s) => setSlug(s), []);
  const closeCaseStudy = useCallback(() => setSlug(null), []);

  return (
    <CaseStudyPopupContext.Provider value={openCaseStudy}>
      {children}
      {slug && <CaseStudyPopup slug={slug} onClose={closeCaseStudy} />}
    </CaseStudyPopupContext.Provider>
  );
}

export function useCaseStudyPopup() {
  return useContext(CaseStudyPopupContext);
}
