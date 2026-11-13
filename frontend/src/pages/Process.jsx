import { PageHero, CTA } from '../components/Bits';
const P = [['1. Discovery call', 'A short, no-obligation conversation to understand your goals, current investments and concerns.'], ['2. Financial review', 'We review your accounts, taxes, insurance and estate documents to see the full picture.'], ['3. Custom strategy', 'We present a written plan with clear recommendations, fees and next steps.'], ['4. Implementation', 'We help put the plan in motion and coordinate with your CPA and attorney.'], ['5. Ongoing reviews', 'Regular check-ins and adjustments as markets and your life evolve.']];
export default function Process() {
  return (
    <>
      <PageHero title="Our Process" sub="A clear, five-step path from first conversation to long-term partnership." />
      <section className="section max-w-3xl space-y-6">
        {P.map(([t, d]) => <div key={t} className="rounded-xl border-l-4 border-gold-500 bg-white p-6 shadow"><h3 className="font-serif text-2xl text-navy-900">{t}</h3><p className="mt-1">{d}</p></div>)}
      </section>
      <CTA />
    </>
  );
}
