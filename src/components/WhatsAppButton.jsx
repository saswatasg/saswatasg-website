import React from 'react';
import { motion } from 'framer-motion';
import { WhatsappIcon } from '@/components/WhatsappIcon';

const WhatsAppButton = () => {
  const message = "Hi Saswata, I found you via your website. Would love to connect!";
  const encodedMessage = encodeURIComponent(message);
  const whatsappLink = `https://wa.me/918777875140?text=${encodedMessage}`;

  return (
    <motion.a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1 }}
      whileHover={{ scale: 1.1, rotate: 10 }}
      whileTap={{ scale: 0.9 }}
    >
      <WhatsappIcon className="w-7 h-7 text-white" />
    </motion.a>
  );
};

export default WhatsAppButton;
