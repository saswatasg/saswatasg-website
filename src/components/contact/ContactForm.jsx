import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Send, Linkedin, Instagram, Facebook, MessageSquare, Loader2 } from 'lucide-react';
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
  { name: 'Twitter', icon: XIcon, href: 'https://twitter.com/saswatasg', color: 'hover:text-primary' },
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

  const handleEmailBlur = (e) => {
    validateEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    const val = e.target.value;
    if (val === '' || /^[0-9\s\+\-]+$/.test(val)) {
      setPhone(val);
    }
  };

  const handleMessageChange = (e) => {
    if (e.target.value.length <= MAX_MESSAGE_LENGTH) {
      setMessage(e.target.value);
    }
  };

  const isFormValid = 
    name.trim() !== '' && 
    email.trim() !== '' && 
    !emailError &&
    message.trim().length >= 10;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsSubmitting(true);

    const { error } = await supabase
      .from('contact_submissions')
      .insert([{ name, email, phone, message }]);

    setIsSubmitting(false);

    if (error) {
      console.error('Supabase error:', error);
      toast({
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request. Please try again.',
        variant: 'destructive',
        duration: 5000,
      });
    } else {
      toast({
        title: 'Message Sent! ✨',
        description: 'Thanks for reaching out. I\'ll get back to you soon!',
        duration: 5000,
      });
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setEmailError('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
      className="mt-16"
    >
      <Card className="w-full max-w-2xl mx-auto overflow-hidden">
        <CardHeader>
          <CardTitle>Send me a message</CardTitle>
          <CardDescription>
            I'll get back to you as soon as possible.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  aria-label="Your name"
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) validateEmail(e.target.value);
                  }}
                  onBlur={handleEmailBlur}
                  required
                  aria-label="Your email"
                  className={cn(emailError && "border-red-500 focus-visible:ring-red-500")}
                />
                {emailError && (
                  <p className="text-red-500 text-xs mt-1">{emailError}</p>
                )}
              </div>
            </div>
            <div>
              <Input
                type="tel"
                placeholder="Your phone (optional)"
                value={phone}
                onChange={handlePhoneChange}
                aria-label="Your phone"
              />
              <p className="text-xs text-muted-foreground mt-1">Accepts digits, spaces, +, and - only</p>
            </div>
            <div>
              <Textarea
                placeholder="Your message... (min 10 characters)"
                rows={5}
                value={message}
                onChange={handleMessageChange}
                required
                aria-label="Your message"
              />
              <div className="text-xs text-muted-foreground mt-1 text-right">
                {message.length} / {MAX_MESSAGE_LENGTH} characters
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <TooltipProvider>
              <div className="flex justify-center gap-2">
                {socialLinks.map((social, index) => (
                  <Tooltip key={index} delayDuration={100}>
                    <TooltipTrigger asChild>
                      <motion.a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.15, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        className={cn(
                          'h-10 w-10 flex items-center justify-center rounded-lg bg-secondary text-foreground/60 transition-colors duration-300',
                          social.color
                        )}
                        aria-label={`Visit my ${social.name} profile`}
                      >
                        <social.icon className="h-5 w-5" />
                      </motion.a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{social.name}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </TooltipProvider>
            <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting || !isFormValid}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </motion.div>
  );
};

export default ContactForm;