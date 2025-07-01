"use client";

import "react-vertical-timeline-component/style.min.css";
import Demo from "./timeline";

export default function Events() {
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
            <div className="websiteContainerSection mb-8">
              <h1 className="app-contrast-color websiteFont__headingHero mb20">
                Events
              </h1>
              <p className="websiteFont__hero websiteLinkChilds websiteLinkChilds--underline">
                Here you'll find important information about our wedding events.
              </p>
            </div>

            {/* Vertical Timeline */}
            <Demo />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="websiteDecoration websiteDecoration--bottom" />
      <div className="websites-footer-illustration" />
    </>
  );
}
