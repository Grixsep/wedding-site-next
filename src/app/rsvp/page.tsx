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

    // Scroll to top when modal opens
    window.scrollTo({ top: 0, behavior: "smooth" });

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return (
    <div>
      <div
        role="dialog"
        aria-modal="true"
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2"
      >
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-2 relative pb-12">
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
          {children}
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

export default function RSVP() {
  const [step, setStep] = useState<
    "search" | "select" | "attend" | "display" | "done"
  >("search");
  const [query, setQuery] = useState({ first: "", last: "" });
  const [household, setHousehold] = useState("");
  const [members, setMembers] = useState<Member[]>([]);
  const [selected, setSelected] = useState<Member[]>([]);
  const [attending, setAttending] = useState<"Yes" | "No">("Yes");
  const [showName, setShowName] = useState(true);
  const [loading, setLoading] = useState(false);

  // 1) search handler
  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          household,
          selected,
          attending,
          show_name: attending === "Yes" && showName ? "Yes" : "No",
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
                    onClick={() => {
                      if (attending === "No") {
                        // Directly submit without showing name
                        handleSubmit();
                      } else {
                        setStep("display");
                      }
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    {attending === "No" ? "Confirm RSVP" : "Next"}
                  </button>
                </Modal>
              )}

              {/* Display Names Modal */}
              {step === "display" && (
                <Modal onClose={() => setStep("attend")}>
                  <h2 className="text-xl mb-4">
                    Show names on the guest list?
                  </h2>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={showName}
                      onChange={(e) => setShowName(e.target.checked)}
                    />
                    <span>Yes, display our names</span>
                  </label>
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className={`mt-4 px-4 py-2 rounded transition ${
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
