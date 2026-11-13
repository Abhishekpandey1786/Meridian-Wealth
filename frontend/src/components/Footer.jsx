import { Link } from 'react-router-dom';
import { SITE, NAV } from '../config';

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-serif text-2xl text-white">Meridian <span className="text-gold-400">Wealth</span></p>
          <p className="mt-3 max-w-md text-sm">Independent financial planning and investment management for individuals, families and business owners.</p>
          <p className="mt-4 text-sm">{SITE.address}<br />{SITE.phone} · {SITE.email}</p>
        </div>
        <div>
          <p className="mb-3 font-semibold text-white">Explore</p>
          <ul className="space-y-2 text-sm">{NAV.map(([l, to]) => <li key={to}><Link className="hover:text-gold-400" to={to}>{l}</Link></li>)}</ul>
        </div>
        <div>
          <p className="mb-3 font-semibold text-white">Legal</p>
          <ul className="space-y-2 text-sm">
            <li><Link className="hover:text-gold-400" to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link className="hover:text-gold-400" to="/terms-and-conditions">Terms & Conditions</Link></li>
            <li><Link className="hover:text-gold-400" to="/disclosures">Important Disclosures</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-6 text-xs leading-relaxed text-slate-400">
        <p className="mx-auto max-w-7xl">
           © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
