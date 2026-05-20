import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const defaultMeta = {
  title: "Saswata S. Sengupta | Product Manager — Building Products That Move Metrics",
  description: "Product Manager with experience across B2B SaaS, D2C, and e-commerce. I ship products that solve real problems — from AI agent discovery to cart checkout redesigns.",
  ogTitle: "Saswata S. Sengupta | Product Manager",
  ogDescription: "Product Manager with experience across B2B SaaS, D2C, and e-commerce. I ship products that solve real problems.",
  twitterTitle: "Saswata S. Sengupta | Product Manager",
  twitterDescription: "Product Manager shipping products across B2B SaaS, D2C, and e-commerce."
};

const pageSpecificMeta = {
  '/': {
    title: "Saswata S. Sengupta | Product Manager — Building Products That Move Metrics",
    description: "Product Manager with experience across B2B SaaS, D2C, and e-commerce. I ship products that solve real problems — from AI agent discovery to cart checkout redesigns."
  },
  '/about': {
    title: "About Me | Saswata S. Sengupta — Product Manager",
    description: "Product Manager with a mix of product management, growth, and data analytics experience across B2B SaaS, D2C, and e-commerce. IIT Jodhpur MBA."
  },
  '/experience': {
    title: "Professional Background | Saswata S. Sengupta",
    description: "Product management experience across Upcore Technologies (AI agents), Sierra Living Concepts (D2C), and LiveKeeping (B2B SaaS)."
  },
  '/projects': {
    title: "Projects | Saswata S. Sengupta — Product Work",
    description: "Product work across B2B SaaS and D2C — every project grounded in a real problem, a real approach, and a real outcome."
  },
  '/contact': {
    title: "Contact | Saswata S. Sengupta",
    description: "Get in touch with Saswata S. Sengupta for collaborations, opportunities, or just to say hello."
  }
};

const PageMeta = ({ title, description, noindex = false }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const baseMeta = pageSpecificMeta[currentPath] || defaultMeta;
  const finalTitle = title || baseMeta.title;
  const finalDescription = description || baseMeta.description;

  const siteUrl = "https://saswatasg.com/";
  
  const cleanPath = currentPath === '/' ? '' : currentPath.replace(/^\//, '').replace(/\/$/, '');
  const finalUrl = `${siteUrl}${cleanPath ? cleanPath + '/' : ''}`;
  
  const ogImage = "https://i.postimg.cc/Kv5xF852/DP-Linkedin.jpg";

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <link rel="canonical" href={finalUrl} />
      {noindex && <meta name="robots" content="noindex" />}
      
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Saswata S. Sengupta" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};

export default PageMeta;
