import { useState } from 'react';
import { Link } from 'react-router-dom';
import useApi from '../hooks/useApi';

export const PageHero = ({ title, sub }) => (
  <section className="bg-navy-900 text-white">
    <div className="mx-auto max-w-7xl px-5 py-16 md:py-24">
      <h1 className="max-w-3xl font-serif text-4xl md:text-5xl">{title}</h1>
      {sub && <p className="mt-4 max-w-2xl text-lg text-slate-300">{sub}</p>}
    </div>
  </section>
);

export const CTA = () => (
  <section className="bg-gold-500">
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-5 py-12 md:flex-row">
      <h2 className="font-serif text-2xl text-navy-900 md:text-3xl">Ready for a clearer financial future?</h2>
      <Link to="/contact" className="rounded-md bg-navy-900 px-7 py-3 font-semibold text-white hover:bg-navy-800">Schedule a Free Consultation</Link>
    </div>
  </section>
);

export function Faq({ limit }) {
  const { data } = useApi('/faqs');
  const [open, setOpen] = useState(0);
  return (
    <div className="mx-auto max-w-3xl divide-y rounded-xl border bg-white">
      {data.slice(0, limit).map((f, i) => (
        <div key={f.q}>
          <button className="flex w-full items-center justify-between px-5 py-4 text-left font-semibold text-navy-900" onClick={() => setOpen(open === i ? -1 : i)}>
            {f.q}<span className="text-gold-600">{open === i ? '–' : '+'}</span>
          </button>
          {open === i && <p className="px-5 pb-5">{f.a}</p>}
        </div>
      ))}
    </div>
  );
}

export function Services({ limit }) {
  const { data } = useApi('/services');
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {data.slice(0, limit).map((s) => (
        <div key={s.id} className="rounded-xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
          <div className="mb-4 h-1 w-10 bg-gold-500" />
          <h3 className="font-serif text-xl text-navy-900">{s.title}</h3>
          <p className="mt-2 text-sm">{s.text}</p>
        </div>
      ))}
    </div>
  );
}

export function Testimonials() {
  const { data } = useApi('/testimonials');
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {data.map((t) => (
        <figure key={t.name} className="rounded-xl bg-white p-6 shadow">
          <p className="text-gold-500">★★★★★</p>
          <blockquote className="mt-3 italic">“{t.text}”</blockquote>
          <figcaption className="mt-4 text-sm font-semibold text-navy-900">{t.name} <span className="font-normal text-slate-500">· {t.role}</span></figcaption>
        </figure>
      ))}
      <p className="text-xs text-slate-500 md:col-span-3">Sample testimonials. Replace with real, compliant client feedback before launch.</p>
    </div>
  );
}
