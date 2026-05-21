import React from 'react';
import { motion } from 'framer-motion';
import { itemVariants } from './animations';

const Card = ({ children, className = '', style = {} }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ y: -2, transition: { duration: 0.15 } }}
    className={`bg-white border-2 border-black rounded-2xl p-6 md:p-8 relative overflow-hidden ${className}`}
    style={style}
  >
    {children}
  </motion.div>
);

export default Card;
