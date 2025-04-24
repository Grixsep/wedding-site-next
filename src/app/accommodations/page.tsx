"use client";

export default function Accommodations() {
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
                    Accommodations
                  </h1>
                  <div className="websiteFont__hero websiteLinkChilds websiteLinkChilds--underline">
                    <p>
                      We are so excited to celebrate with you! Here are our best
                      picks for places to stay near all the action.
                    </p>
                  </div>
                </div>
              </div>

              <hr className="hrSection" />

              {/* Section list placeholder */}
              <ul data-idpage="121344120" className="app-website-sections">
                <li className="app-website-render-wrapper app-website-section-template sectionRender__wrapper websiteSectionWrapper dnone" />
              </ul>

              {/* Budget widget box */}
              <div className="websiteBoxInline websiteBox">
                <div className="websiteBoxInline__logo">
                  <i
                    className="svgIcon app-svg-async svgIcon__budget contrastColorSvg websiteLogo websiteLogo__budget"
                    data-svg=""
                    data-svg-lazyload="1"
                  >
                    <svg
                      viewBox="0 0 366 78"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                    >
                      {/* Optional: You could strip the SVG or leave it inline depending on needs */}
                      <path
                        d="M47.3 57.1L85 1.2v55.9H47.3zM.5.3H85L.5 57.1V.3zm359 2.2c3.3 0 6 2.7 6 6s-2.7 5.9-6 5.9-6-2.6-6-5.9c0-3.3 2.6-6 6-6zm0 11.1c2.8 0 5.1-2.3 5.1-5.1s-2.3-5.1-5.1-5.1-5.1 2.3-5.1 5.1 2.3 5.1 5.1 5.1zM357 5.1h2.5c1.3 0 2.5.5 2.5 2 0 1-.6 1.6-1.6 1.8l1.8 3h-1.5l-1.6-2.8h-.9v2.8H357V5.1zm2.3 2.9c.7 0 1.5-.2 1.5-1 0-.7-.7-.9-1.3-.9h-1.1V8h.9zm-14.5 40.9c.5 0 1.1 0 2.4-.2v8.4s-1.9.3-3.8.3c-9.1 0-14.8-5.9-14.8-15.8V2.5h9.3v11.8h9.1v8.2h-9.1v19.1c0 5 2.2 7.3 6.9 7.3zm-26.9-29.6c8.4 8.8 5.5 19.9 5.4 19.9H292c1.2 6.1 6.3 9.7 11.3 9.7 3.2 0 7.3-1.7 9.7-5l7.3 5.1c-4 5.1-10.5 8.4-16.9 8.4-12.2 0-21.1-9.6-21.1-22 0-12.3 9.1-22.1 20.9-22.1 5.5 0 10.8 1.9 14.7 6zm-25.7 12.2h21.9c-.3-2.8-3.5-9.6-10.9-9.6-7.6 0-10.7 7.1-11 9.6zm-23.9-13.3v-4h9.2v41.5c0 7.5-2.5 13-7 17-3.8 3.3-9.2 4.9-14.7 4.9-8.2 0-15.9-4.2-19.6-11l7.5-5.2c1.9 3.3 6.1 7.6 12.1 7.6 14.2 0 12.3-16.1 12.3-16.1-3.4 3-7.7 4.6-12.1 4.6-11.9 0-21.3-9.6-21.3-22.1 0-12.5 9.4-22 21.3-22 4.5 0 9 1.6 12.3 4.8zM256 48.8c6.6 0 12.1-6.1 12.1-13.6 0-7.2-5.5-13.3-12.1-13.3s-12 5.9-12 13.3c0 7.6 5.3 13.6 12 13.6zm-48 8.6c-11.9 0-21.3-9.5-21.3-22s9.4-22.1 21.3-22.1c4.4 0 8.7 1.6 12.1 4.6V.3h9.3v56.3h-9.1v-3.9c-3.3 3.1-7.7 4.7-12.3 4.7zm0-35.4c-6.7 0-12 5.9-12 13.5 0 7.4 5.4 13.3 12 13.3s12.1-6.1 12.1-13.3c0-7.4-5.4-13.5-12.1-13.5zm-25.9 14.1c0 13-8.7 21.3-19.6 21.3-10.8 0-19.5-8.3-19.5-21.3V14.3h9.4v21.8c0 7.8 4 12.8 10.2 12.8 6.2 0 10.2-5 10.2-12.8V14.3h9.3v21.8zm-82.8 21V.3H119c7.7 0 16.9 4 16.9 14.7 0 6.4-3 10.5-5.7 12 7.2 2.8 8.6 9.6 8.6 13.7 0 9.1-7.5 16.4-19.4 16.4H99.3zm19.1-8.5c2.5 0 4.4-.3 5.9-.9 3.1-1.4 4.9-3.9 4.9-7.5 0-3.5-2-6.2-5-7.4-2.2-.9-3.9-1-6.6-1h-8.9v16.8h9.7zm-1.6-24.9c1.7 0 4.5-.1 6.1-.9 2.5-1.4 3.2-3.5 3.2-6.7 0-3.5-2.1-5.5-3.8-6.3-1.3-.7-3.1-1-5.8-1h-7.9v14.8h8.2v.1z"
                        fill-rule="nonzero"
                      />
                    </svg>
                  </i>
                </div>

                <div className="websiteBoxInline__body">
                  <strong>Wedding guests</strong> can enjoy savings of up to{" "}
                  <strong>25% off Budget</strong> base rates when renting a
                  vehicle from a participating location in the contiguous{" "}
                  <strong className="mr5">U.S. and Canada.</strong>
                </div>

                <a
                  className="websiteBoxInline__action btnFlat btnFlat--primary app-contrast-color nowrap app-ua-track-event light-color"
                  data-color="secondaryColorBtnFlat"
                  data-track-c="Wedding Website"
                  data-track-a="a-click"
                  data-track-l="d-desktop+s-accommodations+o-budget_widget+dt-landing_budget"
                  data-track-v=""
                  data-track-ni="0"
                  href="/"
                  target="_blank"
                  rel="noopener nofollow"
                >
                  Select my car
                </a>
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
