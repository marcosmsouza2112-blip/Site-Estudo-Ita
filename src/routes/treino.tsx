import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Shell } from "@/components/shell";
import { Button } from "@/components/ui/button";
import {
  availableCounts,
  DIFFICULTIES,
  DIFFICULTY_META,
  SUBJECT_META,
  SUBJECTS,
  YEARS,
} from "@/lib/questions";
import { defaultConfig, useRampa } from "@/lib/store";
import type { Counts, Difficulty, Mode, Subject } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";

export const Route = createFileRoute("/treino")({ component: TreinoPage });

function TreinoPage() {
  const nav = useNavigate();
  const start = useRampa((s) => s.start);
  const [years, setYears] = useState<number[]>(defaultConfig().years);
  const [difficulties, setDifficulties] = useState<Difficulty[]>(defaultConfig().difficulties);
  const [counts, setCounts] = useState<Counts>(defaultConfig().counts);
  const [mode, setMode] = useState<Mode>("treino");
  const [error, setError] = useState("");

  const max = useMemo(() => availableCounts(years, difficulties), [years, difficulties]);
  const total = SUBJECTS.reduce((a, s) => a + counts[s], 0);

  function toggleYear(y: number) {
    setYears((prev) => {
      const next = prev.includes(y) ? prev.filter((x) => x !== y) : [...prev, y].sort();
      return next.length ? next : prev;
    });
  }
  function toggleDiff(d: Difficulty) {
    setDifficulties((prev) => {
      const next = prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d];
      return next.length ? next : prev;
    });
  }
  function setCount(sub: Subject, n: number) {
    const capped = Math.max(0, Math.min(n, max[sub]));
    setCounts((c) => ({ ...c, [sub]: capped }));
  }

  function go() {
    const nextCounts = { ...counts };
    for (const s of SUBJECTS) nextCounts[s] = Math.min(nextCounts[s], max[s]);
    if (SUBJECTS.every((s) => nextCounts[s] === 0)) {
      setError("Escolha pelo menos uma questão.");
      return;
    }
    const ok = start({ years, difficulties, counts: nextCounts, mode });
    if (!ok) {
      setError("Não há questões com esses filtros.");
      return;
    }
    nav({ to: "/prova" });
  }

  return (
    <Shell>
      <div className="mx-auto max-w-2xl">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">Montar sessão</p>
        <h1 className="mt-1 font-display text-3xl tracking-tight">Quantas de cada matéria</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Recorte os cadernos, o nível e o tamanho do treino. No modo treino a correção abre na hora; no
          simulado, só no fim.
        </p>

        <section className="mt-8">
          <h2 className="text-sm font-medium">Anos</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {YEARS.map((y) => {
              const on = years.includes(y);
              return (
                <button
                  key={y}
                  type="button"
                  onClick={() => toggleYear(y)}
                  className={cn(
                    "min-h-11 rounded-full px-3.5 text-sm shadow-[var(--shadow-border)] transition-[background-color,color] duration-150",
                    on ? "bg-accent text-accent-fg" : "bg-elevated text-muted hover:text-fg",
                  )}
                >
                  {y}
                </button>
              );
            })}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-sm font-medium">Dificuldade</h2>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {DIFFICULTIES.map((d) => {
              const on = difficulties.includes(d);
              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => toggleDiff(d)}
                  className={cn(
                    "rounded-[var(--radius-md)] p-3 text-left shadow-[var(--shadow-border)] transition-[background-color] duration-150 min-h-11",
                    on ? "bg-elevated" : "bg-surface text-muted",
                  )}
                >
                  <span className="block text-sm font-medium text-fg">{DIFFICULTY_META[d].label}</span>
                  <span className="mt-0.5 block text-xs text-muted">{DIFFICULTY_META[d].hint}</span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-sm font-medium">Questões por matéria</h2>
          <ul className="mt-3 flex flex-col gap-2">
            {SUBJECTS.map((sub) => (
              <li
                key={sub}
                className="flex items-center justify-between gap-3 rounded-[var(--radius-lg)] bg-surface px-4 py-3 shadow-[var(--shadow-border)]"
              >
                <div>
                  <p className="text-sm font-medium">{SUBJECT_META[sub].label}</p>
                  <p className="text-xs text-muted tabular-nums">{max[sub]} disponíveis no filtro</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="grid size-11 place-items-center rounded-[var(--radius-sm)] bg-elevated"
                    onClick={() => setCount(sub, counts[sub] - 1)}
                    aria-label={`Menos ${SUBJECT_META[sub].label}`}
                  >
                    <Minus className="size-4" />
                  </button>
                  <span className="w-8 text-center font-mono text-lg tabular-nums">{Math.min(counts[sub], max[sub])}</span>
                  <button
                    type="button"
                    className="grid size-11 place-items-center rounded-[var(--radius-sm)] bg-elevated"
                    onClick={() => setCount(sub, counts[sub] + 1)}
                    aria-label={`Mais ${SUBJECT_META[sub].label}`}
                  >
                    <Plus className="size-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-sm font-medium">Modo</h2>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {(
              [
                ["treino", "Treino", "Corrige na hora, com resolução se errar."],
                ["simulado", "Simulado", "Gabarito só no encerramento, como na prova."],
              ] as const
            ).map(([id, label, hint]) => (
              <button
                key={id}
                type="button"
                onClick={() => setMode(id)}
                className={cn(
                  "rounded-[var(--radius-md)] p-4 text-left shadow-[var(--shadow-border)] min-h-11",
                  mode === id ? "bg-elevated" : "bg-surface text-muted",
                )}
              >
                <span className="block text-sm font-medium text-fg">{label}</span>
                <span className="mt-1 block text-xs text-muted">{hint}</span>
              </button>
            ))}
          </div>
        </section>

        {error && <p className="mt-4 text-sm text-danger">{error}</p>}

        <div className="mt-8 flex items-center justify-between gap-3">
          <p className="text-sm text-muted tabular-nums">{total} questões nesta sessão</p>
          <Button onClick={go} disabled={total === 0}>
            Começar
          </Button>
        </div>
      </div>
    </Shell>
  );
}
