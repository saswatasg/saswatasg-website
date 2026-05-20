import React from 'react';
import { useLocation, Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const quickLinks = [
    { to: "/about", label: "About Me" },
    { to: "/experience", label: "Experience" },
    { to: "/projects", label: "Projects" },
    { to: "/contact", label: "Contact" }
  ];

  return (
    <footer className={`container mx-auto px-6 py-8 mt-16 border-t border-border/30 ${isHomePage ? 'text-foreground/80' : 'text-gray-400'}`}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 pt-8">
        {quickLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="flex items-center justify-center p-3 rounded-lg transition-all duration-300 text-foreground/80 hover:text-primary hover:bg-primary/5 font-normal"
          >
            {link.label}
          </Link>
        ))}
      </div>
      <div className="text-center">
        <p>© {currentYear} Saswata S. Sengupta. All rights reserved.</p>
        <p className="text-sm mt-2 text-muted-foreground">Product Manager. Problem Solver. Builder.</p>
      </div>
    </footer>
  );
}

export default Footer;
