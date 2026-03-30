// ─────────────────────────────────────────────────────────────────────────────
// Shared Backend — Rent Tracker + Funaab Building Tracker
// Paste this into ONE Google Sheet → Extensions → Apps Script
// Deploy → New deployment → Web app → Execute as: Me → Anyone can access
// Use the SAME deployment URL in both apps' Settings tabs.
// ─────────────────────────────────────────────────────────────────────────────

const RENT_SHEET     = 'RentData';
const BUILDING_SHEET = 'BuildingData';

const DEFAULT_BUILDING_PHASES = [
  { id: 'p1', name: 'Foundation',        order: 1 },
  { id: 'p2', name: 'Structure / Frame', order: 2 },
  { id: 'p3', name: 'Roofing',           order: 3 },
  { id: 'p4', name: 'Finishing',         order: 4 }
];

// ── Sheet helpers ─────────────────────────────────────────────────────────────

function getRentSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(RENT_SHEET);
  if (!sheet) {
    sheet = ss.insertSheet(RENT_SHEET);
    sheet.getRange('A1').setValue(JSON.stringify({ tenants: [], payments: [], expenses: [] }));
    sheet.hideSheet();
  }
  return sheet;
}

function getBuildingSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(BUILDING_SHEET);
  if (!sheet) {
    sheet = ss.insertSheet(BUILDING_SHEET);
    sheet.getRange('A1').setValue(JSON.stringify({
      budget: 0, phases: DEFAULT_BUILDING_PHASES, expenses: [], transfers: []
    }));
    sheet.hideSheet();
  }
  return sheet;
}

// ── Routing — detect which app is calling by data shape ───────────────────────
// GET:  ?app=rent  or  ?app=building
// POST: data shape auto-detected (tenants[] → rent, budget+phases → building)

function doGet(e) {
  const app = (e.parameter && e.parameter.app) ? e.parameter.app : null;

  if (app === 'building') {
    const sheet = getBuildingSheet();
    const raw   = sheet.getRange('A1').getValue();
    const data  = raw ? JSON.parse(raw) : { budget: 0, phases: DEFAULT_BUILDING_PHASES, expenses: [], transfers: [] };
    return json(data);
  }

  // Default: rent tracker
  const sheet = getRentSheet();
  const raw   = sheet.getRange('A1').getValue();
  const data  = raw ? JSON.parse(raw) : { tenants: [], payments: [], expenses: [] };
  return json(data);
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // Building tracker data shape
    if (typeof data.budget === 'number' && Array.isArray(data.phases) &&
        Array.isArray(data.expenses) && Array.isArray(data.transfers)) {
      const sheet = getBuildingSheet();
      sheet.getRange('A1').setValue(JSON.stringify(data));
      return json({ ok: true });
    }

    // Rent tracker data shape
    if (Array.isArray(data.tenants) && Array.isArray(data.payments) && Array.isArray(data.expenses)) {
      const sheet = getRentSheet();
      sheet.getRange('A1').setValue(JSON.stringify(data));
      return json({ ok: true });
    }

    throw new Error('Unrecognised data shape');
  } catch (err) {
    return json({ ok: false, error: err.message });
  }
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
