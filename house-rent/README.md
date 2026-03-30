# Abeokuta House — Rent Tracker

Tracks tenants, payments, and expenses. Syncs live to Google Sheets so your
sister can enter data in Nigeria and you can see it from abroad.

---

## One-time Setup (~10 minutes)

### Step 1 — Set up the Apps Script

1. Open your Google Sheet
2. Click **Extensions** → **Apps Script** (opens in a new tab)
3. Delete all existing code in the editor
4. Copy everything from `apps-script.gs` and paste it in
5. Click the **Save** button (disk icon, or Ctrl+S / Cmd+S)
6. Click **Deploy** → **New deployment**
7. Click the gear icon next to "Select type" → choose **Web app**
8. Fill in:
   - Description: `Rent Tracker`
   - Execute as: **Me**
   - Who has access: **Anyone**
9. Click **Deploy** → copy the URL it gives you (looks like `https://script.google.com/macros/s/ABC.../exec`)

> If Google asks you to authorize the script, click "Review permissions" → choose your account → "Allow"

### Step 2 — Connect the web app

1. Open `index.html` in your browser (or visit your GitHub Pages URL)
2. Click **⚙ Settings** (top right)
3. Paste the Apps Script URL from Step 1
4. Click **Save & Connect**

That's it. Data now syncs to your Google Sheet automatically.

---

## How it works

- **Sister** uses the app URL — enters tenants, payments, expenses. Every change
  saves instantly to the Google Sheet.
- **You** open the same URL from abroad — data loads from the same sheet.
  The app also refreshes every 60 seconds automatically.
- The Google Sheet has a hidden tab called `RentData` where all data is stored.
  You can leave the sheet open to see raw data if you want.

---

## Deploy to GitHub Pages

1. Push this folder to a GitHub repository
2. Go to **Settings → Pages**
3. Source: **Deploy from a branch** → branch `main` → folder `/` (root)
4. Save — your app will be at `https://<username>.github.io/<repo>/`

Share that URL with your sister.

---

## Re-deploying the Apps Script (if you ever update it)

1. Go back to the Apps Script editor
2. Make your changes
3. Click **Deploy** → **Manage deployments**
4. Edit the existing deployment → set version to "New version" → **Deploy**
   The URL stays the same — no changes needed in the app.
