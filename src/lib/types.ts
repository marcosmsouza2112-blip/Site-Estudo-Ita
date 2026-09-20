export type Subject = "matematica" | "fisica" | "quimica" | "ingles";
export type Difficulty = "facil" | "medio" | "dificil";
export type Alternative = "A" | "B" | "C" | "D" | "E";
export type Mode = "treino" | "simulado";

export type Question = {
  id: string;
  year: number;
  subject: Subject;
  number: number;
  difficulty: Difficulty;
  topic: string;
  stem: string;
  image: string;
  answer: Alternative | null;
  annulled: boolean;
  width: number;
  height: number;
};

export type Counts = Record<Subject, number>;

export type SetupConfig = {
  years: number[];
  difficulties: Difficulty[];
  counts: Counts;
  mode: Mode;
};

export type Attempt = {
  questionId: string;
  chosen: Alternative | null;
  correct: boolean;
};

export type Session = {
  id: string;
  startedAt: number;
  finishedAt?: number;
  mode: Mode;
  questionIds: string[];
  index: number;
  attempts: Record<string, Attempt>;
  revealed: Record<string, boolean>;
  config: SetupConfig;
};

export type HistoryEntry = {
  id: string;
  finishedAt: number;
  mode: Mode;
  total: number;
  hits: number;
  years: number[];
  bySubject: Record<Subject, { hits: number; total: number; nota: number }>;
  media: number;
};
