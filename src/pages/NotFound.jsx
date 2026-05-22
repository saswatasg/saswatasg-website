import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileQuestion, ArrowLeft } from 'lucide-react';
import PageMeta from '@/components/PageMeta';

const NotFound = () => {
  return (
    <>
      <PageMeta title="404 - Page Not Found | Saswata S. Sengupta" description="The page you are looking for does not exist or has been moved." noindex={true} />
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white border-2 border-black rounded-2xl p-10 md:p-14 text-center max-w-lg w-full"
          style={{ boxShadow: '10px 10px 0px 0px #0A0A0A' }}
        >
          <div className="w-20 h-20 bg-lemon/40 rounded-2xl border-2 border-black flex items-center justify-center mx-auto mb-5">
            <FileQuestion className="w-10 h-10 text-ink" />
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-coral text-ink text-xs font-bold border-2 border-black mb-3">
            404
          </span>
          <h1 className="text-ink text-2xl md:text-3xl font-display font-black tracking-tight">
            Page Not Found
          </h1>
          <p className="mt-3 text-sm text-ink/70 font-medium max-w-sm mx-auto">
            The page you're looking for doesn't exist, has been removed, or is temporarily unavailable.
          </p>
          <div className="mt-6 flex justify-center">
            <div className="relative inline-flex group">
              <div className="absolute inset-0 rounded-lg border-2 border-black bg-coral translate-x-[3px] translate-y-[3px]" />
              <Link
                to="/"
                className="relative z-10 bg-ink text-white rounded-lg border-2 border-black px-5 py-2.5 text-sm font-bold inline-flex items-center gap-2 min-h-[44px] transition-transform duration-150 group-hover:translate-x-[3px] group-hover:translate-y-[3px]"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default NotFound;
