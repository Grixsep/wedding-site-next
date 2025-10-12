"use client";

export default function Home() {
  return (
    <>
      <div className="app-theme-header websiteHomeHeader">
        <div className="websiteHomeHeader__titlePanel">
          <h1 className="app-contrast-color websiteHomeHeader__title websiteFont__nameTitle">
            An &amp; Paul
          </h1>
        </div>
      </div>

      <div className="websiteHomeContentHeader app-contrast-color">
        <div className="websiteDecoration websiteDecoration--top" />
        <div className="websiteHomeContentHeader__contentPanel">
          <p className="websiteHomeContentHeader__claim">Celebrate with us!</p>
          <p className="websiteHomeContentHeader__weddingDate websiteFont__heading3">
            March 14, 2026
          </p>
          <p className="websiteHomeContentHeader__place">Austin, Texas</p>
        </div>
      </div>

      <div className="app-spinner-container websiteSpinner" />

      <div
        className="app-contrast-color websiteContainer"
        style={{ paddingTop: 0 }}
      >
        <div
          className="app-website-page-content websiteFont__body"
          id="scrollMobile"
        >
          <div className="pure-u-1 websites-section">
            <ul className="app-website-sections">
              <li className="app-website-render-wrapper app-website-section-template sectionRender__wrapper websiteSectionWrapper mb5" />
              <li className="app-website-render-wrapper sectionRender__wrapper websiteSectionWrapper">
                <div className="app-website-render">
                  <div className="websiteContainerSection">
                    <div className="app-contrast-color websiteFont__headingHero mb30">
                      Welcome!
                    </div>
                    <div className="websiteFont__hero websiteLinkChilds websiteLinkChilds--underline mb20">
                      <p>
                        We can't wait to celebrate with you! In anticipation of
                        the big day, we have created this wedding website to
                        keep you up to date on all the details of our wedding.
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <style jsx>{`
        .websiteDecoration--bottom {
          background-image: url(/images/wedding/floral2.png);
        }
      `}</style>
      <div className="websiteDecoration websiteDecoration--bottom" />

      <div className="app-theme-footer websiteFooterWelcome customFooterBackground">
        <div className="header-container container-edit-cover" />
      </div>
    </>
  );
}
