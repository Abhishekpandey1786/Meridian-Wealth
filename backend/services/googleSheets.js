
const { google } = require('googleapis');

const HEADERS = [
  'Timestamp',
  'First Name',
  'Last Name',
  'Email',
  'Phone',
  'City',
  'State',
  'Investable Assets',
  'Services Interested',
  'Has Advisor',
  'Previous Investments',
  'Previous Investment Details',
  'Message',
  'Consent',
  'UTM / Source',
  'Crypto Platforms',
  'Brokerage Platforms',
  'Bank Platforms',
  'Retirement Platforms',
  'Treasury Platforms',
  'Real Estate Platforms',
  'Insurance Platforms'
];

function getClient() {
  const email = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!email || !privateKey) {
    throw new Error('Google credentials missing');
  }

  const formattedKey = privateKey
    .replace(/^["']|["']$/g, '')
    .replace(/\\n/g, '\n')
    .trim();

  const auth = new google.auth.JWT({
    email,
    key: formattedKey,
    scopes: [
      'https://www.googleapis.com/auth/spreadsheets'
    ]
  });

  return google.sheets({
    version: 'v4',
    auth
  });
}

function sheetRange(tab, cell) {
  const escapedTab = tab.replace(/'/g, "''");
  return `'${escapedTab}'!${cell}`;
}

// Prevent spreadsheet formula injection
function safe(value) {
  if (value === null || value === undefined) {
    return '';
  }

  if (typeof value !== 'string') {
    return value;
  }

  if (/^[\s]*[=+\-@]/.test(value)) {
    return `'${value}`;
  }

  return value;
}

function arrayToString(value) {
  if (!Array.isArray(value)) return '';

  return value.join(', ');
}

// Preserve existing columns and add missing new headers
async function ensureHeaders(sheets, id, tab) {
  const range = sheetRange(tab, 'A1:V1');

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: id,
    range
  });

  const existing = response.data.values?.[0] || [];

  if (existing.length === 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: id,
      range: sheetRange(tab, 'A1:V1'),
      valueInputOption: 'RAW',
      requestBody: {
        values: [HEADERS]
      }
    });

    return;
  }

  // Only add missing headers. Do not overwrite old headers.
  const missing = [];

  HEADERS.forEach((header, index) => {
    if (!existing[index]) {
      missing.push({
        column: index + 1,
        header
      });
    }
  });

  for (const item of missing) {
    const column = columnLetter(item.column);

    await sheets.spreadsheets.values.update({
      spreadsheetId: id,
      range: sheetRange(tab, `${column}1`),
      valueInputOption: 'RAW',
      requestBody: {
        values: [[item.header]]
      }
    });
  }
}

function columnLetter(number) {
  let result = '';

  while (number > 0) {
    const remainder = (number - 1) % 26;

    result =
      String.fromCharCode(65 + remainder) + result;

    number = Math.floor((number - 1) / 26);
  }

  return result;
}

exports.appendLead = async (lead) => {
  const id = process.env.GOOGLE_SHEET_ID;
  const tab = process.env.GOOGLE_SHEET_TAB || 'Leads';

  if (!id) {
    throw new Error('GOOGLE_SHEET_ID missing');
  }

  if (!lead || typeof lead !== 'object') {
    throw new Error('Invalid lead data');
  }

  const sheets = getClient();

  await ensureHeaders(sheets, id, tab);

  const utm = lead.utm || {};

  const source = Object.entries(utm)
    .map(([key, value]) => `${key}=${value ?? ''}`)
    .join('&');

  const row = [
    new Date().toISOString(),

    lead.firstName,
    lead.lastName,
    lead.email,
    lead.phone,
    lead.city,
    lead.state,
    lead.investableAssets,

    arrayToString(lead.servicesInterested),

    lead.hasAdvisor,

    arrayToString(lead.previousInvestments),

    lead.previousInvestmentsDetails,
    lead.message,

    lead.consent ? 'Yes' : 'No',

    source,

    arrayToString(lead.cryptoPlatforms),
    arrayToString(lead.brokeragePlatforms),
    arrayToString(lead.bankPlatforms),
    arrayToString(lead.retirementPlatforms),
    arrayToString(lead.treasuryPlatforms),
    arrayToString(lead.realEstatePlatforms),
    arrayToString(lead.insurancePlatforms)

  ].map(safe);

  const response = await sheets.spreadsheets.values.append({
    spreadsheetId: id,
    range: sheetRange(tab, 'A:V'),
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    requestBody: {
      values: [row]
    }
  });

  return {
    success: true,
    updatedRange: response.data.updates?.updatedRange
  };
};
