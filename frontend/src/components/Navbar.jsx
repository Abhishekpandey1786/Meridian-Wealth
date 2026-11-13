import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { NAV, SITE } from '../config';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-navy-900 text-white shadow">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link to="/" className="font-serif text-xl tracking-wide">Meridian <span className="text-gold-400">Wealth</span></Link>
        <nav className="hidden items-center gap-7 text-sm lg:flex">
          {NAV.map(([l, to]) => (
            <NavLink key={to} to={to} className={({ isActive }) => `hover:text-gold-400 ${isActive ? 'text-gold-400' : ''}`}>{l}</NavLink>
          ))}
          <a href={`tel:${SITE.phone}`} className="text-gold-400">{SITE.phone}</a>
          <Link to="/contact" className="btn-gold !py-2">Free Consultation</Link>
        </nav>
        <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">{open ? '✕' : '☰'}</button>
      </div>
      {open && (
        <div className="space-y-3 border-t border-white/10 px-5 pb-5 pt-3 lg:hidden">
          {NAV.map(([l, to]) => <Link key={to} to={to} onClick={() => setOpen(false)} className="block">{l}</Link>)}
          <Link to="/contact" onClick={() => setOpen(false)} className="btn-gold w-full">Free Consultation</Link>
        </div>
      )}
    </header>
  );
}
