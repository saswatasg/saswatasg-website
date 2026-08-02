import React from 'react';

const AnswerBox = ({ children }) => (
  <div className="border-2 border-black rounded-2xl bg-blush p-5 md:p-6 my-6">
    <div className="text-[10px] font-black uppercase tracking-widest text-coral mb-2">The short answer</div>
    <p className="text-sm md:text-base font-semibold text-ink leading-relaxed">{children}</p>
  </div>
);

export default AnswerBox;
