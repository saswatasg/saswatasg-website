import React from 'react';
import { motion } from 'framer-motion';

/** Single-select pill group, matching the homepage's tag/pill visual language. */
const PillChoice = ({ label, hint, options, value, onChange, name }) => (
  <fieldset>
    <legend className="text-sm font-display font-black text-ink mb-1">{label}</legend>
    {hint && <p className="text-xs text-ink/50 font-medium mb-2.5">{hint}</p>}
    <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const selected = opt.value === value;
        return (
          <motion.button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={selected}
            name={name}
            whileHover={{ scale: 1.05, rotate: selected ? 0 : [0, -2, 2, 0] }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.15 }}
            onClick={() => onChange(opt.value)}
            className={`px-3.5 py-2 rounded-lg text-xs md:text-sm font-bold border-2 border-black transition-colors duration-150 ${
              selected ? 'bg-ink text-white' : 'bg-white text-ink hover:bg-canvas'
            }`}
          >
            {opt.label}
            {opt.sub && (
              <span className={`block text-[10px] font-medium mt-0.5 ${selected ? 'text-white/60' : 'text-ink/40'}`}>
                {opt.sub}
              </span>
            )}
          </motion.button>
        );
      })}
    </div>
  </fieldset>
);

export default PillChoice;
