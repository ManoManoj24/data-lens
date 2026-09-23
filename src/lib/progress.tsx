"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { knownModuleIds } from "@/lib/content";

const STORAGE_KEY = "datalens.completedModules";

type ProgressContextValue = {
  ready: boolean;
  completed: Set<string>;
  isComplete: (id: string) => boolean;
  toggle: (id: string) => void;
  count: number;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

function readStoredIds() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (id): id is string => typeof id === "string" && knownModuleIds.has(id),
    );
  } catch {
    return [];
  }
}

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setIds(readStoredIds());
    setReady(true);
  }, []);

  const completed = useMemo(() => new Set(ids), [ids]);

  const toggle = useCallback((id: string) => {
    if (!knownModuleIds.has(id)) return;
    setIds((current) => {
      const next = current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const value = useMemo<ProgressContextValue>(
    () => ({
      ready,
      completed,
      isComplete: (id: string) => completed.has(id),
      toggle,
      count: completed.size,
    }),
    [ready, completed, toggle],
  );

  return (
    <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
  );
}

export function useProgress() {
  const value = useContext(ProgressContext);
  if (!value) {
    throw new Error("useProgress must be used within ProgressProvider");
  }
  return value;
}

export function percent(done: number, total: number) {
  if (total === 0) return 0;
  return Math.round((done / total) * 100);
}
