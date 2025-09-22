"use client";

const Footer = () => {
  return (
    <>
      {/* Global rule: hide footer when body has .modal-open */}
      <style jsx global>{`
        body.modal-open .site-footer {
          display: none !important;
        }
      `}</style>

      <footer className="site-footer relative z-10 bg-white py-36 dark:bg-gray-dark sm:py-36 md:py-16 lg:py-16">
        <div className="websites-footer-illustration" />

        <div
          className="app-contrast-color app-websites-footer websites-footer"
          data-color="secondary-nav-bg"
        >
          <div className="websites-footer__wrapper">
            <div className="websites-footer__block websites-footer__blockInfo">
              <div className="websiteFont__nameHero websites-footer__item mb10">
                An &amp; Paul
              </div>
              <div className="websites-footer__item">March 14, 2026</div>
            </div>
            <div className="websites-footer__block websites-footer__blockAnchors">
              <div className="mb10">
                <a
                  className="websites-footer__item"
                  href="https://github.com/Grixsep/wedding-site-next"
                  target="_blank"
                  rel="noopener"
                >
                  Github Repo
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
