import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { openScheduleBooking } from '@/utils/openCalendar';
import { trackEvent } from '@/utils/analytics';

const FACE_SRC = 'https://i.postimg.cc/k4SXX1GT/Saswata-img1.png';

const TYPEWRITER_TEXT =
  "I find the problem nobody's measuring — then ship the fix that moves the number. 73%→54% checkout, a 17:1 compliance gap, AI agents at Upcore. What should we look at?";

const METRICS = [
  { value: '$594K', label: 'monthly revenue impact' },
  { value: '73%→54%', label: 'checkout abandonment' },
  { value: '17:1', label: 'compliance gap found' },
  { value: '+124%', label: 'lead submissions' },
  { value: '70+', label: 'product changes shipped' },
];

function useTypewriter(text, speed = 38, startDelay = 600, enabled = true) {
  const [displayed, setDisplayed] = useState(enabled ? '' : text);
  const [done, setDone] = useState(!enabled);

  useEffect(() => {
    if (!enabled) {
      setDisplayed(text);
      setDone(true);
      return undefined;
    }
    let interval;
    let timeout;
    let i = 0;
    setDisplayed('');
    setDone(false);
    timeout = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
    }, startDelay);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, speed, startDelay, enabled]);

  return { displayed, done };
}

function CopyIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <rect x="4" y="4" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <rect x="1" y="1" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

const HeroSection = () => {
  const shouldReduceMotion = useReducedMotion();
  const animateMotion = !shouldReduceMotion;
  const { displayed, done } = useTypewriter(TYPEWRITER_TEXT, 38, 600, animateMotion);

  const [pillsVisible, setPillsVisible] = useState(!animateMotion);
  const [copied, setCopied] = useState(false);
  const faceRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!animateMotion) return undefined;
    const t = setTimeout(() => setPillsVisible(true), 400);
    return () => clearTimeout(t);
  }, [animateMotion]);

  // Mouse parallax on the face layer
  useEffect(() => {
    if (!animateMotion) return undefined;
    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;

    const onMouseMove = (e) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      targetX = nx * 18;
      targetY = ny * 12;
    };

    const tick = () => {
      curX += (targetX - curX) * 0.08;
      curY += (targetY - curY) * 0.08;
      if (faceRef.current) {
        faceRef.current.style.transform = `translate3d(${curX}px, ${curY}px, 0) scale(1.06)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [animateMotion]);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText('saswatasg@gmail.com');
      setCopied(true);
      trackEvent('hero_cta', 'copy_email');
      setTimeout(() => setCopied(false), 1500);
    } catch (_) {
      /* clipboard unavailable */
    }
  }, []);

  const pillBase =
    'inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 min-h-[36px]';

  return (
    <section className="relative w-full min-h-screen overflow-hidden" aria-label="Introduction">
      {/* Face background layer — mouse parallax */}
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div
          ref={faceRef}
          className="absolute inset-0 will-change-transform"
          style={{
            transform: 'translate3d(0,0,0) scale(1.06)',
            transformOrigin: '70% 30%',
          }}
        >
          <img
            src={FACE_SRC}
            alt=""
            className="w-full h-full object-cover"
            style={{ objectPosition: '70% 20%' }}
            loading="eager"
            width="800"
            height="800"
          />
        </div>
        {/* Soft scrim so left text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-canvas via-canvas/85 to-canvas/10 md:to-transparent" />
        <div className="absolute inset-0 bg-canvas/20 md:bg-transparent" />
        {/* Subtle grain */}
        <div
          className="absolute inset-0 opacity-[0.07] mix-blend-multiply"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
        {/* Ambient drift when motion allowed */}
        {animateMotion && (
          <motion.div
            className="absolute inset-0"
            animate={{ opacity: [0.5, 0.7, 0.5] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              background:
                'radial-gradient(ellipse 60% 50% at 75% 30%, rgba(232,93,58,0.12), transparent 70%)',
            }}
          />
        )}
      </div>

      {/* Hero content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-end md:justify-center pb-12 md:pb-0 px-5 sm:px-8 md:px-10 pt-28">
        <div className="max-w-xl">
          {/* Blurred intro label */}
          <h1
            className="pointer-events-none select-none mb-5 sm:mb-6"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(18px, 4vw, 26px)',
              lineHeight: 1.3,
              fontWeight: 400,
              color: '#000',
              filter: animateMotion ? 'blur(4px)' : 'none',
            }}
          >
            Hey, I'm Saswata,
            <br />
            Product Manager — B2B SaaS, AI &amp; growth systems
          </h1>

          {/* Typewriter */}
          <p
            className="text-black mb-5 sm:mb-6"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(18px, 4vw, 26px)',
              lineHeight: 1.35,
              fontWeight: 400,
              minHeight: '54px',
            }}
            aria-live="polite"
          >
            {displayed}
            {!done && (
              <span
                className="inline-block w-[2px] h-[1.1em] bg-black align-middle ml-[2px]"
                style={{ animation: 'blink 1s step-end infinite' }}
                aria-hidden="true"
              />
            )}
          </p>

          {/* Action pills */}
          <div
            className="flex flex-wrap gap-y-1"
            style={{
              opacity: pillsVisible ? 1 : 0,
              transform: pillsVisible ? 'translateY(0)' : 'translateY(8px)',
              transition: 'opacity 0.4s ease, transform 0.4s ease',
            }}
          >
            <Link
              to="/work"
              onClick={() => trackEvent('hero_cta', 'see_work')}
              className={pillBase}
            >
              See case studies
            </Link>
            <a
              href="/assets/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('hero_cta', 'download_resume')}
              className={pillBase}
            >
              Download resume
            </a>
            <button
              type="button"
              onClick={() => {
                trackEvent('hero_cta', 'lets_talk');
                openScheduleBooking();
              }}
              className={pillBase}
            >
              Let's talk
            </button>
            <Link
              to="/blog"
              onClick={() => trackEvent('hero_cta', 'read_blog')}
              className={pillBase}
            >
              Read the blog
            </Link>
            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex items-center justify-center gap-2 sm:gap-3 text-white bg-transparent border border-white rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-white hover:text-black transition-colors duration-200 min-h-[36px]"
              aria-label="Copy email address"
            >
              <span>
                Reach me:{' '}
                <span className="underline underline-offset-1">saswatasg@gmail.com</span>
              </span>
              <CopyIcon />
              {copied && <span className="text-[11px] opacity-70">copied</span>}
            </button>
          </div>

          {/* Compact metric strip */}
          <motion.div
            initial={animateMotion ? { opacity: 0, y: 10 } : false}
            animate={animateMotion ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.9, duration: 0.4 }}
            className="flex flex-wrap gap-2 mt-6"
          >
            {METRICS.map((m) => (
              <div
                key={m.label}
                className="bg-white/90 backdrop-blur-sm border-2 border-black rounded-xl px-3 py-2"
                style={{ boxShadow: '3px 3px 0px 0px #0A0A0A' }}
              >
                <div className="text-sm md:text-base font-display font-black text-ink leading-none">
                  {m.value}
                </div>
                <p className="text-[10px] font-bold text-ink/55 mt-1 leading-tight">{m.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Credentials line */}
          <motion.p
            initial={animateMotion ? { opacity: 0 } : false}
            animate={animateMotion ? { opacity: 1 } : {}}
            transition={{ delay: 1.1, duration: 0.4 }}
            className="mt-5 text-xs font-bold text-ink/50"
          >
            PM at Upcore · ex-LiveKeeping (IndiaMART) · ex-Sierra · B.Tech + IIT Jodhpur MBA
          </motion.p>
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
