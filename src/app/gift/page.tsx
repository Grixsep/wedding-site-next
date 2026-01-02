"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  FaHeart,
  FaGift,
  FaArrowRight,
  FaCopy,
  FaCheck,
  FaExclamationTriangle,
} from "react-icons/fa";
import { QRCodeSVG } from "qrcode.react";

// Configuration - Update these with your actual details
const CONFIG = {
  // Payment links/details
  wiseLinkGBP: "https://wise.com/pay/me/pauld3878", // GBP/Other Wise account
  wiseLinkUSD: "https://wise.com/pay/me/anl10", // USD Wise account
  paypalUsernameGBP: "pauldewh", // GBP PayPal account
  paypalUsernameUSD: "anle531", // USD PayPal account
  venmoUsername: "anthule",
  ukBankDetails: {
    accountName: "Paul Dewhurst",
    sortCode: "80-47-09",
    accountNumber: "10469463",
  },
  // International bank transfer details (your Wise GBP account for non-Wise users)
  internationalBankDetails: {
    accountName: "Paul Dewhurst",
    iban: "GB 84 TRWI 2308 0166 2655 63",
    bic: "TRWIGB2LXXX",
    bankName: "Wise Payments Limited",
    bankAddress:
      "1st Floor, Worship Square, 65 Clifton Street, London, EC2A 4JE, United Kingdom",
  },
  contactEmail: "theledewhursts@gmail.com",
  coupleNames: "An & Paul",
  apiEndpoint: "/api/gift" as string | null,
};

type Currency = "GBP" | "USD" | "OTHER" | "";
type PaymentMethod =
  | "uk-bank"
  | "venmo"
  | "paypal"
  | "wise"
  | "international-bank";

const CURRENCY_OPTIONS: {
  value: Currency;
  label: string;
  flag: string;
  symbol: string;
}[] = [
  { value: "", label: "Select currency...", flag: "", symbol: "" },
  { value: "GBP", label: "GBP", flag: "🇬🇧", symbol: "£" },
  { value: "USD", label: "USD", flag: "🇺🇸", symbol: "$" },
  { value: "OTHER", label: "Other", flag: "🌍", symbol: "" },
];

const PAYMENT_METHODS: Record<
  Currency,
  {
    method: PaymentMethod;
    label: string;
    description: string;
    recommended?: boolean;
  }[]
> = {
  "": [],
  GBP: [
    {
      method: "uk-bank",
      label: "UK Bank Transfer",
      description: "Free & instant from any UK bank",
      recommended: true,
    },
    {
      method: "wise",
      label: "Wise",
      description: "Free if you have a Wise account",
    },
    {
      method: "paypal",
      label: "PayPal",
      description: "Send as Friends & Family to avoid fees",
    },
    {
      method: "international-bank",
      label: "International Bank Transfer",
      description: "Send from any bank worldwide (may have fees)",
    },
  ],
  USD: [
    {
      method: "venmo",
      label: "Venmo",
      description: "Free & instant",
      recommended: true,
    },
    {
      method: "wise",
      label: "Wise",
      description: "Free via ACH bank transfer",
    },
    {
      method: "paypal",
      label: "PayPal",
      description: "Send as Friends & Family to avoid fees",
    },
  ],
  OTHER: [
    {
      method: "wise",
      label: "Wise",
      description: "Best rates for international transfers",
      recommended: true,
    },
    {
      method: "paypal",
      label: "PayPal",
      description: "Send as Friends & Family to avoid fees",
    },
    {
      method: "international-bank",
      label: "International Bank Transfer",
      description: "Send from any bank worldwide",
    },
  ],
};

// Modal Component
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
        className="fixed inset-0 bg-black/50 flex items-start justify-center z-[100] p-2 pt-32"
      >
        <div className="bg-white rounded-lg w-full max-w-md mx-2 relative flex flex-col max-h-[calc(100vh-9rem)]">
          <div className="flex items-center justify-end p-3 shrink-0">
            <button
              onClick={onClose}
              aria-label="Close"
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div className="px-6 pb-24 overflow-auto [padding-bottom:calc(env(safe-area-inset-bottom,0)+1.5rem)]">
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

// Copy button component
function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success(`${label} copied!`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
      title={`Copy ${label}`}
    >
      {copied ? (
        <FaCheck className="text-green-500" size={14} />
      ) : (
        <FaCopy size={14} />
      )}
    </button>
  );
}

// UK Bank Details Component
function UKBankDetails({ reference }: { reference: string }) {
  const { accountName, sortCode, accountNumber } = CONFIG.ukBankDetails;

  return (
    <div className="bg-gray-50 rounded-xl p-4 space-y-3 text-left">
      <h3 className="font-medium text-gray-800 text-sm">
        Bank Transfer Details
      </h3>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Account Name</span>
          <div className="flex items-center gap-1">
            <span className="font-medium text-gray-800">{accountName}</span>
            <CopyButton text={accountName} label="Account name" />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-500">Sort Code</span>
          <div className="flex items-center gap-1">
            <span className="font-medium text-gray-800 font-mono">
              {sortCode}
            </span>
            <CopyButton text={sortCode.replace(/-/g, "")} label="Sort code" />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-500">Account Number</span>
          <div className="flex items-center gap-1">
            <span className="font-medium text-gray-800 font-mono">
              {accountNumber}
            </span>
            <CopyButton text={accountNumber} label="Account number" />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-500">Reference</span>
          <div className="flex items-center gap-1">
            <span className="font-medium text-gray-800">{reference}</span>
            <CopyButton text={reference} label="Reference" />
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-400 pt-2 border-t border-gray-200">
        Use your banking app to send a Faster Payment - it&apos;s free and
        usually instant!
      </p>
    </div>
  );
}

// Venmo Payment Details Component
function VenmoDetails({ amount, name }: { amount: number; name: string }) {
  const venmoLink = `https://venmo.com/${CONFIG.venmoUsername}`;
  const venmoDeepLink = `venmo://paycharge?txn=pay&recipients=${CONFIG.venmoUsername}&amount=${amount}&note=Wedding%20gift%20from%20${encodeURIComponent(name)}`;

  return (
    <div className="bg-blue-50 rounded-xl p-4 space-y-4 text-center">
      <div className="flex justify-center">
        <div className="bg-white p-3 rounded-xl shadow-sm">
          <QRCodeSVG
            value={venmoLink}
            size={160}
            level="M"
            includeMargin={false}
          />
        </div>
      </div>

      <div className="space-y-1">
        <p className="text-sm text-gray-600">
          Scan with your phone camera or Venmo app
        </p>
        <p className="text-sm text-gray-500">
          Send <span className="font-semibold text-gray-800">${amount}</span> to{" "}
          <span className="font-mono text-blue-600">
            @{CONFIG.venmoUsername}
          </span>
        </p>
      </div>

      <div className="flex gap-2">
        <a
          href={venmoDeepLink}
          className="flex-1 py-2 px-4 bg-[#008CFF] hover:bg-[#0074D4] text-white text-sm font-medium rounded-lg transition-colors"
        >
          Open Venmo App
        </a>
        <a
          href={venmoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="py-2 px-4 border border-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
        >
          Web
        </a>
      </div>
    </div>
  );
}

// PayPal Payment Details Component
function PayPalDetails({
  amount,
  currency,
}: {
  amount: number;
  currency: Currency;
}) {
  const currencySymbol =
    CURRENCY_OPTIONS.find((c) => c.value === currency)?.symbol || "";
  // Use USD PayPal for USD, GBP PayPal for everything else
  const paypalUsername =
    currency === "USD" ? CONFIG.paypalUsernameUSD : CONFIG.paypalUsernameGBP;
  const paypalLink = `https://paypal.me/${paypalUsername}/${amount}`;
  const paypalBaseLink = `https://paypal.me/${paypalUsername}`;

  return (
    <div className="bg-yellow-50 rounded-xl p-4 space-y-4 text-center">
      <div className="flex justify-center">
        <div className="bg-white p-3 rounded-xl shadow-sm">
          <QRCodeSVG
            value={paypalBaseLink}
            size={160}
            level="M"
            includeMargin={false}
          />
        </div>
      </div>

      <div className="space-y-1">
        <p className="text-sm text-gray-600">Scan with your phone camera</p>
        <p className="text-sm text-gray-500">
          Send{" "}
          <span className="font-semibold text-gray-800">
            {currencySymbol}
            {amount}
          </span>{" "}
          to <span className="font-mono text-blue-600">@{paypalUsername}</span>
        </p>
      </div>

      {/* Friends & Family Warning */}
      <div className="bg-amber-100 border border-amber-200 rounded-lg p-3 text-left">
        <div className="flex gap-2">
          <FaExclamationTriangle
            className="text-amber-600 flex-shrink-0 mt-0.5"
            size={14}
          />
          <div className="text-xs text-amber-800">
            <p className="font-medium mb-1">
              Important: Send as &quot;Friends &amp; Family&quot;
            </p>
            <p>
              This avoids fees so 100% of your gift reaches us. Do not select
              &quot;Goods &amp; Services&quot;.
            </p>
          </div>
        </div>
      </div>

      <a
        href={paypalLink}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full py-2 px-4 bg-[#0070BA] hover:bg-[#005C99] text-white text-sm font-medium rounded-lg transition-colors"
      >
        Open PayPal
      </a>
    </div>
  );
}

// Wise Payment Details Component
function WiseDetails({
  amount,
  currency,
}: {
  amount: number;
  currency: Currency;
}) {
  const currencySymbol =
    CURRENCY_OPTIONS.find((c) => c.value === currency)?.symbol || "";
  // Use USD Wise for USD, GBP Wise for everything else
  const wiseLink = currency === "USD" ? CONFIG.wiseLinkUSD : CONFIG.wiseLinkGBP;

  return (
    <div className="bg-green-50 rounded-xl p-4 space-y-4 text-center">
      <div className="flex justify-center">
        <div className="bg-white p-3 rounded-xl shadow-sm">
          <QRCodeSVG
            value={wiseLink}
            size={160}
            level="M"
            includeMargin={false}
          />
        </div>
      </div>

      <div className="space-y-1">
        <p className="text-sm text-gray-600">Scan with your phone camera</p>
        <p className="text-sm text-gray-500">
          Send{" "}
          <span className="font-semibold text-gray-800">
            {currency === "OTHER"
              ? `${amount} in your currency`
              : `${currencySymbol}${amount}`}
          </span>
        </p>
      </div>

      <div className="bg-green-100 border border-green-200 rounded-lg p-3 text-left">
        <div className="text-xs text-green-800">
          <p className="font-medium mb-1">Why Wise?</p>
          <p>
            Best exchange rates and lowest fees for international transfers. You
            can pay via bank transfer - no Wise account needed!
          </p>
        </div>
      </div>

      <a
        href={wiseLink}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full py-2 px-4 bg-[#9fe870] hover:bg-[#8fd860] text-gray-900 text-sm font-medium rounded-lg transition-colors"
      >
        Open Wise
      </a>
    </div>
  );
}

// International Bank Transfer Details Component
function InternationalBankDetails({ reference }: { reference: string }) {
  return (
    <div className="bg-indigo-50 rounded-xl p-4 space-y-4 text-left">
      <h3 className="font-medium text-gray-800 text-sm">
        International Bank Transfer Details
      </h3>

      <div className="space-y-2 text-sm">
        <p className="text-xs text-indigo-600 font-medium mb-2">
          International Transfer (SWIFT/IBAN)
        </p>
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Account Name</span>
          <div className="flex items-center gap-1">
            <span className="font-medium text-gray-800">
              {CONFIG.internationalBankDetails.accountName}
            </span>
            <CopyButton
              text={CONFIG.internationalBankDetails.accountName}
              label="Account name"
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500">IBAN</span>
          <div className="flex items-center gap-1">
            <span className="font-medium text-gray-800 font-mono text-xs">
              {CONFIG.internationalBankDetails.iban}
            </span>
            <CopyButton
              text={CONFIG.internationalBankDetails.iban.replace(/\s/g, "")}
              label="IBAN"
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500">BIC/SWIFT</span>
          <div className="flex items-center gap-1">
            <span className="font-medium text-gray-800 font-mono">
              {CONFIG.internationalBankDetails.bic}
            </span>
            <CopyButton
              text={CONFIG.internationalBankDetails.bic}
              label="BIC"
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Bank Name</span>
          <span className="font-medium text-gray-800">
            {CONFIG.internationalBankDetails.bankName}
          </span>
        </div>
        <div className="flex justify-between items-start">
          <span className="text-gray-500">Bank Address</span>
          <span className="font-medium text-gray-800 text-right text-xs max-w-[180px]">
            {CONFIG.internationalBankDetails.bankAddress}
          </span>
        </div>
      </div>

      <div className="pt-2 border-t border-indigo-200">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">Reference</span>
          <div className="flex items-center gap-1">
            <span className="font-medium text-gray-800">{reference}</span>
            <CopyButton text={reference} label="Reference" />
          </div>
        </div>
      </div>

      <div className="bg-indigo-100 border border-indigo-200 rounded-lg p-3 text-left">
        <div className="text-xs text-indigo-800">
          <p className="font-medium mb-1">Bank Transfer Info</p>
          <p>
            You can send any currency to this account. SEPA transfers from
            Europe are usually free. Other international transfers may have fees
            from your bank.
          </p>
        </div>
      </div>
    </div>
  );
}

// Gift Messages Display Component
type GiftMessage = {
  name: string;
  message: string;
  timestamp: string;
};

function GiftWall({ messages }: { messages: GiftMessage[] }) {
  if (messages.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Messages from Loved Ones
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <p className="text-gray-700 italic mb-3">
              &quot;{msg.message}&quot;
            </p>
            <p className="text-sm text-gray-500 font-medium">- {msg.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Main Gift Page Component
export default function GiftPage() {
  const [step, setStep] = useState<
    "intro" | "form" | "payment" | "details" | "done"
  >("intro");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [amount, setAmount] = useState<string>("");
  const [currency, setCurrency] = useState<Currency>("");
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [giftMessages, setGiftMessages] = useState<GiftMessage[]>([]);
  const [messagesLoading, setMessagesLoading] = useState(true);

  const currencyOption = CURRENCY_OPTIONS.find((c) => c.value === currency);
  const currencySymbol = currencyOption?.symbol || "";

  // Fetch existing gift messages on mount
  useEffect(() => {
    fetchGiftMessages();
  }, []);

  // Reset selected payment when currency changes
  useEffect(() => {
    setSelectedPayment(null);
  }, [currency]);

  async function fetchGiftMessages() {
    try {
      setMessagesLoading(true);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    } finally {
      setMessagesLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter an amount");
      return;
    }

    if (!currency) {
      toast.error("Please select a currency");
      return;
    }

    setLoading(true);

    try {
      if (CONFIG.apiEndpoint) {
        const res = await fetch(CONFIG.apiEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            message: message.trim(),
            amount: parseFloat(amount),
            currency,
            timestamp: new Date().toISOString(),
          }),
        });

        if (!res.ok) {
          throw new Error("Failed to save message");
        }
      }

      setStep("payment");
    } catch (error) {
      console.error("Error saving message:", error);
      toast.error(
        "Could not save your message, but you can still proceed to payment.",
      );
      setStep("payment");
    } finally {
      setLoading(false);
    }
  }

  function handleSelectPayment() {
    if (!selectedPayment) return;
    setStep("details");
  }

  function handleComplete() {
    setStep("done");
  }

  function resetFlow() {
    setStep("intro");
    setName("");
    setMessage("");
    setAmount("");
    setCurrency("");
    setSelectedPayment(null);
  }

  function goBackToPaymentSelection() {
    setStep("payment");
  }

  const availablePayments = currency ? PAYMENT_METHODS[currency] : [];
  const parsedAmount = parseFloat(amount) || 0;
  const reference = `Gift from ${name.trim() || "Guest"}`;

  return (
    <>
      <div className="pt-6 sm:pt-10 md:pt-14 lg:pt-18">
        <div className="app-spinner-container websiteSpinner" />

        <style
          dangerouslySetInnerHTML={{
            __html: `.websiteDecoration--internal { background-image: url("/images/wedding/floral1.png"); }`,
          }}
        />
        <div className="websiteDecoration websiteDecoration--internal" />

        <div className="app-contrast-color websiteContainer" data-color="">
          <div
            className="app-website-page-content websiteFont__body"
            id="scrollMobile"
          >
            <div className="pure-u-1 websites-section">
              <div className="app-website-render-wrapper sectionRender sectionRender__wrapperHeader">
                <div className="websiteContainerSection">
                  <h1 className="app-contrast-color websiteFont__headingHero mb20">
                    Wedding Gift
                  </h1>
                  <div className="websiteFont__hero websiteLinkChilds websiteLinkChilds--underline">
                    <p>
                      Thank you for celebrating with us and for your generosity!
                    </p>
                  </div>
                </div>
              </div>

              <div className="websiteContainerSection mt30">
                <div className="websiteBox websiteBox--sm">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-rose-100 rounded-full mb-6">
                      <FaHeart className="text-rose-500 text-3xl" />
                    </div>

                    <p className="text-gray-600 mb-6 leading-relaxed max-w-lg mx-auto">
                      We are so grateful to have you celebrate with us. If you
                      would like to give a gift, we would be incredibly thankful
                      for a contribution towards our life together.
                    </p>

                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 mb-6 border border-green-100 max-w-md mx-auto">
                      <p className="text-green-700 text-sm">
                        <span className="font-semibold">Zero fees:</span>{" "}
                        We&apos;ve set up multiple payment options so you can
                        send from anywhere without paying unnecessary fees!
                      </p>
                    </div>

                    <button
                      onClick={() => setStep("form")}
                      className="inline-flex items-center gap-2 px-8 py-4 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-rose-200 hover:shadow-xl hover:shadow-rose-300 transform hover:-translate-y-0.5"
                    >
                      <FaGift className="text-lg" />
                      <span>Send a Gift</span>
                    </button>

                    <div className="mt-8 pt-6 border-t border-gray-100">
                      <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">
                        How it works
                      </p>
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-500 flex-wrap">
                        <span className="bg-gray-100 px-3 py-1 rounded-full">
                          1. Enter details
                        </span>
                        <FaArrowRight
                          className="text-gray-300 hidden sm:block"
                          size={10}
                        />
                        <span className="bg-gray-100 px-3 py-1 rounded-full">
                          2. Choose payment
                        </span>
                        <FaArrowRight
                          className="text-gray-300 hidden sm:block"
                          size={10}
                        />
                        <span className="bg-gray-100 px-3 py-1 rounded-full">
                          3. Send & done!
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* FORM MODAL */}
                {step === "form" && (
                  <Modal onClose={() => setStep("intro")}>
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center justify-center w-14 h-14 bg-rose-100 rounded-full mb-3">
                        <FaGift className="text-rose-500 text-xl" />
                      </div>
                      <h2 className="text-xl font-semibold text-gray-800">
                        Send a Gift
                      </h2>
                      <p className="text-gray-500 text-sm mt-1">
                        Enter your details below
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label
                          htmlFor="gift-name"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Your Name <span className="text-rose-400">*</span>
                        </label>
                        <input
                          type="text"
                          id="gift-name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          autoFocus
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-rose-300 focus:ring-2 focus:ring-rose-100 outline-none transition-all"
                          placeholder="Enter your name"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="gift-amount"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Gift Amount <span className="text-rose-400">*</span>
                        </label>
                        <div className="flex gap-2">
                          <div className="relative flex-1">
                            {currencySymbol && (
                              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                {currencySymbol}
                              </span>
                            )}
                            <input
                              type="number"
                              id="gift-amount"
                              value={amount}
                              onChange={(e) => setAmount(e.target.value)}
                              required
                              min="1"
                              step="any"
                              className={`w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-rose-300 focus:ring-2 focus:ring-rose-100 outline-none transition-all ${currencySymbol ? "pl-8" : ""}`}
                              placeholder="0.00"
                            />
                          </div>
                          <select
                            id="gift-currency"
                            value={currency}
                            onChange={(e) =>
                              setCurrency(e.target.value as Currency)
                            }
                            aria-label="Select currency"
                            className="w-28 px-3 py-3 rounded-lg border border-gray-200 focus:border-rose-300 focus:ring-2 focus:ring-rose-100 outline-none transition-all bg-white"
                          >
                            {CURRENCY_OPTIONS.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.flag} {opt.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                          We&apos;ll show you the best fee-free options for your
                          currency
                        </p>
                      </div>

                      <div>
                        <label
                          htmlFor="gift-message"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Your Message{" "}
                          <span className="text-gray-400">(optional)</span>
                        </label>
                        <textarea
                          id="gift-message"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          rows={3}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-rose-300 focus:ring-2 focus:ring-rose-100 outline-none transition-all resize-none"
                          placeholder="Share your well wishes with us..."
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 px-6 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${loading ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-rose-500 hover:bg-rose-600 text-white"}`}
                      >
                        {loading ? (
                          <>
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            <span>Saving...</span>
                          </>
                        ) : (
                          <>
                            <span>Continue</span>
                            <FaArrowRight size={12} />
                          </>
                        )}
                      </button>
                    </form>
                  </Modal>
                )}

                {/* PAYMENT METHOD SELECTION MODAL */}
                {step === "payment" && (
                  <Modal onClose={() => setStep("form")}>
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center justify-center w-14 h-14 bg-green-100 rounded-full mb-3">
                        <span className="text-xl text-green-600">✓</span>
                      </div>
                      <h2 className="text-xl font-semibold text-gray-800">
                        Choose Payment Method
                      </h2>
                      <p className="text-gray-500 text-sm mt-1">
                        Send{" "}
                        <span className="font-semibold text-gray-800">
                          {currencySymbol}
                          {parsedAmount}
                          {currency === "OTHER" && " (your currency)"}
                        </span>
                      </p>
                    </div>

                    <div className="space-y-3 mb-6">
                      {availablePayments.map((payment) => (
                        <button
                          key={payment.method}
                          onClick={() => setSelectedPayment(payment.method)}
                          className={`w-full p-4 rounded-xl border-2 text-left transition-all ${selectedPayment === payment.method ? "border-rose-400 bg-rose-50" : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"}`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-gray-800">
                                  {payment.label}
                                </span>
                                {payment.recommended && (
                                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                    Recommended
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-500 mt-0.5">
                                {payment.description}
                              </p>
                            </div>
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPayment === payment.method ? "border-rose-400 bg-rose-400" : "border-gray-300"}`}
                            >
                              {selectedPayment === payment.method && (
                                <div className="w-2 h-2 bg-white rounded-full" />
                              )}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={handleSelectPayment}
                      disabled={!selectedPayment}
                      className={`w-full py-3 px-6 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${!selectedPayment ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-rose-500 hover:bg-rose-600 text-white"}`}
                    >
                      <span>Continue</span>
                      <FaArrowRight size={12} />
                    </button>
                  </Modal>
                )}

                {/* PAYMENT DETAILS MODAL */}
                {step === "details" && selectedPayment && (
                  <Modal onClose={goBackToPaymentSelection}>
                    <div className="text-center mb-6">
                      <h2 className="text-xl font-semibold text-gray-800">
                        {selectedPayment === "uk-bank" &&
                          "Bank Transfer Details"}
                        {selectedPayment === "venmo" && "Pay with Venmo"}
                        {selectedPayment === "paypal" && "Pay with PayPal"}
                        {selectedPayment === "wise" && "Pay with Wise"}
                        {selectedPayment === "international-bank" &&
                          "International Bank Transfer"}
                      </h2>
                      <p className="text-gray-500 text-sm mt-1">
                        Send{" "}
                        <span className="font-semibold text-gray-800">
                          {currencySymbol}
                          {parsedAmount}
                        </span>{" "}
                        to complete your gift
                      </p>
                    </div>

                    {selectedPayment === "uk-bank" && (
                      <UKBankDetails reference={reference} />
                    )}
                    {selectedPayment === "venmo" && (
                      <VenmoDetails amount={parsedAmount} name={name} />
                    )}
                    {selectedPayment === "paypal" && (
                      <PayPalDetails
                        amount={parsedAmount}
                        currency={currency}
                      />
                    )}
                    {selectedPayment === "wise" && (
                      <WiseDetails amount={parsedAmount} currency={currency} />
                    )}
                    {selectedPayment === "international-bank" && (
                      <InternationalBankDetails reference={reference} />
                    )}

                    <button
                      onClick={handleComplete}
                      className="w-full py-3 px-6 mt-6 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white"
                    >
                      <FaCheck size={14} />
                      <span>I&apos;ve Sent My Gift</span>
                    </button>

                    <button
                      onClick={goBackToPaymentSelection}
                      className="w-full py-2 px-6 mt-2 text-gray-500 text-sm hover:text-gray-700 transition-colors"
                    >
                      ← Choose different payment method
                    </button>
                  </Modal>
                )}

                {/* SUCCESS STATE */}
                {step === "done" && (
                  <Modal onClose={resetFlow}>
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-20 h-20 bg-rose-100 rounded-full mb-4">
                        <FaHeart className="text-rose-500 text-3xl" />
                      </div>

                      <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        Thank You So Much, {name}!
                      </h2>

                      <p className="text-gray-600 mb-6">
                        Your generosity means the world to us. We can&apos;t
                        wait to celebrate with you!
                      </p>

                      <button
                        onClick={resetFlow}
                        className="w-full py-3 px-6 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-lg transition-colors"
                      >
                        Done
                      </button>
                    </div>
                  </Modal>
                )}

                {!messagesLoading && giftMessages.length > 0 && (
                  <GiftWall messages={giftMessages} />
                )}

                {/* FAQ Section */}
                <div className="mt-12 max-w-2xl mx-auto">
                  <h2 className="text-xl font-bold mb-6 text-center text-gray-800">
                    Frequently Asked Questions
                  </h2>

                  <div className="space-y-4">
                    <details className="group bg-white rounded-xl border border-gray-100 overflow-hidden">
                      <summary className="px-5 py-4 cursor-pointer font-medium text-gray-700 hover:bg-gray-50 transition-colors list-none flex justify-between items-center">
                        <span>Which payment method should I use?</span>
                        <span className="text-gray-400 group-open:rotate-180 transition-transform">
                          ▼
                        </span>
                      </summary>
                      <div className="px-5 pb-4 text-gray-600 text-sm">
                        <strong>UK guests:</strong> UK bank transfer is free and
                        instant.
                        <br />
                        <strong>US guests:</strong> Venmo is the easiest - free
                        and instant!
                        <br />
                        <strong>Europe/International:</strong> Wise offers the
                        best exchange rates with minimal fees.
                        <br />
                        <strong>PayPal:</strong> Works everywhere but please
                        send as &quot;Friends &amp; Family&quot; to avoid fees.
                        <br />
                        <strong>International Bank Transfer:</strong> Use this
                        if you prefer to send directly from your bank.
                      </div>
                    </details>

                    <details className="group bg-white rounded-xl border border-gray-100 overflow-hidden">
                      <summary className="px-5 py-4 cursor-pointer font-medium text-gray-700 hover:bg-gray-50 transition-colors list-none flex justify-between items-center">
                        <span>Are there any fees?</span>
                        <span className="text-gray-400 group-open:rotate-180 transition-transform">
                          ▼
                        </span>
                      </summary>
                      <div className="px-5 pb-4 text-gray-600 text-sm">
                        <strong>UK Bank Transfer:</strong> Completely free
                        <br />
                        <strong>Venmo:</strong> Free for personal payments
                        <br />
                        <strong>Wise:</strong> Free for UK/US bank transfers,
                        small fee for international (much less than traditional
                        banks)
                        <br />
                        <strong>PayPal:</strong> Free if sent as &quot;Friends
                        &amp; Family&quot;
                        <br />
                        <strong>International Bank Transfer:</strong> Varies by
                        bank - SEPA transfers in Europe are usually free
                      </div>
                    </details>

                    <details className="group bg-white rounded-xl border border-gray-100 overflow-hidden">
                      <summary className="px-5 py-4 cursor-pointer font-medium text-gray-700 hover:bg-gray-50 transition-colors list-none flex justify-between items-center">
                        <span>Do I need an account to send a gift?</span>
                        <span className="text-gray-400 group-open:rotate-180 transition-transform">
                          ▼
                        </span>
                      </summary>
                      <div className="px-5 pb-4 text-gray-600 text-sm">
                        <strong>UK Bank Transfer:</strong> No - use your
                        existing bank app
                        <br />
                        <strong>Venmo:</strong> Yes, you&apos;ll need a Venmo
                        account
                        <br />
                        <strong>Wise:</strong> Yes, you&apos;ll need a Wise
                        account to use the Wise link
                        <br />
                        <strong>PayPal:</strong> You can send as a guest or with
                        an account
                        <br />
                        <strong>International Bank Transfer:</strong> No - just
                        use your existing bank
                      </div>
                    </details>

                    <details className="group bg-white rounded-xl border border-gray-100 overflow-hidden">
                      <summary className="px-5 py-4 cursor-pointer font-medium text-gray-700 hover:bg-gray-50 transition-colors list-none flex justify-between items-center">
                        <span>What currency should I send?</span>
                        <span className="text-gray-400 group-open:rotate-180 transition-transform">
                          ▼
                        </span>
                      </summary>
                      <div className="px-5 pb-4 text-gray-600 text-sm">
                        Send in whatever currency is easiest for you! If
                        you&apos;re in the UK, send GBP. If you&apos;re in the
                        US, send USD. For other countries, Wise will convert
                        your local currency at the real exchange rate.
                      </div>
                    </details>
                  </div>
                </div>

                <div className="text-center mt-8 text-gray-500 text-sm">
                  <p>
                    Questions? Reach out to us at{" "}
                    <a
                      href={`mailto:${CONFIG.contactEmail}`}
                      className="text-rose-500 hover:text-rose-600 underline"
                    >
                      {CONFIG.contactEmail}
                    </a>
                  </p>
                </div>
              </div>

              <div
                className="app-website-event-tracking"
                data-track-c="Wedding Website"
                data-track-a="a-show"
                data-track-l="d-desktop+s-gift+o-honeymoon_fund"
                data-track-v=""
                data-track-ni="1"
              />
            </div>
          </div>
        </div>

        <style
          dangerouslySetInnerHTML={{
            __html: `.websiteDecoration--bottom { background-image: url("/images/wedding/floral2.png"); }`,
          }}
        />
        <div className="websiteDecoration websiteDecoration--bottom" />
      </div>
    </>
  );
}
