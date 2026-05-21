import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const pageMessages = {
  '/': {
    welcome: ["Portfolio loaded. Let's build something great.", "Ready to see what I've shipped?", "Welcome! I move metrics."],
    idle: ["Check out my case studies.", "Move fast, ship products. That's the goal.", "B2B SaaS, D2C, AI agents — I've done all three.", "Every project has a before & after.", "Want to see my impact stats?"],
  },
  '/about': {
    welcome: ["About me? Product Manager. Problem solver.", "IIT Jodhpur MBA. Now building AI agents."],
    idle: ["IIT Jodhpur MBA. Product Manager. AI agent builder.", "Want the full resume? Just ask!", "From compliance SaaS to AI — shipped across the stack.", "Product discovery is my superpower."],
  },
  '/experience': {
    welcome: ["3+ years of shipping. Here's the timeline."],
    idle: ["LiveKeeping → Sierra → Upcore. Every role taught me something.", "B2B SaaS compliance → D2C e-com → Enterprise AI agents.", "Scroll through. Each role has a story."],
  },
  '/projects': {
    welcome: ["21 projects. All grounded in real problems."],
    idle: ["Impacts front and center. Case studies first.", "Every project started with an incomplete data story.", "React projects, Shopify apps, AI pipelines — all here."],
  },
  '/case-studies': {
    welcome: ["Deep dives into real product decisions.", "Read the full story on each one."],
    idle: ["Each case study has a before, an after, and a retrospective.", "Real data. Real outcomes. Real talk.", "The 17:1 compliance gap? That one went to the CEO."],
  },
  '/contact': {
    welcome: ["Want to build something together?", "Let's talk. I'm always open."],
    idle: ["Available for product discussions, consulting, and collab.", "Shoot me a message. I respond within a few hours."],
  },
};

const defaultMessages = {
  welcome: ["Hey there!"],
  idle: ["Looking for something?", "Just hanging out.", "Let's build something great."],
};

const clickMsgs = [
  "Hey!", "Let's optimize this!", "Ouch!",
  "Product thinking activated!", "You found me!",
];
const scrollMsgs = [
  "Great scroll game!", "Keep going, you're doing great!",
  "Scrolling like a pro!", "Almost at the good part!",
];
const nearMsgs = [
  "Hey, you're close!", "Too close!", "Personal space!",
];
const roamMsgs = [
  "Exploring the page!", "Just stretching my legs!",
];
const boredMsgs = [
  "Zzz... product strategy...",
  "Zzz... conversion funnels...",
];
const danceMsgs = [
  "Woo!", "Check this out!", "Let's go!",
];

const Stickman = () => {
  const location = useLocation();
  const pathKey = Object.keys(pageMessages).find((p) => location.pathname === p || (p !== '/' && location.pathname.startsWith(p))) || '';
  const msgs = pageMessages[pathKey] || defaultMessages;

  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [flip, setFlip] = useState(1);
  const [lean, setLean] = useState(0);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [bubble, setBubble] = useState({ text: '', show: false });
  const [roamPos, setRoamPos] = useState({ x: 0, y: 0 });
  const [roaming, setRoaming] = useState(false);
  const [squish, setSquish] = useState(false);
  const [expression, setExpression] = useState('smile');
  const [quirky, setQuirky] = useState(null);
  const [bored, setBored] = useState(false);
  const [entered, setEntered] = useState(false);
  const ref = useRef(null);
  const clickCount = useRef(0);
  const idleTimer = useRef(null);
  const roamTimer = useRef(null);
  const lastActive = useRef(Date.now());
  const prevScrollY = useRef(0);
  const quirkyTimer = useRef(null);
  const boredomTimer = useRef(null);
  const lastBubbleTime = useRef(0);
  const pathRef = useRef(pathKey);
  const waveTimer = useRef(null);

  useEffect(() => {
    if (pathRef.current !== pathKey) {
      pathRef.current = pathKey;
      lastActive.current = Date.now();
      setBored(false);
      showBubble(msgs.welcome[Math.floor(Math.random() * msgs.welcome.length)], 4000, true);
    }
  }, [pathKey]);

  const showBubble = useCallback((text, duration = 4000, immediate = false) => {
    const now = Date.now();
    if (!immediate && now - lastBubbleTime.current < 5000) return;
    lastBubbleTime.current = now;
    setBubble({ text, show: true });
    clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => setBubble({ text: '', show: false }), duration);
  }, []);

  useEffect(() => {
    setTimeout(() => setEntered(true), 4000);
    setTimeout(() => showBubble(msgs.welcome[Math.floor(Math.random() * msgs.welcome.length)], 5000, true), 1500);
  }, []);

  useEffect(() => {
    const onMouse = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', onMouse);
    const onScroll = () => {
      const sy = window.scrollY;
      const delta = sy - prevScrollY.current;
      if (Math.abs(delta) > 30 && !roaming && !quirky) {
        setQuirky('excite');
        lastActive.current = Date.now();
        setBored(false);
        showBubble(scrollMsgs[Math.floor(Math.random() * scrollMsgs.length)], 1800);
        setTimeout(() => setQuirky(null), 600);
      }
      prevScrollY.current = sy;
    };
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('scroll', onScroll);
    };
  }, [roaming, quirky, showBubble]);

  useEffect(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = mouse.x - cx;
    const dy = mouse.y - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const near = dist < 120;
    const newFlip = dx < 0 ? -1 : 1;
    let rot = dx / 80;
    if (rot > 5) rot = 5;
    if (rot < -5) rot = -5;
    if (near) {
      rot = Math.sign(dx) * -8;
      setExpression('open');
      lastActive.current = Date.now();
      setBored(false);
      setTranslate({ x: dx / 30, y: dy / 30 });
      if (!bubble.show) {
        showBubble(nearMsgs[Math.floor(Math.random() * nearMsgs.length)], 2000);
      }
    } else if (!quirky) {
      setExpression(bored ? 'sleep' : 'smile');
      setTranslate({ x: dx / 60, y: dy / 60 });
    }
    setFlip(newFlip);
    setLean(rot * newFlip);
  }, [mouse, quirky, bored]);

  useEffect(() => {
    const idle = setInterval(() => {
      if (!bubble.show) {
        showBubble(msgs.idle[Math.floor(Math.random() * msgs.idle.length)], 5000);
      }
    }, 10000);
    return () => clearInterval(idle);
  }, [bubble.show, showBubble]);

  useEffect(() => {
    const roam = setInterval(() => {
      const maxX = typeof window !== 'undefined' ? window.innerWidth - 160 : 400;
      const maxY = typeof window !== 'undefined' ? window.innerHeight - 200 : 400;
      const tx = Math.random() * maxX * (Math.random() > 0.5 ? 1 : -1);
      const ty = Math.random() * maxY * (Math.random() > 0.5 ? 1 : -1) * -0.5;
      setRoaming(true);
      setRoamPos({ x: tx, y: ty - 60 });
      setQuirky('roam');
      showBubble(roamMsgs[Math.floor(Math.random() * roamMsgs.length)], 3000);
      setTimeout(() => {
        setRoaming(false);
        setQuirky(null);
        setRoamPos({ x: 0, y: 0 });
      }, 4000);
    }, 25000 + Math.random() * 15000);
    return () => clearInterval(roam);
  }, []);

  useEffect(() => {
    quirkyTimer.current = setInterval(() => {
      if (Date.now() - lastActive.current > 15000 && !roaming) {
        if (Math.random() < 0.4) {
          const actions = ['dance', 'peek', 'stretch'];
          const action = actions[Math.floor(Math.random() * actions.length)];
          setQuirky(action);
          setExpression(action === 'dance' ? 'open' : 'squint');
          if (action === 'dance') {
            showBubble(danceMsgs[Math.floor(Math.random() * danceMsgs.length)], 1500);
          }
          setTimeout(() => {
            setQuirky(null);
            setExpression(bored ? 'sleep' : 'smile');
          }, 800);
        }
      }
    }, 8000);
    return () => clearInterval(quirkyTimer.current);
  }, [roaming, bored, showBubble]);

  useEffect(() => {
    boredomTimer.current = setInterval(() => {
      if (Date.now() - lastActive.current > 25000 && !roaming && !quirky) {
        setBored(true);
        setExpression('sleep');
        showBubble(boredMsgs[Math.floor(Math.random() * boredMsgs.length)], 4000);
      }
    }, 5000);
    return () => clearInterval(boredomTimer.current);
  }, [roaming, quirky, showBubble]);

  const handleClick = () => {
    clickCount.current += 1;

    if (clickCount.current >= 3) {
      clickCount.current = 0;
      setSquish(true);
      setExpression('surprised');
      showBubble("3 times? I get it. You want to talk. Let me open the chat for you.", 3500, true);
      setTimeout(() => {
        setSquish(false);
        setExpression('smile');
        window.dispatchEvent(new CustomEvent('openChat'));
      }, 800);
      return;
    }

    setSquish(true);
    setBored(false);
    setExpression('open');
    setTimeout(() => {
      setSquish(false);
      setExpression('smile');
    }, 300);
    const msg = clickMsgs[clickCount.current % clickMsgs.length];
    showBubble(msg, 2500);
    lastActive.current = Date.now();
  };

  const mouthPath = expression === 'open'
    ? "M32 27 Q36 34 40 27"
    : expression === 'squint'
      ? "M32 28 Q36 30 40 28"
      : expression === 'sleep'
        ? "M33 29 Q36 27 39 29"
        : expression === 'surprised'
          ? "M30 30 Q36 26 42 30"
          : "M30 28 Q36 32 42 28";

  const leftEye = expression === 'sleep'
    ? <line x1="26" y1="21" x2="33" y2="21" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" />
    : expression === 'surprised'
      ? <circle cx="29.5" cy="20" r="3.5" fill="white" stroke="#0A0A0A" strokeWidth="1.5">
          <circle cx="29.5" cy="20" r="1.5" fill="#0A0A0A" />
        </circle>
      : <rect x="26" y="19" width="7" height="4" rx="1.5" fill="#0A0A0A" />;

  const rightEye = expression === 'sleep'
    ? <line x1="39" y1="21" x2="46" y2="21" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" />
    : expression === 'surprised'
      ? <circle cx="42.5" cy="20" r="3.5" fill="white" stroke="#0A0A0A" strokeWidth="1.5">
          <circle cx="42.5" cy="20" r="1.5" fill="#0A0A0A" />
        </circle>
      : <rect x="39" y="19" width="7" height="4" rx="1.5" fill="#0A0A0A" />;

  const armDabY = quirky === 'dance' ? 12 : 18;
  const rightArmY = quirky === 'dance' ? 62 : 56;
  const bodyWiggle = quirky === 'dance' || quirky === 'excite';

  return (
    <motion.div
      ref={ref}
      className="hidden md:block fixed bottom-6 left-6 z-50 cursor-pointer"
      initial={{ y: 120, opacity: 0, scale: 0.5 }}
      animate={roaming
        ? { x: roamPos.x, y: roamPos.y, transition: { duration: 3, ease: 'easeInOut' } }
        : entered
            ? { x: 0, y: 0, opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 200, damping: 15, delay: 0 } }
          : { y: 120, opacity: 0, scale: 0.5 }
      }
      style={{ pointerEvents: 'auto' }}
      whileHover={{ scale: 1.08, transition: { duration: 0.2 } }}
    >
      <motion.div
        onClick={handleClick}
        animate={
          squish
            ? { scaleX: 0.8, scaleY: 1.2, rotate: [0, -3, 3, 0], transition: { duration: 0.25 } }
            : roaming
              ? { y: [0, -4, 0], transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' } }
              : bodyWiggle
                ? { rotate: [0, -4, 4, -2, 2, 0], transition: { duration: 0.6 } }
                : bored
                  ? { y: [0, 2, 0], transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' } }
                  : { y: [0, -5, 0], transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' } }
        }
        style={{
          transform: `scaleX(${flip}) rotate(${lean}deg) translate(${translate.x}px, ${translate.y}px)`,
        }}
        className="relative"
      >
        <AnimatePresence>
          {bubble.show && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -5, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-[125px] left-1/2 -translate-x-1/2 bg-white border-2 border-black rounded-2xl px-3.5 py-2.5 text-xs font-bold text-ink w-[220px] text-center leading-relaxed"
              style={{ boxShadow: '4px 4px 0px 0px #E85D3A' }}
            >
              <div className="absolute -bottom-[10px] left-1/2 -translate-x-1/2 w-5 h-5 bg-white border-r-[3px] border-b-[3px] border-black rotate-45" />
              <div className="max-w-[200px] mx-auto break-words">{bubble.text}</div>
            </motion.div>
          )}
        </AnimatePresence>
        <svg width="72" height="96" viewBox="0 0 72 96" fill="none" xmlns="http://www.w3.org/2000/svg">
          <motion.g
            animate={bodyWiggle ? { x: [0, 2, -2, 0] } : {}}
            transition={{ duration: 0.3, repeat: Infinity }}
          >
            <path d="M22 16 Q36 4 50 16 L50 10 Q36 2 22 10 Z" fill="#E85D3A" stroke="#0A0A0A" strokeWidth="2" strokeLinejoin="round" />
            <path d="M48 12 L58 14 L56 11 L48 9 Z" fill="#E85D3A" stroke="#0A0A0A" strokeWidth="2" strokeLinejoin="round" />
          </motion.g>

          <circle cx="36" cy="22" r="13" fill="#F5D6C5" stroke="#0A0A0A" strokeWidth="2" />

          <motion.g animate={expression === 'surprised' ? { y: [0, -1, 0] } : {}} transition={{ duration: 0.3 }}>
            {leftEye}
            {rightEye}
            <line x1="35" y1="20.5" x2="37" y2="20.5" stroke="#0A0A0A" strokeWidth="1.5" />
          </motion.g>

          <motion.path
            d={mouthPath}
            stroke="#0A0A0A"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            animate={expression === 'open' || expression === 'surprised' ? { scaleY: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.3 }}
          />

          <rect x="26" y="35" width="20" height="28" rx="4" fill="#6D28D9" stroke="#0A0A0A" strokeWidth="2" />
          <line x1="30" y1="35" x2="28" y2="42" stroke="#6D28D9" strokeWidth="3" strokeLinecap="round" />
          <line x1="42" y1="35" x2="44" y2="42" stroke="#6D28D9" strokeWidth="3" strokeLinecap="round" />
          <line x1="30" y1="35" x2="28" y2="42" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" />
          <line x1="42" y1="35" x2="44" y2="42" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" />
          <rect x="32" y="46" width="8" height="6" rx="1.5" fill="#4A3ED6" stroke="#0A0A0A" strokeWidth="1.5" />

          <motion.path
            d={`M26 40 Q14 28 16 ${armDabY}`}
            stroke="#F5D6C5" strokeWidth="6" strokeLinecap="round" fill="none"
            animate={quirky === 'dance' ? { rotate: [0, -10, 10, 0] } : {}}
            transition={{ duration: 0.3, repeat: 2 }}
          />
          <motion.path
            d={`M26 40 Q14 28 16 ${armDabY}`}
            stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" fill="none"
            animate={quirky === 'dance' ? { rotate: [0, -10, 10, 0] } : {}}
            transition={{ duration: 0.3, repeat: 2 }}
          />

          <motion.path
            d={`M46 40 Q56 48 60 ${rightArmY}`}
            stroke="#F5D6C5" strokeWidth="6" strokeLinecap="round" fill="none"
            animate={quirky === 'dance' ? { rotate: [0, 10, -10, 0] } : {}}
            transition={{ duration: 0.3, repeat: 2 }}
          />
          <motion.path
            d={`M46 40 Q56 48 60 ${rightArmY}`}
            stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" fill="none"
            animate={quirky === 'dance' ? { rotate: [0, 10, -10, 0] } : {}}
            transition={{ duration: 0.3, repeat: 2 }}
          />

          <motion.g animate={bored ? { y: [0, 1, 0], transition: { duration: 4, repeat: Infinity } } : {}}>
            <line x1="30" y1="63" x2="26" y2="84" stroke="#0A0A0A" strokeWidth="5" strokeLinecap="round" />
            <line x1="42" y1="63" x2="46" y2="84" stroke="#0A0A0A" strokeWidth="5" strokeLinecap="round" />
            <rect x="22" y="82" width="10" height="6" rx="2" fill="#0A0A0A" />
            <rect x="40" y="82" width="10" height="6" rx="2" fill="#0A0A0A" />
          </motion.g>
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default Stickman;
