import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Shell } from "@/components/shell";
import { QuestionView } from "@/components/question-view";
import {
  DIFFICULTIES,
  DIFFICULTY_META,
  filterBank,
  QUESTIONS,
  SUBJECT_META,
  SUBJECTS,
  YEARS,
} from "@/lib/questions";
import type { Alternative, Difficulty, Subject } from "@/lib/types";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export const Route = createFileRoute("/banco")({ component: BancoPage });

function BancoPage() {
  const [years, setYears] = useState<number[]>([...YEARS]);
  const [subs, setSubs] = useState<Subject[]>([...SUBJECTS]);
  const [diffs, setDiffs] = useState<Difficulty[]>([...DIFFICULTIES]);
  const [openId, setOpenId] = useState<string | null>(null);
  const [picked, setPicked] = useState<Record<string, Alternative>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const list = useMemo(
    () => filterBank({ years, subjects: subs, difficulties: diffs }),
    [years, subs, diffs],
  );
  const open = list.find((q) => q.id === openId) ?? null;

  function toggle<T>(arr: T[], v: T, fallback: T[]): T[] {
    const next = arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
    return next.length ? next : fallback;
  }

  return (
    <Shell>
      <p className="text-xs uppercase tracking-[0.2em] text-muted">Banco</p>
      <h1 className="mt-1 font-display text-3xl tracking-tight">Cadernos 2019–2025</h1>
      <p className="mt-2 max-w-xl text-sm text-muted">
        {list.length} de {QUESTIONS.length} questões oficiais no filtro. Abra para ver o enunciado real e
        corrigir.
      </p>

      <div className="mt-6 flex flex-col gap-3">
        <FilterRow
          label="Ano"
          items={YEARS.map((y) => ({ id: y, label: String(y), on: years.includes(y) }))}
          onToggle={(id) => setYears((p) => toggle(p, id as number, [...YEARS]))}
        />
        <FilterRow
          label="Matéria"
          items={SUBJECTS.map((s) => ({
            id: s,
            label: SUBJECT_META[s].short,
            on: subs.includes(s),
          }))}
          onToggle={(id) => setSubs((p) => toggle(p, id as Subject, [...SUBJECTS]))}
        />
        <FilterRow
          label="Nível"
          items={DIFFICULTIES.map((d) => ({
            id: d,
            label: DIFFICULTY_META[d].label,
            on: diffs.includes(d),
          }))}
          onToggle={(id) => setDiffs((p) => toggle(p, id as Difficulty, [...DIFFICULTIES]))}
        />
      </div>

      <ul className="mt-6 divide-y divide-border rounded-[var(--radius-lg)] bg-surface shadow-[var(--shadow-border)]">
        {list.map((q) => (
          <li key={q.id}>
            <button
              type="button"
              onClick={() => setOpenId(q.id)}
              className="flex min-h-14 w-full items-center gap-3 px-4 py-3 text-left hover:bg-elevated"
            >
              <span className="w-16 shrink-0 font-mono text-xs text-muted">{q.year}</span>
              <span className="w-10 shrink-0 font-mono text-xs">{SUBJECT_META[q.subject].short}</span>
              <span className="min-w-0 flex-1 truncate text-sm">
                nº {q.number} · {q.topic}
              </span>
              <span className="hidden text-xs text-muted sm:inline">{DIFFICULTY_META[q.difficulty].label}</span>
            </button>
          </li>
        ))}
      </ul>

      {open && (
        <div className="fixed inset-0 z-40 flex items-end justify-center bg-bg/70 p-0 sm:items-center sm:p-6">
          <div className="max-h-[92dvh] w-full max-w-3xl overflow-y-auto rounded-t-[var(--radius-xl)] bg-bg p-4 shadow-[var(--shadow-border)] sm:rounded-[var(--radius-xl)] sm:p-6">
            <div className="mb-4 flex justify-end">
              <button
                type="button"
                className="grid size-11 place-items-center rounded-[var(--radius-sm)] bg-elevated"
                onClick={() => setOpenId(null)}
                aria-label="Fechar"
              >
                <X className="size-4" />
              </button>
            </div>
            <QuestionView
              q={open}
              chosen={picked[open.id] ?? null}
              revealed={!!revealed[open.id]}
              onChoose={(a) => setPicked((p) => ({ ...p, [open.id]: a }))}
              onReveal={() => setRevealed((p) => ({ ...p, [open.id]: true }))}
            />
          </div>
        </div>
      )}
    </Shell>
  );
}

function FilterRow({
  label,
  items,
  onToggle,
}: {
  label: string;
  items: { id: string | number; label: string; on: boolean }[];
  onToggle: (id: string | number) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="w-14 text-xs text-muted">{label}</span>
      {items.map((it) => (
        <button
          key={String(it.id)}
          type="button"
          onClick={() => onToggle(it.id)}
          className={cn(
            "min-h-9 rounded-full px-3 text-xs shadow-[var(--shadow-border)]",
            it.on ? "bg-accent text-accent-fg" : "bg-elevated text-muted",
          )}
        >
          {it.label}
        </button>
      ))}
    </div>
  );
}
