import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Briefcase, Code, Mail, Calendar, ArrowRight } from 'lucide-react';

const navItems = [
  { name: 'Home', path: '/', icon: <Home className="w-6 h-6" /> },
  { name: 'About', path: '/about', icon: <User className="w-6 h-6" /> },
  { name: 'Experience', path: '/experience', icon: <Briefcase className="w-6 h-6" /> },
  { name: 'Projects', path: '/projects', icon: <Code className="w-6 h-6" /> },
  { name: 'Contact', path: '/contact', icon: <Mail className="w-6 h-6" /> },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const logoImageUrl = "https://i.postimg.cc/Kv5xF852/DP-Linkedin.jpg";

  return (
    <>
      <header className="hidden md:flex justify-center fixed top-0 left-0 right-0 z-50 bg-canvas">
        <motion.nav
          className="flex items-center justify-between w-full max-w-[1200px] mx-auto mt-4 bg-white rounded-pill px-6 py-3 border border-ink/5"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.5 }}
        >
          <Link to="/" className="flex items-center gap-2" aria-label="Navigate to Homepage">
            <motion.div whileHover={{ scale: 1.05, rotate: -5 }} className="w-10 h-10 overflow-hidden rounded-full">
              <img
                src={logoImageUrl}
                alt="Saswata S. Sengupta Profile Logo"
                className="w-full h-full object-cover"
                style={{ clipPath: 'polygon(8% 0, 100% 4%, 92% 88%, 70% 100%, 18% 94%, 0 60%, 4% 20%)' }}
              />
            </motion.div>
            <span className="font-display font-bold text-sm">Saswata</span>
          </Link>

          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink key={item.name} to={item.path} className={({ isActive }) =>
                `relative px-3 py-1.5 text-sm font-medium transition-colors ${
                  isActive ? 'text-ink' : 'text-ink/60 hover:text-ink'
                }`
              }>
                {({ isActive }) => (
                  <>
                    <span className="relative z-10">{item.name}</span>
                    {isActive && (
                      <motion.div layoutId="nav-underline" className="absolute inset-x-2 bottom-0 h-0.5 bg-lemon rounded-full" transition={{ type: 'spring', stiffness: 300, damping: 25 }} />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <motion.a
            href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0ibq0OoR_jlsEkRC4bqMHktw4l2xPn-cgO1GY7xCqhA63VxmyJa2KgMdevw1coatF5CpBaLy6i?gv=true"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-lemon text-ink rounded-pill px-5 py-2.5 font-medium text-sm flex items-center gap-2"
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Calendar className="w-4 h-4" />
            Book a Call
          </motion.a>
        </motion.nav>
      </header>

      <header className="md:hidden fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between p-4">
          <Link to="/" className="flex items-center gap-2 bg-white rounded-pill px-4 py-2 border border-ink/5" aria-label="Navigate to Homepage">
            <div className="w-8 h-8 overflow-hidden rounded-full">
              <img src={logoImageUrl} alt="" className="w-full h-full object-cover" style={{ clipPath: 'polygon(8% 0, 100% 4%, 92% 88%, 70% 100%, 18% 94%, 0 60%, 4% 20%)' }} />
            </div>
            <span className="font-display font-bold text-xs">Saswata</span>
          </Link>

          <motion.button
            onClick={toggleMenu}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-lemon text-ink"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex flex-col gap-1 items-center">
              <motion.div animate={isOpen ? { rotate: 45, y: 3 } : { rotate: 0, y: 0 }} className="w-5 h-0.5 bg-ink rounded-full" />
              <motion.div animate={isOpen ? { opacity: 0 } : { opacity: 1 }} className="w-5 h-0.5 bg-ink rounded-full" />
              <motion.div animate={isOpen ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }} className="w-5 h-0.5 bg-ink rounded-full" />
            </div>
          </motion.button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute inset-x-4 top-20 bg-white rounded-card p-6 border border-ink/5 shadow-lg"
            >
              <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <NavLink key={item.path} to={item.path} className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-pill text-base font-medium transition-colors ${
                      isActive ? 'bg-lemon text-ink' : 'text-ink/70 hover:bg-ink/5'
                    }`
                  }>
                    {item.icon}
                    {item.name}
                  </NavLink>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;
