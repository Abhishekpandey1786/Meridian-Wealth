import { PageHero, Services as S, CTA } from '../components/Bits';
const ITEMS = [
  ['Retirement Income Planning', 'When to retire, when to claim Social Security, and how to draw from your accounts considering taxes and spending needs over time.'],
  ['Strategic Tax Planning', 'We may evaluate Roth conversions, tax-loss harvesting and asset location. Each has tradeoffs and may not fit every situation.'],
  ['Estate Planning & Wealth Transfer', 'We coordinate with your attorney and CPA to align beneficiaries, trusts and tax planning with your broader plan.'],
  ['Personalized Investment Management', 'A diversified portfolio aligned with your goals, risk tolerance, time horizon and income needs.'],
];
export default function Services() {
  return (
    <>
      <PageHero title="Our Services" sub="Integrated solutions that align every aspect of your financial life." />
      <section className="section"><S /></section>
      <section className="bg-cream"><div className="section grid gap-8 md:grid-cols-2">
        {ITEMS.map(([t, d]) => <div key={t}><h3 className="font-serif text-2xl text-navy-900">{t}</h3><p className="mt-2">{d}</p></div>)}
      </div></section>
      <CTA />
    </>
  );
}
