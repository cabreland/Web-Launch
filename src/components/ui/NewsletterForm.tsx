"use client";

import { useState, type FormEvent } from "react";

export function NewsletterForm({ variant = "light" }: { variant?: "light" | "dark" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("success");
      setMessage("You're in. Check your inbox to confirm.");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  const isDark = variant === "dark";

  return (
    <form id="newsletter" onSubmit={handleSubmit} className="flex w-full max-w-sm flex-col gap-2">
      <div className="flex gap-2">
        <input
          type="email"
          required
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky ${
            isDark
              ? "border-paper/20 bg-paper/5 text-paper placeholder:text-paper/40"
              : "border-mid/25 bg-white text-ink placeholder:text-mid/60"
          }`}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="shrink-0 rounded-md bg-sky px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-light disabled:opacity-60"
        >
          {status === "loading" ? "..." : "Subscribe"}
        </button>
      </div>
      {message && (
        <p className={`text-xs ${status === "error" ? "text-red-400" : "text-sky-light"}`}>
          {message}
        </p>
      )}
    </form>
  );
}
