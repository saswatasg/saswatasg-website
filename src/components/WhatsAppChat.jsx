import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageCircle, AlertCircle } from 'lucide-react';

const MAX_MESSAGES = 6;
const SESSION_TIMEOUT = 30 * 60 * 1000;

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatState, setChatState] = useState('greeting');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [messageCount, setMessageCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => Math.random().toString(36).substr(2, 9));
  const inputRef = useRef(null);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && chatState === 'greeting') {
      setMessages([
        {
          id: 1,
          text: "Hi! I'm Saswata's AI assistant. I can answer questions about his experience, skills, and background. Before we chat, what's your name?",
          sender: 'bot',
        },
      ]);
      setChatState('collecting-name');
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, chatState]);

  const addBotMsg = useCallback((text) => {
    setMessages((prev) => [...prev, { id: Date.now(), text, sender: 'bot' }]);
  }, []);

  const addUserMsg = useCallback((text) => {
    setMessages((prev) => [...prev, { id: Date.now(), text, sender: 'user' }]);
  }, []);

  const sendTranscript = useCallback(
    async (allMessages) => {
      try {
        await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'end',
            name,
            phone,
            sessionId,
            messages: allMessages.map((m) => ({
              role: m.sender === 'bot' ? 'assistant' : 'user',
              text: m.text,
            })),
          }),
        });
      } catch {
      }
    },
    [name, phone, sessionId]
  );

  useEffect(() => {
    if (chatState === 'ended') {
      sendTranscript(messages);
    }
  }, [chatState, messages, sendTranscript]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isLoading) return;
    setInput('');

    if (chatState === 'collecting-name') {
      setName(text);
      addUserMsg(text);
      setChatState('collecting-phone');
      setTimeout(() => addBotMsg(`Nice to meet you, ${text}! What's your phone number?`), 400);
      return;
    }

    if (chatState === 'collecting-phone') {
      setPhone(text);
      addUserMsg(text);
      setChatState('chatting');
      setTimeout(() => {
        addBotMsg(
          `Thanks ${name}! You can ask me anything about Saswata's experience, skills, or projects. What would you like to know?`
        );
        setMessageCount(0);
      }, 400);
      return;
    }

    if (chatState === 'ended') {
      addUserMsg(text);
      setTimeout(
        () =>
          addBotMsg(
            "This session has ended. Tap the WhatsApp button below to chat with Saswata directly!"
          ),
        400
      );
      return;
    }

    addUserMsg(text);
    const newCount = messageCount + 1;
    setMessageCount(newCount);

    if (newCount > MAX_MESSAGES) {
      setTimeout(() => {
        addBotMsg(
          "You've reached the message limit for this session. Let's continue on WhatsApp — tap the button below to message me directly!"
        );
        setChatState('ended');
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
      let reply =
        data.reply ||
        "I'm not sure how to answer that. Feel free to ask me something else!";

      if (newCount >= MAX_MESSAGES) {
        reply +=
          " Also — you've used all your messages for this session. Tap the WhatsApp button below to continue chatting with me directly!";
        addBotMsg(reply);
        setChatState('ended');
      } else {
        if (newCount >= MAX_MESSAGES - 1) {
          reply += ` (By the way, you have ${MAX_MESSAGES - newCount} message${MAX_MESSAGES - newCount === 1 ? '' : 's'} remaining in this session.)`;
        }
        addBotMsg(reply);
      }
    } catch {
      addBotMsg(
        "Looks like I'm having trouble connecting. You can always reach Saswata directly via WhatsApp or email at saswatasg@gmail.com!"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const openWhatsApp = () => {
    window.dispatchEvent(new CustomEvent('openWhatsApp'));
  };

  const remaining = MAX_MESSAGES - messageCount;

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
                <span className="font-bold text-sm">Chat with Saswata</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={openWhatsApp}
                  aria-label="Chat on WhatsApp"
                  className="hover:text-pink transition-colors duration-200"
                >
                  <MessageCircle className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat panel"
                  className="hover:text-pink transition-colors duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="h-[380px] max-h-[60vh] overflow-y-auto p-4 space-y-3 bg-canvas">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
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

              {isLoading && (
                <div className="flex justify-start">
                  <div
                    className="bg-white border-2 border-black rounded-xl px-3 py-2 text-sm font-medium"
                    style={{ boxShadow: '3px 3px 0px 0px #FF90E8' }}
                  >
                    <span className="inline-flex gap-1">
                      <span
                        className="w-1.5 h-1.5 bg-ink rounded-full animate-bounce"
                        style={{ animationDelay: '0ms' }}
                      />
                      <span
                        className="w-1.5 h-1.5 bg-ink rounded-full animate-bounce"
                        style={{ animationDelay: '150ms' }}
                      />
                      <span
                        className="w-1.5 h-1.5 bg-ink rounded-full animate-bounce"
                        style={{ animationDelay: '300ms' }}
                      />
                    </span>
                  </div>
                </div>
              )}

              {chatState === 'chatting' && remaining > 0 && remaining <= 2 && (
                <div className="flex justify-center">
                  <span className="text-[10px] font-bold text-ink/40 bg-white border border-black/20 rounded-full px-2 py-0.5 inline-flex items-center gap-1">
                    <AlertCircle className="w-2.5 h-2.5" />
                    {remaining} message{remaining !== 1 ? 's' : ''} remaining
                  </span>
                </div>
              )}

              {chatState === 'ended' && (
                <div className="flex justify-center mt-2">
                  <button
                    onClick={openWhatsApp}
                    className="bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg border-2 border-black inline-flex items-center gap-1.5 hover:bg-green-600 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    Chat on WhatsApp
                  </button>
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
                  placeholder={
                    chatState === 'collecting-name'
                      ? 'Enter your name...'
                      : chatState === 'collecting-phone'
                        ? 'Enter your phone number...'
                        : chatState === 'ended'
                          ? 'Session ended'
                          : 'Ask me anything...'
                  }
                  disabled={chatState === 'ended'}
                  className="flex-1 px-3 py-2 rounded-lg border-2 border-black text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ink disabled:opacity-50"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading || chatState === 'ended'}
                  className="bg-ink text-white rounded-lg border-2 border-black p-2 min-w-[44px] min-h-[44px] flex items-center justify-center disabled:opacity-50 hover:scale-105 active:scale-90 transition-all duration-200"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              {chatState === 'chatting' && (
                <p className="text-[10px] text-ink/30 text-center mt-1.5">
                  {remaining}/{MAX_MESSAGES} messages &middot; 30min session
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
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
