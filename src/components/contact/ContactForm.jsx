import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Send, Linkedin, Instagram, Facebook, MessageSquare, Loader2, ArrowRight } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

const XIcon = (props) => (
  <svg {...props} viewBox="0 0 1200 1227" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1058.01 1148.81H895.408L569.165 687.854V687.828Z" fill="currentColor"/>
  </svg>
);

const socialLinks = [
  { name: 'WhatsApp', icon: MessageSquare, href: 'https://wa.me/918777875140?text=Hi%20Saswata%2C%20found%20you%20via%20your%20site.%20Would%20love%20to%20connect!', color: 'hover:text-[#25D366]' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/in/sss99', color: 'hover:text-[#0A66C2]' },
  { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/saswatasg99/', color: 'hover:text-[#E4405F]' },
  { name: 'Twitter', icon: XIcon, href: 'https://twitter.com/saswatasg', color: 'hover:text-ink' },
  { name: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/saswatasubhra.sengupta', color: 'hover:text-[#1877F2]' },
];

const ContactForm = () => {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState('');
  const MAX_MESSAGE_LENGTH = 1000;

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && !emailRegex.test(value)) {
      setEmailError('Please enter a valid email');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleEmailBlur = (e) => { validateEmail(e.target.value); };
  const handlePhoneChange = (e) => {
    const val = e.target.value;
    if (val === '' || /^[0-9\s\+\-]+$/.test(val)) setPhone(val);
  };
  const handleMessageChange = (e) => {
    if (e.target.value.length <= MAX_MESSAGE_LENGTH) setMessage(e.target.value);
  };

  const isFormValid = name.trim() !== '' && email.trim() !== '' && !emailError && message.trim().length >= 10;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    setIsSubmitting(true);
    const { error } = await supabase.from('contact_submissions').insert([{ name, email, phone, message }]);
    setIsSubmitting(false);
    if (error) {
      toast({ title: 'Uh oh! Something went wrong.', description: 'There was a problem with your request. Please try again.', variant: 'destructive', duration: 5000 });
    } else {
      toast({ title: 'Message Sent! ✨', description: 'Thanks for reaching out. I\'ll get back to you soon!', duration: 5000 });
      setName(''); setEmail(''); setPhone(''); setMessage(''); setEmailError('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="bg-canvas rounded-card p-8 md:p-14 w-full max-w-2xl mx-auto border border-ink/10">
        <h2 className="text-2xl font-display font-bold text-ink mb-2">Send me a message</h2>
        <p className="text-sm text-ink/60 mb-8">I'll get back to you as soon as possible.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required aria-label="Your name" className="rounded-pill border-ink/20" />
            <Input type="email" placeholder="Your email" value={email} onChange={(e) => { setEmail(e.target.value); if (emailError) validateEmail(e.target.value); }} onBlur={handleEmailBlur} required aria-label="Your email" className={cn("rounded-pill border-ink/20", emailError && "border-red-500")} />
          </div>
          {emailError && <p className="text-red-500 text-xs">{emailError}</p>}
          <Input type="tel" placeholder="Your phone (optional)" value={phone} onChange={handlePhoneChange} aria-label="Your phone" className="rounded-pill border-ink/20" />
          <Textarea placeholder="Your message... (min 10 characters)" rows={5} value={message} onChange={handleMessageChange} required aria-label="Your message" className="rounded-card border-ink/20" />
          <div className="text-xs text-ink/40 text-right">{message.length} / {MAX_MESSAGE_LENGTH} characters</div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
            <TooltipProvider>
              <div className="flex justify-center gap-2">
                {socialLinks.map((social, index) => (
                  <Tooltip key={index} delayDuration={100}>
                    <TooltipTrigger asChild>
                      <motion.a href={social.href} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.15, y: -3 }} whileTap={{ scale: 0.95 }} className={cn('h-10 w-10 flex items-center justify-center rounded-lg bg-ink/5 text-ink/60 transition-colors duration-300', social.color)} aria-label={`Visit my ${social.name} profile`}>
                        <social.icon className="h-5 w-5" />
                      </motion.a>
                    </TooltipTrigger>
                    <TooltipContent><p>{social.name}</p></TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </TooltipProvider>

            <button type="submit" disabled={isSubmitting || !isFormValid} className="bg-ink text-white rounded-pill px-6 py-3 min-h-[44px] text-sm font-medium inline-flex items-center gap-2 hover:bg-lemon hover:text-ink transition-all duration-300 disabled:opacity-50">
              {isSubmitting ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</>
              ) : (
                <>Send Message <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default ContactForm;
