import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Lightbulb, ShoppingCart } from 'lucide-react';
import PageMeta from '@/components/PageMeta';
import { containerVariants, itemVariants } from '@/components/case-studies/animations';
import Card from '@/components/case-studies/Card';
import SectionLabel from '@/components/case-studies/SectionLabel';
import ContextBar from '@/components/case-studies/ContextBar';
import BottomNav from '@/components/case-studies/BottomNav';

const CartCheckout = () => {
  const color = '#FF90E8';
  const cardBg = 'bg-blush';

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-[1200px] mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-16"
    >
      <PageMeta
        title="Case Study: Cart & Checkout — –26% | Saswata S. Sengupta"
        description="How I reduced cart abandonment from 73.1% to 53.9% through checkout instrumentation and three targeted fixes at Sierra Living Concepts."
      />
      <Link
        to="/case-studies"
        className="inline-flex items-center gap-1.5 text-sm font-bold text-ink/50 hover:text-ink mb-8 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to all case studies
      </Link>

      <motion.div
        variants={itemVariants}
        className={`${cardBg} border-2 border-black rounded-2xl p-8 md:p-12 lg:p-14 relative overflow-hidden`}
        style={{ boxShadow: `12px 12px 0px 0px ${color}` }}
      >
        <div className="absolute -top-8 -right-8 w-24 h-24 bg-white/30 border-2 border-black rounded-xl rotate-12 hidden md:block" />
        <div className="absolute top-16 right-12 w-12 h-12 bg-white/20 border-2 border-black rounded-lg -rotate-6 hidden md:block" />

        <ContextBar company="Sierra Living Concepts" period="2024" tags={['D2C', 'E-Commerce']} />

        <div className="flex items-center gap-3 mb-2 relative z-10">
          <ShoppingCart className="w-8 h-8 text-ink" aria-hidden="true" />
          <h1 className="text-ink text-2xl md:text-3xl lg:text-4xl font-display font-black tracking-tight">
            Cart & Checkout Abandonment — –26%
          </h1>
        </div>

        <p className="mt-3 text-sm md:text-base text-ink/70 font-medium max-w-3xl relative z-10">
          73.1% → 53.9%. Three friction points, two sprints, zero architecture changes.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-6 relative z-10">
          {[
            { value: '73.1%', label: 'Cart abandonment before' },
            { value: '53.9%', label: 'Cart abandonment after' },
            { value: '–26%', label: 'Relative reduction' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03, y: -2 }}
              className="bg-pink/30 border-2 border-black rounded-xl p-3 md:p-4 text-center"
            >
              <div className="text-xl md:text-2xl font-display font-black text-ink">{stat.value}</div>
              <p className="text-xs font-bold text-ink/60 mt-0.5">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="mt-8 space-y-6">
        <Card style={{ boxShadow: `6px 6px 0px 0px ${color}` }}>
          <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ backgroundColor: color }} />
          <SectionLabel color={color}>The Problem</SectionLabel>
          <p className="text-sm md:text-base text-ink/80 font-medium leading-relaxed">
            Cart abandonment was sitting at 73.1% — a significant leak in the conversion funnel. The business knew the number but not the why. No funnel instrumentation existed below the PDP level. The default Shopify analytics showed a flat abandonment rate with no step-by-step breakdown, making it impossible to identify where users were dropping off or why.
          </p>
        </Card>

        <Card style={{ boxShadow: `6px 6px 0px 0px ${color}` }}>
          <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ backgroundColor: color }} />
          <SectionLabel color={color}>My Diagnosis</SectionLabel>
          <p className="text-sm md:text-base text-ink/80 font-medium leading-relaxed">
            Set up GA4 custom events across every checkout step — cart view, shipping info, payment info, order review, purchase. Layered Microsoft Clarity heatmaps and session recordings on top. Within two weeks of instrumentation, three distinct drop-off clusters emerged: (1) users reaching the shipping estimate step and immediately leaving, (2) mobile users rage-clicking a non-functional promo code field, and (3) desktop users abandoning at the payment step after encountering a generic error message with no resolution path.
          </p>
        </Card>

        <Card style={{ boxShadow: `6px 6px 0px 0px ${color}` }}>
          <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ backgroundColor: color }} />
          <SectionLabel color={color}>What We Shipped</SectionLabel>
          <p className="text-sm md:text-base text-ink/80 font-medium leading-relaxed">
            Transparent shipping cost display on the cart page so users saw the full cost before entering the checkout flow. Fixed promo code validation with inline error messaging that told users exactly what went wrong. Replaced the generic payment error with specific, actionable copy referencing card type, expiry, or network decline. Each fix was independently validated with before/after session recordings. Shipped in two sprints over 6 weeks.
          </p>
        </Card>
      </div>

      <motion.div variants={itemVariants} className="mt-6">
        <SectionLabel color={color}>Options I Considered</SectionLabel>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            'A/B test a single-page checkout vs the existing multi-step. Higher risk, longer timeline, but potentially higher uplift.',
            'Fix the three specific friction points identified in discovery without rebuilding the flow. Lower risk, faster to ship.',
            'I pushed for Option B — the data already told us exactly where to focus. Option A could follow as a separate experiment.',
          ].map((opt, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02, y: -3 }}
              className={`${cardBg} border-2 border-black rounded-xl p-4`}
              style={{ boxShadow: `4px 4px 0px 0px ${color}` }}
            >
              <span
                className="inline-flex items-center justify-center w-6 h-6 rounded-lg border-2 border-black text-xs font-black mb-2"
                style={{ backgroundColor: color, borderColor: color }}
              >
                {String.fromCharCode(65 + i)}
              </span>
              <p className="text-xs md:text-sm font-medium text-ink/80">{opt}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        whileHover={{ scale: 1.005, y: -2 }}
        className="mt-6 bg-white border-2 border-black rounded-2xl p-8 md:p-10 text-center relative overflow-hidden"
        style={{ boxShadow: `8px 8px 0px 0px ${color}` }}
      >
        <div className="absolute -top-4 -left-4 w-16 h-16 rounded-lg rotate-12 border-2 border-black hidden md:block" style={{ backgroundColor: color }} />
        <Lightbulb className="w-8 h-8 mx-auto mb-3" style={{ color }} aria-hidden="true" />
        <p className="text-base md:text-lg font-display font-black text-ink">
          Cart abandonment dropped from 73.1% to 53.9%. That's a 26% relative reduction. The fix cost two sprints and zero architectural changes — no single-page checkout rebuild, no platform migration. Just targeted instrumentation followed by targeted fixes.
        </p>
      </motion.div>

      <BottomNav next="category-discovery" />
    </motion.div>
  );
};

export default CartCheckout;
