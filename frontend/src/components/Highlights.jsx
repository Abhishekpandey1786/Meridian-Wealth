import { useEffect, useState } from 'react';

export const WORDS = ['GROW YOUR INVESTMENT', '1.5X YOUR MONEY', 'GROW YOUR MONEY'];

// Hero me ghoomne wale highlight words
export function RotatingHighlight() {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI((x) => (x + 1) % WORDS.length), 2600); return () => clearInterval(t); }, []);
  return (
    <span key={i} className="inline-block animate-fadeUp bg-gradient-to-r from-gold-400 to-yellow-200 bg-clip-text text-transparent">{WORDS[i]}</span>
  );
}

// Scrolling ticker strip
export function Marquee() {
  const items = [...WORDS, ...WORDS, ...WORDS, ...WORDS];
  return (
    <div className="overflow-hidden bg-gold-500 py-3">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap font-bold tracking-widest text-navy-900">
        {[...items, ...items].map((w, i) => <span key={i}>{w} <span className="mx-4">◆</span></span>)}
      </div>
    </div>
  );
}
