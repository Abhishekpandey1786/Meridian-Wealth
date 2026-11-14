import { PageHero } from '../components/Bits';
import LeadForm from '../components/LeadForm';
import { SITE } from '../config';
export default function Contact() {
  return (
    <>
      <PageHero title="Contact Us" sub="Let's see how we can help. Share a few details and an advisor will reach out." />
      <section className="section grid gap-12 lg:grid-cols-5">
        <div className="space-y-5 lg:col-span-2">
          <h2 className="h2">Get in touch</h2>
          <p>📍 {SITE.address}</p><p>✉️ <a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
          <p>🕘 Mon–Fri, 9:00 AM – 5:00 PM</p>
          <p className="rounded-lg bg-cream p-4 text-sm">For your security, never send account numbers, passwords or statements through this form or email.</p>
        </div>
        <div className="lg:col-span-3"><LeadForm title="Tell us about yourself" /></div>
      </section>
    </>
  );
}
