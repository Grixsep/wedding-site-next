export default function FAQ() {
  const faqs = [
    {
      category: "RSVP & Registration",
      questions: [
        {
          q: "How do I RSVP?",
          a: "Visit our RSVP page and search for your name using the form. You'll be guided through a simple process to confirm your attendance, select your meal preferences, and provide any dietary restrictions. If you have any trouble finding your name, please email us at theledewhursts@gmail.com.",
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
          a: "Yes! Simply search for your name again on the RSVP page and resubmit with your updated information. The system will record your latest response.",
        },
      ],
    },
    {
      category: "Wedding Day Details",
      questions: [
        {
          q: "What time should I arrive?",
          a: "Please arrive at least 30 minutes before the ceremony begins. This gives you time to find parking, locate your seat, and settle in before the ceremony starts.",
        },
        {
          q: "What is the dress code?",
          a: "The dress code is formal attire. We want you to feel comfortable and look your best. Please avoid wearing white or cream colors, as those are reserved for the bride.",
        },
        {
          q: "Will the ceremony and reception be at the same location?",
          a: "Yes, both the ceremony and reception will take place at the same venue, so you won't need to travel between locations.",
        },
        {
          q: "Is the wedding indoors or outdoors?",
          a: "The ceremony will be held outdoors (weather permitting), with an indoor backup option. The reception will be indoors.",
        },
        {
          q: "What time will the reception end?",
          a: "The reception is scheduled to end at 11:00 PM. We'll have a grand send-off at the end of the evening!",
        },
      ],
    },
    {
      category: "Additional Events",
      questions: [
        {
          q: "What is the Tea Ceremony?",
          a: "The tea ceremony is a traditional Vietnamese wedding custom where the couple serves tea to their elders as a sign of respect and receives blessings for their marriage. It's a beautiful, intimate family moment that we'd love to share with all our guests. This will take place on Sunday morning and all invited guests are welcome to attend.",
        },
        {
          q: "When is the Welcome Party?",
          a: "The Welcome Party is a casual gathering on Thursday evening before the wedding. It's a great opportunity to meet other guests and kick off the celebration in a relaxed setting. All invited guests are welcome to attend.",
        },
        {
          q: "What is the Farewell Party?",
          a: "The Farewell Party is our final gathering on Sunday afternoon. It's a casual get-together to say goodbye and recap the weekend's festivities before everyone heads home. All invited guests are welcome to attend.",
        },
        {
          q: "Do I need to RSVP separately for these events?",
          a: "No! When you complete your wedding RSVP, you'll have the option to indicate which additional events you'll be attending.",
        },
        {
          q: "Are all guests invited to the additional events?",
          a: "Yes! All wedding guests are welcome to attend any or all of the additional events—the Tea Ceremony, Welcome Party, and Farewell Party. Simply indicate your attendance when you RSVP.",
        },
      ],
    },
    {
      category: "Travel & Accommodations",
      questions: [
        {
          q: "Where should I stay?",
          a: "We recommend staying in The Domain area for easy access to the venue and shuttle service. Visit our Accommodation page for hotel recommendations and booking information.",
        },
        {
          q: "Is transportation provided?",
          a: "Yes! We're providing shuttle service between The Domain area and the venue. When you RSVP, you can indicate if you need transportation. The shuttle will run before and after the wedding.",
        },
        {
          q: "Where should I park?",
          a: "Free parking is available at the venue. If you're taking the shuttle, you can park at your hotel in The Domain area.",
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
          a: "We're offering three main course options: Wagyu Sirloin with Chimichurri, Chicken Breast with Lemon Caper Sauce, and Portobello & Quinoa (vegetarian/vegan). You'll select your preference when you RSVP. Visit our Menu page to see the complete dinner menu.",
        },
        {
          q: "I have dietary restrictions. What should I do?",
          a: "Please indicate any dietary restrictions or allergies when you RSVP. Our catering team will work to accommodate your needs. If you have severe allergies or specific requirements, feel free to email us directly for confirmation.",
        },
        {
          q: "Will there be vegetarian/vegan options?",
          a: "Yes! Our Portobello & Quinoa main course is both vegetarian and vegan. Please note your dietary preferences in the RSVP form, and we'll ensure your meal is prepared to meet your needs.",
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
          a: "Children are welcome if they are included on your invitation. If your invitation includes your children, they are more than welcome to attend! If there's been a mistake or you have questions about your invitation, please email us at theledewhursts@gmail.com.",
        },
        {
          q: "Can I bring my infant?",
          a: "Infants are welcome if they are included on your invitation. If your invitation includes your infant, we'd love to have them there! If there's been a mistake or you have questions about your invitation, please email us at theledewhursts@gmail.com.",
        },
      ],
    },
    {
      category: "Gifts & Registry",
      questions: [
        {
          q: "Do you have a registry?",
          a: "We don't have a traditional registry. Your presence at our wedding is the greatest gift we could ask for!",
        },
        {
          q: "Do you prefer cash gifts?",
          a: "If you'd like to give a gift, we would be honored to receive monetary contributions. There will be a card box at the reception for your convenience.",
        },
      ],
    },
    {
      category: "Photography & Social Media",
      questions: [
        {
          q: "Will there be a photographer?",
          a: "Yes, we've hired professional photographers to capture the day. They'll be documenting every special moment throughout the celebration.",
        },
        {
          q: "Can I take photos?",
          a: "Absolutely! We'd love for you to take photos during the reception and share them with us. We'll provide a hashtag for you to use when posting to social media.",
        },
        {
          q: "What is the wedding hashtag?",
          a: "#LeDewhursts – Please use this when sharing photos on social media so we can see all your wonderful captures!",
        },
        {
          q: "Will there be an unplugged ceremony?",
          a: "Yes, we're having an unplugged ceremony. We kindly ask guests to put away phones and cameras during the ceremony itself—our professional photographers will capture every moment beautifully, and we'll share those photos with you afterward. Please be present with us and enjoy the moment!",
        },
      ],
    },
    {
      category: "Weather & Contingencies",
      questions: [
        {
          q: "What happens if it rains?",
          a: "We have a beautiful indoor backup space at the venue in case of inclement weather. We'll monitor the forecast closely and make a decision the morning of the wedding.",
        },
        {
          q: "What should I bring?",
          a: "Just yourself and a great attitude! The venue is climate-controlled for the reception. If you're concerned about the outdoor ceremony, you might bring a light wrap or jacket for comfort.",
        },
      ],
    },
    {
      category: "Contact & Questions",
      questions: [
        {
          q: "I have a question that isn't answered here. Who should I contact?",
          a: "Please email us at theledewhursts@gmail.com and we'll get back to you as soon as possible. We're happy to help with any questions or special requests!",
        },
        {
          q: "Is the venue wheelchair accessible?",
          a: "Yes, the venue is fully wheelchair accessible. If you have specific accessibility needs, please let us know in your RSVP or email us so we can ensure you're comfortable.",
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
                      Can't find what you're looking for? Feel free to reach
                      out!
                    </p>
                  </div>
                </div>
              </div>
              <hr className="hrSection" />

              {/* FAQ Content */}
              <div className="websiteContainerSection mt30">
                {faqs.map((section, idx) => (
                  <div key={idx} className="mb-12">
                    <h2 className="text-2xl font-serif font-semibold text-gray-900 mb-6 pb-2 border-b-2 border-blue-300">
                      {section.category}
                    </h2>
                    <div className="space-y-6">
                      {section.questions.map((faq, qIdx) => (
                        <div
                          key={qIdx}
                          className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                        >
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            {faq.q}
                          </h3>
                          <p className="text-gray-700 leading-relaxed">
                            {faq.a}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact CTA */}
              <div className="websiteContainerSection mt30 mb-12">
                <div className="bg-blue-50 rounded-lg p-8 text-center border border-blue-100">
                  <h2 className="text-2xl font-serif font-semibold text-gray-900 mb-4">
                    Still Have Questions?
                  </h2>
                  <p className="text-gray-600 mb-6">
                    We're here to help! Don't hesitate to reach out.
                  </p>
                  <a
                    href="mailto:theledewhursts@gmail.com"
                    className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
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
