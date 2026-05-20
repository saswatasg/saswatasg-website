import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30
};

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const isLight = theme === 'light';

  const toggleTheme = () => {
    setTheme(isLight ? 'dark' : 'light');
  };

  return (
    <div
      className={`relative flex items-center w-14 h-8 rounded-full cursor-pointer transition-colors duration-300 ${
        isLight ? 'bg-primary/20' : 'bg-muted/80'
      }`}
      onClick={toggleTheme}
      data-ison={!isLight}
      aria-label={`Switch to ${isLight ? 'dark' : 'light'} mode`}
    >
      <motion.div
        className="absolute flex items-center justify-center w-6 h-6 rounded-full bg-card shadow-md"
        layout
        transition={spring}
        style={{
          left: isLight ? '4px' : 'calc(100% - 28px)',
        }}
      >
        {isLight 
          ? <Sun className="w-4 h-4 text-yellow-500" />
          : <Moon className="w-4 h-4 text-primary" />
        }
      </motion.div>
    </div>
  );
};

export default ThemeToggle;