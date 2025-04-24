# Wedding Website

This repository powers a Next.js wedding site with an integrated RSVP system and a photo gallery, all backed by Google Sheets and a Google Apps Script.

---

## Table of Contents

1. [Features](#features)
2. [Getting Started](#getting-started)
3. [Environment Variables](#environment-variables)
4. [Next.js App Structure](#nextjs-app-structure)
5. [API Routes & Middleware](#api-routes--middleware)
6. [Google Apps Script (Code.gs)](#google-apps-script-codegs)
7. [Photo Gallery](#photo-gallery)
8. [Deployment](#deployment)

---

## Features

- **RSVP Flow**: Search for your invited name, confirm attendance, optionally display your name on the guest list.
- **Secure Proxy**: All RSVP lookups/submissions are gated behind a shared secret stored server‑side and in your Apps Script properties.
- **Infinite Scroll Gallery**: Categorized photos served from a Google Sheet, paginated via cursor-based API.
- **Typed & Accessible**: TypeScript in Next.js, accessible modals, and responsive design.

---

## Getting Started

1. **Clone** the repo:
   ```bash
   git clone https://github.com/yourusername/wedding-site.git
   cd wedding-site
   ```
2. **Install** dependencies:
   ```bash
   yarn install  # or npm install
   ```
3. Copy `.env.example` → `.env.local` and fill in your values.
4. **Run** locally:
   ```bash
   yarn dev
   ```

---

## Environment Variables

Create a `.env.local` at the project root. Example:

```bash
# .env.example

# Google Apps Script Web App URL\NSCRIPT_URL=https://script.google.com/macros/s/AKfy.../exec

# Shared secret for RSVP proxy (must match Script Property)
RSVP_SECRET=your-long-random-token
```

> **Note:** All RSVP requests (GET & POST) require the `rsvp_secret` cookie to match `RSVP_SECRET`.

---

## Next.js App Structure

```
├── src/app
│   ├── api/rsvp/route.ts    # RSVP proxy route
│   ├── api/photos/route.ts  # Photo fetch proxy
│   ├── photos/[category]
│   │   ├── page.tsx         # Dynamic category page → ClientGallery
│   │   └── ClientGallery.tsx# Infinite-scroll photo grid
│   ├── rsvp/page.tsx        # RSVP UI + modals
│   └── layout.tsx           # Global header/footer, fonts, toaster
├── middleware.ts            # Sets HTTP-only `rsvp_secret` cookie
├── next.config.ts           # Image domains, rewrites, etc.
└── README.md                # ← This file
```

---

## API Routes & Middleware

- **`middleware.ts`**

  - Runs on `/api/rsvp/:path*`
  - Sets an HTTP‑only cookie `rsvp_secret` from `RSVP_SECRET`.

- **`src/app/api/rsvp/route.ts`**

  - **GET**: Validates `rsvp_secret` cookie → proxies `GET SCRIPT_URL?first=&last=&token=` → returns household + members.
  - **POST**: Validates cookie → proxies JSON body to `SCRIPT_URL` → appends RSVPs.

- **`src/app/api/photos/route.ts`**
  - **GET**: Public. Proxies photo paging queries to your Apps Script.

---

## Google Apps Script (Code.gs)

Paste this into your Apps Script project (leave out the real `SHEET_ID`):

```js
// Code.gs

// —– CONFIG —–
const SHEET_ID = "<YOUR_SHEET_ID>";
const ss = SpreadsheetApp.openById(SHEET_ID);
const INV = ss.getSheetByName("Invitees");
const RSP = ss.getSheetByName("RSVPs");

// Shared secret stored in Script Properties
const SECRET =
  PropertiesService.getScriptProperties().getProperty("RSVP_SECRET");
if (!SECRET) throw new Error("Missing RSVP_SECRET");

// JSON helper
function _jsonOutput(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

function doGet(e) {
  // Photo paging (public)
  if (e.parameter.photoCursor !== undefined) {
    // … same as your code …
  }

  // RSVP lookup (auth)
  if (e.parameter.token !== SECRET) {
    return _jsonOutput({ error: "Unauthorized" });
  }
  const { first = "", last = "" } = e.parameter;
  // require BOTH first+last names match exactly
  // … lookup logic …
}

function doPost(e) {
  if (e.parameter.token !== SECRET) {
    return _jsonOutput({ error: "Unauthorized" });
  }
  const data = JSON.parse(e.postData.contents);
  // … append rows to RSP …
}
```

> **Setup**: In the Apps Script UI, go to **Project Settings → Script Properties**, add `RSVP_SECRET=your-long-random-token`.

---

## Photo Gallery

1. **Sheet Layout** (`Photos`):
   - **Col A**: Image URL
   - **Col B**: Approved? (`Yes`/`No`)
   - **Col C**: Category key (e.g. `ceremony`, `brunch`, `elopement`, etc.)
2. The client calls `/api/photos?photoCursor=0&category=brunch`, then infinite-scroll fetches more.
3. Categories are defined in your UI (e.g. nav menu) using matching `key`s.

---

## Deployment

1. **Next.js**: push to GitHub and connect to Vercel; set environment vars (`SCRIPT_URL`, `RSVP_SECRET`) in dashboard.
2. **Apps Script**: Deploy as **Web App** (execute as “you”, allow “Anyone, even anonymous”), grab the **`exec`** URL → set as `SCRIPT_URL`.
3. Done! 🎉

---

Happy coding & have a beautiful wedding day! ❤️
