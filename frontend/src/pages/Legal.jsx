import { PageHero } from '../components/Bits';
import { SITE } from '../config';

const DOCS = {
  privacy: {
    title: 'Privacy Policy',
    sections: [
      ['Information we collect', 'When you submit our form we collect your name, email, phone, location, investable asset range, services of interest, whether you have an advisor, details of your previous investments, and any message you provide. We also collect basic technical data (IP address, browser, pages visited, UTM/campaign parameters) through cookies and analytics.'],
      ['How we use it', 'To respond to your enquiry, schedule consultations, assess how we can help, improve our website and comply with legal obligations. We may send service-related communications and, with your consent, marketing messages you can opt out of at any time.'],
      ['Sensitive data', 'Please do not submit account numbers, passwords, Social Security/ID numbers or account statements through our website.'],
      ['Sharing', 'We do not sell your personal information. We share it only with service providers who help us operate (for example hosting and spreadsheet/CRM tools), professional advisers, or when required by law.'],
      ['Storage & security', 'Your submission is stored in a restricted-access Google Sheet and transmitted over encrypted connections. No system is completely secure, and we cannot guarantee absolute security.'],
      ['Retention', 'We keep enquiry data only as long as needed for the purposes above or as required by law.'],
      ['Your rights', 'Depending on where you live, you may request access, correction or deletion of your data, or object to processing. Contact us using the details below.'],
      ['Cookies', 'We use necessary cookies and, with your consent, analytics/advertising cookies. You can control cookies in your browser settings.'],
      ['Children', 'Our website is not directed to anyone under 18.'],
      ['Changes & contact', `We may update this policy and will post the new date here. Questions: ${SITE.email}.`],
    ],
  },
  terms: {
    title: 'Terms & Conditions',
    sections: [
      ['Acceptance', 'By using this website you agree to these Terms. If you do not agree, please do not use the site.'],
      ['Informational purposes only', 'Content on this site is general information. It is not personalized investment, tax or legal advice, nor an offer or solicitation. An advisory relationship exists only after a written agreement is signed.'],
      ['No guarantee of results', 'Investing involves risk, including the loss of principal. Past performance does not predict future results. Any projections or illustrations are hypothetical.'],
      ['Your submissions', 'You confirm information you submit is accurate and that you are 18 or older. Submitting a form does not create a client relationship.'],
      ['Intellectual property', 'All content, logos and design are owned by us or our licensors and may not be copied without permission.'],
      ['Third-party links', 'We are not responsible for the content or practices of external sites.'],
      ['Limitation of liability', 'To the fullest extent permitted by law, we are not liable for any indirect or consequential loss arising from use of this website.'],
      ['Governing law', '[Insert governing law and jurisdiction.]'],
      ['Changes & contact', `We may modify these Terms at any time. Questions: ${SITE.email}.`],
    ],
  },
  disclosures: {
    title: 'Important Disclosures',
    sections: [
      ['Registration', '[State your registration, e.g. “XYZ is an SEC-registered investment adviser.” Registration does not imply a certain level of skill or training.]'],
      ['Risk', 'All investments carry risk, including potential loss of principal. Diversification does not ensure a profit or protect against loss.'],
      ['Testimonials', 'Any testimonials are from clients, may not be representative of other clients’ experience, and [state whether compensation was provided].'],
      ['Third-party information', 'Information from unaffiliated sources is provided for convenience and may not be accurate or complete.'],
      ['Fees', 'Details of our services, business and fees are available in our Form ADV / Form CRS upon request.'],
    ],
  },
};

export default function Legal({ type }) {
  const d = DOCS[type];
  return (
    <>
      <PageHero title={d.title} sub={`Last updated: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`} />
      <section className="section max-w-3xl space-y-8">
        {d.sections.map(([h, t], i) => <div key={h}><h2 className="font-serif text-2xl text-navy-900">{i + 1}. {h}</h2><p className="mt-2 leading-relaxed">{t}</p></div>)}
        <p className="rounded-lg bg-cream p-4 text-sm">These are template texts. Have a qualified lawyer review and adapt them to your jurisdiction and regulatory status before launch.</p>
      </section>
    </>
  );
}
