import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { Button } from "@/components/ui/button";
import { reviewTopics } from "@/lib/explain";
import { byId, SUBJECT_META, SUBJECTS } from "@/lib/questions";
import { useHydrated } from "@/lib/hydrate";
import { useRampa } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";

export const Route = createFileRoute("/resultado")({ component: ResultadoPage });

function ResultadoPage() {
  const session = useRampa((s) => s.session);
  const history = useRampa((s) => s.history);
  const last = history[0];
  const hydrated = useHydrated();

  if (!hydrated) {
    return (
      <Shell>
        <p className="text-muted">Carregando resultado…</p>
      </Shell>
    );
  }

  if (!session?.finishedAt || !last) {
    return (
      <Shell>
        <p className="text-muted">Nenhum resultado para mostrar.</p>
        <Button asChild className="mt-4">
          <Link to="/treino">Montar treino</Link>
        </Button>
      </Shell>
    );
  }

  const questions = session.questionIds
    .map((id) => byId(id))
    .filter((q): q is NonNullable<typeof q> => Boolean(q));
  const wrong = questions.filter((q) => !(session.attempts[q.id]?.correct ?? false));
  const topics = reviewTopics(wrong);
  const mediaOk = last.media >= 5;
  const mins = SUBJECTS.filter((s) => last.bySubject[s].total > 0).every((s) => {
    const b = last.bySubject[s];
    return b.total === 0 || b.hits / b.total >= 5 / 12;
  });

  return (
    <Shell>
      <p className="text-xs uppercase tracking-[0.2em] text-muted">Sessão encerrada</p>
      <h1 className="mt-1 font-display text-4xl tracking-tight tabular-nums">
        {last.hits}
        <span className="text-muted">/{last.total}</span>
      </h1>
      <p className="mt-2 text-muted">
        Média das exatas {last.media.toFixed(2)} / 10
        {mediaOk && mins ? " — corte da 1ª fase, neste recorte." : " — abaixo do corte 5,0 neste recorte."}
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {SUBJECTS.filter((s) => last.bySubject[s].total > 0).map((s) => {
          const b = last.bySubject[s];
          return (
            <div key={s} className="rounded-[var(--radius-lg)] bg-surface p-4 shadow-[var(--shadow-border)]">
              <p className="text-xs uppercase tracking-[0.14em] text-muted">{SUBJECT_META[s].label}</p>
              <p className="mt-1 font-display text-2xl tabular-nums">{b.nota.toFixed(2)}</p>
              <p className="text-sm text-muted tabular-nums">
                {b.hits}/{b.total} acertos
              </p>
              <div className="mt-3 h-1 rounded-full bg-elevated">
                <div
                  className="h-full rounded-full bg-accent"
                  style={{ width: `${b.total ? (b.hits / b.total) * 100 : 0}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {topics.length > 0 && (
        <section className="mt-8">
          <h2 className="text-sm font-medium">Revisar depois do erro</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {topics.map((t) => (
              <li key={t} className="rounded-full bg-elevated px-3 py-1.5 text-xs text-muted shadow-[var(--shadow-border)]">
                {t}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-8">
        <h2 className="text-sm font-medium">Correção questão a questão</h2>
        <ol className="mt-3 flex flex-col gap-2">
          {session.questionIds.map((id, i) => {
            const q = byId(id);
            if (!q) return null;
            const a = session.attempts[id];
            const ok = a?.correct ?? false;
            return (
              <li
                key={id}
                className="flex items-start gap-3 rounded-[var(--radius-md)] bg-surface p-3 shadow-[var(--shadow-border)]"
              >
                <span
                  className={cn(
                    "mt-0.5 grid size-7 shrink-0 place-items-center rounded-full",
                    ok ? "bg-success/15 text-success" : "bg-danger/15 text-danger",
                  )}
                >
                  {ok ? <Check className="size-3.5" /> : <X className="size-3.5" />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm">
                    {i + 1}. {SUBJECT_META[q.subject].short} {q.year} nº {q.number}
                    {q.annulled ? " · anulada" : ""}
                  </p>
                  <p className="text-xs text-muted">
                    {q.topic}
                    {a?.chosen ? ` · você: ${a.chosen}` : " · em branco"}
                    {q.answer ? ` · gabarito: ${q.answer}` : ""}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild>
          <Link to="/treino">Novo treino</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link to="/desempenho">Desempenho</Link>
        </Button>
      </div>
    </Shell>
  );
}
