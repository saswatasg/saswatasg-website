import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageSquare, Copy, ExternalLink } from 'lucide-react';

const WhatsAppModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handler = () => setIsOpen(true);
    window.addEventListener('openWhatsApp', handler);
    return () => window.removeEventListener('openWhatsApp', handler);
  }, []);

  const handleOpen = () => {
    window.open('https://wa.me/919836312162', '_blank');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText('+91 9836312162');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white border-2 border-black rounded-2xl w-full max-w-[400px] overflow-hidden relative"
            style={{ boxShadow: '10px 10px 0px 0px #0A0A0A' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between bg-[#25D366] text-white px-5 py-3 border-b-2 border-black">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                <span className="font-bold text-sm">WhatsApp</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:text-white/70 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#25D366]/10 flex items-center justify-center border-2 border-black">
                <MessageSquare className="w-8 h-8 text-[#25D366]" />
              </div>
              <p className="font-bold text-ink mb-1">Chat with me on WhatsApp</p>
              <p className="text-sm text-ink/60 font-medium mb-5">I usually respond within a few hours.</p>

              <div className="bg-canvas border-2 border-black rounded-xl p-4 mb-4">
                <p className="text-xs font-bold text-ink/50 mb-1">Phone number</p>
                <p className="text-lg font-black text-ink">+91 9836312162</p>
                <button
                  onClick={handleCopy}
                  className="mt-2 text-xs font-bold text-purple hover:text-ink transition-colors inline-flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" /> Copy number
                </button>
              </div>

              <div className="relative inline-flex group w-full">
                <div className="absolute inset-0 rounded-lg border-2 border-black bg-[#25D366] translate-x-[3px] translate-y-[3px]" />
                <button
                  onClick={handleOpen}
                  className="relative z-10 bg-white text-ink rounded-lg border-2 border-black px-5 py-3 text-sm font-bold w-full inline-flex items-center justify-center gap-2 transition-transform duration-150 group-hover:translate-x-[3px] group-hover:translate-y-[3px]"
                >
                  Open WhatsApp <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WhatsAppModal;
