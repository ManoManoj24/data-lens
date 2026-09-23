import type { Metadata } from "next";
import { ProgressBoard } from "@/components/progress-ui";

export const metadata: Metadata = {
  title: "Progress",
  description: "Lesson completion stored in this browser.",
};

export default function ProgressPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <p className="eyebrow">This browser</p>
      <h1 className="display mt-2 text-4xl sm:text-5xl">Progress</h1>
      <p className="lead mt-4">
        Mark a lesson complete here or inside the lesson. The list is saved in localStorage on
        this device and is not tied to an account.
      </p>
      <div className="mt-8">
        <ProgressBoard />
      </div>
    </div>
  );
}
