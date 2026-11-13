
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
  'UTM / Source'
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

function safe(value) {
  if (value === null || value === undefined) {
    return '';
  }

  if (typeof value !== 'string') {
    return value;
  }

  if (/^\s*[=+\-@]/.test(value)) {
    return `'${value}`;
  }

  return value;
}

async function ensureHeaders(sheets, id, tab) {
  const range = sheetRange(tab, 'A1:O1');

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: id,
    range
  });

  if (!response.data.values ||
      response.data.values.length === 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: id,
      range: sheetRange(tab, 'A1'),
      valueInputOption: 'RAW',
      requestBody: {
        values: [HEADERS]
      }
    });
  }
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

  const services = Array.isArray(lead.servicesInterested)
    ? lead.servicesInterested.join(', ')
    : '';

  const investments = Array.isArray(lead.previousInvestments)
    ? lead.previousInvestments.join(', ')
    : '';

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
    services,
    lead.hasAdvisor,
    investments,
    lead.previousInvestmentsDetails,
    lead.message,
    lead.consent ? 'Yes' : 'No',
    source
  ].map(safe);

  const response = await sheets.spreadsheets.values.append({
    spreadsheetId: id,
    range: sheetRange(tab, 'A:O'),
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
