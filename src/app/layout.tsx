// src/app/layout.tsx
import "./globals.css";
import "../styles/wedsites.css";
import "../styles/font-montserrat.min.css";
import "../styles/dynamicOverlay.min.css";
import "../styles/font-bodoni.min.css";
import { Toaster } from "react-hot-toast";

import { Inter } from "next/font/google";

import Header from "../components/Header";
import Footer from "../components/Footer";

import { Analytics } from "@vercel/analytics/react";
// e.g. in src/app/layout.tsx or globals.css
import "react-vertical-timeline-component/style.min.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "An & Paul’s Wedding",
  description: "Join us for our special day!",
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
