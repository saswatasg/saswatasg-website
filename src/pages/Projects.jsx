import React from 'react';
import { Navigate } from 'react-router-dom';

// Merged into /work — kept as a redirect so old links and SEO keep working.
export default function Projects() {
  return <Navigate to="/work" replace />;
}
