"use client";

export default function MenuPage() {
  return (
    <>
      <div className="pt-24 sm:pt-32 md:pt-36 lg:pt-40">
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

              {/* Menu Embedded PDF */}
              <div className="menu-embed-container my-8 border rounded-lg overflow-hidden shadow-md">
                <object
                  data="/pdf/Wedding-Menu.pdf"
                  type="application/pdf"
                  width="100%"
                  height="800px"
                >
                  <p className="p-4 text-center">
                    Your browser doesn’t support inline PDFs.{" "}
                    <a
                      href="/wedding-menu.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      Click here to view or download the menu.
                    </a>
                  </p>
                </object>
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
