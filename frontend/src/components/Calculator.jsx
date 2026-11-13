import { useState } from 'react';
import { Link } from 'react-router-dom';

const fmt = (n) => '$' + Math.round(n).toLocaleString('en-US');

export default function Calculator() {
  const [amt, setAmt] = useState(100000);
  const [multiple, setMultiple] = useState(1.5);
  const [years, setYears] = useState(5);
  const target = amt * multiple;
  const cagr = (Math.pow(multiple, 1 / years) - 1) * 100;
  return (
    <div className="grid gap-8 rounded-2xl bg-white p-6 shadow-xl md:p-10 lg:grid-cols-2">
      <div className="space-y-7">
        <label className="block"><span className="flex justify-between font-semibold text-navy-900">Investment amount <b className="text-gold-600">{fmt(amt)}</b></span>
          <input type="range" min="10000" max="2000000" step="10000" value={amt} onChange={(e) => setAmt(+e.target.value)} className="mt-2 w-full accent-gold-600" /></label>
        <label className="block"><span className="flex justify-between font-semibold text-navy-900">Target multiple <b className="text-gold-600">{multiple}X</b></span>
          <input type="range" min="1.1" max="3" step="0.1" value={multiple} onChange={(e) => setMultiple(+e.target.value)} className="mt-2 w-full accent-gold-600" /></label>
        <label className="block"><span className="flex justify-between font-semibold text-navy-900">Time horizon <b className="text-gold-600">{years} years</b></span>
          <input type="range" min="1" max="15" step="1" value={years} onChange={(e) => setYears(+e.target.value)} className="mt-2 w-full accent-gold-600" /></label>
      </div>
      <div className="flex flex-col justify-center rounded-xl bg-navy-900 p-8 text-center text-white">
        <p className="text-sm uppercase tracking-widest text-gold-400">Illustrative target value</p>
        <p className="mt-2 font-serif text-5xl text-gold-400">{fmt(target)}</p>
        <p className="mt-3 text-slate-300">Goal gain: {fmt(target - amt)} · needs ≈ {cagr.toFixed(1)}% per year</p>
        <Link to="/contact" className="btn-gold mt-6">Build My Plan</Link>
        <p className="mt-4 text-xs text-slate-400">Hypothetical illustration only. Not a promise or guarantee of returns. Investments can lose value.</p>
      </div>
    </div>
  );
}
