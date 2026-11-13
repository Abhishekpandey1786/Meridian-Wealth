
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { submitLead } from '../api';

const ASSETS = [
  'Under $250,000',
  '$250,000 – $500,000',
  '$500,000 – $1 million',
  '$1 – $3 million',
  '$3 – $5 million',
  'Over $5 million'
];

const SERVICES = [
  'Financial Planning',
  'Investment Management',
  'Retirement Planning',
  'Tax Strategy',
  'Estate Planning',
  'Insurance & Risk',
  'Business Owner Planning'
];

const PREVIOUS = [
  'Stocks',
  'Mutual Funds',
  'ETFs',
  'Bonds',
  'Real Estate',
  'Fixed Deposits / CDs',
  'Gold / Commodities',
  'Crypto',
  '401(k) / IRA',
  'Private / Alternative Investments',
  'Insurance Products',
  'None yet'
];

const empty = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  city: '',
  state: '',
  investableAssets: '',
  servicesInterested: [],
  hasAdvisor: '',
  previousInvestments: [],
  previousInvestmentsDetails: '',
  message: '',
  consent: false,
  website: ''
};

export default function LeadForm({
  title = 'Request Your Free Consultation'
}) {
  const [f, setF] = useState(empty);
  const [status, setStatus] = useState({
    type: 'idle',
    msg: ''
  });

  const submitting = useRef(false);

  const set = (key) => (e) => {
    const value = e.target.value;

    setF(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const toggle = (key, value) => {
    setF(prev => {
      const current = prev[key];

      return {
        ...prev,
        [key]: current.includes(value)
          ? current.filter(item => item !== value)
          : [...current, value]
      };
    });
  };

  async function onSubmit(e) {
    e.preventDefault();

    if (submitting.current) return;

    submitting.current = true;
    setStatus({ type: 'loading', msg: '' });

    const utm = Object.fromEntries(
      [...new URLSearchParams(window.location.search)]
        .filter(([key]) =>
          key.startsWith('utm_') || key === 'gclid'
        )
    );

    utm.page = window.location.pathname;

    try {
      const result = await submitLead({
        ...f,
        utm
      });

      setStatus({
        type: 'ok',
        msg: result.message || 'Thank you! Your details were submitted.'
      });

      setF({ ...empty });

    } catch (error) {
      setStatus({
        type: 'error',
        msg: error.message || 'Unable to submit your request.'
      });

    } finally {
      submitting.current = false;
    }
  }

  const Check = ({ field, value }) => (
    <label className="flex cursor-pointer items-center gap-2 text-sm">
      <input
        type="checkbox"
        className="accent-gold-600"
        checked={f[field].includes(value)}
        onChange={() => toggle(field, value)}
      />
      {value}
    </label>
  );

  const Lbl = ({ children }) => (
    <span className="mb-1 block text-sm font-medium text-navy-900">
      {children}
    </span>
  );

  if (status.type === 'ok') {
    return (
      <div className="rounded-xl bg-white p-8 text-center shadow-xl">
        <p className="text-4xl">✅</p>

        <h3 className="mt-3 font-serif text-2xl text-navy-900">
          Thank you!
        </h3>

        <p className="mt-2">{status.msg}</p>

        <button
          type="button"
          className="btn-gold mt-5"
          onClick={() => {
            setStatus({ type: 'idle', msg: '' });
            setF({ ...empty });
          }}
        >
          Submit another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-xl bg-white p-6 shadow-xl md:p-8"
    >
      <h3 className="font-serif text-2xl text-navy-900">
        {title}
      </h3>

      <p className="mb-5 mt-1 text-sm">
        Takes about 2 minutes. No obligation.
      </p>

      {/* Honeypot field */}
      <input
        type="text"
        name="website"
        value={f.website}
        onChange={set('website')}
        className="hidden"
        tabIndex="-1"
        autoComplete="off"
      />

      <div className="grid gap-4 sm:grid-cols-2">

        <label>
          <Lbl>First name *</Lbl>
          <input
            required
            maxLength={60}
            className="input"
            value={f.firstName}
            onChange={set('firstName')}
          />
        </label>

        <label>
          <Lbl>Last name *</Lbl>
          <input
            required
            maxLength={60}
            className="input"
            value={f.lastName}
            onChange={set('lastName')}
          />
        </label>

        <label>
          <Lbl>Email *</Lbl>
          <input
            required
            type="email"
            maxLength={120}
            className="input"
            value={f.email}
            onChange={set('email')}
          />
        </label>

        <label>
          <Lbl>Phone *</Lbl>
          <input
            required
            type="tel"
            minLength={7}
            maxLength={20}
            className="input"
            value={f.phone}
            onChange={set('phone')}
          />
        </label>

        <label>
          <Lbl>City</Lbl>
          <input
            maxLength={80}
            className="input"
            value={f.city}
            onChange={set('city')}
          />
        </label>

        <label>
          <Lbl>State</Lbl>
          <input
            maxLength={60}
            className="input"
            value={f.state}
            onChange={set('state')}
          />
        </label>

        <label>
          <Lbl>Investable assets *</Lbl>

          <select
            required
            className="input"
            value={f.investableAssets}
            onChange={set('investableAssets')}
          >
            <option value="">Select...</option>

            {ASSETS.map(item => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label>
          <Lbl>Do you have a financial advisor? *</Lbl>

          <select
            required
            className="input"
            value={f.hasAdvisor}
            onChange={set('hasAdvisor')}
          >
            <option value="">Select...</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

      </div>

      <fieldset className="mt-5">
        <Lbl>Services you are interested in</Lbl>

        <div className="grid gap-2 sm:grid-cols-2 bg-slate-900 p-4">
          {SERVICES.map(item => (
            <Check
              key={item}
              field="servicesInterested"
              value={item}
            />
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-5 rounded-lg bg-gold-500 p-4">
        <Lbl>Where have you invested previously?</Lbl>

        <div className="grid gap-2 sm:grid-cols-2">
          {PREVIOUS.map(item => (
            <Check
              key={item}
              field="previousInvestments"
              value={item}
            />
          ))}
        </div>

        <textarea
          rows={3}
          maxLength={1000}
          className="input mt-3"
          placeholder="Tell us more. Do NOT enter account numbers."
          value={f.previousInvestmentsDetails}
          onChange={set('previousInvestmentsDetails')}
        />
      </fieldset>

      <label className="mt-5 block">
        <Lbl>Message</Lbl>

        <textarea
          rows={3}
          maxLength={2000}
          className="input"
          value={f.message}
          onChange={set('message')}
          placeholder="What would you like help with?"
        />
      </label>

      <label className="mt-5 flex items-start gap-2 bg-slate-500 p-3 text-xs">
        <input
          required
          type="checkbox"
          className="mt-0.5 accent-gold-600"
          checked={f.consent}
          onChange={e =>
            setF(prev => ({
              ...prev,
              consent: e.target.checked
            }))
          }
        />

        <span>
          I agree to be contacted and accept the{' '}
          <Link to="/privacy-policy" className="underline">
            Privacy Policy
          </Link>{' '}
          and{' '}
          <Link to="/terms-and-conditions" className="underline">
            Terms & Conditions
          </Link>.
          Do not submit account numbers or statements.
        </span>
      </label>

      {status.type === 'error' && (
        <p
          role="alert"
          className="mt-4 rounded bg-red-50 p-3 text-sm text-red-700"
        >
          {status.msg}
        </p>
      )}

      <button
        type="submit"
        disabled={status.type === 'loading'}
        className="btn-gold mt-5 w-full disabled:opacity-60"
      >
        {status.type === 'loading'
          ? 'Sending...'
          : 'Get My Free Consultation'}
      </button>

    </form>
  );
}
