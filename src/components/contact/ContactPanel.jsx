import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Phone, Mail, Globe, MapPin, Copy, ExternalLink, ChevronRight, Eye, EyeOff, MessageSquare, Linkedin, Instagram, Facebook, FileText, Download, Calendar } from 'lucide-react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';


const XIcon = (props) => (
  <svg {...props} viewBox="0 0 1200 1227" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1058.01 1148.81H895.408L569.165 687.854V687.828Z" fill="currentColor"/>
  </svg>
);

const socialLinks = [
  { name: 'WhatsApp', icon: MessageSquare, href: 'https://wa.me/918777875140?text=Hi%20Saswata%2C%20found%20you%20via%20your%20site.%20Can%20we%20chat%3F', color: 'hover:text-[#25D366]' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/in/sss99', color: 'hover:text-[#0A66C2]' },
  { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/saswatasg99/', color: 'hover:text-[#E4405F]' },
  { name: 'Twitter', icon: XIcon, href: 'https://twitter.com/saswatasg', color: 'hover:text-white' },
  { name: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/saswatasubhra.sengupta', color: 'hover:text-[#1877F2]' },
];


const ContactPanel = ({ custom }) => {
  const { toast } = useToast();
  const [phoneVisible, setPhoneVisible] = useState(false);
  const phoneNumber = '+91 87778 75140';
  const isMobile = useMediaQuery("(max-width: 640px)");

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    toast({
      title: `${type} copied!`,
      description: 'Copied to your clipboard.',
      duration: 1500,
    });
  };

  const handleRevealPhone = () => {
    setPhoneVisible(true);
    if (!isMobile) {
      handleCopy(phoneNumber, 'Number');
    }
  };
  
  const ContactItem = ({ icon, label, value, href, onCopy, isReveal, onReveal, isRevealed, children }) => (
    <div className="group flex items-center justify-between py-4 border-b border-border/50 last:border-b-0">
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0 w-8 text-primary group-hover:text-primary/80 transition-colors">{icon}</div>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          {children ? children : (
            <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium text-foreground hover:underline">
              {value}
            </a>
          )}
        </div>
      </div>
      {onCopy && (
        <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100" onClick={onCopy}>
          <Copy className="h-4 w-4" />
        </Button>
      )}
       {isReveal && !isRevealed && (
         <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onReveal}>
            <Eye className="h-4 w-4" />
         </Button>
       )}
      {href && !onCopy && !isReveal && <ExternalLink className="h-4 w-4 text-muted-foreground transition-transform group-hover:scale-110" />}
    </div>
  );

  const PhoneActionContent = () => (
    <>
      <p className="font-medium text-foreground text-lg text-center">{phoneNumber}</p>
      <div className="grid grid-cols-3 gap-2 pt-4">
        <Button asChild variant="outline"><a href={`tel:${phoneNumber}`}><Phone className="mr-2 h-4 w-4" /> Call</a></Button>
        <Button asChild variant="outline"><a href={`https://wa.me/918777875140`} target="_blank" rel="noopener noreferrer"><MessageSquare className="mr-2 h-4 w-4" /> WhatsApp</a></Button>
        <Button variant="outline" onClick={() => handleCopy(phoneNumber, 'Number')}><Copy className="mr-2 h-4 w-4" /> Copy</Button>
      </div>
    </>
  );

  return (
    <Card custom={custom} className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Let's Connect</CardTitle>
        <CardDescription>
          Reach out via email, phone, or find me on social media. I'm always open to new opportunities and collaborations.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-2 flex-grow overflow-y-auto">
        <div className="flow-root">
          <div className="-my-4 divide-y divide-border/50">
            {isMobile ? (
              <Drawer>
                <DrawerTrigger asChild onClick={handleRevealPhone}>
                  <div className="group flex items-center justify-between py-4 cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-8 text-primary"><Phone /></div>
                      <div>
                        <p className="text-sm text-muted-foreground">Mobile</p>
                        <p className="font-medium text-foreground">Click to reveal</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </div>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Contact Number</DrawerTitle>
                  </DrawerHeader>
                  <div className="px-4 pb-4">
                    <PhoneActionContent />
                  </div>
                </DrawerContent>
              </Drawer>
            ) : (
                <ContactItem icon={<Phone />} label="Mobile" isReveal={true} isRevealed={phoneVisible} onReveal={handleRevealPhone}>
                  {phoneVisible ? (
                      <p className="font-medium text-foreground">{phoneNumber}</p>
                  ) : (
                      <p className="font-medium text-foreground">Click to reveal & copy</p>
                  )}
                </ContactItem>
            )}
            <ContactItem icon={<Mail />} label="Email" value="hi@saswatasg.com" href="mailto:hi@saswatasg.com" onCopy={() => handleCopy('hi@saswatasg.com', 'Email')} />
            <ContactItem icon={<Globe />} label="Website" value="saswatasg.com" href="https://saswatasg.com" />
            <ContactItem icon={<MapPin />} label="Address" value="Kolkata, India" />
          </div>
        </div>
        
        <div className="mt-8">
          <p className="mb-4 font-medium text-foreground">Quick Links</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button asChild variant="outline" className="justify-start gap-3">
                <a href="https://drive.google.com/file/d/1cRaGUx3cvEYShMD67zLQIK4UxdPi6p-o/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                  <FileText className="h-4 w-4 text-primary" />
                  My resume
                  <ExternalLink className="h-4 w-4 text-muted-foreground ml-auto" />
                </a>
              </Button>

               <Button asChild variant="outline" className="justify-start gap-3">
                <a href="/assets/Saswata_Sengupta.vcf" download>
                  <Download className="h-4 w-4 text-primary" /> Save Contact
                </a>
              </Button>
              <Button asChild variant="outline" className="justify-start gap-3">
                <a href="https://calendly.com/saswatasg/30min" target="_blank" rel="noopener noreferrer">
                  <Calendar className="h-4 w-4 text-primary" /> Book a meeting
                </a>
              </Button>
          </div>
        </div>

        <div className="mt-8">
          <p className="mb-4 font-medium text-foreground">Find me on Social</p>
          <TooltipProvider>
            <div className="flex justify-start gap-3 overflow-x-auto pb-2 no-scrollbar">
              {socialLinks.map((social, index) => (
                <Tooltip key={index} delayDuration={100}>
                  <TooltipTrigger asChild>
                    <motion.a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={cn(
                        'flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-colors duration-300',
                        social.color
                      )}
                      aria-label={`Visit Saswata's ${social.name} profile`}
                    >
                      <social.icon className="h-6 w-6" />
                    </motion.a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{social.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactPanel;