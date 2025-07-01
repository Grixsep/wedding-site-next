import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

// Use MUI icons or swap for others if needed
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RoomIcon from "@mui/icons-material/Room";
import Box from "@mui/material/Box";

const EVENTS = [
  {
    date: "Mar 8, 2026 11:00 AM",
    title: "Tea Ceremony",
    subtitle: "Location TBD",
    icon: <LocalCafeIcon sx={{ color: "#103930" }} />,
    link: "https://goo.gl/maps/...",
  },
  {
    date: "Mar 9, 2026 6:00 PM",
    title: "Welcome Party",
    subtitle: "Location TBD",
    icon: <MusicNoteIcon sx={{ color: "#103930" }} />,
    link: "https://goo.gl/maps/...",
  },
  {
    date: "Mar 11, 2026 2:00 PM",
    title: "Picnic in the Park",
    subtitle: "Zilker Park, Austin",
    icon: <WbSunnyIcon sx={{ color: "#103930" }} />,
    link: "https://goo.gl/maps/...",
  },
  {
    date: "Mar 14, 2026 5:30 PM",
    title: "Wedding Day",
    subtitle: "Kindred Oaks, Georgetown, TX",
    icon: <FavoriteIcon sx={{ color: "#103930" }} />,
    link: "https://goo.gl/maps/...",
  },
];

export default function CustomizedTimeline() {
  return (
    <Timeline position="alternate">
      <Box
        component="img"
        src="/images/events/vine3.png"
        alt="Vine connector"
        sx={{
          height: "60px",
          width: "auto",
          maxWidth: "100px", // limit if necessary
          align: "center",
          margin: "0 auto",
        }}
      />
      {EVENTS.map((event, index) => (
        <TimelineItem key={index}>
          <TimelineOppositeContent
            sx={{ m: "auto 0" }}
            align={index % 2 === 0 ? "right" : "left"}
            variant="body2"
            color="text.secondary"
          >
            {event.date}
          </TimelineOppositeContent>
          <TimelineSeparator>
            {/* Top vine */}
            <Box
              component="img"
              src="/images/events/vine4.png"
              alt="Vine connector"
              sx={{
                height: "60px",
                width: "auto",
                maxWidth: "100px", // limit if necessary
              }}
            />

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 48,
                height: 48,
                backgroundColor: "#fff",
              }}
            >
              {React.cloneElement(event.icon, {
                fontSize: "medium",
                sx: { fontSize: 36 },
              })}
            </Box>

            {/* Bottom vine */}
            <Box
              component="img"
              src="/images/events/vine3.png"
              alt="Vine connector"
              sx={{
                height: "60px",
                width: "auto",
                maxWidth: "100px", // limit if necessary
              }}
            />
          </TimelineSeparator>
          <TimelineContent
            sx={{
              py: { xs: "5px", sm: "35px" }, // xs = mobile, sm and up = default
              px: 2,
            }}
          >
            <Typography variant="h5" component="span">
              {event.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {event.subtitle}
            </Typography>
            <Link
              href={event.link}
              target="_blank"
              rel="noopener"
              underline="hover"
              sx={{ display: "inline-flex", alignItems: "center", mt: 1 }}
            >
              <RoomIcon sx={{ fontSize: 18, mr: 0.5 }} />
              Get directions
            </Link>
          </TimelineContent>
        </TimelineItem>
      ))}
      <Box
        component="img"
        src="/images/events/vine4.png"
        alt="Vine connector"
        sx={{
          height: "60px",
          width: "auto",
          maxWidth: "100px", // limit if necessary
          align: "center",
          margin: "0 auto",
        }}
      />
    </Timeline>
  );
}
