import type { Metadata } from "next";
import { InterviewPractice } from "@/components/InterviewPractice";

export const metadata: Metadata = {
  title: "Interview practice",
  description: "Short scenario cards for data management interviews. You mark your own answers.",
};

export default function InterviewPage() {
  return (
    <div className="mx-auto max-w-page px-5 py-12 md:px-8">
      <p className="text-xs uppercase tracking-[0.18em] text-accent">Practice</p>
      <h1 className="mt-3 max-w-3xl font-serif text-5xl leading-tight md:text-6xl">Interview cards</h1>
      <p className="mt-4 max-w-3xl text-lg text-ink-soft">
        Fifteen prompts a hiring manager might actually ask. Say your answer, reveal a model, then mark whether you had
        it. Marks stay in this browser under their own key and do not change lesson completion.
      </p>
      <div className="mt-8">
        <InterviewPractice />
      </div>
    </div>
  );
}
