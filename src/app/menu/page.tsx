"use client";
import { useState, useEffect, Fragment } from "react";
import { FaDownload } from "react-icons/fa";

/** Simple responsive 3-up gallery with a11y lightbox modal */
function TastingGallery({
  items,
}: {
  items: { title: string; src: string; alt: string }[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {items.map((item, i) => (
          <button
            key={item.title}
            type="button"
            onClick={() => setOpenIndex(i)}
            className="group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
            aria-label={`Open larger view: ${item.title}`}
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="px-3 py-2">
              <h3 className="text-sm font-semibold text-gray-800">
                {item.title}
              </h3>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {openIndex !== null && (
        <Lightbox
          item={items[openIndex]}
          onClose={() => setOpenIndex(null)}
          onPrev={() =>
            setOpenIndex((i) => (i! - 1 + items.length) % items.length)
          }
          onNext={() => setOpenIndex((i) => (i! + 1) % items.length)}
        />
      )}
    </>
  );
}

function Lightbox({
  item,
  onClose,
  onPrev,
  onNext,
}: {
  item: { title: string; src: string; alt: string };
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  // close on Esc / arrows
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70" />
      <div
        className="relative mx-4 max-w-4xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={item.src}
          alt={item.alt}
          className="w-full h-auto rounded-lg shadow-2xl"
        />
        <div className="mt-3 flex items-center justify-between text-white">
          <h3 className="text-lg font-semibold drop-shadow">{item.title}</h3>
          <div className="flex gap-2">
            <button
              onClick={onPrev}
              className="px-3 py-1 rounded bg-white/20 hover:bg-white/30"
              aria-label="Previous"
            >
              ‹
            </button>
            <button
              onClick={onNext}
              className="px-3 py-1 rounded bg-white/20 hover:bg-white/30"
              aria-label="Next"
            >
              ›
            </button>
            <button
              onClick={onClose}
              className="px-3 py-1 rounded bg-white/20 hover:bg-white/30"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DownloadButton({
  href,
  filename,
  children,
  className = "",
}: {
  href: string;
  filename: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      download={filename}
      target="_blank" // iOS Safari fallback (opens then “Save Image”)
      rel="noopener noreferrer"
      className={
        "w-full sm:w-auto inline-flex items-center justify-center gap-2 " +
        "px-5 py-3 rounded-lg bg-blue-600 text-white font-semibold " +
        "hover:bg-blue-700 active:bg-blue-800 transition-colors shadow " +
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 " +
        className
      }
      aria-label={`Download ${filename}`}
    >
      <FaDownload aria-hidden="true" />
      {children}
    </a>
  );
}

export default function MenuPage() {
  return (
    <>
      <div className="pt-6 sm:pt-10 md:pt-14 lg:pt-18">
        {/* Spinner */}
        <div className="app-spinner-container websiteSpinner" />

        {/* Internal background image */}
        <style jsx>{`
          .websiteDecoration--internal {
            background-image: url("/images/wedding/floral1.png");
          }
        `}</style>
        <div className="websiteDecoration websiteDecoration--internal" />

        {/* Page container */}
        <div className="app-contrast-color websiteContainer" data-color="">
          {/* Page content wrapper */}
          <div
            className="app-website-page-content websiteFont__body"
            id="scrollMobile"
          >
            <div className="pure-u-1 websites-section">
              {/* Section header */}
              <div className="app-website-render-wrapper sectionRender sectionRender__wrapperHeader">
                <div className="websiteContainerSection">
                  <h1 className="app-contrast-color websiteFont__headingHero mb20">
                    Our Menu
                  </h1>
                  <div className="websiteFont__hero websiteLinkChilds websiteLinkChilds--underline">
                    <p>We hope you enjoy the food!</p>
                  </div>
                </div>
              </div>

              {/* ─── Menu as images (no inner scroll) ─── */}
              <div className="flex flex-col items-center space-y-4 my-8">
                <img
                  src="/images/menu/wedding-menu-1.png"
                  alt="Wedding Menu"
                  className="w-full max-w-3xl rounded-lg shadow"
                />

                {/* Download button (full-width on mobile, shrinks on larger screens) */}
                <DownloadButton
                  href="/images/menu/wedding-menu-1.png"
                  filename="An-and-Paul-Wedding-Menu.png"
                >
                  Download Menu
                </DownloadButton>

                {/* tiny helper text for iOS */}
                <p className="text-xs text-gray-500 mt-2">
                  Tip: On iPhone/iPad, the image may open in a new tab—tap and
                  hold to “Save Image”.
                </p>
              </div>

              <div
                className="app-website-event-tracking"
                data-track-c="Wedding Website"
                data-track-a="a-show"
                data-track-l="d-desktop+s-accommodations+o-budget_widget"
                data-track-v=""
                data-track-ni="1"
              />
            </div>
          </div>
        </div>

        {/* ─── Tasting Gallery ─── */}
        <section className="max-w-5xl mx-auto px-4 mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
            Menu Highlights from Our Tasting
          </h2>
          <p className="text-gray-600 mb-6">A peek at the mains we loved.</p>

          <TastingGallery
            items={[
              {
                title: "Wagyu Sirloin with Chimichurri",
                src: "/images/menu/tasting/tasting-beef-chimichurri.jpg",
                alt: "Slices of sirloin with chimichurri, asparagus and rosemary potatoes",
              },
              {
                title: "Chicken Piccata",
                src: "/images/menu/tasting/tasting-chicken-piccata.jpg",
                alt: "Chicken piccata with lemon-caper sauce, green beans and mashed potato",
              },
              {
                title: "Portobello & Quinoa (Veg)",
                src: "/images/menu/tasting/tasting-portobello-quinoa.jpg",
                alt: "Roasted portobello on quinoa with tomato relish and green beans",
              },
            ]}
          />
        </section>

        {/* Bottom background decoration */}
        <style jsx>{`
          .websiteDecoration--bottom {
            background-image: url("/images/wedding/floral2.png");
          }
        `}</style>
        <div className="websiteDecoration websiteDecoration--bottom" />
      </div>
    </>
  );
}
