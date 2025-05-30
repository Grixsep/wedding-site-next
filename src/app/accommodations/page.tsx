"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Accommodations() {
  const hotels = [
    {
      name: "The Archer Hotel",
      images: [
        "/images/accommodations/archer/1.jpg",
        "/images/accommodations/archer/2.jpg",
        "/images/accommodations/archer/3.jpg",
      ],
      description:
        "Upscale boutique hotel in The Domain with rooftop pool, onsite restaurants, and complimentary bikes.",
      mapLink: "https://goo.gl/maps/6VaH2i8Bb3Y8x9Gk7",
      bookingLink: "https://www.archerhotel.com/austin/the-domain",
    },
    {
      name: "The Westin Austin ATX",
      images: [
        "/images/accommodations/archer/1.jpg",
        "/images/accommodations/archer/2.jpg",
        "/images/accommodations/archer/3.jpg",
      ],
      description:
        "Modern rooms, full spa, and walking distance to Domain’s shops & nightlife.",
      mapLink: "https://goo.gl/maps/abcd1234",
      bookingLink: "https://www.archerhotel.com/austin/the-domain",
    },
    {
      name: "Hyatt House Austin / The Domain",
      images: [
        "/images/accommodations/archer/1.jpg",
        "/images/accommodations/archer/2.jpg",
        "/images/accommodations/archer/3.jpg",
      ],
      description:
        "Comfortable mid-range option with free hot breakfast and shuttle to the Domain.",
      mapLink: "https://goo.gl/maps/wxyz5678",
      bookingLink: "https://www.archerhotel.com/austin/the-domain",
    },
  ];

  // Outer arrows
  function OuterPrevArrow({
    onClick,
  }: {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
  }) {
    return (
      <button
        onClick={onClick}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 p-2 rounded-full shadow hover:bg-opacity-100 z-10"
      >
        ‹
      </button>
    );
  }
  function OuterNextArrow({
    onClick,
  }: {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
  }) {
    return (
      <button
        onClick={onClick}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 p-2 rounded-full shadow hover:bg-opacity-100 z-10"
      >
        ›
      </button>
    );
  }

  // Inner arrows
  function InnerPrevArrow({
    onClick,
  }: {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
  }) {
    return (
      <button
        onClick={onClick}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-1 rounded-full hover:bg-opacity-75 z-10"
      >
        ‹
      </button>
    );
  }
  function InnerNextArrow({
    onClick,
  }: {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
  }) {
    return (
      <button
        onClick={onClick}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-1 rounded-full hover:bg-opacity-75 z-10"
      >
        ›
      </button>
    );
  }

  const outerSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <OuterPrevArrow />,
    nextArrow: <OuterNextArrow />,
  };

  const innerSettings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <InnerPrevArrow />,
    nextArrow: <InnerNextArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
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
              <div className="relative max-w-4xl mx-auto mt-8 mb-12">
                <Slider {...outerSettings}>
                  {hotels.map((hotel) => (
                    <div key={hotel.name} className="px-4">
                      {/* Inner carousel of images */}
                      <div className="relative">
                        <Slider {...innerSettings}>
                          {hotel.images.map((src, idx) => (
                            <div key={idx} className="px-2">
                              <img
                                src={src}
                                alt={`${hotel.name} ${idx + 1}`}
                                className="w-full h-56 object-cover rounded-xl"
                              />
                            </div>
                          ))}
                        </Slider>
                      </div>

                      {/* Hotel info below images */}
                      <div className="bg-white rounded-b-2xl shadow-lg p-6 -mt-4 relative z-0">
                        <h2 className="text-2xl font-semibold mb-2">
                          {hotel.name}
                        </h2>
                        <p className="text-gray-700 mb-4">
                          {hotel.description}
                        </p>
                        <a
                          href={hotel.bookingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
                        >
                          Book Now!
                        </a>
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
