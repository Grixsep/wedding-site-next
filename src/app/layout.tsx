// src/app/layout.tsx
import "./globals.css";
import { Toaster } from "react-hot-toast";

import { Inter } from "next/font/google";

import Header from "../components/Header";
import Footer from "../components/Footer";

import { Analytics } from "@vercel/analytics/react";
// e.g. in src/app/layout.tsx or globals.css
import "react-vertical-timeline-component/style.min.css";

const inter = Inter({ subsets: ["latin"] });

// app/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://wedding.ledewhurst.com"),
  title: {
    default: "An & Paul — March 14, 2026",
    template: "%s | An & Paul Wedding",
  },
  description:
    "Join us in Texas on March 14, 2026. Weekend events, venue details, accommodations, travel tips, and RSVP info.",
  applicationName: "An & Paul Wedding",
  keywords: [
    "An and Paul wedding",
    "An & Paul",
    "LeDewhurst",
    "wedding",
    "Georgetown TX",
    "Kindred Oaks",
    "March 14 2026",
  ],
  authors: [{ name: "An & Paul" }],
  creator: "An & Paul",
  publisher: "An & Paul",
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
      "en-GB": "/",
    },
  },
  openGraph: {
    type: "website",
    url: "https://wedding.ledewhurst.com",
    siteName: "An & Paul Wedding",
    title: "An & Paul — March 14, 2026",
    description:
      "We can't wait to celebrate with you in Texas. See events, venue, and hotel info.",
    images: [
      {
        url: "/images/og/og_image.png",
        width: 1200,
        height: 630,
        alt: "An & Paul — March 14, 2026",
        type: "image/png",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "An & Paul — March 14, 2026",
    description:
      "All the details for the big day in Texas — events, venue, and hotels.",
    images: ["/images/og/og_image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-grow">{children}</main>
        <Analytics />
        <Toaster position="top-center" />
        <Footer />
      </body>
    </html>
  );
}
