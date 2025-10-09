"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";

// Get the event type from the timeline module (type-only import avoids bundling)
import type { EventItem } from "./timeline";

type Props = {
  events: EventItem[];
  defaultDurationHours?: number; // fallback if no explicit end provided
};

// --- Helpers ---
const MONTHS: Record<string, string> = {
  Jan: "01",
  Feb: "02",
  Mar: "03",
  Apr: "04",
  May: "05",
  Jun: "06",
  Jul: "07",
  Aug: "08",
  Sep: "09",
  Oct: "10",
  Nov: "11",
  Dec: "12",
};

// Support an optional end time by adding `end?: "Mar 14, 2026 11:30 PM"` on an event
function parseDateLike(dateStr: string) {
  // Input format assumed like "Mar 8, 2026 10:00 AM"
  const parts = dateStr.replace(",", "").split(/\s+/); // ["Mar","8","2026","10:00","AM"]
  const [mon, day, year, time, ampm] = parts;
  const [hhStr, mmStr] = (time || "00:00").split(":");
  let hh = parseInt(hhStr, 10);
  const mm = parseInt(mmStr, 10);

  const isPM = (ampm || "").toUpperCase() === "PM";
  if (isPM && hh !== 12) hh += 12;
  if (!isPM && hh === 12) hh = 0;

  return {
    year,
    month: MONTHS[mon],
    day: day.padStart(2, "0"),
    hh: String(isNaN(hh) ? 0 : hh).padStart(2, "0"),
    mm: String(isNaN(mm) ? 0 : mm).padStart(2, "0"),
  };
}

function addHours(
  y: string,
  m: string,
  d: string,
  hh: string,
  mm: string,
  hours: number,
) {
  const dt = new Date(`${y}-${m}-${d}T${hh}:${mm}:00`);
  dt.setHours(dt.getHours() + hours);
  const yy = String(dt.getFullYear());
  const mo = String(dt.getMonth() + 1).padStart(2, "0");
  const dd = String(dt.getDate()).padStart(2, "0");
  const H = String(dt.getHours()).padStart(2, "0");
  const M = String(dt.getMinutes()).padStart(2, "0");
  return { year: yy, month: mo, day: dd, hh: H, mm: M };
}

function googleCalUrl(e: EventItem, defaultDurationHours: number) {
  const { year, month, day, hh, mm } = parseDateLike(e.date as string);

  let end: { year: string; month: string; day: string; hh: string; mm: string };
  // @ts-ignore allow optional end field if you decide to add it
  if (e.end) {
    // @ts-ignore
    const p = parseDateLike(e.end);
    end = p;
  } else {
    end = addHours(year, month, day, hh, mm, defaultDurationHours);
  }

  const start = `${year}${month}${day}T${hh}${mm}00`;
  const endStr = `${end.year}${end.month}${end.day}T${end.hh}${end.mm}00`;

  const base = "https://calendar.google.com/calendar/render?action=TEMPLATE";
  const params = new URLSearchParams({
    text: e.title,
    dates: `${start}/${endStr}`,
    details: "See our full schedule on paacs.pro ✨",
    location: e.subtitle || "",
    ctz: "America/Chicago",
  });
  return `${base}&${params.toString()}`;
}

function escapeText(s: string) {
  return s.replace(/([,;])/g, "\\$1").replace(/\n/g, "\\n");
}

function buildIcs(events: EventItem[], defaultDurationHours: number) {
  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Paul & Fiancée Wedding//Events//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
  ];

  for (const e of events) {
    const { year, month, day, hh, mm } = parseDateLike(e.date as string);

    // @ts-ignore optional end
    const endParsed = e.end
      ? parseDateLike(e.end as string)
      : addHours(year, month, day, hh, mm, defaultDurationHours);

    const startLocal = `${year}${month}${day}T${hh}${mm}00`;
    const endLocal = `${endParsed.year}${endParsed.month}${endParsed.day}T${endParsed.hh}${endParsed.mm}00`;

    lines.push(
      "BEGIN:VEVENT",
      `UID:${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`,
      `SUMMARY:${escapeText(e.title)}`,
      `DTSTART;TZID=America/Chicago:${startLocal}`,
      `DTEND;TZID=America/Chicago:${endLocal}`,
      `DESCRIPTION:${escapeText("See our full schedule on paacs.pro ✨")}`,
      e.subtitle ? `LOCATION:${escapeText(e.subtitle)}` : "",
      "END:VEVENT",
    );
  }

  lines.push("END:VCALENDAR");
  return lines.filter(Boolean).join("\r\n");
}

function downloadIcs(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

// --- Component ---
export default function CalendarActions({
  events,
  defaultDurationHours = 2,
}: Props) {
  const handleSingleIcs = (e: EventItem) => {
    const ics = buildIcs([e], defaultDurationHours);
    downloadIcs(`${e.title.replace(/\s+/g, "_")}.ics`, ics);
  };

  const handleAllIcs = () => {
    const ics = buildIcs(events, defaultDurationHours);
    downloadIcs("wedding-events.ics", ics);
  };

  return (
    <Box sx={{ mt: 6, mb: 2 }}>
      <Typography
        variant="h5"
        sx={{ fontFamily: "Bodoni, serif", color: "#103930", mb: 2 }}
      >
        Add to your calendar
      </Typography>

      <Stack spacing={2}>
        {events.map((e, i) => (
          <Box
            key={i}
            sx={{
              borderRadius: 2,
              border: "1px solid rgba(0,0,0,0.08)",
              p: 2,
              background: "rgba(255,255,255,0.7)",
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "flex-start", sm: "center" },
              gap: 1.5,
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography sx={{ fontWeight: 600 }}>{e.title}</Typography>
              <Typography variant="body2" sx={{ color: "#666" }}>
                {e.date}
              </Typography>
              {e.subtitle && (
                <Typography variant="body2" sx={{ color: "#666" }}>
                  {e.subtitle}
                </Typography>
              )}
            </Box>

            <Stack direction="row" spacing={1}>
              <Button
                startIcon={<AddIcon />}
                component="a"
                href={googleCalUrl(e, defaultDurationHours)}
                target="_blank"
                rel="noopener"
                variant="contained"
                sx={{ bgcolor: "#103930", "&:hover": { bgcolor: "#1e5940" } }}
              >
                Google Calendar
              </Button>
              <Button
                startIcon={<DownloadIcon />}
                onClick={() => handleSingleIcs(e)}
                variant="outlined"
              >
                Apple / Outlook (.ics)
              </Button>
            </Stack>
          </Box>
        ))}

        <Box sx={{ textAlign: "right" }}>
          <Button
            startIcon={<DownloadIcon />}
            onClick={handleAllIcs}
            variant="text"
          >
            Download all events (.ics)
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
