"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

// Modal wrapper with accessibility attributes
function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    document.body.classList.add("modal-open");
    window.scrollTo({ top: 0, behavior: "smooth" });

    return () => {
      document.body.classList.remove("overflow-hidden");
      document.body.classList.remove("modal-open");
    };
  }, []);

  return (
    <div>
      <div
        role="dialog"
        aria-modal="true"
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-2"
      >
        <div className="bg-white rounded-lg w-full max-w-md mx-2 relative max-h-[min(90vh,40rem)] flex flex-col">
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
          <div className="p-6 overflow-auto pb-24 [padding-bottom:calc(env(safe-area-inset-bottom,0)+1.5rem)]">
            {children}
          </div>
        </div>
      </div>
      <div className="block md:hidden mt-16">
        <div className="websiteDecoration websiteDecoration--bottom" />
        <div className="websites-footer-illustration" />
      </div>
    </div>
  );
}

type Member = { first: string; last: string; plus_one: string };
type GuestListEntry = {
  name: string;
  attending: boolean;
  household: string;
  timestamp: string;
};

export default function RSVP() {
  const [step, setStep] = useState<
    | "search"
    | "select"
    | "attend"
    | "events"
    | "menu"
    | "dietary"
    | "final"
    | "done"
  >("search");

  const [query, setQuery] = useState({ first: "", last: "" });
  const [household, setHousehold] = useState("");
  const [members, setMembers] = useState<Member[]>([]);
  const [selected, setSelected] = useState<Member[]>([]);
  const [attending, setAttending] = useState<"Yes" | "No">("Yes");
  const [loading, setLoading] = useState(false);
  const [menuChoices, setMenuChoices] = useState<
    Record<string, "1" | "2" | "3">
  >({});
  const [diets, setDiets] = useState<Record<string, string>>({});
  const [transport, setTransport] = useState(false);
  const [guestList, setGuestList] = useState<GuestListEntry[]>([]);
  const [guestLoading, setGuestLoading] = useState(true);

  // New state for events
  const [events, setEvents] = useState({
    teaCeremony: false,
    welcomeParty: false,
    farewellParty: false,
  });

  // Fetch guest list on mount
  useEffect(() => {
    fetchGuestList();
  }, []);

  async function fetchGuestList() {
    try {
      setGuestLoading(true); // ← start
      const res = await fetch("/api/rsvp/guestlist");
      if (res.ok) {
        const data = await res.json();
        setGuestList(data);
      }
    } catch (error) {
      console.error("Failed to fetch guest list:", error);
    } finally {
      setGuestLoading(false); // ← end
    }
  }

  function resetSelectionAndPrefs() {
    setSelected([]);
    setMenuChoices({});
    setDiets({});
    setAttending("Yes");
    setTransport(false);
    setEvents({
      teaCeremony: false,
      welcomeParty: false,
      farewellParty: false,
    });
  }

  function Spinner({ label = "Loading..." }: { label?: string }) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-gray-600" />
        <p className="mt-3 text-sm text-gray-600">{label}</p>
      </div>
    );
  }

  function foldName(s: string) {
    return s
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .replace(/[''´`]/g, " ")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, " ");
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    resetSelectionAndPrefs();
    const first = foldName(query.first);
    const last = foldName(query.last);
    if (!first && !last) {
      toast.error("Enter first or last name");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `/api/rsvp?first=${encodeURIComponent(first)}&last=${encodeURIComponent(last)}`,
      );
      const json = await res.json();
      if (json.error) {
        toast.error("Name not found. Check spelling.");
      } else {
        const ms = json.members as Member[];
        setHousehold(json.household);
        setMembers(ms);
        if (ms.length > 1) {
          setStep("select");
        } else {
          setSelected(ms);
          setStep("attend");
        }
      }
    } catch {
      toast.error("Network error – please try again.");
    } finally {
      setLoading(false);
    }
  }

  function toggleMember(m: Member) {
    setSelected((s) =>
      s.some((x) => x.first === m.first && x.last === m.last)
        ? s.filter((x) => !(x.first === m.first && x.last === m.last))
        : [...s, m],
    );
  }

  useEffect(() => {
    const m: Record<string, "1" | "2" | "3"> = {};
    const d: Record<string, string> = {};
    selected.forEach((p) => {
      const key = `${p.first}-${p.last}`;
      m[key] = menuChoices[key] || "";
      d[key] = diets[key] || "";
    });
    setMenuChoices(m);
    setDiets(d);
  }, [selected]);

  async function handleSubmit() {
    if (selected.length === 0) {
      toast.error("Select at least one person");
      return;
    }
    setLoading(true);
    try {
      await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          household,
          selected,
          attending,
          menu: menuChoices,
          dietary: diets,
          transport: transport ? "Yes" : "No",
          events: {
            teaCeremony: events.teaCeremony ? "Yes" : "No",
            welcomeParty: events.welcomeParty ? "Yes" : "No",
            farewellParty: events.farewellParty ? "Yes" : "No",
          },
        }),
      });
      toast.success("RSVP recorded! 🎉");
      await fetchGuestList(); // Refresh guest list
      setStep("done");
    } catch {
      toast.error("Network error – please try again.");
    } finally {
      setLoading(false);
    }
  }

  // Process guest list for display - grouped by household, ordered by timestamp (newest first)
  // Updated to track the most recent timestamp per household
  const groupByHousehold = (guests: GuestListEntry[]) => {
    const grouped = new Map<
      string,
      { guests: GuestListEntry[]; timestamp: string }
    >();

    guests.forEach((guest) => {
      const existing = grouped.get(guest.household);
      if (!existing) {
        grouped.set(guest.household, {
          guests: [guest],
          timestamp: guest.timestamp,
        });
      } else {
        existing.guests.push(guest);
        // Keep the most recent timestamp for the household
        if (
          new Date(guest.timestamp).getTime() >
          new Date(existing.timestamp).getTime()
        ) {
          existing.timestamp = guest.timestamp;
        }
      }
    });

    // Sort households by timestamp (newest first)
    return Array.from(grouped.entries())
      .sort(
        (a, b) =>
          new Date(b[1].timestamp).getTime() -
          new Date(a[1].timestamp).getTime(),
      )
      .map(([household, data]) => ({
        household,
        guests: data.guests.sort((a, b) => a.name.localeCompare(b.name)),
        timestamp: data.timestamp,
      }));
  };

  const attendingHouseholds = groupByHousehold(
    guestList.filter((g) => g.attending),
  );
  const notAttendingHouseholds = groupByHousehold(
    guestList.filter((g) => !g.attending),
  );

  const totalAttending = attendingHouseholds.reduce(
    (sum, h) => sum + h.guests.length,
    0,
  );

  // Filter "unable to attend" to show only recent (within 24 hours)
  const RECENT_NO_MS = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  const recentNotAttendingHouseholds = notAttendingHouseholds.filter((h) => {
    const t = new Date(h.timestamp).getTime();
    return Date.now() - t <= RECENT_NO_MS;
  });

  const totalRecentNotAttending = recentNotAttendingHouseholds.reduce(
    (sum, h) => sum + h.guests.length,
    0,
  );

  return (
    <>
      <style>
        {`
          .websiteDecoration--internal {
            background-image: url("/images/wedding/floral1.png");
          }
          .websiteDecoration--bottom {
            background-image: url("/images/wedding/floral2.png");
          }
        `}
      </style>

      <div className="websiteDecoration websiteDecoration--internal" />
      <div className="pt-6 sm:pt-10 md:pt-14 lg:pt-18">
        <div className="app-spinner-container websiteSpinner" />
        <div className="app-contrast-color websiteContainer">
          <div
            className="app-website-page-content websiteFont__body"
            id="scrollMobile"
          >
            <div className="pure-u-1 websites-section">
              {/* Header */}
              <div className="app-website-render-wrapper sectionRender sectionRender__wrapperHeader">
                <div className="websiteContainerSection">
                  <h1 className="app-contrast-color websiteFont__headingHero mb20">
                    RSVP
                  </h1>
                  <div className="websiteFont__hero websiteLinkChilds websiteLinkChilds--underline">
                    <p>
                      To RSVP, simply search for your name and confirm your
                      attendance.
                    </p>
                  </div>
                </div>
              </div>
              <hr className="hrSection" />

              {/* Search Form */}
              {step === "search" && (
                <form
                  onSubmit={handleSearch}
                  className="websiteContainerSection mt30"
                >
                  <div className="pure-g row space-y-4">
                    <div className="pure-u-1-2">
                      <input
                        className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                        type="text"
                        placeholder="First name"
                        autoComplete="given-name"
                        autoCapitalize="words"
                        value={query.first}
                        onChange={(e) =>
                          setQuery((q) => ({ ...q, first: e.target.value }))
                        }
                      />
                    </div>
                    <div className="pure-u-1-2">
                      <input
                        className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                        type="text"
                        placeholder="Last name"
                        autoComplete="family-name"
                        autoCapitalize="words"
                        value={query.last}
                        onChange={(e) =>
                          setQuery((q) => ({ ...q, last: e.target.value }))
                        }
                      />
                    </div>
                  </div>

                  <p className="mt-4 text-sm text-gray-600">
                    If this form fails, please email{" "}
                    <a
                      href="mailto:theledewhursts@gmail.com"
                      className="underline text-blue-600"
                    >
                      theledewhursts@gmail.com
                    </a>
                    .
                  </p>

                  <div className="text-center mt-6">
                    <button
                      type="submit"
                      disabled={loading}
                      className={`px-6 py-2 border-2 border-blue-500 rounded-lg transition ${
                        loading
                          ? "bg-blue-200 text-gray-600 cursor-not-allowed"
                          : "hover:bg-blue-500 hover:text-white"
                      }`}
                    >
                      {loading ? "Searching…" : "Search"}
                    </button>
                  </div>
                </form>
              )}

              {/* Select Household Modal */}
              {step === "select" && (
                <Modal onClose={() => setStep("search")}>
                  <h2 className="text-xl mb-4">
                    Select for the {household} household
                  </h2>
                  <div className="space-y-2">
                    {members.map((m, i) => {
                      const checked = selected.some(
                        (x) => x.first === m.first && x.last === m.last,
                      );
                      return (
                        <label key={i} className="flex items-center">
                          <input
                            type="checkbox"
                            className="mr-2"
                            checked={checked}
                            onChange={() => toggleMember(m)}
                          />
                          {m.first} {m.last}
                        </label>
                      );
                    })}
                  </div>
                  <button
                    disabled={selected.length === 0}
                    onClick={() => setStep("attend")}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
                  >
                    Next
                  </button>
                </Modal>
              )}

              {/* Attendance Modal */}
              {step === "attend" && (
                <Modal onClose={() => setStep("search")}>
                  <h2 className="text-xl mb-4">
                    Will{" "}
                    {selected.length === 1
                      ? `${selected[0].first} ${selected[0].last}`
                      : "your party"}{" "}
                    be attending our wedding?
                  </h2>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="attend"
                        className="mr-2"
                        checked={attending === "Yes"}
                        onChange={() => setAttending("Yes")}
                      />
                      Joyfully accepts
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="attend"
                        className="mr-2"
                        checked={attending === "No"}
                        onChange={() => setAttending("No")}
                      />
                      Regretfully declines
                    </label>
                  </div>
                  <button
                    onClick={() => {
                      if (attending === "Yes") {
                        setStep("events");
                      } else {
                        handleSubmit();
                      }
                    }}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    {attending === "Yes" ? "Next" : "Submit RSVP"}
                  </button>
                </Modal>
              )}

              {/* Events Modal */}
              {step === "events" && (
                <Modal onClose={() => setStep("attend")}>
                  <h2 className="text-xl mb-4">
                    Which events will you be joining?
                  </h2>
                  <p className="text-sm text-gray-600 mb-4">
                    In addition to the wedding, we have a few other events
                    planned. Let us know which ones you&apos;d like to attend!
                  </p>

                  <div className="space-y-4">
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        className="mr-3 mt-1"
                        checked={events.teaCeremony}
                        onChange={(e) =>
                          setEvents((ev) => ({
                            ...ev,
                            teaCeremony: e.target.checked,
                          }))
                        }
                      />
                      <div>
                        <span className="font-semibold">Tea Ceremony</span>
                        <p className="text-sm text-gray-500">
                          Traditional Vietnamese tea ceremony · Morning of
                          wedding day
                        </p>
                      </div>
                    </label>

                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        className="mr-3 mt-1"
                        checked={events.welcomeParty}
                        onChange={(e) =>
                          setEvents((ev) => ({
                            ...ev,
                            welcomeParty: e.target.checked,
                          }))
                        }
                      />
                      <div>
                        <span className="font-semibold">Welcome Party</span>
                        <p className="text-sm text-gray-500">
                          Casual gathering · Friday evening before wedding
                        </p>
                      </div>
                    </label>

                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        className="mr-3 mt-1"
                        checked={events.farewellParty}
                        onChange={(e) =>
                          setEvents((ev) => ({
                            ...ev,
                            farewellParty: e.target.checked,
                          }))
                        }
                      />
                      <div>
                        <span className="font-semibold">Farewell Brunch</span>
                        <p className="text-sm text-gray-500">
                          Sunday morning send-off · Day after wedding
                        </p>
                      </div>
                    </label>
                  </div>

                  <button
                    onClick={() => setStep("menu")}
                    className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    Next
                  </button>
                </Modal>
              )}

              {/* Menu Selection Modal */}
              {step === "menu" && (
                <Modal onClose={() => setStep("events")}>
                  <h2 className="text-xl mb-4">Choose a main course</h2>
                  <a
                    href="/menu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 px-3 py-1.5 text-sm rounded-md border border-gray-300 hover:bg-gray-50 mb-4 inline-block"
                  >
                    View full menu ↗
                  </a>

                  <div className="space-y-4 max-h-80 overflow-auto">
                    {selected.map((m) => {
                      const key = `${m.first}-${m.last}`;
                      return (
                        <label key={key} className="flex flex-col">
                          <span className="font-semibold">
                            {m.first} {m.last}
                          </span>
                          <select
                            className="mt-1 p-2 border rounded"
                            value={menuChoices[key] || ""}
                            onChange={(e) =>
                              setMenuChoices((mc) => ({
                                ...mc,
                                [key]: e.target.value as "1" | "2" | "3",
                              }))
                            }
                          >
                            <option value="">Select menu…</option>
                            <option value="1">
                              Wagyu Sirloin with Chimichurri
                            </option>
                            <option value="2">
                              Chicken Breast with Lemon Caper Sauce
                            </option>
                            <option value="3">Portobello & Quinoa (V)</option>
                          </select>
                        </label>
                      );
                    })}
                  </div>
                  <button
                    disabled={!Object.values(menuChoices).every((v) => v)}
                    onClick={() => setStep("dietary")}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
                  >
                    Next
                  </button>
                </Modal>
              )}

              {/* Dietary Restrictions Modal */}
              {step === "dietary" && (
                <Modal onClose={() => setStep("menu")}>
                  <h2 className="text-xl mb-4">Any dietary restrictions?</h2>
                  <div className="space-y-4 max-h-80 overflow-auto">
                    {selected.map((m) => {
                      const key = `${m.first}-${m.last}`;
                      return (
                        <label key={key} className="flex flex-col">
                          <span className="font-semibold">
                            {m.first} {m.last}
                          </span>
                          <input
                            type="text"
                            className="mt-1 p-2 border rounded"
                            placeholder="e.g. gluten-free, nut allergy…"
                            value={diets[key] || ""}
                            onChange={(e) =>
                              setDiets((d) => ({ ...d, [key]: e.target.value }))
                            }
                          />
                        </label>
                      );
                    })}
                  </div>
                  <button
                    onClick={() => setStep("final")}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    Next
                  </button>
                </Modal>
              )}

              {/* Final Preferences Modal */}
              {step === "final" && (
                <Modal onClose={() => setStep("dietary")}>
                  <h2 className="text-xl mb-4">Final preferences</h2>

                  <label className="flex items-center space-x-2 mb-6">
                    <input
                      type="checkbox"
                      checked={transport}
                      onChange={(e) => setTransport(e.target.checked)}
                    />
                    <span>We would like transportation</span>
                    <span className="text-sm text-gray-500 ml-6">
                      Shuttle runs to/from The Domain and the venue.
                    </span>
                  </label>

                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className={`px-4 py-2 rounded transition ${
                      loading
                        ? "bg-green-200 text-gray-600 cursor-not-allowed"
                        : "bg-green-600 text-white hover:bg-green-700"
                    }`}
                  >
                    {loading ? "Submitting…" : "Confirm RSVP"}
                  </button>
                </Modal>
              )}

              {/* Success */}
              {step === "done" && (
                <div className="app-website-rsvp-success websiteContainerSection mt30">
                  <div className="websiteBox websiteBox--sm text-center">
                    <div className="mb20">
                      Your RSVP has been submitted successfully. 🎉
                    </div>
                    <button
                      onClick={() => {
                        setStep("search");
                        setQuery({ first: "", last: "" });
                      }}
                      className="px-6 py-2 border-2 border-blue-500 rounded-lg transition hover:bg-blue-500 hover:text-white ml-4"
                    >
                      New search
                    </button>
                  </div>
                </div>
              )}

              {/* Guest List Section */}
              <hr className="hrSection mt-12" />
              <div className="websiteContainerSection mt30">
                <h2 className="text-2xl font-bold mb-6 text-center">
                  Guest List
                </h2>

                {guestLoading ? (
                  <Spinner label="Loading guest list…" />
                ) : (
                  <>
                    {/* Attending Section */}
                    {attendingHouseholds.length > 0 && (
                      <div className="mb-8">
                        <h3 className="text-lg font-semibold mb-4 text-green-600">
                          Attending ({totalAttending})
                        </h3>
                        <div className="space-y-4">
                          {attendingHouseholds.map((household, i) => (
                            <div
                              key={i}
                              className="border-l-4 border-green-500 pl-4 py-2"
                            >
                              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                                {household.guests.map((guest, j) => (
                                  <div key={j} className="text-sm">
                                    {guest.name}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Unable to Attend Section - only show recent (within 24h) */}
                    {totalRecentNotAttending > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-4 text-gray-500">
                          Unable to Attend
                        </h3>
                        <div className="space-y-4">
                          {recentNotAttendingHouseholds.map((household, i) => (
                            <div
                              key={i}
                              className="border-l-4 border-gray-300 pl-4 py-2"
                            >
                              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                                {household.guests.map((guest, j) => (
                                  <div
                                    key={j}
                                    className="text-sm text-gray-500"
                                  >
                                    {guest.name}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {attendingHouseholds.length === 0 &&
                      notAttendingHouseholds.length === 0 && (
                        <p className="text-center text-gray-500">
                          No RSVPs yet. Be the first to RSVP!
                        </p>
                      )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="websiteDecoration websiteDecoration--bottom" />
      <div className="websites-footer-illustration" />
    </>
  );
}
