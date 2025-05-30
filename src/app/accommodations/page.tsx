"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Accommodations() {
  const hotels = [
    {
      name: "The Archer Hotel",
      image: "/images/accommodations/archer.jpg",
      description:
        "Upscale boutique hotel in The Domain with rooftop pool, onsite restaurants, and complimentary bikes.",
      mapLink: "https://goo.gl/maps/6VaH2i8Bb3Y8x9Gk7",
    },
    {
      name: "The Westin Austin ATX",
      image: "/images/accommodations/westin.jpg",
      description:
        "Modern rooms, full spa, and walking distance to Domain’s shops & nightlife.",
      mapLink: "https://goo.gl/maps/abcd1234",
    },
    {
      name: "Hyatt House Austin / The Domain",
      image: "/images/accommodations/hyatt.jpg",
      description:
        "Comfortable mid-range option with free hot breakfast and shuttle to the Domain.",
      mapLink: "https://goo.gl/maps/wxyz5678",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: false,
  };

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

              {/* Accommodation Options */}
              <div className="max-w-4xl mx-auto mt-8 mb-12">
                <Slider {...settings}>
                  {hotels.map((hotel) => (
                    <div key={hotel.name} className="px-2">
                      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        <img
                          src={hotel.image}
                          alt={hotel.name}
                          className="w-full h-64 object-cover"
                        />
                        <div className="p-6">
                          <h2 className="text-2xl font-semibold mb-2">
                            {hotel.name}
                          </h2>
                          <p className="text-gray-700 mb-4">
                            {hotel.description}
                          </p>
                          <a
                            href={hotel.mapLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
                          >
                            View on Map
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
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
