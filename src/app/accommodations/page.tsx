"use client";

import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  FaStar,
  FaStarHalfAlt,
  FaMapMarkerAlt,
  FaBed,
  FaDollarSign,
  FaCompass,
} from "react-icons/fa";

// Star Rating Component
const StarRating = ({ rating }: { rating: number }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
  }
  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
  }
  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<FaStar key={`empty-${i}`} className="text-gray-300" />);
  }

  return (
    <div className="flex items-center gap-1">
      <div className="flex">{stars}</div>
      <span className="text-sm text-gray-600 ml-1">({rating})</span>
    </div>
  );
};

// Price Level Indicator
const PriceLevel = ({ level }: { level: 1 | 2 | 3 | 4 }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(4)].map((_, i) => (
        <FaDollarSign
          key={i}
          className={`text-sm ${i < level ? "text-green-600" : "text-gray-300"}`}
        />
      ))}
    </div>
  );
};

export default function Accommodations() {
  const [activeHotel, setActiveHotel] = useState(0);

  const hotels = [
    {
      name: "Archer Hotel Austin",
      tagline: "Boutique luxury in The Domain",
      images: [
        "/images/accommodations/archer/1.jpg",
        "/images/accommodations/archer/2.jpg",
        "/images/accommodations/archer/3.jpg",
      ],
      description:
        "Design-forward boutique stay with a lively lobby bar and a small rooftop pool. Steps from Domain restaurants, shops, and nightlife.",
      features: ["Rooftop Pool", "Lobby Bar", "Pet Friendly", "Valet Parking"],
      rating: 4.5,
      priceLevel: 4 as 1 | 2 | 3 | 4,
      distance: "In The Domain",
      mapLink: "https://goo.gl/maps/6VaH2i8Bb3Y8x9Gk7",
      bookingLink: "https://www.archerhotel.com/austin/the-domain",
      recommended: true, // In the Domain
      hasHotelBlock: true,
      blockCode: "LEDEWHURST-WEDDING",
    },
    {
      name: "The Westin Austin at The Domain",
      tagline: "Modern comfort & easy access",
      images: [
        "/images/accommodations/westin/westin1.jpg",
        "/images/accommodations/westin/westin2.jpg",
        "/images/accommodations/westin/westin3.jpg",
      ],
      description:
        "Bright, modern rooms with a relaxing pool and on-site dining. Right by Domain's main strip for quick eats, coffee, and shopping.",
      features: [
        "Outdoor Pool",
        "Fitness Center",
        "Restaurant & Bar",
        "Business Center",
      ],
      rating: 4.3,
      priceLevel: 3 as 1 | 2 | 3 | 4,
      distance: "In The Domain",
      mapLink: "https://goo.gl/maps/abcd1234",
      bookingLink:
        "https://www.marriott.com/hotels/travel/auswi-the-westin-austin-at-the-domain/",
      recommended: true, // In the Domain
      hasHotelBlock: true,
      blockCode: "LEDEWHURST-WEDDING",
    },
    {
      name: "Aloft Austin at The Domain",
      tagline: "Hip, social, and music-friendly",
      images: [
        "/images/accommodations/aloft/aloft1.jpg",
        "/images/accommodations/aloft/aloft2.jpg",
        "/images/accommodations/aloft/aloft3.jpg",
      ],
      description:
        "Trendy hangout with vibrant common spaces, pool, and casual live music. Great for guests who want a fun, youthful vibe.",
      features: ["Live Music", "Pool", "24/7 Gym", "Pet Friendly"],
      rating: 4.2,
      priceLevel: 3 as 1 | 2 | 3 | 4,
      distance: "In The Domain",
      mapLink: "https://goo.gl/maps/xyz789",
      bookingLink:
        "https://www.marriott.com/hotels/travel/ausaa-aloft-austin-domain/",
      recommended: true, // In the Domain
      hasHotelBlock: false,
    },
    {
      name: "Hyatt House Austin/Arboretum",
      tagline: "Suite-style comfort",
      images: [
        "/images/accommodations/archer/1.jpg", // TODO: swap to actual Hyatt images
        "/images/accommodations/archer/2.jpg",
        "/images/accommodations/archer/3.jpg",
      ],
      description:
        "Spacious suites with kitchenettes, free hot breakfast, and a low-key vibe. A short rideshare to the Domain (good for families).",
      features: [
        "Free Breakfast",
        "Kitchen Suites",
        "Evening Social",
        "On-site Laundry",
      ],
      rating: 4.0,
      priceLevel: 2 as 1 | 2 | 3 | 4,
      distance: "Near The Domain (~8-12 min drive)",
      mapLink: "https://goo.gl/maps/wxyz5678",
      bookingLink:
        "https://www.hyatt.com/en-US/hotel/texas/hyatt-house-austin-arboretum-domain/",
      hasHotelBlock: true,
      blockCode: "LEDEWHURST-WEDDING",
    },
    {
      name: "La Quinta Inn & Suites",
      tagline: "Solid budget option",
      images: [
        "/images/accommodations/laquinta/laquinta1.png",
        "/images/accommodations/laquinta/laquinta2.png",
        "/images/accommodations/laquinta/laquinta3.png",
      ],
      description:
        "Straightforward and affordable with breakfast included. Good value pick with a small walk to the Domain.",
      features: ["Free Breakfast", "Pool", "Free Parking", "Pet Friendly"],
      rating: 3.8,
      priceLevel: 1 as 1 | 2 | 3 | 4,
      distance: "Near The Domain (~10-15 min walk)",
      mapLink: "https://goo.gl/maps/laquinta123",
      bookingLink: "https://www.lq.com/",
      nearDomain: true, // New flag
      hasHotelBlock: false,
    },
  ];

  // Custom arrow components with better styling
  function SamplePrevArrow(props: any) {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg z-10 transition-all hover:scale-110"
        aria-label="Previous hotel"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
    );
  }

  function SampleNextArrow(props: any) {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg z-10 transition-all hover:scale-110"
        aria-label="Next hotel"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    );
  }

  const outerSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
    beforeChange: (current: number, next: number) => setActiveHotel(next),
    dotsClass: "slick-dots slick-thumb",
    appendDots: (dots: any) => (
      <div>
        <ul className="!flex !justify-center !gap-4 m-0 p-0">{dots}</ul>
      </div>
    ),
    customPaging: (i: number) => (
      <div
        className={`h-2 rounded-full transition-all ${
          i === activeHotel ? "bg-blue-600 w-8" : "bg-gray-400 w-2"
        }`}
      />
    ),
  };

  const innerSliderSettings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    // no customPaging here – CSS handles the look; avoids misalignment
  };

  return (
    <>
      <style jsx global>{`
        .websiteDecoration--internal {
          background-image: url("/images/wedding/floral1.png");
        }
        .websiteDecoration--bottom {
          background-image: url("/images/wedding/floral2.png");
        }

        /* Hide slick's default pseudo-dot so no extra dark dot shows */
        .slick-dots li button:before {
          display: none !important;
        }

        /* Outer (hotel) dots – bigger gap and consistent pill when active */
        .slick-thumb {
          margin-top: 16px;
        }
        .slick-thumb li {
          margin: 0 10px !important;
        }
        .slick-thumb li div {
          height: 8px !important;
        }

        /* Inner (image) dots – clean alignment */
        .hotel-image-carousel .slick-dots {
          bottom: 14px !important;
        }
        .hotel-image-carousel .slick-dots li {
          margin: 0 8px !important;
        }
        .hotel-image-carousel .slick-dots li button {
          width: 10px;
          height: 10px;
          border-radius: 9999px;
          background: #fff;
          border: 2px solid #666;
          opacity: 0.9;
        }
        .hotel-image-carousel .slick-dots li.slick-active button {
          background: #3b82f6;
          border-color: #3b82f6;
          transform: scale(1.25);
        }
      `}</style>

      <div className="pt-24 sm:pt-32 md:pt-36 lg:pt-40">
        <div className="app-spinner-container websiteSpinner" />

        <div className="websiteDecoration websiteDecoration--internal" />

        <div className="app-contrast-color websiteContainer" data-color="">
          <div
            className="app-website-page-content websiteFont__body"
            id="scrollMobile"
          >
            <div className="pure-u-1 websites-section">
              {/* Header */}
              <div className="app-website-render-wrapper sectionRender sectionRender__wrapperHeader">
                <div className="websiteContainerSection">
                  <h1 className="app-contrast-color websiteFont__headingHero mb20">
                    Accommodations
                  </h1>
                  <div className="websiteFont__hero websiteLinkChilds websiteLinkChilds--underline pt-0 sm:pt-4 md:pt-10 lg:pt-10">
                    <p>
                      We've obtained hotel blocks with certain hotels in The
                      Domain area to ensure you have a comfortable stay. We
                      recommend staying within or close to the domain if you do
                      not have a car for your stay.
                    </p>
                  </div>
                </div>
              </div>

              {/* Hotel Carousel */}
              <div className="max-w-5xl mx-auto mt-12 mb-16 px-4">
                <Slider {...outerSliderSettings}>
                  {hotels.map((hotel, index) => (
                    <div key={index} className="px-2">
                      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        {/* Image Carousel with 3D border effect */}
                        <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden bg-gray-100">
                          {/* Hotel Badges */}
                          <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
                            {hotel.recommended && (
                              <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                                ⭐ In the Domain
                              </div>
                            )}
                            {hotel.nearDomain && (
                              <div className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                                <FaCompass className="opacity-90" />
                                <span>Near The Domain</span>
                              </div>
                            )}
                            {hotel.hasHotelBlock && (
                              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                                🏨 Hotel Block Available
                              </div>
                            )}
                          </div>

                          <div className="absolute inset-2 bg-white rounded-lg shadow-inner hotel-image-carousel">
                            <Slider
                              {...innerSliderSettings}
                              key={`slider-${index}`}
                            >
                              {hotel.images.map((image, idx) => (
                                <div
                                  key={idx}
                                  className="relative h-64 sm:h-80 md:h-96"
                                >
                                  <img
                                    src={image}
                                    alt={`${hotel.name} ${idx + 1}`}
                                    className="w-full h-full object-cover rounded-lg"
                                  />
                                </div>
                              ))}
                            </Slider>
                          </div>
                        </div>

                        {/* Hotel Information */}
                        <div className="p-6 sm:p-8">
                          {/* Header Section */}
                          <div className="mb-4">
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">
                              {hotel.name}
                            </h2>
                            <p className="text-gray-600 italic">
                              {hotel.tagline}
                            </p>

                            {/* Rating and Price */}
                            <div className="flex items-center justify-between mt-3">
                              <StarRating rating={hotel.rating} />
                              <PriceLevel level={hotel.priceLevel} />
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-gray-700 mb-4 leading-relaxed">
                            {hotel.description}
                          </p>

                          {/* Distance Badge */}
                          <div className="flex items-center text-sm text-gray-600 mb-4">
                            <FaMapMarkerAlt className="mr-2 text-red-500" />
                            <span>{hotel.distance}</span>
                          </div>

                          {/* Features */}
                          <div className="flex flex-wrap gap-2 mb-6">
                            {hotel.features.map((feature, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-col sm:flex-row gap-3">
                            <a
                              href={hotel.bookingLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-md"
                            >
                              <FaBed />
                              <span className="font-semibold">Book Now</span>
                            </a>
                            <a
                              href={hotel.mapLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all"
                            >
                              <FaMapMarkerAlt />
                              <span className="font-semibold">View Map</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>

                {/* Hotel Navigation Dots Info */}
                <div className="text-center mt-8 text-sm text-gray-500">
                  Swipe or use arrows to browse all {hotels.length} hotel
                  options
                </div>
              </div>

              {/* Additional Information */}
              <div className="max-w-3xl mx-auto px-4 mb-12 space-y-4">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">
                    🚌 Shuttle Service Information
                  </h3>
                  <p className="text-blue-800">
                    Complimentary shuttle service will be provided from all
                    listed hotels to the venue. Shuttles will depart 45 minutes
                    before the ceremony and return service will be available
                    throughout the evening until 11:30 PM.
                  </p>
                </div>

                <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-900 mb-2">
                    💰 Hotel Block Discounts Available
                  </h3>
                  <p className="text-green-800 mb-3">
                    We've secured discounted room blocks at The Archer Hotel,
                    The Westin, and Hyatt House. Please book by{" "}
                    <strong>February 14, 2026</strong> to receive our special
                    group rate.
                  </p>
                  <p className="text-green-700 text-sm">
                    <strong>Booking Code:</strong> LEDEWHURST-WEDDING (mention
                    when calling or use online)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="websiteDecoration websiteDecoration--bottom" />
      </div>
    </>
  );
}
