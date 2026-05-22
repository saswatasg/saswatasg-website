import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Calendar } from 'lucide-react';
import { openScheduleBooking } from '@/utils/openCalendar';

const navItems = [
  { name: 'About', path: '/about' },
  { name: 'Experience', path: '/experience' },
  { name: 'Projects', path: '/projects' },
  { name: 'Case Studies', path: '/case-studies' },
  { name: 'Contact', path: '/contact' },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <header className="hidden md:flex fixed top-0 left-0 right-0 z-50 bg-white border-b-2 border-black">
        <div className="max-w-[1200px] mx-auto w-full flex items-center justify-between px-4 md:px-6 h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-2" aria-label="Home">
            <span className="font-display font-black text-lg tracking-tight text-ink bg-lemon px-2 py-0.5 rounded-lg border-2 border-black -rotate-1 inline-block hover:scale-105 hover:-rotate-2 transition-all duration-200">
              Home
            </span>
          </Link>

          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `px-3 py-1.5 text-sm font-bold rounded-lg border-2 transition-all ${
                    (isActive || (item.path === '/case-studies' && location.pathname.startsWith('/case-studies')))
                      ? 'bg-ink text-white border-black'
                      : 'text-ink/60 border-transparent hover:text-ink hover:border-black'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative inline-flex group">
              <div className="absolute inset-0 rounded-lg border-2 border-black bg-coral translate-x-[3px] translate-y-[3px]" />
              <button
                onClick={openScheduleBooking}
                className="relative z-10 bg-ink text-white rounded-lg border-2 border-black px-4 py-2 text-sm font-bold min-h-[44px] inline-flex items-center gap-2 transition-transform duration-150 group-hover:translate-x-[3px] group-hover:translate-y-[3px]"
              >
                Book a Call
              </button>
            </div>
          </div>
        </div>
      </header>

      <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b-2 border-black">
        <div className="flex items-center justify-between px-4 h-14">
          <Link to="/" className="flex items-center gap-2" aria-label="Home">
            <span className="font-display font-black text-base text-ink bg-lemon px-2 py-0.5 rounded-lg border-2 border-black inline-block hover:scale-105 transition-all duration-200">
              Home
            </span>
          </Link>

          <div className="relative inline-flex group">
            <div className="absolute inset-0 rounded-lg border-2 border-black bg-coral translate-x-[3px] translate-y-[3px]" />
            <motion.button
              onClick={toggleMenu}
              className="relative z-10 w-11 h-11 min-w-[44px] min-h-[44px] rounded-lg flex items-center justify-center bg-ink text-white border-2 border-black transition-transform duration-150 group-hover:translate-x-[3px] group-hover:translate-y-[3px]"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute inset-x-0 top-14 bg-white border-b-2 border-black px-4 pb-4"
            >
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `px-4 py-3 rounded-lg text-sm font-bold border-2 transition-all ${
                        isActive ? 'bg-ink text-white border-black' : 'text-ink/70 border-transparent hover:border-black'
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
                <button
                  onClick={() => { openScheduleBooking(); setIsOpen(false); }}
                  className="bg-ink text-white rounded-lg border-2 border-black px-4 py-3 text-sm font-bold text-center mt-2 hover:bg-white hover:text-ink transition-all duration-200 flex items-center justify-center gap-2 w-full"
                >
                  <Calendar className="w-4 h-4" />
                  Book a Call
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>


    </>
  );
};

export default Header;
