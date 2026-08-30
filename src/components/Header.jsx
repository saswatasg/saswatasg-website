import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, Calendar } from 'lucide-react';
import { openScheduleBooking } from '@/utils/openCalendar';
import { trackEvent } from '@/utils/analytics';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';

const navItems = [
  { name: 'About', path: '/about' },
  { name: 'Experience', path: '/experience' },
  { name: 'Projects', path: '/projects' },
  { name: 'Case Studies', path: '/case-studies' },
  { name: 'Blog', path: '/blog' },
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
                onClick={() => trackEvent('navigation', 'nav_click', item.name)}
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
            <Link
              to="/pay"
              onClick={() => trackEvent('navigation', 'pay')}
              className="px-4 py-2 text-sm font-black rounded-lg border-2 border-black bg-white text-ink hover:bg-lemon transition-colors min-h-[44px] inline-flex items-center"
            >
              Pay
            </Link>
            <div className="relative inline-flex group">
              <div className="absolute inset-0 rounded-lg border-2 border-black bg-coral translate-x-[3px] translate-y-[3px]" />
              <button
                onClick={() => { trackEvent('navigation', 'book_a_call'); openScheduleBooking(); }}
                className="relative z-10 bg-ink text-white rounded-lg border-2 border-black px-4 py-2 text-sm font-bold min-h-[44px] inline-flex items-center gap-2 transition-transform duration-150 group-hover:translate-x-[3px] group-hover:translate-y-[3px]"
              >
                Book a Call
              </button>
            </div>
          </div>
        </div>
      </header>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b-2 border-black">
          <div className="flex items-center justify-between px-4 h-14">
            <Link to="/" className="flex items-center gap-2" aria-label="Home">
              <span className="font-display font-black text-base text-ink bg-lemon px-2 py-0.5 rounded-lg border-2 border-black inline-block hover:scale-105 transition-all duration-200">
                Home
              </span>
            </Link>

            <SheetTrigger asChild>
              <button
                onClick={toggleMenu}
                aria-expanded={isOpen}
                aria-controls="mobile-nav"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-lg flex items-center justify-center bg-ink text-white border-2 border-black hover:bg-ink/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
              >
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>
          </div>
        </header>

        <SheetContent side="top" id="mobile-nav" aria-label="Mobile navigation" className="bg-white border-b-2 border-black p-0 pt-14 [&>button]:hidden">
          <nav className="flex flex-col gap-1 p-4" aria-label="Primary">
            {navItems.map((item) => (
              <SheetClose asChild key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={() => trackEvent('navigation', 'mobile_nav_click', item.name)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-lg text-sm font-bold border-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink ${
                      isActive ? 'bg-ink text-white border-black' : 'text-ink border-transparent hover:border-black'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </SheetClose>
            ))}
            <SheetClose asChild>
              <Link
                to="/pay"
                onClick={() => trackEvent('navigation', 'mobile_pay')}
                className="bg-white text-ink rounded-lg border-2 border-black px-4 py-3 text-sm font-black text-center mt-2 hover:bg-lemon transition-colors flex items-center justify-center gap-2 w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
              >
                Pay
              </Link>
            </SheetClose>
            <button
              onClick={() => { trackEvent('navigation', 'mobile_book_a_call'); openScheduleBooking(); setIsOpen(false); }}
              className="bg-ink text-white rounded-lg border-2 border-black px-4 py-3 text-sm font-bold text-center mt-2 hover:bg-white hover:text-ink transition-all duration-200 flex items-center justify-center gap-2 w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
            >
              <Calendar className="w-4 h-4" />
              Book a Call
            </button>
          </nav>
        </SheetContent>
      </Sheet>


    </>
  );
};

export default Header;
