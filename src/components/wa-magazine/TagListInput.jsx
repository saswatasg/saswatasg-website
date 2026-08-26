import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

/** Chip/tag input — type + Enter (or comma) to add, click x to remove. */
const TagListInput = ({ label, hint, placeholder, values, onChange }) => {
  const [draft, setDraft] = useState('');

  const commit = () => {
    const v = draft.trim();
    if (v && !values.includes(v)) onChange([...values, v]);
    setDraft('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      commit();
    } else if (e.key === 'Backspace' && draft === '' && values.length > 0) {
      onChange(values.slice(0, -1));
    }
  };

  const remove = (v) => onChange(values.filter((x) => x !== v));

  return (
    <div>
      <label className="text-sm font-display font-black text-ink mb-1 block">{label}</label>
      {hint && <p className="text-xs text-ink/50 font-medium mb-2.5">{hint}</p>}
      <div className="flex flex-wrap items-center gap-2 p-2.5 bg-white border-2 border-black rounded-lg min-h-[48px] focus-within:ring-2 focus-within:ring-coral">
        <AnimatePresence initial={false}>
          {values.map((v) => (
            <motion.span
              key={v}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="inline-flex items-center gap-1 pl-2.5 pr-1.5 py-1 rounded-lg text-xs font-bold bg-canvas text-ink border-2 border-black"
            >
              {v}
              <button
                type="button"
                onClick={() => remove(v)}
                aria-label={`Remove ${v}`}
                className="rounded-full hover:bg-ink/10 p-0.5 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </motion.span>
          ))}
        </AnimatePresence>
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={commit}
          placeholder={values.length === 0 ? placeholder : ''}
          className="flex-1 min-w-[100px] bg-transparent text-sm font-medium text-ink outline-none placeholder:text-ink/30 py-1"
        />
      </div>
    </div>
  );
};

export default TagListInput;
