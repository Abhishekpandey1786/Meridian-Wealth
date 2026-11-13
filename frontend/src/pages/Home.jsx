import { Link } from 'react-router-dom';
import LeadForm from '../components/LeadForm';
import Calculator from '../components/Calculator';
import { CTA, Faq, Services, Testimonials } from '../components/Bits';
import { RotatingHighlight, Marquee } from '../components/Highlights';
import { Counter } from '../components/Extras';

const TRUST = [['🛡️', 'Transparent', 'Clear fees, no hidden charges'], ['👨‍💼', 'Expert team', 'CFP®, CFA & CPA professionals'], ['📊', 'Goal-based', 'Plans built around your target'], ['🤝', 'Dedicated advisor', 'One point of contact']];
const PLANS = [
  { name: 'Starter Growth', tag: 'Begin your journey', pts: ['Goal & risk profiling', 'Diversified starter portfolio', 'Quarterly review', 'Email & chat support'] },
  { name: 'Wealth Builder', tag: 'Most popular', hot: true, pts: ['Target-based plan (e.g. 1.5X goal)', 'Multi-asset allocation', 'Tax-aware strategy', 'Dedicated advisor & monthly review'] },
  { name: 'Private Wealth', tag: 'For larger portfolios', pts: ['Customized portfolio design', 'Estate & succession planning', 'Alternative investment access*', 'Priority advisor access'] },
];
const WHY = [['Know where you stand', 'We start by reviewing your previous investments so we build on what you already own, not from zero.'], ['Plan with a target', 'Set a clear goal — like growing money 1.5X — and see what time and risk it takes.'], ['Diversify smartly', 'Spread across asset classes to manage risk instead of chasing one bet.'], ['Review & rebalance', 'Markets move and life changes. We keep your plan on track.']];
const COMPARE = [['Personal advisor', true, false], ['Plan around your goal', true, false], ['Reviews your past investments', true, false], ['Tax-aware strategy', true, 'Rarely'], ['Transparent fees', true, 'Varies']];
const STEPS = [['Tell us about you', 'Share goals and where you have invested before.'], ['Meet your advisor', 'A free, no-pressure conversation.'], ['Get your plan', 'A written strategy with clear next steps.'], ['Grow & review', 'Regular reviews to stay on target.']];
const WHO = [['Individuals & Couples', 'Start or grow your portfolio with a clear plan.'], ['Business Owners & Executives', 'Put business profits and equity to work.'], ['Retirees & Pre-Retirees', 'Make savings last and keep growing.'], ['Families', 'Build wealth across generations.']];
const INSIGHTS = [['5 mistakes investors make with their first portfolio', 'Investing basics'], ['How to review your old investments before adding new ones', 'Portfolio review'], ['Diversification explained in plain language', 'Risk management']];
const SERVICES = ['Financial Planning', 'Investment Management', 'Retirement Planning', 'Tax Strategy', 'Estate Planning', 'Insurance & Risk', 'Business Owner Planning'];
const PREVIOUS = ['Stocks', 'Mutual Funds', 'ETFs', 'Bonds', 'Real Estate', 'Fixed Deposits / CDs', 'Gold / Commodities', 'Crypto', '401(k) / IRA', 'Private / Alternative Investments', 'Insurance Products', 'None yet'];
const empty = { firstName: '', lastName: '', email: '', phone: '', city: '', state: '', investableAssets: '', servicesInterested: [], hasAdvisor: '', previousInvestments: [], previousInvestmentsDetails: '', message: '', consent: false, website: '' };

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 text-white">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-start gap-12 px-5 py-14 lg:grid-cols-2 lg:py-24">
          <div>
            <p className="mb-3 inline-block rounded-full border border-gold-400/50 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gold-400">Independent Wealth Management</p>
            <h1 className="font-serif text-4xl font-bold leading-tight md:text-6xl"><span className="block min-h-[2.4em] md:min-h-[2.2em]"><RotatingHighlight /></span></h1>
            <p className="mt-2 max-w-xl text-lg text-slate-300">Smart, goal-based investing with expert advisors. Tell us where you have invested before — we'll build the plan to take you forward.</p>
            <ul className="mt-6 space-y-2 text-slate-200">{['Free first consultation, zero obligation', 'We review your past investments first', 'Transparent, jargon-free advice'].map((t) => <li key={t}><span className="text-gold-400">✔</span> {t}</li>)}</ul>
            <div className="mt-8 flex flex-wrap gap-3"><a href="#plans" className="btn-gold">See Plans</a><a href="#calculator" className="btn-outline">Try Calculator</a></div>
            <p className="mt-5 max-w-lg text-xs text-slate-400">“1.5X” is a goal-based illustration, not a guaranteed return. Investments involve risk, including loss of principal.</p>
          </div>
          <LeadForm />
        </div>
      </section>

      <Marquee />

      <section className="bg-cream"><div className="mx-auto grid max-w-7xl gap-6 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {TRUST.map(([i, t, d]) => <div key={t} className="rounded-xl bg-white p-5 text-center shadow-sm"><p className="text-3xl">{i}</p><h3 className="mt-2 font-serif text-lg text-navy-900">{t}</h3><p className="text-sm">{d}</p></div>)}
      </div></section>

      <section className="section">
        <div className="mx-auto mb-10 max-w-2xl text-center"><p className="font-bold tracking-widest text-gold-600">WHY GROW WITH US</p><h2 className="h2 mt-2">Grow your money with a plan, not guesswork</h2></div>
        <div className="grid gap-6 md:grid-cols-2">{WHY.map(([t, d], i) => <div key={t} className="flex gap-4 rounded-xl border bg-white p-6 shadow-sm"><span className="font-serif text-4xl text-gold-500">0{i + 1}</span><div><h3 className="font-serif text-xl text-navy-900">{t}</h3><p className="mt-1">{d}</p></div></div>)}</div>
      </section>

      <section id="calculator" className="bg-cream"><div className="section"><div className="mx-auto mb-10 max-w-2xl text-center"><p className="font-bold tracking-widest text-gold-600">1.5X YOUR MONEY</p><h2 className="h2 mt-2">See what a 1.5X goal could look like</h2></div><Calculator /></div></section>

      <section id="plans" className="section">
        <div className="mx-auto mb-10 max-w-2xl text-center"><p className="font-bold tracking-widest text-gold-600">OUR PLANS</p><h2 className="h2 mt-2">Choose how you want to grow your investment</h2></div>
        <div className="grid gap-6 lg:grid-cols-3">
          {PLANS.map((p) => (
            <div key={p.name} className={`relative rounded-2xl p-8 shadow-lg ${p.hot ? 'scale-105 bg-navy-900 text-white' : 'border bg-white'}`}>
              {p.hot && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold-500 px-4 py-1 text-xs font-bold text-navy-900">MOST POPULAR</span>}
              <p className={`text-sm font-semibold ${p.hot ? 'text-gold-400' : 'text-gold-600'}`}>{p.tag}</p>
              <h3 className={`mt-1 font-serif text-2xl ${p.hot ? '' : 'text-navy-900'}`}>{p.name}</h3>
              <ul className="my-6 space-y-3 text-sm">{p.pts.map((x) => <li key={x}><span className="text-gold-500">✔</span> {x}</li>)}</ul>
              <Link to="/contact" className={p.hot ? 'btn-gold w-full' : 'inline-flex w-full items-center justify-center rounded-md border-2 border-navy-900 px-6 py-3 font-semibold text-navy-900 hover:bg-navy-900 hover:text-white'}>Get Started</Link>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-slate-500">*Alternative investments may be illiquid and are not suitable for everyone. Plans describe services, not guaranteed outcomes.</p>
      </section>

      <section className="bg-navy-900"><div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <Counter to={2500} suffix="+" label="Families guided" /><Counter to={25} suffix="+" label="Years of experience" /><Counter to={12} label="Expert advisors" /><Counter to={98} suffix="%" label="Client satisfaction*" />
      </div><p className="pb-6 text-center text-xs text-slate-500">*Sample figures — replace with your real, verifiable numbers.</p></section>

      <section className="section">
        <h2 className="h2 mb-8 text-center">Why choose us over going it alone</h2>
        <div className="mx-auto max-w-3xl overflow-hidden rounded-xl border bg-white shadow">
          <div className="grid grid-cols-3 bg-navy-900 p-4 text-center font-semibold text-white"><span className="text-left">Feature</span><span className="text-gold-400">Us</span><span>DIY</span></div>
          {COMPARE.map(([f, a, b]) => <div key={f} className="grid grid-cols-3 border-t p-4 text-center"><span className="text-left font-medium text-navy-900">{f}</span><span className="text-green-600">✔</span><span className="text-slate-500">{b === false ? '✘' : b}</span></div>)}
        </div>
      </section>

      <section className="bg-navy-900 text-white"><div className="section">
        <h2 className="font-serif text-3xl md:text-4xl">How it works</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-4">{STEPS.map(([t, d], i) => <div key={t}><span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-500 text-lg font-bold text-navy-900">{i + 1}</span><h3 className="mt-4 font-serif text-xl">{t}</h3><p className="mt-2 text-sm text-slate-300">{d}</p></div>)}</div>
      </div></section>

      <section className="section"><h2 className="h2 mb-3">Complete financial services</h2><p className="mb-10 max-w-2xl">Everything you need to grow and protect your wealth, under one roof.</p><Services limit={8} /></section>

      <section className="bg-cream"><div className="section"><h2 className="h2 mb-10">Who we serve</h2><div className="grid gap-6 md:grid-cols-2">
        {WHO.map(([t, d]) => <Link to="/contact" key={t} className="rounded-xl border-l-4 border-gold-500 bg-white p-6 shadow transition hover:shadow-lg"><h3 className="font-serif text-xl text-navy-900">{t}</h3><p className="mt-1">{d}</p><span className="mt-3 inline-block text-sm font-semibold text-gold-600">This is me →</span></Link>)}
      </div></div></section>

      <section className="section"><h2 className="h2 mb-10">What clients say</h2><Testimonials /></section>

      <section className="bg-cream"><div className="section"><h2 className="h2 mb-10">Insights & learning</h2><div className="grid gap-6 md:grid-cols-3">
        {INSIGHTS.map(([t, c]) => <article key={t} className="overflow-hidden rounded-xl bg-white shadow"><div className="h-32 bg-gradient-to-br from-navy-800 to-gold-500" /><div className="p-5"><p className="text-xs font-bold uppercase tracking-wider text-gold-600">{c}</p><h3 className="mt-2 font-serif text-lg text-navy-900">{t}</h3><span className="mt-3 inline-block text-sm text-slate-500">Coming soon</span></div></article>)}
      </div></div></section>

      <section className="section"><h2 className="h2 mb-10 text-center">Frequently asked questions</h2><Faq limit={6} /></section>

      <section className="bg-navy-900 text-white"><div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 lg:grid-cols-2">
        <div><h2 className="font-serif text-3xl md:text-5xl">Ready to <span className="text-gold-400">grow your money?</span></h2><p className="mt-4 text-slate-300">Share your goals and previous investments. An advisor will call you within one business day.</p></div>
        <LeadForm title="Start Growing Today" />
      </div></section>
      <CTA />
    </>
  );
}
