"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const KEY = "datalens.completedModules";

type ProgressContextValue = {
  ready: boolean;
  completed: string[];
  isComplete: (id: string) => boolean;
  markComplete: (id: string) => void;
};

const ProgressContext = createContext<ProgressContextValue>({
  ready: false,
  completed: [],
  isComplete: () => false,
  markComplete: () => {},
});

function readCompleted(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (Array.isArray(parsed)) {
      return parsed.filter((item): item is string => typeof item === "string");
    }
    if (parsed && typeof parsed === "object") {
      return Object.entries(parsed as Record<string, unknown>)
        .filter(([, value]) => Boolean(value))
        .map(([key]) => key);
    }
  } catch {
    return [];
  }
  return [];
}

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [completed, setCompleted] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setCompleted(readCompleted());
    setReady(true);
  }, []);

  const value = useMemo<ProgressContextValue>(
    () => ({
      ready,
      completed,
      isComplete: (id) => completed.includes(id),
      markComplete: (id) => {
        setCompleted((prev) => {
          if (prev.includes(id)) return prev;
          const next = [...prev, id];
          localStorage.setItem(KEY, JSON.stringify(next));
          return next;
        });
      },
    }),
    [completed, ready],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  return useContext(ProgressContext);
}
