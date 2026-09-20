import { create } from "zustand";
import { persist } from "zustand/middleware";
import { buildSession, emptyCounts, itaNota, SUBJECTS, byId } from "./questions";
import type {
  Alternative,
  HistoryEntry,
  Mode,
  Session,
  SetupConfig,
  Subject,
} from "./types";

type Store = {
  session: Session | null;
  history: HistoryEntry[];
  start: (config: SetupConfig) => boolean;
  choose: (alt: Alternative) => void;
  reveal: () => void;
  next: () => void;
  prev: () => void;
  goTo: (index: number) => void;
  finish: () => HistoryEntry | null;
  clearSession: () => void;
  clearHistory: () => void;
};

function uid() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function grade(questionId: string, chosen: Alternative | null): boolean {
  const q = byId(questionId);
  if (!q) return false;
  if (q.annulled) return chosen !== null;
  return chosen !== null && chosen === q.answer;
}

export const useRampa = create<Store>()(
  persist(
    (set, get) => ({
      session: null,
      history: [],
      start: (config) => {
        const questions = buildSession(config);
        if (questions.length === 0) return false;
        const session: Session = {
          id: uid(),
          startedAt: Date.now(),
          mode: config.mode,
          questionIds: questions.map((q) => q.id),
          index: 0,
          attempts: {},
          revealed: {},
          config,
        };
        set({ session });
        return true;
      },
      choose: (alt) => {
        const s = get().session;
        if (!s) return;
        const id = s.questionIds[s.index];
        if (!id) return;
        if (s.mode === "treino" && s.revealed[id]) return;
        set({
          session: {
            ...s,
            attempts: {
              ...s.attempts,
              [id]: { questionId: id, chosen: alt, correct: grade(id, alt) },
            },
          },
        });
      },
      reveal: () => {
        const s = get().session;
        if (!s) return;
        const id = s.questionIds[s.index];
        if (!id) return;
        const attempt = s.attempts[id];
        if (!attempt) return;
        set({ session: { ...s, revealed: { ...s.revealed, [id]: true } } });
      },
      next: () => {
        const s = get().session;
        if (!s) return;
        if (s.index < s.questionIds.length - 1) {
          set({ session: { ...s, index: s.index + 1 } });
        }
      },
      prev: () => {
        const s = get().session;
        if (!s) return;
        if (s.index > 0) set({ session: { ...s, index: s.index - 1 } });
      },
      goTo: (index) => {
        const s = get().session;
        if (!s) return;
        if (index < 0 || index >= s.questionIds.length) return;
        set({ session: { ...s, index } });
      },
      finish: () => {
        const s = get().session;
        if (!s) return null;
        const bySubject = Object.fromEntries(
          SUBJECTS.map((sub) => [sub, { hits: 0, total: 0, nota: 0 }]),
        ) as HistoryEntry["bySubject"];
        let hits = 0;
        for (const id of s.questionIds) {
          const q = byId(id);
          if (!q) continue;
          bySubject[q.subject].total += 1;
          const ok = s.attempts[id]?.correct ?? false;
          if (ok) {
            hits += 1;
            bySubject[q.subject].hits += 1;
          }
        }
        for (const sub of SUBJECTS) {
          bySubject[sub].nota = itaNota(bySubject[sub].hits, bySubject[sub].total);
        }
        const scored = SUBJECTS.filter((sub) => bySubject[sub].total > 0 && sub !== "ingles");
        const media =
          scored.length === 0
            ? 0
            : Math.round(
                (scored.reduce((a, sub) => a + bySubject[sub].nota, 0) / scored.length) * 1000,
              ) / 1000;
        const entry: HistoryEntry = {
          id: s.id,
          finishedAt: Date.now(),
          mode: s.mode,
          total: s.questionIds.length,
          hits,
          years: s.config.years,
          bySubject,
          media,
        };
        set({
          session: { ...s, finishedAt: entry.finishedAt },
          history: [entry, ...get().history].slice(0, 40),
        });
        return entry;
      },
      clearSession: () => set({ session: null }),
      clearHistory: () => set({ history: [] }),
    }),
    { name: "rampa-ita", skipHydration: true },
  ),
);

export function defaultConfig(): SetupConfig {
  return {
    years: [2023, 2024, 2025],
    difficulties: ["facil", "medio", "dificil"],
    counts: { ...emptyCounts(), matematica: 4, fisica: 4, quimica: 4, ingles: 3 },
    mode: "treino" as Mode,
  };
}
