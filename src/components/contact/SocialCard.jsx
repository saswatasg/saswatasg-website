import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Linkedin, Instagram, Facebook, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
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
  { name: 'Twitter', icon: XIcon, href: 'https://twitter.com/saswatasg', color: 'hover:text-white' },
  { name: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/saswatasubhra.sengupta', color: 'hover:text-[#1877F2]' },
];

const SocialCard = ({ custom }) => {
  const handleAnalytics = (platform) => {
    console.log(`Analytics Event: contact_social_clicked, Platform: ${platform}`);
  };

  const handleWhatsApp = (e) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('openWhatsApp'));
  };

  return (
    <Card custom={custom}>
      <CardHeader>
        <CardTitle>Social</CardTitle>
      </CardHeader>
      <CardContent>
        <TooltipProvider>
          <div className="flex justify-center sm:justify-start gap-2 overflow-x-auto pb-2 -mx-6 px-6 no-scrollbar">
            {socialLinks.map((social, index) => (
              <Tooltip key={index} delayDuration={100}>
                <TooltipTrigger asChild>
                  <motion.a
                    href={social.handler === 'whatsapp' ? undefined : social.href}
                    target={social.href ? '_blank' : undefined}
                    rel={social.href ? 'noopener noreferrer' : undefined}
                    onClick={social.handler === 'whatsapp' ? handleWhatsApp : () => handleAnalytics(social.name)}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn('flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-lg bg-white text-ink/50 border-2 border-black transition-colors', social.color)}
                    aria-label={`Visit Saswata's ${social.name} profile`}
                  >
                    <social.icon className="h-7 w-7" />
                  </motion.a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{social.name}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
};

export default SocialCard;