import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Github, Twitter } from 'lucide-react';

const linkColumns = [
  {
    title: "Pages",
    links: [
      { to: "/", label: "Home" },
      { to: "/about", label: "About" },
      { to: "/experience", label: "Experience" },
      { to: "/projects", label: "Projects" },
      { to: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Connect",
    links: [
      { href: "https://linkedin.com/in/sss99", label: "LinkedIn" },
      { href: "https://github.com/sss99", label: "GitHub" },
      { href: "https://twitter.com/saswatasg", label: "Twitter" },
      { href: "https://wa.me/918777875140", label: "WhatsApp" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "https://drive.google.com/file/d/1cRaGUx3cvEYShMD67zLQIK4UxdPi6p-o/view", label: "Resume" },
      { href: "mailto:hi@saswatasg.com", label: "hi@saswatasg.com" },
    ],
  },
];

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-canvas mt-16">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-10">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="font-display font-black text-xl tracking-tight text-ink">
              Saswata
            </Link>
            <p className="text-sm text-ink/60 mt-2 max-w-[200px]">
              Product Manager. Problem Solver. Builder.
            </p>
          </div>
          {linkColumns.map((column) => (
            <div key={column.title}>
              <h4 className="text-sm font-display font-bold text-ink mb-3">{column.title}</h4>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.to ? (
                      <Link to={link.to} className="text-sm text-ink/60 hover:text-ink transition-colors">
                        {link.label}
                      </Link>
                    ) : (
                      <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm text-ink/60 hover:text-ink transition-colors">
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-ink/10">
          <p className="text-xs text-ink/40">© {currentYear} Saswata S. Sengupta. All rights reserved.</p>
          <div className="flex items-center gap-5">
            {[
              { icon: Linkedin, href: "https://linkedin.com/in/sss99" },
              { icon: Github, href: "https://github.com/sss99" },
              { icon: Twitter, href: "https://twitter.com/saswatasg" },
            ].map((social) => (
              <a key={social.href} href={social.href} target="_blank" rel="noopener noreferrer" className="text-ink/40 hover:text-ink transition-colors">
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
