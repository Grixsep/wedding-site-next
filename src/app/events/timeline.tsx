import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineDot from "@mui/lab/TimelineDot";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

// Icons
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
//import WbSunnyIcon from "@mui/icons-material/WbSunny";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RoomIcon from "@mui/icons-material/Room";
import Celebration from "@mui/icons-material/Celebration";

const EVENTS = [
  {
    date: "Mar 8, 2026 10:00 AM",
    title: "Tea Ceremony",
    subtitle: "Location TBD",
    icon: <LocalCafeIcon />,
    link: "https://goo.gl/maps/...",
    iconBg: "#fff9c4",
    iconColor: "#f57f17",
  },
  {
    date: "Mar 11, 2026 6:00 PM",
    title: "Welcome Party",
    subtitle: "Location TBD",
    icon: <MusicNoteIcon />,
    link: "https://goo.gl/maps/...",
    iconBg: "#e1dbebff",
    iconColor: "#4b0082",
  },
  {
    date: "Mar 14, 2026 5:30 PM",
    title: "Wedding Day",
    subtitle: "Kindred Oaks, Georgetown, TX",
    icon: <FavoriteIcon />,
    link: "https://maps.app.goo.gl/wqhod8mYzmuvobVT6",
    iconBg: "#fce4ec",
    iconColor: "#e91e63",
  },
  {
    date: "Mar 15, 2026 2:00 PM",
    title: "Farewell Party",
    subtitle: "Location TBD",
    icon: <Celebration />,
    link: "https://goo.gl/maps/...",
    iconBg: "#afd5f0",
    iconColor: "#0041c2",
  },
];

// Custom vine connector with elegant SVG pattern including rose
const VineConnector = () => {
  // Create a beautiful SVG pattern with rose and leaves matching your image
  const svgPattern = `data:image/svg+xml,%3Csvg width='70' height='150' viewBox='0 0 70 150' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='goldGrad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23d4af37;stop-opacity:1'/%3E%3Cstop offset='50%25' style='stop-color:%23f4e5b7;stop-opacity:1'/%3E%3Cstop offset='100%25' style='stop-color:%23d4af37;stop-opacity:1'/%3E%3C/linearGradient%3E%3ClinearGradient id='leafGrad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%235a8c69;stop-opacity:1'/%3E%3Cstop offset='100%25' style='stop-color:%234a7c59;stop-opacity:1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d='M 35 0 Q 40 25, 35 50 Q 30 75, 35 100 Q 40 125, 35 150' stroke='%234a7c59' stroke-width='3.5' fill='none'/%3E%3Cpath d='M 35 0 Q 30 20, 37 40 Q 33 60, 38 80 Q 32 100, 37 120 Q 33 135, 35 150' stroke='%235a8c69' stroke-width='2.5' fill='none' opacity='0.6'/%3E%3Cg transform='translate(35, 60)'%3E%3Cg transform='rotate(-10)'%3E%3Ccircle cx='0' cy='0' r='2' fill='url(%23goldGrad)' opacity='0.3'/%3E%3Cpath d='M 0,0 Q -8,-8 -8,-12 Q -6,-15 0,-15 Q 6,-15 8,-12 Q 8,-8 0,0' fill='url(%23goldGrad)' opacity='0.9'/%3E%3Cpath d='M 0,-3 Q -6,-9 -6,-11 Q -4,-13 0,-13 Q 4,-13 6,-11 Q 6,-9 0,-3' fill='url(%23goldGrad)'/%3E%3Cpath d='M 0,-6 Q -3,-9 -3,-10 Q -2,-11 0,-11 Q 2,-11 3,-10 Q 3,-9 0,-6' fill='%23f4e5b7'/%3E%3Cpath d='M -2,-12 Q -1,-14 0,-14 Q 1,-14 2,-12' stroke='%23d4af37' stroke-width='0.5' fill='none'/%3E%3Cpath d='M -4,-10 Q -2,-12 0,-12 Q 2,-12 4,-10' stroke='%23d4af37' stroke-width='0.3' fill='none'/%3E%3C/g%3E%3C/g%3E%3Cg transform='translate(43, 30) rotate(30)'%3E%3Cellipse cx='0' cy='0' rx='9' ry='16' fill='url(%23leafGrad)'/%3E%3Cpath d='M 0,-16 L 0,16' stroke='%233a6c49' stroke-width='1'/%3E%3Cpath d='M 0,0 L -4,-8' stroke='%233a6c49' stroke-width='0.5'/%3E%3Cpath d='M 0,0 L 4,-8' stroke='%233a6c49' stroke-width='0.5'/%3E%3C/g%3E%3Cg transform='translate(25, 85) rotate(-35)'%3E%3Cellipse cx='0' cy='0' rx='8' ry='14' fill='url(%23leafGrad)'/%3E%3Cpath d='M 0,-14 L 0,14' stroke='%233a6c49' stroke-width='1'/%3E%3Cpath d='M 0,0 L -3,-7' stroke='%233a6c49' stroke-width='0.5'/%3E%3Cpath d='M 0,0 L 3,-7' stroke='%233a6c49' stroke-width='0.5'/%3E%3C/g%3E%3Cg transform='translate(44, 115) rotate(40)'%3E%3Cellipse cx='0' cy='0' rx='7' ry='13' fill='url(%23leafGrad)'/%3E%3Cpath d='M 0,-13 L 0,13' stroke='%233a6c49' stroke-width='1'/%3E%3C/g%3E%3Cg transform='translate(26, 140) rotate(-25)'%3E%3Cellipse cx='0' cy='0' rx='6' ry='11' fill='url(%23leafGrad)' opacity='0.8'/%3E%3Cpath d='M 0,-11 L 0,11' stroke='%233a6c49' stroke-width='0.8'/%3E%3C/g%3E%3Cpath d='M 35,20 Q 45,17 47,23' stroke='%236a9c79' stroke-width='1.5' fill='none' opacity='0.4'/%3E%3Cpath d='M 35,45 Q 25,42 23,48' stroke='%236a9c79' stroke-width='1.5' fill='none' opacity='0.4'/%3E%3Cpath d='M 35,95 Q 45,92 47,98' stroke='%216a9c79' stroke-width='1.5' fill='none' opacity='0.4'/%3E%3Cpath d='M 35,120 Q 25,117 23,123' stroke='%216a9c79' stroke-width='1.5' fill='none' opacity='0.4'/%3E%3C/svg%3E`;

  return (
    <TimelineConnector
      sx={{
        position: "relative",
        width: "2px",
        backgroundColor: "transparent",
        border: "none",
        flex: "1 1 auto",
        // Ensure minimum height for 2 complete pattern repetitions (150px * 2)
        minHeight: "150px",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "70px",
          height: "100%",
          backgroundImage: `url("${svgPattern}")`,
          backgroundRepeat: "repeat-y",
          backgroundSize: "70px 150px", // Pattern height is 150px
          backgroundPosition: "center top",
        },
        "@media (max-width: 600px)": {
          // Ensure minimum height for at least 2 pattern repetitions on mobile
          minHeight: "120px", // 120px * 2
          "&::before": {
            width: "50px",
            backgroundSize: "50px 120px", // Proportionally smaller
          },
        },
      }}
    />
  );
};

export default function CustomizedTimeline() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: { xs: "0 10px", sm: "0 20px" },
      }}
    >
      <Timeline
        position={isMobile ? "right" : "alternate"}
        sx={{
          padding: 0,
          // Add margin shift for mobile to move the entire timeline vine
          marginLeft: { xs: "80px", sm: "0" },
          "& .MuiTimelineItem-root": {
            minHeight: "auto",
            "&:before": {
              flex: isMobile ? 0 : 1,
              padding: isMobile ? 0 : "6px 16px",
              display: isMobile ? "none" : "block",
            },
          },
          // Remove default connectors' backgrounds
          "& .MuiTimelineConnector-root": {
            backgroundColor: "transparent",
          },
        }}
      >
        {EVENTS.map((event, index) => (
          <TimelineItem
            key={index}
            sx={{
              // Ensure minimum spacing between items
              minHeight: { xs: "180px", sm: "220px", md: "250px" },
            }}
          >
            {!isMobile && (
              <TimelineOppositeContent
                sx={{
                  m: "auto 0",
                  paddingRight: "16px",
                  paddingLeft: "16px",
                  paddingTop: "30px",
                  paddingBottom: "30px",
                }}
                align={index % 2 === 0 ? "right" : "left"}
                variant="body2"
                color="text.secondary"
              >
                <Typography
                  variant="body1"
                  component="div"
                  sx={{
                    fontWeight: 500,
                    color: "#666",
                    marginBottom: "4px",
                  }}
                >
                  {event.date.split(" ").slice(0, 3).join(" ")}
                </Typography>
                <Typography
                  variant="body2"
                  component="div"
                  sx={{
                    color: "#999",
                  }}
                >
                  {event.date.split(" ").slice(3).join(" ")}
                </Typography>
              </TimelineOppositeContent>
            )}

            <TimelineSeparator>
              <VineConnector />

              <TimelineDot
                sx={{
                  backgroundColor: event.iconBg,
                  padding: { xs: "10px", sm: "12px" },
                  margin: 0,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  border: "2px solid white",
                  zIndex: 1,
                  "& svg": {
                    fontSize: { xs: "1.3rem", sm: "1.6rem" },
                    color: event.iconColor,
                  },
                }}
              >
                {event.icon}
              </TimelineDot>

              <VineConnector />
            </TimelineSeparator>

            <TimelineContent
              sx={{
                // Add the same vertical centering as TimelineOppositeContent
                m: "auto 0",
                paddingTop: { xs: "16px", sm: "20px" },
                paddingBottom: { xs: "16px", sm: "20px" },
                paddingLeft: { xs: "20px", sm: "16px" }, // Reduced since timeline is shifted
                paddingRight: { xs: "8px", sm: "16px" },
              }}
            >
              <Typography
                variant="h6"
                component="h3"
                sx={{
                  fontSize: { xs: "1.1rem", sm: "1.4rem" },
                  fontWeight: 600,
                  color: "#103930",
                  marginBottom: "6px",
                  fontFamily: "Bodoni, serif",
                }}
              >
                {event.title}
              </Typography>

              {isMobile && (
                <Typography
                  variant="caption"
                  component="div"
                  sx={{
                    color: "#999",
                    marginBottom: "8px",
                    fontSize: "0.8rem",
                  }}
                >
                  {event.date}
                </Typography>
              )}

              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                  marginBottom: "10px",
                }}
              >
                {event.subtitle}
              </Typography>

              <Link
                href={event.link}
                target="_blank"
                rel="noopener"
                underline="hover"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  fontSize: { xs: "0.85rem", sm: "0.9rem" },
                  color: "#103930",
                  fontWeight: 500,
                  "&:hover": {
                    color: "#1e5940",
                  },
                }}
              >
                <RoomIcon sx={{ fontSize: { xs: 16, sm: 18 }, mr: 0.5 }} />
                Get directions
              </Link>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  );
}
