import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Briefcase, Code, Mail } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import { useTheme } from '@/contexts/ThemeContext';

const navItems = [
  { name: 'Home', path: '/', icon: <Home className="w-6 h-6" /> },
  { name: 'About', path: '/about', icon: <User className="w-6 h-6" /> },
  { name: 'Experience', path: '/experience', icon: <Briefcase className="w-6 h-6" /> },
  { name: 'Projects', path: '/projects', icon: <Code className="w-6 h-6" /> },
  { name: 'Contact', path: '/contact', icon: <Mail className="w-6 h-6" /> },
];

const mobileMenuVariants = {
  open: {
    clipPath: `circle(150% at 90% 40px)`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  },
  closed: {
    clipPath: 'circle(0px at 90% 40px)',
    transition: {
      delay: 0.2,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
};

const navListVariants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const navItemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState(null);
  const location = useLocation();
  const { theme } = useTheme();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Updated Logo
  const logoImageUrl = "https://i.postimg.cc/Kv5xF852/DP-Linkedin.jpg";

  const navLinkClasses = ({ isActive }) =>
    `relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ease-in-out z-10 ${
      isActive ? 'text-primary-foreground' : 'text-foreground/80 hover:text-foreground'
    }`;

  // Icon color logic: When menu is open, it sits on a dark overlay in many designs, 
  // but specifically we want high contrast. White (text-white) or Primary Foreground works best.
  const iconColorClass = "bg-white"; // Changed from #0f172a to white for high visibility

  return (
    <>
      <header className="hidden md:flex justify-center fixed top-4 left-0 right-0 z-50">
        <motion.nav 
          className="flex items-center gap-4 px-4 py-2 rounded-full shadow-lg"
          style={{
            backgroundColor: theme === 'light' ? 'hsla(40, 5%, 97%, 0.8)' : 'hsla(240, 10%, 4%, 0.8)',
            backdropFilter: 'blur(12px)',
            border: `1px solid ${theme === 'light' ? 'hsla(0, 0%, 0%, 0.08)' : 'hsla(0, 0%, 100%, 0.08)'}`
          }}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.5 }}
          onHoverEnd={() => setHoveredPath(null)}
        >
          <Link to="/" className="flex items-center gap-2" aria-label="Navigate to Homepage">
            <motion.div whileHover={{ scale: 1.05, rotate: -5 }} className="w-10 h-10 overflow-hidden rounded-full border-2 border-primary/20">
               <img src={logoImageUrl} alt="Saswata S. Sengupta Profile Logo" className="w-full h-full object-cover" />
            </motion.div>
          </Link>

          <div className="flex items-center gap-1 relative" onMouseLeave={() => setHoveredPath(null)}>
            {navItems.map((item) => (
              <NavLink 
                key={item.name} 
                to={item.path} 
                className={navLinkClasses}
                onMouseEnter={() => setHoveredPath(item.path)}
              >
                {hoveredPath === item.path && (
                  <motion.div
                    className="absolute inset-0 bg-muted rounded-full"
                    layoutId="hover-bg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                <span className="relative z-10">{item.name}</span>
                {location.pathname === item.path && (
                  <motion.div
                    className="absolute inset-0 bg-primary rounded-full"
                    layoutId="active-pill"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
              </NavLink>
            ))}
          </div>

          <div className="pl-2 border-l border-border/50">
            <ThemeToggle />
          </div>
        </motion.nav>
      </header>

      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 pointer-events-none">
        <Link to="/" className="flex items-center gap-2 z-50 pointer-events-auto bg-background/80 backdrop-blur-md rounded-full p-1 shadow-sm border border-border/40" aria-label="Navigate to Homepage">
            <motion.div whileHover={{ scale: 1.05, rotate: -5 }} className="w-10 h-10 overflow-hidden rounded-full">
               <img src={logoImageUrl} alt="Saswata S. Sengupta Profile Logo" className="w-full h-full object-cover" />
            </motion.div>
        </Link>
        <motion.nav
          initial={false}
          animate={isOpen ? 'open' : 'closed'}
          className={`fixed top-0 right-0 bottom-0 w-full ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        >
          <motion.div className="absolute inset-0 bg-background/95 backdrop-blur-lg" variants={mobileMenuVariants} />
          
          <AnimatePresence>
            {isOpen && (
              <motion.ul variants={navListVariants} className="absolute grid w-full gap-8 p-8 top-24">
                {navItems.map(item => (
                  <motion.li key={item.path} variants={navItemVariants} className="list-none">
                    <NavLink to={item.path} className="flex items-center gap-4 text-3xl font-bold text-foreground hover:text-primary transition-colors" onClick={toggleMenu}>
                      <span className="p-2 bg-primary/10 rounded-full text-primary">
                        {React.cloneElement(item.icon, { strokeWidth: 2 })}
                      </span>
                      {item.name}
                    </NavLink>
                  </motion.li>
                ))}
                 <motion.li variants={navItemVariants}>
                  <div className="pt-8 flex justify-center border-t border-border/50">
                    <ThemeToggle />
                  </div>
                 </motion.li>
              </motion.ul>
            )}
          </AnimatePresence>
        </motion.nav>
        
        {/* Improved Hamburger Button - Changed color to white for contrast */}
        <button 
          onClick={toggleMenu} 
          className="pointer-events-auto w-12 h-12 rounded-full flex items-center justify-center bg-primary z-50 shadow-lg border border-primary/20 hover:bg-primary/90 transition-all relative" 
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
            <motion.div
              animate={isOpen ? "open" : "closed"}
              variants={{
                open: { rotate: 45, y: 0 },
                closed: { rotate: 0, y: -7 },
              }}
              transition={{ duration: 0.2 }}
              className={`absolute h-[2.5px] w-6 ${iconColorClass} rounded-full`}
            />
            <motion.div
              animate={isOpen ? "open" : "closed"}
              variants={{
                open: { opacity: 0, scale: 0 },
                closed: { opacity: 1, scale: 1 },
              }}
              transition={{ duration: 0.2 }}
              className={`absolute h-[2.5px] w-6 ${iconColorClass} rounded-full`}
            />
            <motion.div
              animate={isOpen ? "open" : "closed"}
              variants={{
                open: { rotate: -45, y: 0 },
                closed: { rotate: 0, y: 7 },
              }}
              transition={{ duration: 0.2 }}
              className={`absolute h-[2.5px] w-6 ${iconColorClass} rounded-full`}
            />
        </button>
      </header>
    </>
  );
};

export default Header;