import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Github, Twitter } from 'lucide-react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ink text-white mt-auto border-t-4 border-coral">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-10">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="font-display font-black text-xl tracking-tight text-white bg-coral px-2 py-0.5 rounded-lg border-2 border-white inline-block -rotate-1 hover:scale-105 hover:-rotate-2 transition-all duration-200">
              Saswata
            </Link>
            <p className="text-sm text-white/60 font-medium mt-2 max-w-[200px]">
              Product Manager shipping outcomes that move revenue.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-display font-bold text-white mb-3 border-b-2 border-white/20 pb-1">Pages</h4>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Home' },
                { to: '/about', label: 'About' },
                { to: '/experience', label: 'Experience' },
                { to: '/projects', label: 'Projects' },
                { to: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-white/60 hover:text-white font-medium transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-display font-bold text-white mb-3 border-b-2 border-white/20 pb-1">Connect</h4>
            <ul className="space-y-2">
              {[
                { href: 'https://linkedin.com/in/sss99', label: 'LinkedIn' },
                { href: 'https://github.com/saswatasg', label: 'GitHub' },
                { href: 'https://twitter.com/saswatasg', label: 'Twitter' },
                { href: 'https://wa.me/919836312162', label: 'WhatsApp', handler: 'whatsapp' },
              ].map((link) => (
                <li key={link.label}>
                  {link.handler === 'whatsapp' ? (
                    <button
                      onClick={() => window.dispatchEvent(new CustomEvent('openWhatsApp'))}
                      className="text-sm text-white/60 hover:text-white font-medium transition-colors"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 hover:text-white font-medium transition-colors">
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-display font-bold text-white mb-3 border-b-2 border-white/20 pb-1">Resources</h4>
            <ul className="space-y-2">
              {[
                { href: '/assets/resume.pdf', label: 'Resume' },
                { href: 'mailto:saswatasg@gmail.com', label: 'saswatasg@gmail.com' },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 hover:text-white font-medium transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t-2 border-white/10">
          <p className="text-xs font-bold text-white/40">© {currentYear} Saswata S. Sengupta. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {[
              { icon: Linkedin, href: 'https://linkedin.com/in/sss99', label: 'LinkedIn' },
              { icon: Github, href: 'https://github.com/saswatasg', label: 'GitHub' },
              { icon: Twitter, href: 'https://twitter.com/saswatasg', label: 'Twitter' },
            ].map((social) => (
              <a key={social.href} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={`Visit my ${social.label} profile`} className="text-white/40 hover:text-coral transition-colors border-2 border-transparent hover:border-coral rounded-lg p-1.5">
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
