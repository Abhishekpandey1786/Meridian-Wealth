import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SITE } from '../config';

export function FloatingButtons() {
  const [show, setShow] = useState(false);
  useEffect(() => { const f = () => setShow(window.scrollY > 500); window.addEventListener('scroll', f); return () => window.removeEventListener('scroll', f); }, []);
  const wa = `https://wa.me/${SITE.phone.replace(/\D/g, '')}?text=${encodeURIComponent('Hi, I want to know about growing my investment.')}`;
  return (
    <>
      <a href={wa} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="fixed bottom-5 left-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-2xl text-white shadow-lg hover:scale-105">💬</a>
      {show && <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-5 right-5 z-40 h-12 w-12 rounded-full bg-gold-500 font-bold text-navy-900 shadow-lg">↑</button>}
      <Link to="/contact" className="fixed inset-x-0 bottom-0 z-30 bg-gold-500 py-3 text-center font-bold text-navy-900 md:hidden">Get Free Consultation →</Link>
    </>
  );
}

export function CookieBanner() {
  const [ok, setOk] = useState(true);
  useEffect(() => { try { setOk(localStorage.getItem('cookie-ok') === '1'); } catch { setOk(false); } }, []);
  if (ok) return null;
  const accept = () => { try { localStorage.setItem('cookie-ok', '1'); } catch {} setOk(true); };
  return (
    <div className="fixed bottom-20 left-1/2 z-50 w-[92%] max-w-xl -translate-x-1/2 rounded-xl bg-navy-900 p-5 text-sm text-white shadow-2xl md:bottom-6">
      We use cookies to improve your experience. See our <Link to="/privacy-policy" className="underline text-gold-400">Privacy Policy</Link>.
      <div className="mt-3 flex gap-3"><button onClick={accept} className="btn-gold !py-2">Accept</button><button onClick={accept} className="btn-outline !py-2">Only necessary</button></div>
    </div>
  );
}

export function Counter({ to, suffix = '', label }) {
  const [n, setN] = useState(0);
  useEffect(() => { let c = 0; const step = Math.max(1, Math.ceil(to / 50)); const t = setInterval(() => { c += step; if (c >= to) { c = to; clearInterval(t); } setN(c); }, 30); return () => clearInterval(t); }, [to]);
  return <div className="text-center"><p className="font-serif text-4xl text-gold-400 md:text-5xl">{n.toLocaleString()}{suffix}</p><p className="mt-1 text-sm text-slate-300">{label}</p></div>;
}
