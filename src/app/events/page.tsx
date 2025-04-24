"use client";

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { Music, Coffee, Sun, Heart, MapPin } from "lucide-react";

const ICON_COLOR = "#fff";
const ICON_BG = "#4DA6FF";

const EVENTS = [
  {
    date: "Mar 11, 2026 8:00 PM",
    title: "Night Out",
    subtitle: "Downtown Austin",
    Icon: Music,
    link: "https://goo.gl/maps/…",
  },
  {
    date: "Mar 12, 2026 11:00 AM",
    title: "Brunch Gathering",
    subtitle: "Café Blue, The Domain",
    Icon: Coffee,
    link: "https://goo.gl/maps/…",
  },
  {
    date: "Mar 13, 2026 1:00 PM",
    title: "Picnic in the Park",
    subtitle: "Zilker Park, Austin",
    Icon: Sun,
    link: "https://goo.gl/maps/…",
  },
  {
    date: "Mar 14, 2026 5:30 PM",
    title: "Wedding Ceremony",
    subtitle: "Kindred Oaks, Georgetown, TX",
    Icon: Heart,
    link: "https://goo.gl/maps/…",
  },
];

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
            <VerticalTimeline lineColor="#DDD">
              {EVENTS.map((e, i) => (
                <VerticalTimelineElement
                  key={i}
                  date={e.date}
                  iconStyle={{
                    background: ICON_BG,
                    // auto‑size via padding rather than fixed width/height
                    padding: "0.75rem",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  icon={<e.Icon size={24} color={ICON_COLOR} />}
                  contentStyle={{ borderTop: `4px solid ${ICON_BG}` }}
                >
                  <h3 className="vertical-timeline-element-title text-xl font-semibold">
                    {e.title}
                  </h3>
                  <h4 className="vertical-timeline-element-subtitle text-gray-600">
                    {e.subtitle}
                  </h4>
                  <a
                    href={e.link}
                    target="_blank"
                    rel="noopener"
                    className="mt-2 inline-flex items-center text-blue-600 hover:underline font-medium"
                  >
                    <MapPin className="mr-1" size={16} />
                    Get directions
                  </a>
                </VerticalTimelineElement>
              ))}
            </VerticalTimeline>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="websiteDecoration websiteDecoration--bottom" />
      <div className="websites-footer-illustration" />
    </>
  );
}
