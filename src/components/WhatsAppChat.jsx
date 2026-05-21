import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageCircle, ExternalLink, Copy, Calendar, FileText, Mail } from 'lucide-react';

const MAX_MESSAGES = 6;

const QuickActions = ({ onAction }) => (
  <div className="flex flex-wrap gap-1.5 px-3 pb-2 pt-1 border-t border-black/10">
    <button onClick={() => onAction('whatsapp')} className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border-2 border-black text-[10px] font-bold text-ink hover:bg-canvas transition-colors">
      <MessageCircle className="w-3 h-3 text-green-500" /> WhatsApp
    </button>
    <button onClick={() => onAction('meet')} className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border-2 border-black text-[10px] font-bold text-ink hover:bg-canvas transition-colors">
      <Calendar className="w-3 h-3 text-coral" /> Book a Meet
    </button>
    <button onClick={() => onAction('resume')} className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border-2 border-black text-[10px] font-bold text-ink hover:bg-canvas transition-colors">
      <FileText className="w-3 h-3 text-purple" /> Resume
    </button>
    <button onClick={() => onAction('email')} className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border-2 border-black text-[10px] font-bold text-ink hover:bg-canvas transition-colors">
      <Mail className="w-3 h-3 text-ink" /> Email
    </button>
  </div>
);

const ActionButton = ({ label, icon: Icon, onClick, color = 'coral' }) => (
  <button
    onClick={onClick}
    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-black text-xs font-bold transition-all hover:scale-[1.02] active:scale-95"
    style={{ backgroundColor: color === 'coral' ? '#E85D3A' : color === 'green' ? '#25D366' : color === 'purple' ? '#6D28D9' : color === 'ink' ? '#0A0A0A' : 'white', color: color === 'white' ? '#0A0A0A' : 'white' }}
  >
    {Icon && <Icon className="w-3.5 h-3.5" />}
    {label}
    <ExternalLink className="w-3 h-3 opacity-70" />
  </button>
);

const ResumeEmbed = () => (
  <div className="mt-2">
    <ActionButton label="View Resume" icon={FileText} onClick={() => window.open('/resume.pdf', '_blank')} color="purple" />
  </div>
);

const EmailEmbed = () => (
  <div className="mt-2 flex flex-col gap-1.5">
    <div className="bg-canvas border-2 border-black rounded-lg px-3 py-1.5 text-xs font-bold text-ink flex items-center justify-between gap-2">
      saswatasg@gmail.com
      <button onClick={() => { navigator.clipboard.writeText('saswatasg@gmail.com'); }} className="flex items-center gap-1 text-purple hover:text-ink transition-colors text-[10px]">
        <Copy className="w-3 h-3" /> Copy
      </button>
    </div>
    <ActionButton label="Send Email" icon={Mail} onClick={() => window.open('mailto:saswatasg@gmail.com', '_blank')} color="ink" />
  </div>
);

const MeetEmbed = () => (
  <div className="mt-2">
    <ActionButton label="Book a Meeting" icon={Calendar} onClick={() => window.dispatchEvent(new CustomEvent('openCalendar'))} color="coral" />
  </div>
);

const WhatsAppEmbed = () => (
  <div className="mt-2">
    <ActionButton label="Chat on WhatsApp" icon={MessageCircle} onClick={() => window.dispatchEvent(new CustomEvent('openWhatsApp'))} color="green" />
  </div>
);

const PageLinkEmbed = ({ page }) => {
  const links = {
    'case-studies': { label: 'View Case Studies', href: '/case-studies' },
    'projects': { label: 'View Projects', href: '/projects' },
    'about': { label: 'About Me', href: '/about' },
    'experience': { label: 'View Experience', href: '/experience' },
    'contact': { label: 'Get in Touch', href: '/contact' },
  };
  const link = links[page] || links['case-studies'];
  return (
    <div className="mt-2">
      <ActionButton label={link.label} icon={ExternalLink} onClick={() => window.open(link.href, '_self')} color="white" />
    </div>
  );
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [messageCount, setMessageCount] = useState(0);
  const [isEnded, setIsEnded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const endRef = useRef(null);

  useEffect(() => {
    const handler = () => {
      setIsOpen(true);
      if (messages.length === 0) {
        setMessages([
          { id: 1, text: "Hi! I'm Saswata's AI assistant. Ask me anything about his experience, skills, or projects!", sender: 'bot' },
        ]);
        setMessageCount(0);
      }
    };
    window.addEventListener('openChat', handler);
    return () => window.removeEventListener('openChat', handler);
  }, [messages.length]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        { id: 1, text: "Hi! I'm Saswata's AI assistant. Ask me anything about his experience, skills, or projects!", sender: 'bot' },
      ]);
      setMessageCount(0);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, messages.length]);

  const addBotMsg = useCallback((text, embed) => {
    setMessages((prev) => [...prev, { id: Date.now(), text, sender: 'bot', embed }]);
  }, []);

  const addUserMsg = useCallback((text) => {
    setMessages((prev) => [...prev, { id: Date.now(), text, sender: 'user' }]);
  }, []);

  const handleQuickAction = (action) => {
    if (action === 'whatsapp') {
      addUserMsg('Open WhatsApp');
      setTimeout(() => {
        addBotMsg("Here's my WhatsApp — tap the button to chat with me directly!", 'whatsapp');
      }, 300);
      return;
    }
    if (action === 'meet') {
      addUserMsg('Book a meeting');
      setTimeout(() => {
        addBotMsg("Let's find a time that works. Tap the button below to book a meeting.", 'meet');
      }, 300);
      return;
    }
    if (action === 'resume') {
      addUserMsg('Show resume');
      setTimeout(() => {
        addBotMsg("Here's my resume. You can view or download it below.", 'resume');
      }, 300);
      return;
    }
    if (action === 'email') {
      addUserMsg('Show email');
      setTimeout(() => {
        addBotMsg("You can reach me at saswatasg@gmail.com — tap to copy or send an email.", 'email');
      }, 300);
      return;
    }
  };

  const detectIntent = (text) => {
    const lower = text.toLowerCase();
    if (lower.includes('whatsapp') || lower.includes('wa.me') || lower.includes('whats app')) return 'whatsapp';
    if (lower.includes('meet') || lower.includes('meeting') || lower.includes('calendar') || lower.includes('call') || lower.includes('book')) return 'meet';
    if (lower.includes('resume') || lower.includes('cv') || lower.includes('curriculum')) return 'resume';
    if (lower.includes('email') || lower.includes('mail') || lower.includes('saswatasg@gmail')) return 'email';
    if (lower.includes('case study') || lower.includes('case-study')) return 'case-studies';
    if (lower.includes('project') || lower.includes('portfolio')) return 'projects';
    if (lower.includes('about') || lower.includes('background')) return 'about';
    if (lower.includes('experience') || lower.includes('work')) return 'experience';
    if (lower.includes('contact') || lower.includes('reach')) return 'contact';
    return null;
  };

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isLoading) return;
    setInput('');
    setMessageCount((prev) => prev + 1);
    const newCount = messageCount + 1;

    addUserMsg(text);

    if (newCount > MAX_MESSAGES) {
      setTimeout(() => {
        addBotMsg("You've reached the message limit. Let's continue on WhatsApp — tap the button below!", 'whatsapp');
        setIsEnded(true);
      }, 400);
      return;
    }

    const intent = detectIntent(text);
    if (intent === 'whatsapp' || intent === 'meet' || intent === 'resume' || intent === 'email') {
      const embedMap = { whatsapp: 'whatsapp', meet: 'meet', resume: 'resume', email: 'email' };
      setTimeout(() => {
        addBotMsg(`Sure! Here you go:`, embedMap[intent]);
        if (newCount >= MAX_MESSAGES) setIsEnded(true);
      }, 400);
      return;
    }

    if (intent && ['case-studies', 'projects', 'about', 'experience', 'contact'].includes(intent)) {
      setTimeout(() => {
        addBotMsg(`You can check that out here:`, intent);
        if (newCount >= MAX_MESSAGES) setIsEnded(true);
      }, 400);
      return;
    }

    setIsLoading(true);
    try {
      const history = messages
        .filter((m) => m.id !== 1)
        .map((m) => ({ role: m.sender === 'bot' ? 'assistant' : 'user', text: m.text }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history }),
      });

      if (!res.ok) throw new Error('API error');

      const data = await res.json();
      let reply = data.reply || "I'm not sure how to answer that. Feel free to ask me something else!";

      if (newCount >= MAX_MESSAGES) {
        reply += " Also — you've used all your messages. Tap the WhatsApp button below to continue the chat!";
        addBotMsg(reply, 'whatsapp');
        setIsEnded(true);
      } else {
        if (newCount >= MAX_MESSAGES - 1) {
          reply += ` (By the way, you have ${MAX_MESSAGES - newCount} message${MAX_MESSAGES - newCount === 1 ? '' : 's'} remaining.)`;
        }
        const replyIntent = detectIntent(reply);
        addBotMsg(reply, replyIntent);
      }
    } catch {
      addBotMsg("Looks like I'm having trouble connecting. You can reach Saswata directly via WhatsApp or email!", 'whatsapp');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const openWhatsApp = () => window.dispatchEvent(new CustomEvent('openWhatsApp'));

  const remaining = MAX_MESSAGES - messageCount;

  const renderBotEmbed = (embed) => {
    if (embed === 'whatsapp') return <WhatsAppEmbed />;
    if (embed === 'meet') return <MeetEmbed />;
    if (embed === 'resume') return <ResumeEmbed />;
    if (embed === 'email') return <EmailEmbed />;
    if (typeof embed === 'string' && ['case-studies', 'projects', 'about', 'experience', 'contact'].includes(embed)) return <PageLinkEmbed page={embed} />;
    return null;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-[calc(100vw-32px)] md:w-[360px] bg-white border-2 border-black rounded-2xl overflow-hidden"
            style={{ boxShadow: '8px 8px 0px 0px #0A0A0A' }}
          >
            <div className="bg-ink text-white px-4 py-3 flex items-center justify-between border-b-2 border-black">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-coral" />
                <span className="font-bold text-sm">Chat with Saswata</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={openWhatsApp} aria-label="Chat on WhatsApp" className="hover:text-coral transition-colors duration-200">
                  <MessageCircle className="w-4 h-4" />
                </button>
                <button onClick={() => setIsOpen(false)} aria-label="Close chat panel" className="hover:text-coral transition-colors duration-200">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="h-[380px] max-h-[60vh] overflow-y-auto p-4 space-y-3 bg-canvas">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div>
                    <div
                      className={`max-w-[88%] px-3 py-2 rounded-xl text-sm font-medium border-2 border-black ${
                        msg.sender === 'user' ? 'bg-ink text-white' : 'bg-white text-ink'
                      }`}
                      style={msg.sender === 'bot' ? { boxShadow: '3px 3px 0px 0px #E85D3A' } : {}}
                    >
                      {msg.text}
                    </div>
                    {msg.sender === 'bot' && msg.embed && (
                      <div className="mt-1 ml-1">{renderBotEmbed(msg.embed)}</div>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border-2 border-black rounded-xl px-3 py-2 text-sm font-medium" style={{ boxShadow: '3px 3px 0px 0px #E85D3A' }}>
                    <span className="inline-flex gap-1">
                      <span className="w-1.5 h-1.5 bg-ink rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-ink rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-ink rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </span>
                  </div>
                </div>
              )}

              {!isEnded && remaining > 0 && remaining <= 2 && (
                <div className="flex justify-center">
                  <span className="text-[10px] font-bold text-ink/40 bg-white border border-black/20 rounded-full px-2 py-0.5 inline-flex items-center gap-1">
                    {remaining} message{remaining !== 1 ? 's' : ''} remaining
                  </span>
                </div>
              )}

              {isEnded && (
                <div className="flex justify-center mt-2">
                  <button onClick={openWhatsApp} className="bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg border-2 border-black inline-flex items-center gap-1.5 hover:bg-green-600 transition-colors">
                    <MessageCircle className="w-3.5 h-3.5" />
                    Chat on WhatsApp
                  </button>
                </div>
              )}

              <div ref={endRef} />
            </div>

            <div className="border-t-2 border-black bg-white">
              {!isEnded && <QuickActions onAction={handleQuickAction} />}
              <div className="p-3">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={isEnded ? 'Session ended' : 'Ask me anything...'}
                    disabled={isEnded}
                    className="flex-1 px-3 py-2 rounded-lg border-2 border-black text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ink disabled:opacity-50"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading || isEnded}
                    className="bg-ink text-white rounded-lg border-2 border-black p-2 min-w-[44px] min-h-[44px] flex items-center justify-center disabled:opacity-50 hover:scale-105 active:scale-90 transition-all duration-200"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                {!isEnded && (
                  <p className="text-[10px] text-ink/30 text-center mt-1.5">{remaining}/{MAX_MESSAGES} messages</p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        className="w-14 h-14 rounded-full bg-coral border-2 border-black flex items-center justify-center text-ink"
        style={{ boxShadow: '4px 4px 0px 0px #0A0A0A' }}
        whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0], transition: { duration: 0.3 } }}
        whileTap={{ scale: 0.85 }}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>
    </div>
  );
};

export default ChatBot;
