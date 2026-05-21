import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Phone, Mail, Globe, MapPin, Copy, ExternalLink, ChevronRight, Eye, EyeOff, MessageSquare, Linkedin, Instagram, Facebook, FileText, Download, Calendar, X } from 'lucide-react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const XIcon = (props) => (
  <svg {...props} viewBox="0 0 1200 1227" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1058.01 1148.81H895.408L569.165 687.854V687.828Z" fill="currentColor"/>
  </svg>
);

const socialLinks = [
  { name: 'WhatsApp', icon: MessageSquare, handler: 'whatsapp', color: 'hover:text-[#25D366]' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/in/sss99', color: 'hover:text-[#0A66C2]' },
  { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/saswatasg99/', color: 'hover:text-[#E4405F]' },
  { name: 'Twitter', icon: XIcon, href: 'https://twitter.com/saswatasg', color: 'hover:text-ink' },
  { name: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/saswatasubhra.sengupta', color: 'hover:text-[#1877F2]' },
];

const ContactPanel = ({ custom }) => {
  const { toast } = useToast();
  const [phoneVisible, setPhoneVisible] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(true);
  const phoneNumber = '+91 87778 75140';

  useEffect(() => {
    if (!showCalendar) {
      setIframeLoading(true);
      setIframeError(false);
      return;
    }
    const timer = setTimeout(() => {
      setIframeLoading(false);
      setIframeError(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, [showCalendar]);
  const isMobile = useMediaQuery("(max-width: 640px)");

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    toast({ title: `${type} copied!`, description: 'Copied to your clipboard.', duration: 1500 });
  };

  const handleWhatsApp = () => {
    window.dispatchEvent(new CustomEvent('openWhatsApp'));
  };

  const handleRevealPhone = () => {
    setPhoneVisible(true);
    if (!isMobile) handleCopy(phoneNumber, 'Number');
  };

  const ContactItem = ({ icon, label, value, href, onCopy, isReveal, onReveal, isRevealed, children }) => (
    <div className="group flex items-center justify-between py-4 border-b border-ink/10 last:border-b-0">
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0 w-8 text-ink/60">{icon}</div>
        <div>
          <p className="text-sm text-ink/60">{label}</p>
          {children ? children : (
            <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium text-ink hover:underline">{value}</a>
          )}
        </div>
      </div>
      {onCopy && <button onClick={onCopy} className="h-8 w-8 flex items-center justify-center opacity-0 group-hover:opacity-100 text-ink/40 hover:text-ink transition-all"><Copy className="h-4 w-4" /></button>}
      {isReveal && !isRevealed && <button onClick={onReveal} className="h-8 w-8 flex items-center justify-center text-ink/40 hover:text-ink"><Eye className="h-4 w-4" /></button>}
      {href && !onCopy && !isReveal && <ExternalLink className="h-4 w-4 text-ink/30 transition-transform group-hover:scale-110" />}
    </div>
  );

  const PhoneActionContent = () => (
    <>
      <p className="font-medium text-ink text-lg text-center">{phoneNumber}</p>
      <div className="grid grid-cols-3 gap-2 pt-4">
        <a href={`tel:${phoneNumber}`} className="bg-white border-2 border-ink text-ink rounded-pill px-4 py-2 text-sm font-medium uppercase tracking-wide hover:bg-ink hover:text-white transition-all duration-200 inline-flex items-center justify-center gap-2"><Phone className="h-4 w-4" /> Call</a>
        <button onClick={handleWhatsApp} className="bg-white border-2 border-ink text-ink rounded-pill px-4 py-2 text-sm font-medium uppercase tracking-wide hover:bg-ink hover:text-white transition-all duration-200 inline-flex items-center justify-center gap-2"><MessageSquare className="h-4 w-4" /> WhatsApp</button>
        <button onClick={() => handleCopy(phoneNumber, 'Number')} className="bg-white border-2 border-ink text-ink rounded-pill px-4 py-2 text-sm font-medium uppercase tracking-wide hover:bg-ink hover:text-white transition-all duration-200 inline-flex items-center justify-center gap-2"><Copy className="h-4 w-4" /> Copy</button>
      </div>
    </>
  );

  return (
    <div className="bg-canvas rounded-card p-8 md:p-10 border border-ink/10 h-full flex flex-col">
      <h2 className="text-xl font-display font-bold text-ink mb-2">Let's Connect</h2>
      <p className="text-sm text-ink/60 mb-6">Reach out via email, phone, or find me on social media.</p>
      <div className="flex-grow">
        <div className="-my-4 divide-y divide-ink/10">
          {isMobile ? (
            <Drawer>
              <DrawerTrigger asChild onClick={handleRevealPhone}>
                <div className="group flex items-center justify-between py-4 cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-8 text-ink/60"><Phone /></div>
                    <div>
                      <p className="text-sm text-ink/60">Mobile</p>
                      <p className="font-medium text-ink">Click to reveal</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-ink/30 transition-transform group-hover:translate-x-1" />
                </div>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader><DrawerTitle>Contact Number</DrawerTitle></DrawerHeader>
                <div className="px-4 pb-4"><PhoneActionContent /></div>
              </DrawerContent>
            </Drawer>
          ) : (
            <ContactItem icon={<Phone />} label="Mobile" isReveal={true} isRevealed={phoneVisible} onReveal={handleRevealPhone}>
              {phoneVisible ? <p className="font-medium text-ink">{phoneNumber}</p> : <p className="font-medium text-ink">Click to reveal & copy</p>}
            </ContactItem>
          )}
          <ContactItem icon={<Mail />} label="Email" value="saswatasg@gmail.com" href="mailto:saswatasg@gmail.com" onCopy={() => handleCopy('saswatasg@gmail.com', 'Email')} />
          <ContactItem icon={<Globe />} label="Website" value="saswatasg.com" href="https://saswatasg.com" />
          <ContactItem icon={<MapPin />} label="Address" value="Kolkata, India" />
        </div>

        <div className="mt-6">
          <p className="mb-3 font-medium text-ink text-sm">Quick Links</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a href="https://drive.google.com/file/d/1cRaGUx3cvEYShMD67zLQIK4UxdPi6p-o/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="bg-white border-2 border-ink text-ink rounded-pill px-4 py-2.5 text-sm font-medium uppercase tracking-wide hover:bg-ink hover:text-white transition-all duration-200 inline-flex items-center gap-3 justify-start">
              <FileText className="h-4 w-4" /> My resume <ExternalLink className="h-4 w-4 ml-auto" />
            </a>
            <a href="/assets/Saswata_Sengupta.vcf" download className="bg-white border-2 border-ink text-ink rounded-pill px-4 py-2.5 text-sm font-medium uppercase tracking-wide hover:bg-ink hover:text-white transition-all duration-200 inline-flex items-center gap-3 justify-start">
              <Download className="h-4 w-4" /> Save Contact
            </a>
            <button onClick={() => setShowCalendar(true)} className="bg-white border-2 border-ink text-ink rounded-pill px-4 py-2.5 text-sm font-medium uppercase tracking-wide hover:bg-ink hover:text-white transition-all duration-200 inline-flex items-center gap-3 justify-start">
              <Calendar className="h-4 w-4" /> Book a meeting
            </button>
          </div>
        </div>

        <div className="mt-6">
          <p className="mb-3 font-medium text-ink text-sm">Find me on Social</p>
          <TooltipProvider>
            <div className="flex justify-start gap-3 overflow-x-auto pb-2 no-scrollbar">
              {socialLinks.map((social, index) => (
                <Tooltip key={index} delayDuration={100}>
                  <TooltipTrigger asChild>
                    <motion.a
                      key={index}
                      href={social.href || '#'}
                      target={social.href ? '_blank' : undefined}
                      rel={social.href ? 'noopener noreferrer' : undefined}
                      onClick={social.handler === 'whatsapp' ? (e) => { e.preventDefault(); handleWhatsApp(); } : undefined}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={cn('flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-lg bg-ink/5 text-ink/60 transition-colors duration-300', social.color)}
                      aria-label={`Visit Saswata's ${social.name} profile`}
                    >
                      <social.icon className="h-6 w-6" />
                    </motion.a>
                  </TooltipTrigger>
                  <TooltipContent><p>{social.name}</p></TooltipContent>
                </Tooltip>
              ))}
            </div>
          </TooltipProvider>
        </div>
      </div>

      <AnimatePresence>
        {showCalendar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
            onClick={() => setShowCalendar(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white border-2 border-black rounded-2xl w-full max-w-[700px] max-h-[85vh] overflow-hidden relative"
              style={{ boxShadow: '10px 10px 0px 0px #0A0A0A' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between bg-ink text-white px-5 py-3 border-b-2 border-black">
                <span className="font-bold text-sm">Book a Meeting</span>
                <button onClick={() => setShowCalendar(false)} className="hover:text-pink transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              {(iframeLoading || iframeError) && (
                <div className="flex items-center justify-center h-[600px] text-sm font-medium text-ink/50 flex-col gap-3">
                  <span>{iframeError ? 'Could not load the booking calendar.' : 'Loading booking calendar...'}</span>
                  <a href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0ibq0OoR_jlsEkRC4bqMHktw4l2xPn-cgO1GY7xCqhA63VxmyJa2KgMdevw1coatF5CpBaLy6i?gv=true" target="_blank" rel="noopener noreferrer" className="bg-ink text-white px-4 py-2 rounded-lg border-2 border-black text-sm font-bold hover:bg-ink/80 transition-colors">
                    Open booking page
                  </a>
                </div>
              )}
              <iframe
                 src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0ibq0OoR_jlsEkRC4bqMHktw4l2xPn-cgO1GY7xCqhA63VxmyJa2KgMdevw1coatF5CpBaLy6i?gv=true"
                 className={`w-full ${iframeLoading || iframeError ? 'hidden' : ''}`}
                 style={{ height: '600px' }}
                 title="Schedule a meeting"
                 onLoad={() => setIframeLoading(false)}
                 onError={() => { setIframeLoading(false); setIframeError(true); }}
               />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactPanel;
