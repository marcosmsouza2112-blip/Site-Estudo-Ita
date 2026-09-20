import { ALTERNATIVES, SUBJECT_META, DIFFICULTY_META } from "@/lib/questions";
import { explain } from "@/lib/explain";
import type { Alternative, Question } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Ban, Check, X } from "lucide-react";

export function QuestionView({
  q,
  chosen,
  revealed,
  onChoose,
  onReveal,
}: {
  q: Question;
  chosen: Alternative | null;
  revealed: boolean;
  onChoose: (a: Alternative) => void;
  onReveal?: () => void;
}) {
  const meta = SUBJECT_META[q.subject];
  const diff = DIFFICULTY_META[q.difficulty];
  const showKey = revealed && chosen !== null;

  return (
    <article className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
        <span className="rounded-full bg-elevated px-2.5 py-1 text-fg shadow-[var(--shadow-border)]">
          {meta.short} · ITA {q.year} · nº {q.number}
        </span>
        <span className="rounded-full bg-elevated px-2.5 py-1 shadow-[var(--shadow-border)]">
          {diff.label}
        </span>
        <span className="rounded-full bg-elevated px-2.5 py-1 shadow-[var(--shadow-border)]">
          {q.topic}
        </span>
        {q.annulled && (
          <span className="inline-flex items-center gap-1 rounded-full bg-warn/15 px-2.5 py-1 text-warn">
            <Ban className="size-3" /> Anulada
          </span>
        )}
      </div>

      <div className="rounded-[var(--radius-xl)] bg-paper p-2 shadow-[var(--shadow-border)]">
        <div className="overflow-hidden rounded-[var(--radius-lg)] bg-paper">
          <img
            src={q.image}
            alt={`Enunciado oficial ITA ${q.year}, ${meta.label} questão ${q.number}`}
            width={q.width}
            height={q.height}
            className="block w-full h-auto bg-paper"
          />
        </div>
        <p className="px-3 py-2 text-[11px] tracking-wide text-ink-muted">
          Caderno oficial ITA {q.year} · 1ª fase · enunciado reproduzido integralmente
        </p>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {ALTERNATIVES.map((alt) => {
          const isChosen = chosen === alt;
          const isCorrect = q.annulled ? isChosen : alt === q.answer;
          const state = !showKey
            ? isChosen
              ? "picked"
              : "idle"
            : isCorrect
              ? "right"
              : isChosen
                ? "wrong"
                : "idle";
          return (
            <button
              key={alt}
              type="button"
              onClick={() => onChoose(alt)}
              disabled={showKey}
              className={cn(
                "min-h-12 rounded-[var(--radius-md)] font-mono text-base font-medium shadow-[var(--shadow-border)] transition-[background-color,color,transform] duration-150 ease-[var(--ease-out)] active:not-disabled:scale-[0.96]",
                state === "idle" && "bg-elevated text-fg hover:bg-surface",
                state === "picked" && "bg-accent text-accent-fg",
                state === "right" && "bg-success text-accent-fg",
                state === "wrong" && "bg-danger text-paper",
              )}
            >
              {alt}
            </button>
          );
        })}
      </div>

      {!showKey && onReveal && (
        <Button onClick={onReveal} disabled={!chosen} className="w-full sm:w-auto">
          Corrigir
        </Button>
      )}

      {showKey && (
        <Correction q={q} chosen={chosen} />
      )}
    </article>
  );
}

function Correction({ q, chosen }: { q: Question; chosen: Alternative | null }) {
  const ok = q.annulled || chosen === q.answer;
  return (
    <div className="rounded-[var(--radius-lg)] bg-elevated p-4 shadow-[var(--shadow-border)]">
      <div className="mb-3 flex items-center gap-2">
        {ok ? (
          <Check className="size-4 text-success" />
        ) : (
          <X className="size-4 text-danger" />
        )}
        <p className="text-sm font-medium">
          {q.annulled
            ? "Anulada — ponto concedido"
            : ok
              ? "Correto"
              : `Incorreto — gabarito ${q.answer}`}
        </p>
      </div>
      <p className="whitespace-pre-wrap text-sm leading-relaxed text-muted">{explain(q)}</p>
    </div>
  );
}
