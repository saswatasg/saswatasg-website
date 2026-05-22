import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

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
    let error = null;
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          name,
          email,
          phone,
          message,
        }),
      });
      if (!res.ok) error = new Error('Failed to send');
    } catch (e) {
      error = e;
    }
    setIsSubmitting(false);
    if (error) {
      toast({ title: 'Uh oh! Something went wrong.', description: 'There was a problem with your request. Please try again.', variant: 'destructive', duration: 5000 });
    } else {
      toast({ title: 'Message Sent!', description: 'Thanks for reaching out. I\'ll get back to you soon!', duration: 5000 });
      setName(''); setEmail(''); setPhone(''); setMessage(''); setEmailError('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="bg-white border-2 border-black rounded-2xl p-8 md:p-12 lg:p-14 w-full max-w-2xl mx-auto">
        <h2 className="text-xl font-display font-black text-ink mb-1">Send me a message</h2>
        <p className="text-sm text-ink/70 font-medium mb-8">I'll get back to you as soon as possible.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required aria-label="Your name" className="rounded-lg border-2 border-black" />
            <Input type="email" placeholder="Your email" value={email} onChange={(e) => { setEmail(e.target.value); if (emailError) validateEmail(e.target.value); }} onBlur={handleEmailBlur} required aria-label="Your email" className={cn("rounded-lg border-2 border-black", emailError && "border-red-500")} />
          </div>
          {emailError && <p className="text-red-500 text-xs font-bold">{emailError}</p>}
          <Input type="tel" placeholder="Your phone (optional)" value={phone} onChange={handlePhoneChange} aria-label="Your phone" className="rounded-lg border-2 border-black" />
          <Textarea placeholder="Your message... (min 10 characters)" rows={5} value={message} onChange={handleMessageChange} required aria-label="Your message" className="rounded-xl border-2 border-black" />
          <div className="text-xs font-bold text-ink/40 text-right">{message.length} / {MAX_MESSAGE_LENGTH} characters</div>

          <div className="flex justify-end pt-4">

            <div className="relative inline-flex group">
              <div className="absolute inset-0 rounded-lg border-2 border-black bg-coral translate-x-[3px] translate-y-[3px]" />
              <button type="submit" disabled={isSubmitting || !isFormValid} className="relative z-10 bg-ink text-white rounded-lg border-2 border-black px-5 py-2.5 min-h-[44px] text-sm font-bold inline-flex items-center gap-2 transition-transform duration-150 group-hover:translate-x-[3px] group-hover:translate-y-[3px] disabled:opacity-50">
                {isSubmitting ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</>
                ) : (
                  <>Send Message <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default ContactForm;
