import { PageHero, CTA } from '../components/Bits';
const VALUES = [['Client first', 'Your interests guide every recommendation we make.'], ['Transparency', 'Clear fees, plain language and no hidden surprises.'], ['Integrity', 'We say what we mean and do what we say.'], ['Coordination', 'One team aligning investments, tax, estate and retirement.']];
export default function About() {
  return (
    <>
      <PageHero title="About Meridian Wealth Partners" sub="An independent firm helping families and business owners make confident financial decisions." />
      <section className="section grid gap-10 md:grid-cols-2">
        <div><h2 className="h2">Our story</h2>
          <p className="mt-4">We started with a simple belief: people deserve advice that looks at their whole life, not just a portfolio. Too often investing, taxes, insurance and estate planning are handled in silos.</p>
          <p className="mt-4">Our team of planners and analysts brings these pieces together, revisiting your plan as life changes — a new job, a growing family, a business sale or retirement.</p>
          <p className="mt-4 text-sm text-slate-500">[Replace with your real firm history, team bios and credentials.]</p></div>
        <div className="grid gap-4 sm:grid-cols-2">{VALUES.map(([t, d]) => <div key={t} className="rounded-xl bg-cream p-5"><h3 className="font-serif text-xl text-navy-900">{t}</h3><p className="mt-1 text-sm">{d}</p></div>)}</div>
      </section>
      <CTA />
    </>
  );
}
