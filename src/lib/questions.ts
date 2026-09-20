import raw from "@/data/questions.json";
import type { Alternative, Counts, Difficulty, Question, SetupConfig, Subject } from "./types";

export const QUESTIONS = raw as Question[];
export const YEARS = [2019, 2020, 2021, 2022, 2023, 2024, 2025] as const;
export const SUBJECTS: Subject[] = ["matematica", "fisica", "quimica", "ingles"];
export const DIFFICULTIES: Difficulty[] = ["facil", "medio", "dificil"];
export const ALTERNATIVES: Alternative[] = ["A", "B", "C", "D", "E"];

export const SUBJECT_META: Record<
  Subject,
  { label: string; short: string; blurb: string }
> = {
  matematica: {
    label: "Matemática",
    short: "MAT",
    blurb: "Álgebra, geometria, combinatória e análise.",
  },
  fisica: {
    label: "Física",
    short: "FIS",
    blurb: "Mecânica, ondas, eletromagnetismo e moderna.",
  },
  quimica: {
    label: "Química",
    short: "QUI",
    blurb: "Geral, físico-química e orgânica.",
  },
  ingles: {
    label: "Inglês",
    short: "ING",
    blurb: "Interpretação de texto — prova eliminatória.",
  },
};

export const DIFFICULTY_META: Record<Difficulty, { label: string; hint: string }> = {
  facil: { label: "Fácil", hint: "Abertura de prova — aplicação direta" },
  medio: { label: "Médio", hint: "Padrão ITA — dois ou três passos" },
  dificil: { label: "Difícil", hint: "Fechamento de prova — olimpíada" },
};

export function byId(id: string): Question | undefined {
  return QUESTIONS.find((q) => q.id === id);
}

export function filterBank(opts: {
  years?: number[];
  subjects?: Subject[];
  difficulties?: Difficulty[];
}): Question[] {
  const years = opts.years && opts.years.length ? new Set(opts.years) : null;
  const subjects = opts.subjects && opts.subjects.length ? new Set(opts.subjects) : null;
  const diffs = opts.difficulties && opts.difficulties.length ? new Set(opts.difficulties) : null;
  return QUESTIONS.filter((q) => {
    if (years && !years.has(q.year)) return false;
    if (subjects && !subjects.has(q.subject)) return false;
    if (diffs && !diffs.has(q.difficulty)) return false;
    return true;
  });
}

export function availableCounts(
  years: number[],
  difficulties: Difficulty[],
): Counts {
  const pool = filterBank({ years, difficulties });
  const counts: Counts = { matematica: 0, fisica: 0, quimica: 0, ingles: 0 };
  for (const q of pool) counts[q.subject] += 1;
  return counts;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

export function buildSession(config: SetupConfig): Question[] {
  const picked: Question[] = [];
  for (const subject of SUBJECTS) {
    const n = config.counts[subject];
    if (n <= 0) continue;
    const pool = shuffle(
      filterBank({
        years: config.years,
        subjects: [subject],
        difficulties: config.difficulties,
      }),
    );
    picked.push(...pool.slice(0, n));
  }
  return shuffle(picked);
}

export function itaNota(hits: number, total: number): number {
  if (total <= 0) return 0;
  return Math.round((10 * hits * 1000) / total) / 1000;
}

export function emptyCounts(): Counts {
  return { matematica: 0, fisica: 0, quimica: 0, ingles: 0 };
}
