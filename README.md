# 💍 An & Paul's Wedding Website

A beautiful, modern wedding website built with Next.js 15, featuring an elegant RSVP system, photo galleries, and guest information management—all powered by Google Sheets as a backend.

![Next.js](https://img.shields.io/badge/Next.js-15.3-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

## ✨ Features

### 🎯 Core Features

- **Smart RSVP System**: Multi-step flow with household management, meal selections, and dietary restrictions
- **Photo Galleries**: Category-based infinite scroll galleries powered by Cloudinary
- **Guest Photo Uploads**: Time-gated upload system (March 7-28, 2026) with compression
- **Interactive Timeline**: Beautiful event schedule with custom SVG vine connectors
- **Responsive Design**: Flawless experience across all devices
- **Accommodation Info**: Hotel recommendations with image carousels

### 🔒 Security & Performance

- **Secure Authentication**: HTTP-only cookies with shared secret validation
- **Rate Limiting**: Built-in protection for API endpoints
- **Image Optimization**: Automatic compression and Next.js Image optimization
- **Type Safety**: Full TypeScript implementation
- **SEO Ready**: Proper meta tags and structured data

## 🚀 Quick Start

### Prerequisites

- Node.js 20.18.0 or higher
- Yarn 1.22.22 (or npm)
- Google Account (for Sheets integration)
- Cloudinary Account (for photo storage)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/grixsep/wedding-site.git
cd wedding-site
```

2. **Install dependencies**

```bash
yarn install  # or npm install
```

3. **Set up environment variables**

```bash
cp .env.example .env.local
```

Fill in your `.env.local`:

```env
# Google Apps Script Web App URL
SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec

# Shared secret for RSVP authentication (generate a long random string)
RSVP_SECRET=your-very-long-random-secret-key-here

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

4. **Run development server**

```bash
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) 🎉

## 📁 Project Structure

```
src/
├── app/                      # Next.js 15 App Router
│   ├── api/                  # API Routes
│   │   ├── rsvp/            # RSVP proxy endpoint
│   │   ├── photos/          # Photo fetching
│   │   └── upload-image/    # Image upload handler
│   ├── events/              # Events timeline page
│   ├── photos/              # Photo galleries
│   │   └── [category]/      # Dynamic category routes
│   ├── rsvp/                # RSVP interface
│   ├── accommodations/      # Hotel information
│   └── layout.tsx           # Root layout with header/footer
├── components/              # Reusable components
│   ├── Header/             # Navigation header
│   └── Footer/             # Site footer
├── styles/                  # Global styles
├── once-ui/                # Custom UI component library
└── middleware.ts           # Authentication middleware
```

## 🔧 Google Sheets Setup

### 1. Create Google Sheets

Create a spreadsheet with these sheets:

**Invitees Sheet**
| Column | Field | Description |
|--------|-------|-------------|
| A | First Name | Guest first name |
| B | Last Name | Guest last name |
| C | Household | Household identifier |
| D | Plus One | "Yes" or "No" |

**RSVPs Sheet**
| Column | Field | Description |
|--------|-------|-------------|
| A | Timestamp | Auto-generated |
| B | Household | From submission |
| C | Names | JSON array of selected members |
| D | Attending | "Yes" or "No" |
| E | Show Name | Display on guest list |
| F | Menu Choices | JSON object |
| G | Dietary | JSON object |
| H | Transport | "Yes" or "No" |

**Photos Sheet** (for gallery) - Outdated
| Column | Field | Description |
|--------|-------|-------------|
| A | Image URL | Cloudinary URL |
| B | Approved | "Yes" or "No" |
| C | Category | Category key |

### 2. Deploy Google Apps Script

1. Open Google Sheets → Extensions → Apps Script
2. Replace code with:

```javascript
// Code.gs
const SHEET_ID = "YOUR_SHEET_ID";
const ss = SpreadsheetApp.openById(SHEET_ID);
const INV = ss.getSheetByName("Invitees");
const RSP = ss.getSheetByName("RSVPs");
const PHOTOS = ss.getSheetByName("Photos");

// Get secret from Script Properties
const SECRET =
  PropertiesService.getScriptProperties().getProperty("RSVP_SECRET");

function doGet(e) {
  // Photo pagination (public)
  if (e.parameter.photoCursor !== undefined) {
    const cursor = parseInt(e.parameter.photoCursor) || 0;
    const category = e.parameter.category || "";
    const pageSize = 10;

    const photos = PHOTOS.getDataRange()
      .getValues()
      .filter((row) => row[1] === "Yes" && row[2] === category)
      .map((row) => ({ url: row[0] }));

    const page = photos.slice(cursor, cursor + pageSize);
    const next =
      cursor + page.length < photos.length ? cursor + page.length : null;

    return ContentService.createTextOutput(
      JSON.stringify({ page, next }),
    ).setMimeType(ContentService.MimeType.JSON);
  }

  // RSVP lookup (requires auth)
  if (e.parameter.token !== SECRET) {
    return ContentService.createTextOutput(
      JSON.stringify({ error: "Unauthorized" }),
    ).setMimeType(ContentService.MimeType.JSON);
  }

  const { first = "", last = "" } = e.parameter;
  const data = INV.getDataRange().getValues();

  // Find matching guests
  const matches = data.filter(
    (row) =>
      row[0].toLowerCase().includes(first.toLowerCase()) &&
      row[1].toLowerCase().includes(last.toLowerCase()),
  );

  if (matches.length === 0) {
    return ContentService.createTextOutput(
      JSON.stringify({ error: "Not found" }),
    ).setMimeType(ContentService.MimeType.JSON);
  }

  const household = matches[0][2];
  const members = data
    .filter((row) => row[2] === household)
    .map((row) => ({
      first: row[0],
      last: row[1],
      plus_one: row[3],
    }));

  return ContentService.createTextOutput(
    JSON.stringify({ household, members }),
  ).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  if (e.parameter.token !== SECRET) {
    return ContentService.createTextOutput(
      JSON.stringify({ error: "Unauthorized" }),
    ).setMimeType(ContentService.MimeType.JSON);
  }

  const data = JSON.parse(e.postData.contents);

  RSP.appendRow([
    new Date(),
    data.household,
    JSON.stringify(data.selected),
    data.attending,
    data.show_name,
    JSON.stringify(data.menu || {}),
    JSON.stringify(data.dietary || {}),
    data.transport || "No",
  ]);

  return ContentService.createTextOutput(
    JSON.stringify({ success: true }),
  ).setMimeType(ContentService.MimeType.JSON);
}
```

3. Set Script Properties:

   - Project Settings → Script Properties
   - Add property: `RSVP_SECRET` = `your-secret-key`

4. Deploy as Web App:
   - Deploy → New Deployment
   - Type: Web app
   - Execute as: Me
   - Access: Anyone
   - Copy the URL → Set as `SCRIPT_URL` in `.env.local`

## 🎨 Customization

### Theme Colors

Edit `src/app/globals.css` and Tailwind config for your wedding colors:

```css
:root {
  --wedding-primary: #103930; /* Deep green */
  --wedding-accent: #d4af37; /* Gold */
  --wedding-light: #f4e5b7; /* Light gold */
}
```

### Fonts

The site uses Bodoni for headings and Montserrat for body text. Update in `layout.tsx`:

```typescript
import { Bodoni_Moda, Montserrat } from "next/font/google";
```

### Event Timeline

Modify events in `src/app/events/timeline.tsx`:

```typescript
const EVENTS = [
  {
    date: "Your Date",
    title: "Event Name",
    subtitle: "Location",
    icon: <YourIcon />,
    link: "maps-link"
  }
];
```

### Photo Categories

Update categories in `src/app/photos/layout.tsx`:

```typescript
const CATS = [
  { key: "ceremony", label: "Ceremony" },
  { key: "reception", label: "Reception" },
  // Add your categories
];
```

## 📸 Cloudinary Setup

1. Create a [Cloudinary account](https://cloudinary.com)
2. Get your credentials from the Dashboard
3. Upload preset (optional) for user uploads:
   - Settings → Upload → Upload Presets
   - Create preset with transformations
4. Tag your photos by category for gallery organization

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

### Configuration

```javascript
// next.config.ts
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/your-cloud-name/**",
      },
    ],
  },
};
```

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + Custom CSS
- **UI Components**: Custom Once UI + Material-UI
- **Image Management**: [Cloudinary](https://cloudinary.com/)
- **Database**: Google Sheets (via Apps Script)
- **Animations**: React Vertical Timeline, Slick Carousel
- **Deployment**: [Vercel](https://vercel.com/)

## 📝 API Endpoints

| Endpoint            | Method | Description          | Auth |
| ------------------- | ------ | -------------------- | ---- |
| `/api/rsvp`         | GET    | Search for guest     | ✅   |
| `/api/rsvp`         | POST   | Submit RSVP          | ✅   |
| `/api/photos`       | GET    | Fetch gallery photos | ❌   |
| `/api/upload-image` | POST   | Upload guest photo   | ❌\* |

\*Time-gated between specific dates

## 🔐 Security Features

- HTTP-only cookies for RSVP authentication
- Shared secret validation
- Input sanitization and validation
- File upload restrictions (type, size, date)
- Rate limiting headers
- Security headers in middleware

## 🤝 Contributing

While this is a personal wedding website, feel free to fork and adapt for your own use!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by modern wedding website designs
- Built with love for An & Paul's special day
- Thanks to all open-source contributors

## 💌 Contact

For questions about adapting this for your wedding:

- Create an issue on GitHub
- Email: theledewhursts@gmail.com

---

Made with ❤️ for our special day - March 14, 2026
