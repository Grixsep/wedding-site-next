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
    // Lock page scroll and mark body as "modal open"
    document.body.classList.add("overflow-hidden");
    document.body.classList.add("modal-open");

    // Scroll to top when modal opens (helps mobile)
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
        // ↑ ensure we sit above everything (footer is z-10)
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-2"
      >
        {/* Modal panel: cap height, make contents scroll if needed, keep comfy bottom padding */}
        <div className="bg-white rounded-lg w-full max-w-md mx-2 relative max-h-[min(90vh,40rem)] flex flex-col">
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>

          {/* Scrollable content area with extra bottom padding so action buttons remain visible */}
          <div className="p-6 overflow-auto pb-24 [padding-bottom:calc(env(safe-area-inset-bottom,0)+1.5rem)]">
            {children}
          </div>
        </div>
      </div>

      {/* Keep your decorative elements; they’ll be hidden when body has `modal-open` */}
      <div className="block md:hidden mt-16">
        <div className="websiteDecoration websiteDecoration--bottom" />
        <div className="websites-footer-illustration" />
      </div>
    </div>
  );
}

type Member = { first: string; last: string; plus_one: string };

export default function RSVP() {
  const [step, setStep] = useState<
    | "search"
    | "select"
    | "attend"
    | "menu" // ← new
    | "dietary" // ← new
    | "final" // ← new
    | "done"
  >("search");
  const [query, setQuery] = useState({ first: "", last: "" });
  const [household, setHousehold] = useState("");
  const [members, setMembers] = useState<Member[]>([]);
  const [selected, setSelected] = useState<Member[]>([]);
  const [attending, setAttending] = useState<"Yes" | "No">("Yes");
  const [showName, setShowName] = useState(true);
  const [loading, setLoading] = useState(false);
  // per-person menu choices and dietary maps, plus global transport flag
  const [menuChoices, setMenuChoices] = useState<
    Record<string, "1" | "2" | "3">
  >({}); // ← new
  const [diets, setDiets] = useState<Record<string, string>>({}); // ← new
  const [transport, setTransport] = useState(false); // ← new

  function resetSelectionAndPrefs() {
    // Clear who’s selected and any per-person prefs from a previous search
    setSelected([]);
    setMenuChoices({});
    setDiets({});
    // Optional: reset these each time too, so new parties start fresh
    setAttending("Yes");
    setTransport(false);
    setShowName(true);
  }

  // 1) search handler
  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    // Clear prior selections/prefs so this search starts clean
    resetSelectionAndPrefs();
    const first = query.first.trim().toLowerCase();
    const last = query.last.trim().toLowerCase();
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
      toast.error("Network error — please try again.");
    } finally {
      setLoading(false);
    }
  }

  // toggle household members
  function toggleMember(m: Member) {
    setSelected((s) =>
      s.some((x) => x.first === m.first && x.last === m.last)
        ? s.filter((x) => !(x.first === m.first && x.last === m.last))
        : [...s, m],
    );
  }

  // whenever the selected array changes, seed menuChoices and diets
  useEffect(() => {
    const m: Record<string, "1" | "2" | "3"> = {};
    const d: Record<string, string> = {};
    selected.forEach((p) => {
      const key = `${p.first}-${p.last}`;
      m[key] = menuChoices[key] || ""; // blank until chosen
      d[key] = diets[key] || ""; // blank until typed
    });
    setMenuChoices(m);
    setDiets(d);
  }, [selected]);

  // final submit
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
          show_name: showName ? "Yes" : "No",
          menu: menuChoices, // ← all menu picks
          dietary: diets, // ← all dietary inputs
          transport: transport ? "Yes" : "No",
        }),
      });
      toast.success("RSVP recorded! 🎉");
      setStep("done");
    } catch {
      toast.error("Network error — please try again.");
    } finally {
      setLoading(false);
    }
  }

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
                    {/* First Name */}
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

                    {/* Last Name */}
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
                          {m.first} {m.last} {m.plus_one === "Yes" && "(+1)"}
                        </label>
                      );
                    })}
                  </div>
                  <button
                    onClick={() => setStep("attend")}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    Next
                  </button>
                </Modal>
              )}

              {/* Attend Modal */}
              {step === "attend" && (
                <Modal
                  onClose={() =>
                    members.length > 1 ? setStep("select") : setStep("search")
                  }
                >
                  <h2 className="text-xl mb-4">Will your party attend?</h2>
                  <div className="flex space-x-4 mb-4">
                    <label className="flex items-center space-x-1">
                      <input
                        type="radio"
                        name="attending"
                        checked={attending === "Yes"}
                        onChange={() => setAttending("Yes")}
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center space-x-1">
                      <input
                        type="radio"
                        name="attending"
                        checked={attending === "No"}
                        onChange={() => setAttending("No")}
                      />
                      <span>No</span>
                    </label>
                  </div>
                  <button
                    onClick={
                      () =>
                        attending === "No" ? handleSubmit() : setStep("menu") // ← new
                    }
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    {attending === "No" ? "Confirm RSVP" : "Next"}
                  </button>
                </Modal>
              )}

              {/* Menu Selection Modal */}
              {step === "menu" && (
                <Modal onClose={() => setStep("attend")}>
                  <h2 className="text-xl mb-4">Choose a main course</h2>
                  {/* View full menu link (new tab) */}
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

                  <label className="flex items-center space-x-2 mb-4">
                    <input
                      type="checkbox"
                      checked={showName}
                      onChange={(e) => setShowName(e.target.checked)}
                    />
                    <span>Display our names on the guest list</span>
                    <span className="text-sm text-gray-500 ml-1">
                      (recommended)
                    </span>
                  </label>

                  <label className="flex items-center space-x-2 mb-6">
                    <input
                      type="checkbox"
                      checked={transport}
                      onChange={(e) => setTransport(e.target.checked)}
                    />
                    <span>We need transportation</span>
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
                      className="app-website-rsvp-reset btnFlat btnFlat--primary"
                    >
                      New search
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="websiteDecoration websiteDecoration--bottom" />
      <div className="websites-footer-illustration" />
    </>
  );
}
