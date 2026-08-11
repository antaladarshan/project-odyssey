import type { Metadata } from "next";
import { SelfCheckinForm } from "@/components/checkin/SelfCheckinForm";

export const metadata: Metadata = {
  title: "Check In",
};

export default function CheckinPage() {
  return (
    <div className="w-full max-w-md">
      <h1 className="mb-1 text-center font-display text-2xl font-bold text-ice">
        Welcome to Project Odyssey
      </h1>
      <p className="mb-6 text-center text-sm text-sky-tint">
        Upload your ID and a few details to check in — takes about a minute. Traveling with
        others? Add them below too.
      </p>
      <SelfCheckinForm />
    </div>
  );
}
