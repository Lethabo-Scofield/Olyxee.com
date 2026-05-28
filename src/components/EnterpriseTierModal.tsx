"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Check, Loader2 } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  tierName: string;
};

function todayISO(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

export default function EnterpriseTierModal({ open, onClose, tierName }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [preferredDate, setPreferredDate] = useState(todayISO());
  const [preferredTime, setPreferredTime] = useState("10:00");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      setStatus("idle");
      setErrorMsg(null);
    }
  }, [open, tierName]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/enterprise/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tier: tierName,
          name,
          email,
          company,
          role,
          preferredDate,
          preferredTime,
          message,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        setStatus("error");
        setErrorMsg(data?.error || "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
        >
          <div
            className="absolute inset-0 bg-neutral-950/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto bg-white rounded-3xl shadow-2xl shadow-neutral-900/20 ring-1 ring-neutral-200"
            role="dialog"
            aria-modal="true"
            aria-labelledby="tier-modal-title"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 inline-flex items-center justify-center w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {status === "success" ? (
              <div className="p-8 sm:p-10 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-neutral-900 text-white flex items-center justify-center mb-5">
                  <Check className="w-5 h-5" strokeWidth={2.5} />
                </div>
                <h3 id="tier-modal-title" className="font-serif text-2xl sm:text-3xl text-neutral-900 mb-3 tracking-tight">
                  Request sent
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed max-w-sm mx-auto">
                  Thank you. Someone from the Olyxee team will reply to <strong className="font-medium text-neutral-900">{email}</strong> within one business day to confirm the meeting.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-7 inline-flex items-center justify-center px-6 py-3 rounded-full bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-7 sm:p-9">
                <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-neutral-400 mb-2">
                  Enterprise inquiry
                </p>
                <h3
                  id="tier-modal-title"
                  className="font-serif text-2xl sm:text-3xl text-neutral-900 tracking-tight leading-tight mb-2"
                >
                  Discuss <em className="text-neutral-500">{tierName}</em>
                </h3>
                <p className="text-sm text-neutral-500 font-light leading-relaxed mb-6">
                  Pick a time that works and tell us a little about what you're trying to solve. We'll confirm within one business day.
                </p>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Field
                      label="Name"
                      required
                      value={name}
                      onChange={setName}
                      placeholder="Jane Doe"
                    />
                    <Field
                      label="Work email"
                      type="email"
                      required
                      value={email}
                      onChange={setEmail}
                      placeholder="jane@company.com"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Field
                      label="Company"
                      required
                      value={company}
                      onChange={setCompany}
                      placeholder="Company name"
                    />
                    <Field
                      label="Role"
                      value={role}
                      onChange={setRole}
                      placeholder="Title or function"
                    />
                  </div>

                  <div>
                    <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-neutral-500 mb-2 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" /> Preferred meeting <span className="text-neutral-400 normal-case tracking-normal">*</span>
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="date"
                        required
                        min={todayISO()}
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 transition-all"
                      />
                      <input
                        type="time"
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-neutral-500 mb-2">
                      What would you like to discuss
                    </p>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      placeholder="A few lines about your workflows, scale, integrations, or what's prompting this."
                      className="w-full px-3.5 py-3 text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 transition-all resize-none leading-relaxed"
                    />
                  </div>
                </div>

                {errorMsg && (
                  <p className="mt-4 text-sm text-red-600">{errorMsg}</p>
                )}

                <div className="mt-6 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Sending
                      </>
                    ) : (
                      "Request meeting"
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-neutral-500 mb-1.5 block">
        {label}
        {required && <span className="text-neutral-400"> *</span>}
      </span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3.5 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 transition-all"
      />
    </label>
  );
}
