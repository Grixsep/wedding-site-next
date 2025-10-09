"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";
import RoomIcon from "@mui/icons-material/Room";

import type { EventItem } from "./timeline";

/** Helpers */
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

function parseDateLike(dateStr: string) {
  // "Mar 8, 2026 10:00 AM"
  const parts = dateStr.replace(",", "").split(/\s+/);
  const [mon, day, year, time, ampm] = parts;
  const [hhStr, mmStr] = (time || "00:00").split(":");
  let hh = parseInt(hhStr, 10);
  const mm = parseInt(mmStr, 10);
  const isPM = (ampm || "").toUpperCase() === "PM";
  if (isPM && hh !== 12) hh += 12;
  if (!isPM && hh === 12) hh = 0;
  const m = MONTHS[mon];
  const d = String(day).padStart(2, "0");
  return {
    y: year,
    m,
    d,
    hh: String(isNaN(hh) ? 0 : hh).padStart(2, "0"),
    mm: String(isNaN(mm) ? 0 : mm).padStart(2, "0"),
  };
}

function addHoursISO(
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
  return { y: yy, m: mo, d: dd, hh: H, mm: M };
}

function googleCalUrl(e: EventItem, defaultDurationHours: number) {
  const { y, m, d, hh, mm } = parseDateLike(e.date);
  const endParsed = e.end
    ? parseDateLike(e.end)
    : addHoursISO(y, m, d, hh, mm, defaultDurationHours);
  const start = `${y}${m}${d}T${hh}${mm}00`;
  const endStr = `${endParsed.y}${endParsed.m}${endParsed.d}T${endParsed.hh}${endParsed.mm}00`;
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
    const { y, m, d, hh, mm } = parseDateLike(e.date);
    const end = e.end
      ? parseDateLike(e.end)
      : addHoursISO(y, m, d, hh, mm, defaultDurationHours);
    const startLocal = `${y}${m}${d}T${hh}${mm}00`;
    const endLocal = `${end.y}${end.m}${end.d}T${end.hh}${end.mm}00`;
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

/** Build a Google Maps link from event, with fallback to search */
function mapsUrl(e: EventItem) {
  if (e.link && typeof e.link === "string" && e.link.trim().length > 0)
    return e.link;
  const q = encodeURIComponent([e.title, e.subtitle].filter(Boolean).join(" "));
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

/** Calendar grid */
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type Props = {
  events: EventItem[];
  /** 1-12 (e.g., 3 for March). If omitted, infer from first event. */
  month?: number;
  /** full year (e.g., 2026). If omitted, infer from first event. */
  year?: number;
  defaultDurationHours?: number;
  /** Minimum width for each column (px). */
  cellMinWidthPx?: number;
  /** Icon size divisor; icon = cellWidth / iconScale (lower = bigger). */
  iconScale?: number;
};

export default function CalendarMonth({
  events,
  month,
  year,
  defaultDurationHours = 2,
  cellMinWidthPx = 40,
  iconScale = 1.8,
}: Props) {
  // Infer month/year from first event if not provided
  const inferred = React.useMemo(() => {
    if (month && year) return { m: month, y: year };
    if (!events.length)
      return { m: new Date().getMonth() + 1, y: new Date().getFullYear() };
    const p = parseDateLike(events[0].date);
    return { m: parseInt(p.m, 10), y: parseInt(p.y, 10) };
  }, [events, month, year]);

  const m0 = inferred.m - 1; // JS Date month (0-based)
  const y0 = inferred.y;

  // Anchors
  const firstOfMonth = new Date(y0, m0, 1);
  const startOffset = firstOfMonth.getDay(); // 0=Sun
  const gridStart = new Date(y0, m0, 1 - startOffset); // Sunday at/before the 1st

  // Show through the Saturday of the week that contains the 21st
  const cutoffDate = new Date(y0, m0, 21);
  const daysToSaturday = (6 - cutoffDate.getDay() + 7) % 7;
  const rangeEnd = new Date(y0, m0, 21 + daysToSaturday); // last cell shown

  // Build exact number of cells from gridStart to rangeEnd (inclusive)
  const MS_PER_DAY = 24 * 3600 * 1000;
  const totalDaysInclusive =
    Math.round((rangeEnd.getTime() - gridStart.getTime()) / MS_PER_DAY) + 1;
  const weeks = Math.ceil(totalDaysInclusive / 7);
  const totalCells = weeks * 7;

  const cells = Array.from({ length: totalCells }, (_, i) => {
    const d = new Date(gridStart);
    d.setDate(gridStart.getDate() + i);
    return d;
  });

  // Map events by YYYY-MM-DD
  const eventsByDay = React.useMemo(() => {
    const map: Record<string, EventItem[]> = {};
    for (const e of events) {
      const p = parseDateLike(e.date);
      const key = `${p.y}-${p.m}-${p.d}`;
      (map[key] ||= []).push(e);
    }
    return map;
  }, [events]);

  const [selected, setSelected] = React.useState<EventItem | null>(null);
  const monthName = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
    new Date(y0, m0, 1),
  );

  /** Measure cell width (and update on resize) */
  const gridRef = React.useRef<HTMLDivElement | null>(null);
  const [cellWidth, setCellWidth] = React.useState<number>(0);

  React.useEffect(() => {
    if (!gridRef.current) return;

    const measure = () => {
      const firstCell = gridRef.current!.querySelector<HTMLDivElement>(
        'div[data-cell="true"]',
      );
      if (firstCell) setCellWidth(firstCell.getBoundingClientRect().width);
    };

    measure(); // initial

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => measure());
      ro.observe(gridRef.current);
    }

    const onResize = () => measure();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      if (ro) ro.disconnect();
    };
  }, [cellMinWidthPx, weeks, totalCells]);

  // Derive icon size from current cell width (tweak iconScale prop to taste)
  const iconSize = Math.max(16, cellWidth / iconScale);
  const iconFont = Math.max(12, iconSize * 0.55);

  return (
    <Box sx={{ mt: 6 }}>
      <Typography
        variant="h5"
        sx={{ fontFamily: "Bodoni, serif", color: "#103930", mb: 2 }}
      >
        {monthName} {y0}
      </Typography>

      {/* Weekday header */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(7, minmax(${cellMinWidthPx}px, 1fr))`,
          gap: 1,
          mb: 1,
        }}
      >
        {WEEKDAYS.map((w) => (
          <Box
            key={w}
            sx={{ textAlign: "center", color: "#6b7280", fontWeight: 600 }}
          >
            {w}
          </Box>
        ))}
      </Box>

      {/* Grid */}
      <Box
        ref={gridRef}
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(7, minmax(${cellMinWidthPx}px, 1fr))`,
          gap: 1,
          gridAutoRows: { xs: "80px", sm: "100px", md: "110px" },
          boxSizing: "border-box",
        }}
      >
        {cells.map((d, idx) => {
          const inMonth = d.getMonth() === m0;
          const isBeforeMonthStart = d < firstOfMonth;
          const isAfterRangeEnd = d > rangeEnd;

          const dayNum = d.getDate();
          const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;

          // Dim 1–7 and 16–21 (in-month)
          const dimRange =
            inMonth &&
            ((dayNum >= 1 && dayNum <= 7) || (dayNum >= 16 && dayNum <= 21));

          const isBlankCell = isBeforeMonthStart || isAfterRangeEnd || !inMonth;

          const dayEvents = !isBlankCell ? eventsByDay[key] || [] : [];

          return (
            <Box
              data-cell="true"
              key={idx}
              onClick={() => {
                if (dayEvents.length) setSelected(dayEvents[0]);
              }}
              tabIndex={dayEvents.length ? 0 : -1}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && dayEvents.length) {
                  e.preventDefault();
                  setSelected(dayEvents[0]);
                }
              }}
              sx={{
                height: "100%",
                borderRadius: 2,
                border: "1px solid rgba(0,0,0,0.08)",
                background: isBlankCell
                  ? "rgba(0,0,0,0.03)"
                  : dimRange
                    ? "rgba(0,0,0,0.05)"
                    : "rgba(255,255,255,0.8)",
                p: 1,
                display: "grid",
                gridTemplateRows: "auto 1fr",
                minWidth: 0,
                cursor: dayEvents.length ? "pointer" : "default",
                transition: "box-shadow .2s, transform .06s",
                "&:hover": dayEvents.length
                  ? { boxShadow: "0 2px 8px rgba(0,0,0,0.12)" }
                  : undefined,
                "&:active": dayEvents.length
                  ? { transform: "translateY(1px)" }
                  : undefined,
              }}
            >
              {/* Day number */}
              <Typography
                variant="caption"
                sx={{
                  color: isBlankCell
                    ? "transparent"
                    : dimRange
                      ? "#9ca3af"
                      : "#374151",
                  fontWeight: 600,
                  lineHeight: 1,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {isBlankCell ? "00" : dayNum}
              </Typography>

              {/* Icon area */}
              <Box
                sx={{
                  display: "flex",
                  gap: 0.5,
                  flexWrap: "wrap",
                  alignContent: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                  minWidth: 0,
                }}
              >
                {!isBlankCell &&
                  dayEvents.map((e, i) => (
                    <Tooltip key={i} title={e.title}>
                      <IconButton
                        onClick={(ev) => {
                          ev.stopPropagation();
                          setSelected(e);
                        }}
                        size="small"
                        sx={{
                          width: iconSize,
                          height: iconSize,
                          borderRadius: "50%",
                          background: e.iconBg,
                          border: "1px solid #fff",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                          opacity: dimRange ? 0.85 : 1,
                          "& svg": { fontSize: iconFont, color: e.iconColor },
                        }}
                      >
                        {e.icon}
                      </IconButton>
                    </Tooltip>
                  ))}
              </Box>
            </Box>
          );
        })}
      </Box>

      {/* Legend */}
      <Box sx={{ mt: 2, display: "flex", gap: 2, flexWrap: "wrap" }}>
        {[...new Map(events.map((e) => [e.title, e])).values()].map((e) => (
          <Box
            key={e.title}
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: e.iconBg,
                border: "1px solid #fff",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            />
            <Typography variant="body2" sx={{ color: "#374151" }}>
              {e.title}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Dialog */}
      <Dialog
        open={!!selected}
        onClose={() => setSelected(null)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ fontFamily: "Bodoni, serif", color: "#103930" }}>
          {selected?.title}
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={1.2}>
            {selected?.date && (
              <Typography variant="body2" sx={{ color: "#6b7280" }}>
                {selected.date}
              </Typography>
            )}
            {selected?.subtitle && (
              <Typography variant="body1" sx={{ color: "#374151" }}>
                {selected.subtitle}
              </Typography>
            )}
          </Stack>
        </DialogContent>
        <DialogActions
          sx={{
            p: 2,
            justifyContent: "center",
            gap: 1.5,
            flexWrap: "wrap",
          }}
        >
          {selected && (
            <>
              <Button
                startIcon={<RoomIcon />}
                component="a"
                href={mapsUrl(selected)}
                target="_blank"
                rel="noopener"
                variant="outlined"
              >
                Get directions
              </Button>
              <Button
                startIcon={<AddIcon />}
                component="a"
                href={googleCalUrl(selected, defaultDurationHours)}
                target="_blank"
                rel="noopener"
                variant="contained"
                sx={{ bgcolor: "#103930", "&:hover": { bgcolor: "#1e5940" } }}
              >
                Google Calendar
              </Button>
              <Button
                startIcon={<DownloadIcon />}
                onClick={() =>
                  downloadIcs(
                    `${selected.title.replace(/\s+/g, "_")}.ics`,
                    buildIcs([selected], defaultDurationHours),
                  )
                }
                variant="outlined"
              >
                Apple / Outlook (.ics)
              </Button>
            </>
          )}
          <Button onClick={() => setSelected(null)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
