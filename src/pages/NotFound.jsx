import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileQuestion, ArrowLeft } from 'lucide-react';
import PageMeta from '@/components/PageMeta';

const NotFound = () => {
  return (
    <>
      <PageMeta title="404 - Page Not Found | Saswata S. Sengupta" description="The page you are looking for does not exist or has been moved." noindex={true} />
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <div className="w-24 h-24 bg-lemon/30 rounded-full flex items-center justify-center mb-6 text-ink border border-ink/10">
            <FileQuestion className="w-12 h-12" />
          </div>
          <h1 className="text-ink">Page Not Found</h1>
          <p className="mt-4 max-w-md mb-8">
            The page you're looking for doesn't exist, has been removed, or is temporarily unavailable.
          </p>
          <Link to="/" className="bg-ink text-white rounded-pill px-6 py-3 text-sm font-medium inline-flex items-center gap-2 hover:bg-lemon hover:text-ink transition-all duration-200">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </motion.div>
      </div>
    </>
  );
};

export default NotFound;
