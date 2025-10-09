"use client";
// common wrapper: tabs + decorations + <Outlet/>
import Link from "next/link";
import { usePathname } from "next/navigation";

const CATS = [
  { key: "ceremony", label: "Ceremony" },
  { key: "elopement", label: "Elopement" },
  { key: "welcome", label: "Welcome Party" },
  { key: "tea-ceremony", label: "Tea Ceremony" },
  { key: "farewell", label: "Farewell Party" },
];

export default function PhotosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
  const current = path.split("/").pop() || "ceremony";

  return (
    <>
      {/* Decorations */}
      <style jsx>{`
        .websiteDecoration--internal {
          background-image: url("/images/wedding/floral1.png");
        }
        .websiteDecoration--bottom {
          background-image: url("/images/wedding/floral2.png");
        }
      `}</style>

      <div className="websiteDecoration websiteDecoration--internal" />

      <div className="pt-16 sm:pt-20 md:pt-24 lg:pt-28">
        <div className="app-spinner-container websiteSpinner" />
        <div className="app-contrast-color websiteContainer">
          <div
            className="app-website-page-content websiteFont__body"
            id="scrollMobile"
          >
            {/* Header */}
            <div className="app-website-render-wrapper sectionRender sectionRender__wrapperHeader">
              <div className="websiteContainerSection">
                <h1 className="app-contrast-color websiteFont__headingHero mb20">
                  Photos
                </h1>
                <div className="websiteFont__hero websiteLinkChilds websiteLinkChilds--underline">
                  <p>Browse by category:</p>
                </div>
              </div>
            </div>
            {/* This needs to be updated / removed but a gap added */}
            <hr className="hrSection" />

            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {CATS.map((cat) => (
                <Link
                  key={cat.key}
                  href={`/photos/${cat.key}`}
                  className={
                    current === cat.key
                      ? "px-4 py-2 bg-blue-600 text-white rounded-lg"
                      : "px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-100"
                  }
                >
                  {cat.label}
                </Link>
              ))}
            </div>

            {/* where the category page injects its gallery */}
            {children}
          </div>
        </div>
      </div>

      <div className="websiteDecoration websiteDecoration--bottom" />
      <div className="websites-footer-illustration" />
    </>
  );
}
