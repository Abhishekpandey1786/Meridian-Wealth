
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { submitLead } from '../api';

// US investable asset ranges
const ASSETS = [
  'Under $250,000',
  '$250,000 – $500,000',
  '$500,000 – $1 million',
  '$1 – $3 million',
  '$3 – $5 million',
  '$5 – $10 million',
  '$10 – $25 million',
  'Over $25 million'
];
const PREVIOUS = [
  // Stocks and securities
  'Stocks / Equities',
  'Preferred Stocks',
  'ETFs',
  'Index Funds',
  'Mutual Funds',
  'Target Date Funds',
  'Closed-End Funds',

  // Fixed income
  'Corporate Bonds',
  'Municipal Bonds',
  'Government Bonds',
  'U.S. Treasury Bills / Notes / Bonds',
  'TIPS (Treasury Inflation-Protected Securities)',
  'Agency Bonds',

  // Bank products
  'Bank CDs (Certificates of Deposit)',
  'High-Yield Savings Accounts (HYSA)',
  'Regular Savings Accounts',
  'Money Market Deposit Accounts',
  'Money Market Mutual Funds',

  // Real estate
  'Residential Real Estate',
  'Commercial Real Estate',
  'REITs (Real Estate Investment Trusts)',
  'Real Estate Crowdfunding',

  // Other investments
  'Gold / Precious Metals',
  'Commodities',
  'Cryptocurrency',
  'Crypto ETFs',
  'Annuities',
  'Cash Value Life Insurance',
  'Private Equity',
  'Venture Capital',
  'Private Credit',
  'Hedge Funds',
  'Structured Products',
  'Options Trading',
  'Futures Trading',
  'Forex / Currency Trading',

  // Retirement accounts
  '401(k)',
  'Roth 401(k)',
  '403(b)',
  '457(b)',
  'Traditional IRA',
  'Roth IRA',
  'SEP IRA',
  'SIMPLE IRA',
  'Solo 401(k)',
  'Thrift Savings Plan (TSP)',
  'Defined Benefit / Pension Plan',

  // Education and healthcare
  '529 College Savings Plan',
  'Coverdell ESA',
  'HSA (Health Savings Account)',
  'ABLE Account',

  // Children's accounts
  'UTMA / UGMA Custodial Account',
  'Trump Account',

  // General account
  'Taxable Brokerage Account',

  'None yet'
];

// Crypto platforms
const CRYPTO_PLATFORMS = [
  'Coinbase',
  'Kraken',
  'Gemini',
  'Robinhood Crypto',
  'Fidelity Crypto',
  'Crypto.com',
  'PayPal Crypto',
  'Cash App Bitcoin',
  'Other Exchange',
  'Self-Custody Wallet',
  'Other'
];

// Stock and investment brokerage platforms
const BROKERAGE_PLATFORMS = [
  'Fidelity Investments',
  'Charles Schwab',
  'Vanguard',
  'Robinhood',
  'E*TRADE',
  'Merrill Edge',
  'Interactive Brokers',
  'Webull',
  'SoFi Invest',
  'Public.com',
  'M1 Finance',
  'Ally Invest',
  'TradeStation',
  'tastytrade',
  'Firstrade',
  'moomoo',
  'Other'
];

// US banks and savings providers
const BANK_PLATFORMS = [
  'Chase',
  'Bank of America',
  'Wells Fargo',
  'Citibank',
  'U.S. Bank',
  'PNC Bank',
  'Truist',
  'Capital One',
  'Ally Bank',
  'Marcus by Goldman Sachs',
  'Discover Bank',
  'CIT Bank',
  'Synchrony Bank',
  'Barclays US',
  'American Express National Bank',
  'SoFi Bank',
  'Charles Schwab Bank',
  'Other Bank / Credit Union'
];

// Retirement account providers
const RETIREMENT_PLATFORMS = [
  'Fidelity',
  'Charles Schwab',
  'Vanguard',
  'Empower',
  'Principal',
  'T. Rowe Price',
  'Merrill',
  'Voya Financial',
  'ADP',
  'Paychex',
  'Human Interest',
  'Guideline',
  'Other'
];

// Treasury investment providers
const TREASURY_PLATFORMS = [
  'TreasuryDirect',
  'Fidelity',
  'Charles Schwab',
  'Vanguard',
  'E*TRADE',
  'Interactive Brokers',
  'Other'
];

// Real estate investment platforms
const REAL_ESTATE_PLATFORMS = [
  'Fundrise',
  'RealtyMogul',
  'EquityMultiple',
  'CrowdStreet',
  'Arrived',
  'Public REIT Brokerage',
  'Direct Property Ownership',
  'Other'
];

// Insurance and annuity companies
const INSURANCE_PLATFORMS = [
  'New York Life',
  'Northwestern Mutual',
  'MassMutual',
  'Prudential',
  'Pacific Life',
  'Nationwide',
  'Allianz Life',
  'Athene',
  'Lincoln Financial',
  'MetLife',
  'Other'
];

// Investment groups for conditional fields
const BROKERAGE_TYPES = [
  'Stocks / Equities',
  'Preferred Stocks',
  'ETFs',
  'Index Funds',
  'Mutual Funds',
  'Target Date Funds',
  'Closed-End Funds',
  'Corporate Bonds',
  'Municipal Bonds',
  'Government Bonds',
  'Agency Bonds',
  'Options Trading',
  'Futures Trading',
  'Forex / Currency Trading',
  'Taxable Brokerage Account',
  'Crypto ETFs'
];

const BANK_TYPES = [
  'Bank CDs (Certificates of Deposit)',
  'High-Yield Savings Accounts (HYSA)',
  'Regular Savings Accounts',
  'Money Market Deposit Accounts'
];

const RETIREMENT_TYPES = [
  '401(k)',
  'Roth 401(k)',
  '403(b)',
  '457(b)',
  'Traditional IRA',
  'Roth IRA',
  'SEP IRA',
  'SIMPLE IRA',
  'Solo 401(k)',
  'Thrift Savings Plan (TSP)',
  'Defined Benefit / Pension Plan'
];

const REAL_ESTATE_TYPES = [
  'Residential Real Estate',
  'Commercial Real Estate',
  'REITs (Real Estate Investment Trusts)',
  'Real Estate Crowdfunding'
];

const INSURANCE_TYPES = [
  'Annuities',
  'Cash Value Life Insurance'
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
  cryptoPlatforms: [],
  brokeragePlatforms: [],
  bankPlatforms: [],
  retirementPlatforms: [],
  treasuryPlatforms: [],
  realEstatePlatforms: [],
  insurancePlatforms: [],
  previousInvestmentsDetails: '',
  message: '',
  consent: false,
  website: ''
};

export default function LeadForm({
  title = 'Request Your Free Consultation'
}) {
  const [f, setF] = useState({ ...empty });

  const [status, setStatus] = useState({
    type: 'idle',
    msg: ''
  });

  const submitting = useRef(false);

  // Input handler
  const set = (key) => (e) => {
    const value = e.target.value;

    setF(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Checkbox handler
  const toggle = (key, value) => {
    setF(prev => {
      const current = prev[key];

      let updated = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value];

      const next = {
        ...prev,
        [key]: updated
      };

      // None yet is exclusive
      if (key === 'previousInvestments') {
        if (value === 'None yet' && updated.includes('None yet')) {
          updated = ['None yet'];
        } else {
          updated = updated.filter(
            item => item !== 'None yet'
          );
        }

        next.previousInvestments = updated;

        // Clear platform selections when category is removed
        if (!updated.includes('Cryptocurrency')) {
          next.cryptoPlatforms = [];
        }

        if (!BROKERAGE_TYPES.some(
          item => updated.includes(item)
        )) {
          next.brokeragePlatforms = [];
        }

        if (!BANK_TYPES.some(
          item => updated.includes(item)
        )) {
          next.bankPlatforms = [];
        }

        if (!RETIREMENT_TYPES.some(
          item => updated.includes(item)
        )) {
          next.retirementPlatforms = [];
        }

        if (!updated.includes(
          'U.S. Treasury Bills / Notes / Bonds'
        ) && !updated.includes(
          'TIPS (Treasury Inflation-Protected Securities)'
        )) {
          next.treasuryPlatforms = [];
        }

        if (!REAL_ESTATE_TYPES.some(
          item => updated.includes(item)
        )) {
          next.realEstatePlatforms = [];
        }

        if (!INSURANCE_TYPES.some(
          item => updated.includes(item)
        )) {
          next.insurancePlatforms = [];
        }
      }

      return next;
    });
  };

  // Selected investment categories
  const selected = f.previousInvestments;

  const hasCrypto = selected.includes('Cryptocurrency');

  const hasBrokerage = BROKERAGE_TYPES.some(
    item => selected.includes(item)
  );

  const hasBank = BANK_TYPES.some(
    item => selected.includes(item)
  );

  const hasRetirement = RETIREMENT_TYPES.some(
    item => selected.includes(item)
  );

  const hasTreasury =
    selected.includes('U.S. Treasury Bills / Notes / Bonds') ||
    selected.includes('TIPS (Treasury Inflation-Protected Securities)');

  const hasRealEstate = REAL_ESTATE_TYPES.some(
    item => selected.includes(item)
  );

  const hasInsurance = INSURANCE_TYPES.some(
    item => selected.includes(item)
  );

  // Submit handler
  async function onSubmit(e) {
    e.preventDefault();

    if (submitting.current) return;

    submitting.current = true;

    setStatus({
      type: 'loading',
      msg: ''
    });

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
        msg: result.message ||
          'Thank you! Your details were submitted.'
      });

      setF({ ...empty });

    } catch (error) {
      setStatus({
        type: 'error',
        msg: error.message ||
          'Unable to submit your request.'
      });

    } finally {
      submitting.current = false;
    }
  }

  // Reusable checkbox
  const Check = ({ field, value, light = false }) => (
    <label
      className={`flex cursor-pointer items-center gap-2 text-sm ${
        light ? 'text-white' : 'text-navy-900'
      }`}
    >
      <input
        type="checkbox"
        className="accent-gold-600"
        checked={f[field].includes(value)}
        onChange={() => toggle(field, value)}
      />
      <span>{value}</span>
    </label>
  );

  // Reusable label
  const Lbl = ({ children }) => (
    <span className="mb-1 block text-sm font-medium text-navy-900">
      {children}
    </span>
  );

  // Success screen
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

      {/* Honeypot */}
      <input
        type="text"
        name="website"
        value={f.website}
        onChange={set('website')}
        className="hidden"
        tabIndex="-1"
        autoComplete="off"
      />

      {/* Personal information */}
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
            placeholder="e.g. New York"
            value={f.city}
            onChange={set('city')}
          />
        </label>

        <label>
          <Lbl>State</Lbl>
          <input
            maxLength={60}
            className="input"
            placeholder="e.g. California"
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

      {/* US investment selection */}
      <fieldset className="mt-5 rounded-lg bg-gold-500 p-4">

        <Lbl>Where have you invested previously?</Lbl>

        <p className="mb-3 text-xs text-navy-900">
          Select all investment products and account types
          you currently use or have used in the past.
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          {PREVIOUS.map(item => (
            <Check
              key={item}
              field="previousInvestments"
              value={item}
            />
          ))}
        </div>

        {/* Crypto platforms */}
        {hasCrypto && (
          <div className="mt-5 rounded-lg bg-white p-4">
            <Lbl>Which cryptocurrency platform do you use?</Lbl>

            <p className="mb-3 text-xs text-slate-600">
              Select all applicable platforms. Availability
              may vary by state.
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              {CRYPTO_PLATFORMS.map(item => (
                <Check
                  key={item}
                  field="cryptoPlatforms"
                  value={item}
                />
              ))}
            </div>
          </div>
        )}

        {/* Brokerage platforms */}
        {hasBrokerage && (
          <div className="mt-4 rounded-lg bg-white p-4">
            <Lbl>Which brokerage or investment platform do you use?</Lbl>

            <div className="grid gap-3 sm:grid-cols-2">
              {BROKERAGE_PLATFORMS.map(item => (
                <Check
                  key={item}
                  field="brokeragePlatforms"
                  value={item}
                />
              ))}
            </div>
          </div>
        )}

        {/* Bank platforms */}
        {hasBank && (
          <div className="mt-4 rounded-lg bg-white p-4">
            <Lbl>Which bank or financial institution do you use?</Lbl>

            <div className="grid gap-3 sm:grid-cols-2">
              {BANK_PLATFORMS.map(item => (
                <Check
                  key={item}
                  field="bankPlatforms"
                  value={item}
                />
              ))}
            </div>
          </div>
        )}

        {/* Retirement platforms */}
        {hasRetirement && (
          <div className="mt-4 rounded-lg bg-white p-4">
            <Lbl>Which retirement plan provider do you use?</Lbl>

            <div className="grid gap-3 sm:grid-cols-2">
              {RETIREMENT_PLATFORMS.map(item => (
                <Check
                  key={item}
                  field="retirementPlatforms"
                  value={item}
                />
              ))}
            </div>
          </div>
        )}

        {/* Treasury platforms */}
        {hasTreasury && (
          <div className="mt-4 rounded-lg bg-white p-4">
            <Lbl>Where do you hold your Treasury investments?</Lbl>

            <div className="grid gap-3 sm:grid-cols-2">
              {TREASURY_PLATFORMS.map(item => (
                <Check
                  key={item}
                  field="treasuryPlatforms"
                  value={item}
                />
              ))}
            </div>
          </div>
        )}

        {/* Real estate platforms */}
        {hasRealEstate && (
          <div className="mt-4 rounded-lg bg-white p-4">
            <Lbl>Which real estate investment platform do you use?</Lbl>

            <div className="grid gap-3 sm:grid-cols-2">
              {REAL_ESTATE_PLATFORMS.map(item => (
                <Check
                  key={item}
                  field="realEstatePlatforms"
                  value={item}
                />
              ))}
            </div>
          </div>
        )}

        {/* Insurance platforms */}
        {hasInsurance && (
          <div className="mt-4 rounded-lg bg-white p-4">
            <Lbl>Which insurance or annuity provider do you use?</Lbl>

            <div className="grid gap-3 sm:grid-cols-2">
              {INSURANCE_PLATFORMS.map(item => (
                <Check
                  key={item}
                  field="insurancePlatforms"
                  value={item}
                />
              ))}
            </div>
          </div>
        )}

        <textarea
          rows={3}
          maxLength={1000}
          className="input mt-4"
          placeholder="Tell us more (optional). Do NOT enter account numbers."
          value={f.previousInvestmentsDetails}
          onChange={set('previousInvestmentsDetails')}
        />

      </fieldset>

      {/* Message */}
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

      {/* Consent */}
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

      {/* Error */}
      {status.type === 'error' && (
        <p
          role="alert"
          className="mt-4 rounded bg-red-50 p-3 text-sm text-red-700"
        >
          {status.msg}
        </p>
      )}

      {/* Submit */}
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
