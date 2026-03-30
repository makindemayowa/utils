# Funaab Building Tracker

Track construction spending on the Funaab building project.

## Features

- **Expenses** — log costs by phase and category (Labour, Materials, Equipment, etc.)
- **Transfers** — record CAD→NGN remittances with exchange rate tracking
- **Dashboard** — budget progress, spend by phase, recent activity
- **Phases** — customisable build phases (Foundation, Structure/Frame, Roofing, Finishing)

## Setup

1. Open the shared Google Sheet → Extensions → Apps Script
2. Ensure `shared-apps-script.gs` (in repo root) is deployed as a Web App
   - Execute as: Me
   - Who has access: Anyone
3. Open the app → Settings tab → paste the deployment URL → Save

## Data

All data lives in a hidden `BuildingData` tab in the shared Google Sheet alongside the rent tracker's `RentData` tab. The shared backend (`shared-apps-script.gs`) routes between the two apps automatically.

## Stack

Vanilla JS + HTML + CSS — no dependencies, no build step. Hosted on GitHub Pages.
