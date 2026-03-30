// ─────────────────────────────────────────────────────────────────────────────
// Abeokuta House — Rent Tracker Backend
// Paste this entire file into: Google Sheets → Extensions → Apps Script
// Then: Deploy → New deployment → Web app → Execute as: Me → Anyone can access
// ─────────────────────────────────────────────────────────────────────────────

const SHEET_NAME = 'RentData';

function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    const empty = JSON.stringify({ tenants: [], payments: [], expenses: [] });
    sheet.getRange('A1').setValue(empty);
    sheet.hideSheet(); // keep it tidy — data tab stays hidden
  }
  return sheet;
}

function doGet() {
  const sheet = getOrCreateSheet();
  const raw   = sheet.getRange('A1').getValue();
  const data  = raw ? JSON.parse(raw) : { tenants: [], payments: [], expenses: [] };

  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const sheet = getOrCreateSheet();

  try {
    const data = JSON.parse(e.postData.contents);
    if (!Array.isArray(data.tenants) || !Array.isArray(data.payments) || !Array.isArray(data.expenses)) {
      throw new Error('Invalid data shape');
    }
    sheet.getRange('A1').setValue(JSON.stringify(data));
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
