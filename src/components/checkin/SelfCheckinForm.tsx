"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { Plus, X } from "lucide-react";
import { ADD_ON_OPTIONS } from "@/lib/validations/self-checkin";

const MAX_FILES_PER_TRAVELER = 5;

const inputCls =
  "w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-ice placeholder:text-sky-tint/40 focus:outline-none focus:border-odyssey-blue transition-colors";
const labelCls = "mb-1.5 block text-xs font-medium text-sky-tint";

let travelerKeySeq = 0;
function nextTravelerKey() {
  travelerKeySeq += 1;
  return `traveler-${travelerKeySeq}`;
}

export function SelfCheckinForm() {
  const [travelerKeys, setTravelerKeys] = useState<string[]>(() => [nextTravelerKey()]);
  // A native <input type="file" multiple> replaces its whole selection every
  // time it's used, so picking the front then picking the back would silently
  // drop the front. Files are tracked here instead and merged in on each pick,
  // so travelers can build up front+back (or more) across several taps.
  const [travelerFiles, setTravelerFiles] = useState<Record<string, File[]>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const today = new Date().toISOString().split("T")[0];

  function addTraveler() {
    setTravelerKeys((keys) => [...keys, nextTravelerKey()]);
  }

  function removeTraveler(key: string) {
    setTravelerKeys((keys) => keys.filter((k) => k !== key));
    setTravelerFiles((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  function addFiles(key: string, e: ChangeEvent<HTMLInputElement>) {
    const picked = Array.from(e.target.files ?? []);
    e.target.value = ""; // reset so picking again fires onChange and doesn't just re-select the same files
    if (picked.length === 0) return;
    setTravelerFiles((prev) => ({
      ...prev,
      [key]: [...(prev[key] ?? []), ...picked].slice(0, MAX_FILES_PER_TRAVELER),
    }));
  }

  function removeFile(key: string, fileIndex: number) {
    setTravelerFiles((prev) => ({
      ...prev,
      [key]: (prev[key] ?? []).filter((_, i) => i !== fileIndex),
    }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setFieldErrors({});

    if (travelerKeys.some((key) => (travelerFiles[key]?.length ?? 0) === 0)) {
      setError("Every traveler needs at least one ID photo or PDF");
      return;
    }

    setStatus("submitting");
    const formData = new FormData(e.currentTarget);
    travelerKeys.forEach((key, index) => {
      for (const file of travelerFiles[key] ?? []) {
        formData.append(`traveler_id_card_${index}`, file);
      }
    });

    const res = await fetch("/api/self-checkin", { method: "POST", body: formData });
    const body = await res.json().catch(() => ({}));

    if (!res.ok) {
      setStatus("idle");
      setError(body.error ?? "Something went wrong. Try again.");
      setFieldErrors(body.fieldErrors ?? {});
      return;
    }

    setStatus("done");
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-white/10 bg-ink/60 p-6 text-center">
        <p className="text-lg font-semibold text-ice">You&apos;re checked in!</p>
        <p className="mt-2 text-sm text-sky-tint">
          Thanks — our team will confirm your beds shortly. See you soon.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-ink/60 p-5"
    >
      <div>
        <label className={labelCls} htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className={inputCls}
          placeholder="you@example.com"
        />
        {fieldErrors.email && <p className="mt-1 text-xs text-coral">{fieldErrors.email[0]}</p>}
      </div>

      <div>
        <label className={labelCls} htmlFor="phone">
          Phone (optional)
        </label>
        <input id="phone" name="phone" type="tel" className={inputCls} placeholder="+91 …" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelCls} htmlFor="checkin_date">
            Check-in
          </label>
          <input
            id="checkin_date"
            name="checkin_date"
            type="date"
            min={today}
            required
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls} htmlFor="checkout_date">
            Check-out
          </label>
          <input
            id="checkout_date"
            name="checkout_date"
            type="date"
            min={today}
            required
            className={inputCls}
          />
        </div>
      </div>
      {fieldErrors.checkout_date && (
        <p className="-mt-2 text-xs text-coral">{fieldErrors.checkout_date[0]}</p>
      )}

      <div>
        <span className={labelCls}>Add-ons (optional)</span>
        <div className="flex flex-col gap-2">
          {ADD_ON_OPTIONS.map((addOn) => (
            <label key={addOn} className="flex items-center gap-2 text-sm text-ice">
              <input
                type="checkbox"
                name="add_ons"
                value={addOn}
                className="h-4 w-4 rounded border-white/20 bg-white/5 accent-odyssey-blue"
              />
              {addOn}
            </label>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10 pt-4">
        <span className={labelCls}>
          Travelers — add everyone in your group, each needs at least one ID
          photo or PDF (front + back is fine — up to 5 files)
        </span>
        <div className="flex flex-col gap-4">
          {travelerKeys.map((key, index) => (
            <div key={key} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-medium text-sky-tint">Traveler {index + 1}</span>
                {travelerKeys.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTraveler(key)}
                    aria-label={`Remove traveler ${index + 1}`}
                    className="text-sky-tint/60 hover:text-coral"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <input
                  name="traveler_name"
                  required
                  className={inputCls}
                  placeholder="Full name"
                />
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  multiple
                  onChange={(e) => addFiles(key, e)}
                  className="w-full text-sm text-sky-tint file:mr-3 file:rounded-lg file:border-0 file:bg-odyssey-blue file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white"
                />
                {(travelerFiles[key]?.length ?? 0) > 0 ? (
                  <ul className="flex flex-col gap-1.5">
                    {travelerFiles[key]!.map((file, fileIndex) => (
                      <li
                        key={`${file.name}-${fileIndex}`}
                        className="flex items-center justify-between gap-2 rounded-lg bg-white/5 px-2.5 py-1.5 text-xs text-sky-tint"
                      >
                        <span className="truncate">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => removeFile(key, fileIndex)}
                          aria-label={`Remove ${file.name}`}
                          className="shrink-0 text-sky-tint/60 hover:text-coral"
                        >
                          <X size={12} />
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : null}
                <p className="text-xs text-sky-tint/60">
                  {(travelerFiles[key]?.length ?? 0) === 0
                    ? "Front + back of an ID? Select both at once, or tap again to add another."
                    : (travelerFiles[key]?.length ?? 0) < MAX_FILES_PER_TRAVELER
                      ? "Tap the button again to add another file (e.g. the back of the ID)."
                      : `Up to ${MAX_FILES_PER_TRAVELER} files reached.`}
                </p>
              </div>
            </div>
          ))}
        </div>
        {fieldErrors.traveler_name && (
          <p className="mt-1 text-xs text-coral">{fieldErrors.traveler_name[0]}</p>
        )}
        {fieldErrors.traveler_id_card && (
          <p className="mt-1 text-xs text-coral">{fieldErrors.traveler_id_card[0]}</p>
        )}
        <button
          type="button"
          onClick={addTraveler}
          className="mt-3 flex items-center gap-1.5 text-sm font-medium text-odyssey-blue hover:text-mascot-glow"
        >
          <Plus size={15} />
          Add another traveler
        </button>
      </div>

      {error && <p className="text-sm text-coral">{error}</p>}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-odyssey-blue px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-azure-deep disabled:opacity-60"
      >
        {status === "submitting" ? "Submitting…" : "Check in"}
      </button>
    </form>
  );
}
