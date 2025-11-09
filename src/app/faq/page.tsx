"use client";
import { useState } from "react";

export default function FAQ() {
  const [expandedSections, setExpandedSections] = useState<number[]>([]);

  const toggleSection = (index: number) => {
    setExpandedSections((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const faqs = [
    {
      category: "RSVP & Registration",
      questions: [
        {
          q: "How do I RSVP?",
          a: "Visit our RSVP page and search for your name using the form. You must enter both your first and last name. You'll be guided through a simple process to confirm your attendance, select your meal preferences, and provide any dietary restrictions. If you have any trouble finding your name, please email us at theledewhursts@gmail.com.",
        },
        {
          q: "When is the RSVP deadline?",
          a: "Please RSVP by January 14th, 2025. This helps us finalize catering numbers and seating arrangements. If you miss the deadline, please contact us directly as soon as possible.",
        },
        {
          q: "Can I bring a plus-one?",
          a: "Plus-ones are by invitation only. When you search for your name in the RSVP system, it will indicate if you've been allocated a plus-one. If you have questions about your invitation, please reach out to us.",
        },
        {
          q: "Can I change my RSVP after submitting?",
          a: "Yes! Simply search for your name again on the RSVP page and resubmit with your updated information. The system will record your latest response. If you need to change your RSVP after January 14th, please reach out to us directly.",
        },
      ],
    },
    {
      category: "Wedding Day Details",
      questions: [
        {
          q: "What time should I arrive?",
          a: "Please arrive 30 minutes before the ceremony begins. This gives you time to grab a refreshment, locate your seat, and settle in before the ceremony starts.",
        },
        {
          q: "What is the dress code?",
          a: "The dress code is formal attire. Please avoid wearing white or cream colors, as those are reserved for the bride.",
        },
        {
          q: "Will the ceremony and reception be at the same location?",
          a: "Yes, both the ceremony and reception will take place at the same venue, Kindred Oaks, so you won't need to travel between locations.",
        },
        {
          q: "Is the venue wheelchair accessible?",
          a: "Yes, the venue is fully wheelchair accessible. If you have specific accessibility needs, please let us know by emailing us directly so we can ensure you're comfortable.",
        },
        {
          q: "Is the wedding indoors or outdoors?",
          a: "The ceremony will be held outdoors (weather permitting), with an indoor backup option. The reception will be indoors.",
        },
        {
          q: "What time will the reception end?",
          a: "The reception is scheduled to end at 10:30pm. We'll have a grand send-off at the end of the evening!",
        },
      ],
    },
    {
      category: "Travel & Accommodations",
      questions: [
        {
          q: "Where should I stay?",
          a: "We recommend staying in the Domain area for easy access to our shuttle service. It's a lively neighborhood with great restaurants, shops, and nightlife. We have reserved hotel blocks for our guests. Please visit our Accommodations page for booking links and details. If you have any questions, feel free to reach out to us directly.",
        },
        {
          q: "Is transportation provided?",
          a: "Yes, we're providing shuttle service between the Domain area and the venue. When you RSVP, you can indicate if you'd like to use the shuttle. The shuttle will run before and after the wedding, and we'll share the exact schedule and pick-up details closer to the date.",
        },
        {
          q: "Where should I park?",
          a: "Free parking is available at the venue for those driving their own vehicles.",
        },
        {
          q: "What airport should I fly into?",
          a: "Austin-Bergstrom International Airport (AUS) is the closest airport to the venue.",
        },
      ],
    },
    {
      category: "Menu & Dietary Requirements",
      questions: [
        {
          q: "What meal options are available?",
          a: "We're offering three main course options: Wagyu Sirloin with Chimichurri, Chicken Breast with Lemon Caper Sauce, and Portobello & Quinoa (vegetarian/vegan). You'll select your preference when you RSVP. Visit our Menu page to see the complete menu and photos from our tasting.",
        },
        {
          q: "I have dietary restrictions. What should I do?",
          a: "Please indicate any dietary restrictions or allergies when you RSVP. Our catering team will work to accommodate your needs. If you have severe allergies or specific requirements, feel free to email us directly for confirmation.",
        },
        {
          q: "Will there be an open bar?",
          a: "Yes, we'll have an open bar featuring beer, wine, and select cocktails throughout the reception.",
        },
      ],
    },
    {
      category: "Children & Family",
      questions: [
        {
          q: "Are children welcome?",
          a: "Children are welcome if they are included on your invitation. If you have questions about your invitation, please reach out to us directly.",
        },
      ],
    },
    {
      category: "Gifts & Registry",
      questions: [
        {
          q: "Do you have a registry?",
          a: "We don't have a traditional registry. Your presence is the best present. If you wish to give a gift, we would be honored to receive contributions towards our future together. A card box will be available for your convenience.",
        },
      ],
    },
    {
      category: "Photography, Videography, & Social Media",
      questions: [
        {
          q: "Will there be photographers and videographers?",
          a: "Yes, we have hired a professional photography and videography team for the wedding day.",
        },
        {
          q: "Will this be an unplugged ceremony?",
          a: "Yes, we're having an unplugged ceremony. We kindly ask guests to put away phones and cameras during the ceremony itself. Our professional photographers and videographers are there to capture every moment beautifully, and we'll share those with you afterward. Please be present with us and enjoy the moment!",
        },
        {
          q: "Can I take photos and videos during the reception?",
          a: "Absolutely! Please feel free to capture any moments you'd like during the reception and be sure to share your favorites with us.",
        },
        {
          q: "How do we share photos and videos with you?",
          a: "We would love to see your snaps of the day! If you share on social media, please use the hashtag #LeDewhurstWedding. You can also send any favorites to us directly by email.",
        },
        {
          q: "How will you share photos and videos with guests?",
          a: "We will upload photos and videos to our wedding website so everyone can view and download their favorites. We expect to receive the full gallery within two months of the wedding.",
        },
      ],
    },
    {
      category: "Wedding Week Events",
      questions: [
        {
          q: "Tea Ceremony",
          a: "What: The tea ceremony is a traditional Vietnamese wedding custom where we serve tea to our parents and elders as a sign of respect and gratitude. A professional photographer will be present. All wedding guests are invited.\n\nWhen: Sunday, March 8th at 11:00 AM\n\nWhere: Location TBD\n\nAttire: Smart casual.",
        },
        {
          q: "Welcome Party",
          a: "What: A relaxed gathering to meet other guests and kick off the celebrations. All wedding guests are invited.\n\nWhen: Thursday, March 12th at 6:00 PM\n\nWhere: Location TBD\n\nAttire: Dressy casual.",
        },
        {
          q: "Farewell Party",
          a: "What: A casual get-together to say goodbye and wrap up the weekend before everyone heads home. All wedding guests are invited.\n\nWhen: Sunday, March 15th at 3:00 PM\n\nWhere: Location TBD\n\nAttire: Comfy casual.",
        },
        {
          q: "Do I need to RSVP separately for these events?",
          a: "When you complete your wedding RSVP, you'll have the option to indicate which additional events you'll be attending. If you need to change your RSVP after January 14th, please reach out to us directly.",
        },
      ],
    },
  ];

  return (
    <>
      <style>{`
        .websiteDecoration--internal {
          background-image: url("/images/wedding/floral1.png");
        }
        .websiteDecoration--bottom {
          background-image: url("/images/wedding/floral2.png");
        }
        .botanical-divider {
          width: 100%;
          max-width: 200px;
          margin: 2.5rem auto;
          opacity: 0.7;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>

      <div className="pt-6 sm:pt-10 md:pt-14 lg:pt-18">
        {/* Spinner */}
        <div className="app-spinner-container websiteSpinner" />

        {/* Internal background image */}
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
                    FAQ
                  </h1>
                  <div
                    className="
    websiteFont__hero websiteLinkChilds websiteLinkChilds--underline
    w-full mx-auto px-4
    max-w-[52ch] sm:max-w-[60ch] lg:max-w-[68ch]
    [text-wrap:balance]
  "
                  >
                    <p>
                      Everything you need to know about our wedding celebration.
                      Can't find what you're looking for? Feel free to reach out
                      to us at theledewhursts@gmail.com!
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ Content */}
              <div className="websiteContainerSection mt30">
                {faqs.map((section, idx) => (
                  <div key={idx} className="mb-8">
                    {/* Collapsible Header */}
                    <button
                      onClick={() => toggleSection(idx)}
                      className="w-full text-left transition-all hover:opacity-80 focus:outline-none"
                    >
                      <div className="flex items-center justify-between bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                        <h2 className="text-2xl font-serif font-semibold text-gray-900">
                          {section.category}
                        </h2>
                        <svg
                          className={`w-6 h-6 text-gray-600 transition-transform duration-300 ${
                            expandedSections.includes(idx) ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </button>

                    {/* Expandable Content */}
                    {expandedSections.includes(idx) && (
                      <div className="mt-4 animate-fadeIn">
                        <div className="space-y-6">
                          {section.questions.map((faq, qIdx) => (
                            <div
                              key={qIdx}
                              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                            >
                              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                {faq.q}
                              </h3>
                              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                {faq.a}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Contact CTA */}
              <div className="websiteContainerSection mt30 mb-12">
                <div className="bg-green-50 rounded-lg p-8 text-center border border-green-100">
                  <h2 className="text-2xl font-serif font-semibold text-gray-900 mb-4">
                    Still Have Questions?
                  </h2>
                  <p className="text-gray-600 mb-6">
                    We're here to help! Don't hesitate to reach out to us
                    directly at theledewhursts@gmail.com.
                  </p>
                  <a
                    href="mailto:theledewhursts@gmail.com"
                    className="inline-block px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom background decoration */}
        <div className="websiteDecoration websiteDecoration--bottom" />
      </div>
    </>
  );
}
