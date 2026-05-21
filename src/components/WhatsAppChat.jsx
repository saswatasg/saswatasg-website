import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageCircle } from 'lucide-react';

const qaPairs = [
  {
    q: "What services do you offer?",
    a: "I offer end-to-end product management — discovery, strategy, execution, and analytics. I specialize in B2B SaaS, D2C e-commerce, and AI agent products.",
    keywords: ["services", "offer", "do", "product", "management"],
  },
  {
    q: "What's your experience?",
    a: "3+ years across Upcore Technologies (AI agents), Sierra Living Concepts (D2C furniture, $3M+/mo), and LiveKeeping (B2B SaaS for Indian SMBs). IIT Jodhpur MBA.",
    keywords: ["experience", "years", "background", "work", "career"],
  },
  {
    q: "Can I see your resume?",
    a: "Sure! You can download my resume from the footer or contact page. Or ask me anything specific and I'll share more.",
    keywords: ["resume", "cv", "download", "see", "portfolio"],
  },
  {
    q: "What industries have you worked in?",
    a: "B2B SaaS (fintech, GST compliance), D2C e-commerce (furniture, home decor), and AI/agentic solutions across 12+ verticals.",
    keywords: ["industries", "domains", "sectors", "verticals", "worked", "clients"],
  },
  {
    q: "Can we schedule a call?",
    a: "Absolutely! Use the 'Book a Call' button in the header or send me a message and I'll find a time that works.",
    keywords: ["schedule", "call", "meeting", "book", "talk", "chat"],
  },
];

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [asked, setAsked] = useState(new Set());
  const inputRef = useRef(null);
  const endRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setMessages([{ id: 1, text: "Hey there! I'm Saswata's AI sidekick. Pick a question below or type your own — I'll answer as best I can.", sender: 'bot' }]);
      setTimeout(() => inputRef.current?.focus(), 300);
    } else {
      setMessages([]);
    }
  }, [isOpen]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addBotMsg = (text) => {
    setMessages((prev) => [...prev, { id: Date.now(), text, sender: 'bot' }]);
  };
  const addUserMsg = (text) => {
    setMessages((prev) => [...prev, { id: Date.now(), text, sender: 'user' }]);
  };

  const handleQAClick = (qa) => {
    addUserMsg(qa.q);
    setAsked((prev) => new Set(prev).add(qa.q));
    setTimeout(() => addBotMsg(qa.a), 400);
  };

  const matchQuestion = (text) => {
    const words = text.toLowerCase().split(/\s+/).filter(w => w.length > 2);
    let best = null;
    let bestScore = 0;
    for (const qa of qaPairs) {
      const score = qa.keywords.filter(kw => words.some(w => w.includes(kw) || kw.includes(w))).length;
      if (score > bestScore) {
        bestScore = score;
        best = qa;
      }
    }
    return bestScore > 0 ? best : null;
  };

  const sendToWhatsApp = (text) => {
    const msg = encodeURIComponent(`Hi Saswata! ${text}`);
    window.dispatchEvent(new CustomEvent('openWhatsApp'));
  };

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    addUserMsg(text);
    setInput('');
    const matched = matchQuestion(text);
    if (matched && !asked.has(matched.q)) {
      setTimeout(() => {
        addBotMsg(matched.a);
        setAsked((prev) => new Set(prev).add(matched.q));
      }, 400);
    } else {
      setTimeout(() => {
        addBotMsg("That's a good one — drop me a message directly and I'll get back to you personally.");
      }, 400);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const unanswered = qaPairs.filter((qa) => !asked.has(qa.q));

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
                <MessageCircle className="w-5 h-5 text-pink" />
                <span className="font-bold text-sm">Chat with me</span>
              </div>
              <button onClick={() => setIsOpen(false)} aria-label="Close chat panel" className="hover:text-pink transition-colors duration-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="h-[380px] max-h-[60vh] overflow-y-auto p-4 space-y-3 bg-canvas">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[88%] px-3 py-2 rounded-xl text-sm font-medium border-2 border-black ${
                      msg.sender === 'user' ? 'bg-ink text-white' : 'bg-white text-ink'
                    }`}
                    style={msg.sender === 'bot' ? { boxShadow: '3px 3px 0px 0px #FF90E8' } : {}}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {messages.length <= 1 && unanswered.length > 0 && (
                <div className="mt-2">
                  <p className="text-xs font-bold text-ink/50 mb-2">Pick a question:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {unanswered.map((qa, i) => (
                      <button
                        key={i}
                        onClick={() => handleQAClick(qa)}
                        className="text-xs font-bold px-2.5 py-1.5 rounded-lg bg-white border-2 border-black text-ink hover:bg-pink hover:-translate-y-0.5 active:scale-95 transition-all"
                      >
                        {qa.q.length > 25 ? qa.q.slice(0, 25) + '...' : qa.q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={endRef} />
            </div>

            <div className="p-3 border-t-2 border-black bg-white">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask a question..."
                  className="flex-1 px-3 py-2 rounded-lg border-2 border-black text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ink"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="bg-ink text-white rounded-lg border-2 border-black p-2 min-w-[44px] min-h-[44px] flex items-center justify-center disabled:opacity-50 hover:scale-105 active:scale-90 transition-all duration-200"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        className="w-14 h-14 rounded-full bg-pink border-2 border-black flex items-center justify-center text-ink"
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
