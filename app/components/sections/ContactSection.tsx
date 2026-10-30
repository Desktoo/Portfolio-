"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  Copy,
  ArrowUpRight,
  Loader2,
  Send,
} from "lucide-react";
import { CONTACT_DATA } from "../../data/portfolioData";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_DATA.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setErrorMessage(null);
    setIsSubmitted(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !result.ok) {
        setErrorMessage(
          result.error || "Unable to send message right now. Please try again."
        );
      } else {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setIsSubmitted(false), 5000);
      }
    } catch {
      setErrorMessage("Network error while sending message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      aria-label="Contact"
      className="scroll-mt-20 py-16 sm:py-24"
    >
      {/* Section Header */}
      <div
        className="mb-12 border-b pb-6"
        style={{ borderColor: "var(--border)" }}
      >
        <div
          className="mb-2 font-mono text-xs font-medium uppercase tracking-wider"
          style={{ color: "var(--accent)" }}
        >
          04 / Contact
        </div>
        <h2
          className="font-display text-3xl font-semibold tracking-tight sm:text-4xl"
          style={{ color: "var(--text-primary)" }}
        >
          Start a Conversation
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
        {/* Left Column: Direct Email Copy & Social Links (Unboxed) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4 }}
          className="flex flex-col justify-between space-y-8 md:col-span-5"
        >
          <div className="space-y-6">
            <p
              className="font-sans text-sm leading-[1.8] sm:text-base"
              style={{ color: "var(--text-secondary)" }}
            >
              Open for senior full-stack roles, distributed systems consulting,
              and technical collaborations. Copy my email directly or send a
              message alongside.
            </p>

            {/* Unboxed 1-Click Email Copy Action */}
            <div
              className="border-y py-5"
              style={{ borderColor: "var(--border)" }}
            >
              <div
                className="font-mono text-[11px] font-medium uppercase tracking-wider"
                style={{ color: "var(--accent)" }}
              >
                Direct Address (Click to Copy)
              </div>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="group relative mt-2 inline-flex items-center gap-2.5 text-left font-display text-lg font-semibold tracking-tight transition-opacity hover:opacity-75 sm:text-xl"
                style={{ color: "var(--text-primary)" }}
                aria-label="Copy email address to clipboard"
              >
                <span
                  className="border-b pb-0.5"
                  style={{ borderColor: "var(--accent)" }}
                >
                  {CONTACT_DATA.email}
                </span>
                {copied ? (
                  <Check
                    className="h-4 w-4 shrink-0"
                    style={{ color: "var(--accent)" }}
                  />
                ) : (
                  <Copy
                    className="h-4 w-4 shrink-0 opacity-60 transition-opacity group-hover:opacity-100"
                    style={{ color: "var(--accent)" }}
                  />
                )}

                {copied && (
                  <span
                    role="status"
                    className="ml-1 font-mono text-[11px] font-medium uppercase tracking-wider"
                    style={{ color: "var(--accent)" }}
                  >
                    Copied to clipboard!
                  </span>
                )}
              </button>

              <div
                className="mt-3 font-mono text-xs"
                style={{ color: "var(--text-secondary)" }}
              >
                Phone:{" "}
                <a
                  href={`tel:${CONTACT_DATA.phone.replace(/\s+/g, "")}`}
                  className="font-medium transition-opacity hover:opacity-75"
                  style={{ color: "var(--text-primary)" }}
                >
                  {CONTACT_DATA.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Unboxed Social & Resume Links */}
          <div className="space-y-3">
            <div
              className="font-mono text-[11px] font-medium uppercase tracking-wider"
              style={{ color: "var(--text-secondary)" }}
            >
              Elsewhere &amp; Resume
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-1">
              {[
                { label: "GitHub", href: CONTACT_DATA.github },
                { label: "LinkedIn", href: CONTACT_DATA.linkedin },
                { label: "Twitter / X", href: CONTACT_DATA.twitter },
                { label: "Resume PDF", href: CONTACT_DATA.resumeUrl },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 border-b pb-0.5 font-display text-sm font-medium tracking-tight transition-opacity hover:opacity-70"
                  style={{
                    borderColor: "var(--border)",
                    color: "var(--text-primary)",
                  }}
                >
                  <span>{link.label}</span>
                  <ArrowUpRight
                    className="h-3.5 w-3.5"
                    style={{ color: "var(--accent)" }}
                  />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Column: Minimalist Unboxed Contact Form (Bottom-Bordered Inputs) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className="md:col-span-7"
        >
          <form onSubmit={handleSubmit} className="space-y-7">
            <div>
              <label
                htmlFor="contact-name"
                className="block font-mono text-[11px] font-medium uppercase tracking-wider"
                style={{ color: "var(--text-secondary)" }}
              >
                Your Name
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Jane Doe"
                className="mt-2 w-full border-b bg-transparent pb-2.5 font-sans text-base outline-none transition-colors"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text-primary)",
                }}
              />
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="block font-mono text-[11px] font-medium uppercase tracking-wider"
                style={{ color: "var(--text-secondary)" }}
              >
                Email Address
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="jane@example.com"
                className="mt-2 w-full border-b bg-transparent pb-2.5 font-sans text-base outline-none transition-colors"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text-primary)",
                }}
              />
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="block font-mono text-[11px] font-medium uppercase tracking-wider"
                style={{ color: "var(--text-secondary)" }}
              >
                Message
              </label>
              <textarea
                id="contact-message"
                rows={4}
                required
                value={formData.message}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    message: e.target.value,
                  }))
                }
                placeholder="Tell me about your project, system architecture, or engineering role..."
                className="mt-2 w-full resize-none border-b bg-transparent pb-2.5 font-sans text-base leading-relaxed outline-none transition-colors"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text-primary)",
                }}
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex cursor-pointer items-center gap-2 border-b-2 pb-1 font-display text-base font-semibold tracking-tight transition-opacity hover:opacity-75 disabled:cursor-not-allowed disabled:opacity-60"
                style={{
                  borderColor: "var(--accent)",
                  color: "var(--text-primary)",
                }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2
                      className="h-4 w-4 animate-spin"
                      style={{ color: "var(--accent)" }}
                    />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send
                      className="h-4 w-4"
                      style={{ color: "var(--accent)" }}
                    />
                  </>
                )}
              </button>

              {isSubmitted && (
                <p
                  role="status"
                  className="font-mono text-xs font-medium uppercase tracking-wider"
                  style={{ color: "var(--accent)" }}
                >
                  ✓ Message sent to inbox — thank you!
                </p>
              )}

              {errorMessage && (
                <p
                  role="alert"
                  className="font-mono text-xs font-medium"
                  style={{ color: "var(--accent)" }}
                >
                  ⚠ {errorMessage}
                </p>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
