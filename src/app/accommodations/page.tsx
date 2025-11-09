"use client";

import { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaBed, FaCalendarAlt } from "react-icons/fa";

export default function Accommodations() {
  const [activeHotel, setActiveHotel] = useState(0);
  const mapRef = useRef<any>(null);
  const mapInstanceRef = useRef<any>(null);

  const hotels = [
    {
      name: "Residence Inn by Marriott",
      tagline: "Austin Northwest/The Domain Area",
      images: [
        "/images/accommodations/inn-marriott/1.jpg",
        "/images/accommodations/inn-marriott/2.jpg",
        "/images/accommodations/inn-marriott/3.jpg",
      ],
      description:
        "Spacious suites with full kitchens, free hot breakfast, and comfortable living areas. Perfect for extended stays and families needing extra space.",
      features: ["Free Breakfast", "Full Kitchen", "Free Parking"],
      price: "$149/night",
      dates: "March 10-17",
      bookingLink:
        "https://www.marriott.com/event-reservations/reservation-link.mi?id=1757626647608&key=GRP&app=resvlink",
      address: "11301 Burnet Rd, Austin, TX 78758",
      lat: 30.39819,
      lng: -97.71893,
      topChoice: false,
    },
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
      features: ["Rooftop Pool", "Lobby Bar", "Valet Parking"],
      price: "$249/night",
      dates: "March 12-15",
      bookingLink: "https://archerhotel.com/austin/book/an-and-paul-wedding",
      address: "3121 Palm Way, Austin, TX 78758",
      lat: 30.402376,
      lng: -97.721288,
      topChoice: false,
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
      features: ["Outdoor Pool", "Fitness Center", "Restaurant & Bar"],
      price: "$219/night",
      dates: "March 13-14",
      bookingLink:
        "https://book.passkey.com/event/51119783/owner/3061945/landing",
      address: "11301 Domain Drive, Austin, TX 78758",
      lat: 30.399765,
      lng: -97.725218,
      topChoice: false,
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
      features: ["Pool", "24/7 Gym", "Pet Friendly"],
      price: "$199/night",
      dates: "March 12-16",
      bookingLink:
        "https://www.marriott.com/event-reservations/reservation-link.mi?guestreslink2=true&id=1758031700433&key=GRP",
      address: "11601 Domain Dr, Austin, TX 78758",
      lat: 30.402025,
      lng: -97.726006,
      topChoice: false,
    },
  ];

  // Initialize Leaflet map
  useEffect(() => {
    // Dynamically load Leaflet CSS and JS
    const loadLeaflet = async () => {
      // Load CSS
      if (!document.getElementById("leaflet-css")) {
        const link = document.createElement("link");
        link.id = "leaflet-css";
        link.rel = "stylesheet";
        link.href =
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css";
        document.head.appendChild(link);
      }

      // Load JS
      if (!(window as any).L) {
        await new Promise((resolve) => {
          const script = document.createElement("script");
          script.src =
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js";
          script.onload = resolve;
          document.body.appendChild(script);
        });
      }

      // Initialize map
      if (mapRef.current && (window as any).L && !mapInstanceRef.current) {
        const L = (window as any).L;

        // Create map centered on The Domain
        const map = L.map(mapRef.current).setView([30.395, -97.72], 14);

        // Add OpenStreetMap tiles
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
          maxZoom: 19,
        }).addTo(map);

        // Custom icon for hotels
        const hotelIcon = L.divIcon({
          className: "custom-hotel-marker",
          html: `<div style="background-color: #2563eb; width: 32px; height: 32px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; font-size: 16px;">🏨</div>`,
          iconSize: [32, 32],
          iconAnchor: [16, 16],
          popupAnchor: [0, -16],
        });

        const topChoiceIcon = L.divIcon({
          className: "custom-hotel-marker",
          html: `<div style="background-color: #16a34a; width: 36px; height: 36px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; font-size: 18px;">⭐</div>`,
          iconSize: [36, 36],
          iconAnchor: [18, 18],
          popupAnchor: [0, -18],
        });

        // Add markers for each hotel
        hotels.forEach((hotel) => {
          const marker = L.marker([hotel.lat, hotel.lng], {
            icon: hotel.topChoice ? topChoiceIcon : hotelIcon,
          }).addTo(map);

          // Create popup content
          const popupContent = `
            <div style="min-width: 220px; font-family: system-ui, -apple-system, sans-serif;">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                <h3 style="margin: 0; font-size: 16px; font-weight: bold; color: #1f2937;">
                  ${hotel.name}
                </h3>
                ${hotel.topChoice ? '<span style="font-size: 18px;">⭐</span>' : ""}
              </div>
              <p style="margin: 4px 0; font-size: 14px; color: #6b7280;">
                ${hotel.address}
              </p>
              <div style="margin: 8px 0; padding: 8px; background: linear-gradient(to right, #eff6ff, #dbeafe); border-radius: 8px;">
                <div style="font-size: 20px; font-weight: bold; color: #2563eb;">
                  ${hotel.price}
                </div>
                <div style="font-size: 11px; color: #6b7280; margin-top: 2px;">
                  (before tax)
                </div>
                <div style="font-size: 12px; color: #6b7280; margin-top: 4px;">
                  ${hotel.dates}
                </div>
              </div>
              <div style="display: flex; gap: 8px; margin-top: 12px;">
                <a 
                  href="${hotel.bookingLink}" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style="flex: 1; padding: 10px; background: linear-gradient(to right, #2563eb, #1d4ed8); color: white; text-align: center; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px; transition: all 0.2s;"
                  onmouseover="this.style.background='linear-gradient(to right, #1d4ed8, #1e40af)'"
                  onmouseout="this.style.background='linear-gradient(to right, #2563eb, #1d4ed8)'"
                >
                  Book Now
                </a>
                <a 
                  href="https://www.google.com/maps/dir/?api=1&destination=${hotel.lat},${hotel.lng}" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style="flex: 1; padding: 10px; background: white; border: 2px solid #e5e7eb; color: #374151; text-align: center; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px; transition: all 0.2s;"
                  onmouseover="this.style.borderColor='#9ca3af'; this.style.background='#f9fafb'"
                  onmouseout="this.style.borderColor='#e5e7eb'; this.style.background='white'"
                >
                  Directions
                </a>
              </div>
            </div>
          `;

          marker.bindPopup(popupContent, {
            maxWidth: 300,
            className: "hotel-popup",
          });
        });

        mapInstanceRef.current = map;
      }
    };

    loadLeaflet();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Custom arrow components with better styling
  function SamplePrevArrow(props: any) {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white text-gray-800 hover:text-gray-900 p-3 rounded-full shadow-xl hover:shadow-2xl z-10 transition-all hover:scale-110"
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
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white text-gray-800 hover:text-gray-900 p-3 rounded-full shadow-xl hover:shadow-2xl z-10 transition-all hover:scale-110"
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

  // Inner carousel arrow components - large tap areas for mobile, subtle design
  function InnerPrevArrow(props: any) {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="absolute left-0 top-0 h-full w-1/4 z-20 flex items-center justify-start pl-3 transition-all group"
        aria-label="Previous image"
      >
        <svg
          className="w-8 h-8 text-white opacity-40 group-hover:opacity-80 drop-shadow-lg transition-all group-hover:scale-110"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
    );
  }

  function InnerNextArrow(props: any) {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="absolute right-0 top-0 h-full w-1/4 z-20 flex items-center justify-end pr-3 transition-all group"
        aria-label="Next image"
      >
        <svg
          className="w-8 h-8 text-white opacity-40 group-hover:opacity-80 drop-shadow-lg transition-all group-hover:scale-110"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
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
    swipe: true, // Re-enable swipe on outer carousel
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
        className={`h-3 rounded-full transition-all cursor-pointer ${
          i === activeHotel ? "bg-blue-600 w-12" : "bg-gray-400 w-3"
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
    arrows: true,
    prevArrow: <InnerPrevArrow />,
    nextArrow: <InnerNextArrow />,
    swipe: true, // Enable swipe on inner carousel
    swipeToSlide: true,
    touchThreshold: 10,
    autoplay: true,
    autoplaySpeed: 3000,
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
          margin-top: 20px;
        }
        .slick-thumb li {
          margin: 0 12px !important;
        }
        .slick-thumb li div {
          height: 12px !important;
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

        /* Leaflet popup styling */
        .leaflet-popup-content-wrapper {
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        .leaflet-popup-content {
          margin: 12px;
        }
        .leaflet-popup-tip {
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      `}</style>

      <div className="pt-6 sm:pt-10 md:pt-14 lg:pt-18">
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
                      We've secured four different hotel blocks special in The
                      Domain area, each with its own unique vibe. Book by{" "}
                      <strong>February 1, 2026</strong> to receive our special
                      group rates. Please reach out to us at{" "}
                      <a href="mailto:theledewhursts@gmail.com">
                        theledewhursts@gmail.com
                      </a>{" "}
                      if you have any questions.
                    </p>
                  </div>
                </div>
              </div>

              {/* Hotel Carousel */}
              <div className="lg:max-w-5xl lg:mx-auto mt-12 mb-16">
                <Slider {...outerSliderSettings}>
                  {hotels.map((hotel, index) => (
                    <div key={index} className="lg:px-2">
                      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        {/* Image Carousel */}
                        <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden bg-gray-100">
                          {/* Top Choice Badge */}
                          {hotel.topChoice && (
                            <div className="absolute top-4 left-4 z-20">
                              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                                <span className="text-lg">⭐</span>
                                <span>Best Value - Top Choice</span>
                              </div>
                            </div>
                          )}

                          <div
                            className="absolute inset-2 bg-white rounded-lg shadow-inner hotel-image-carousel"
                            onTouchStart={(e) => e.stopPropagation()}
                            onTouchMove={(e) => e.stopPropagation()}
                            onTouchEnd={(e) => e.stopPropagation()}
                            onMouseDown={(e) => e.stopPropagation()}
                          >
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
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <div>
                                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">
                                  {hotel.name}
                                </h2>
                                <p className="text-gray-600 italic">
                                  {hotel.tagline}
                                </p>
                              </div>
                              <div className="text-right flex-shrink-0">
                                <div className="text-3xl font-bold text-blue-600">
                                  {hotel.price}
                                </div>
                                <div className="text-xs text-gray-500">
                                  group rate (before tax)
                                </div>
                              </div>
                            </div>

                            {/* Availability Dates */}
                            <div className="flex items-center text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg inline-flex gap-2 mt-2">
                              <FaCalendarAlt className="text-blue-500" />
                              <span>
                                <strong>Available:</strong> {hotel.dates}
                              </span>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-gray-700 mb-4 leading-relaxed">
                            {hotel.description}
                          </p>

                          {/* Features */}
                          <div className="flex flex-wrap gap-2 mb-6">
                            {hotel.features.map((feature, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>

                          {/* Address */}
                          <p className="text-sm text-gray-500 mb-4">
                            {hotel.address}
                          </p>

                          {/* Action Button */}
                          <a
                            href={hotel.bookingLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-md"
                          >
                            <FaBed className="text-xl" />
                            <span className="font-semibold text-lg">
                              Book Your Stay
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>

                {/* Hotel Navigation Info */}
                <div className="text-center mt-8 text-sm text-gray-500">
                  Swipe, use arrows, or tap dots to browse all {hotels.length}{" "}
                  hotel options
                </div>
              </div>

              {/* Map Section */}
              <div className="max-w-6xl mx-auto px-4 mb-12">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-6 sm:p-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    Hotel Locations Map
                  </h2>

                  {/* Leaflet Map */}
                  <div
                    ref={mapRef}
                    className="relative w-full h-96 mb-6 rounded-lg overflow-hidden shadow-md"
                    style={{ zIndex: 1 }}
                  />

                  {/* Hotel Quick Links */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {hotels.map((hotel, index) => (
                      <a
                        key={index}
                        href={hotel.bookingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100 rounded-lg p-4 hover:border-blue-400 hover:shadow-lg transition-all transform hover:scale-105"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-bold text-gray-800 text-sm group-hover:text-blue-600 transition-colors">
                            {hotel.name}
                          </h3>
                          {hotel.topChoice && (
                            <span className="text-lg">⭐</span>
                          )}
                        </div>
                        <div className="text-2xl font-bold text-blue-600 mb-1">
                          {hotel.price}
                        </div>
                        <div className="text-xs text-gray-500 mb-3">
                          {hotel.dates} · before tax
                        </div>
                        <div className="flex items-center gap-2 text-blue-600 text-sm font-semibold">
                          <FaBed />
                          <span>Book Now</span>
                          <svg
                            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="max-w-3xl mx-auto px-4 mb-12 space-y-4">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">
                    🚌 Shuttle Service Information
                  </h3>
                  <p className="text-blue-800">Details to follow.</p>
                </div>

                <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-900 mb-2">
                    💰 Important Booking Information
                  </h3>
                  <p className="text-green-800 mb-3">
                    Please book by <strong>February 1, 2026</strong> to receive
                    our special group rates shown above. After this date, rooms
                    will be subject to availability and standard pricing.
                  </p>
                  <p className="text-green-700 text-sm">
                    Click "Book Your Stay" on any hotel above to access our
                    special group booking page.
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
