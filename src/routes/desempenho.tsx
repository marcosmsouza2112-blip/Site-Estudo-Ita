import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { Button } from "@/components/ui/button";
import { SUBJECT_META, SUBJECTS } from "@/lib/questions";
import { useHydrated } from "@/lib/hydrate";
import { useRampa } from "@/lib/store";

export const Route = createFileRoute("/desempenho")({ component: DesempenhoPage });

function DesempenhoPage() {
  const history = useRampa((s) => s.history);
  const clearHistory = useRampa((s) => s.clearHistory);
  const hydrated = useHydrated();

  if (!hydrated) {
    return (
      <Shell>
        <p className="text-muted">Carregando…</p>
      </Shell>
    );
  }

  const totals = SUBJECTS.map((s) => {
    let hits = 0;
    let total = 0;
    for (const h of history) {
      hits += h.bySubject[s].hits;
      total += h.bySubject[s].total;
    }
    return { s, hits, total, nota: total ? (10 * hits) / total : 0 };
  });
  const allHits = history.reduce((a, h) => a + h.hits, 0);
  const allTotal = history.reduce((a, h) => a + h.total, 0);

  return (
    <Shell>
      <p className="text-xs uppercase tracking-[0.2em] text-muted">Desempenho</p>
      <h1 className="mt-1 font-display text-3xl tracking-tight">Seu histórico neste aparelho</h1>
      <p className="mt-2 max-w-xl text-sm text-muted">
        As sessões ficam só neste navegador — sem conta. A média das exatas segue a regra da 1ª fase
        (Matemática, Física e Química em 0–10).
      </p>

      {history.length === 0 ? (
        <div className="mt-10 rounded-[var(--radius-lg)] bg-surface p-8 text-center shadow-[var(--shadow-border)]">
          <p className="text-muted">Nenhuma sessão ainda.</p>
          <Button asChild className="mt-4">
            <Link to="/treino">Montar treino</Link>
          </Button>
        </div>
      ) : (
        <>
          <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat k="Sessões" v={String(history.length)} />
            <Stat k="Acertos" v={`${allHits}/${allTotal}`} />
            <Stat
              k="Aproveitamento"
              v={allTotal ? `${Math.round((100 * allHits) / allTotal)}%` : "—"}
            />
            <Stat
              k="Média exatas"
              v={
                totals.filter((t) => t.s !== "ingles" && t.total).length
                  ? (
                      totals
                        .filter((t) => t.s !== "ingles" && t.total)
                        .reduce((a, t) => a + t.nota, 0) /
                      totals.filter((t) => t.s !== "ingles" && t.total).length
                    ).toFixed(2)
                  : "—"
              }
            />
          </dl>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {totals.map((t) => (
              <div key={t.s} className="rounded-[var(--radius-lg)] bg-surface p-4 shadow-[var(--shadow-border)]">
                <p className="text-xs text-muted">{SUBJECT_META[t.s].label}</p>
                <p className="mt-1 font-display text-2xl tabular-nums">{t.nota.toFixed(2)}</p>
                <p className="text-xs text-muted tabular-nums">
                  {t.hits}/{t.total}
                </p>
              </div>
            ))}
          </div>

          <h2 className="mt-10 text-sm font-medium">Sessões</h2>
          <ul className="mt-3 flex flex-col gap-2">
            {history.map((h) => (
              <li
                key={h.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-[var(--radius-md)] bg-surface px-4 py-3 shadow-[var(--shadow-border)]"
              >
                <div>
                  <p className="text-sm">
                    {h.hits}/{h.total} · média {h.media.toFixed(2)}
                  </p>
                  <p className="text-xs text-muted">
                    {h.mode === "treino" ? "Treino" : "Simulado"} ·{" "}
                    {new Date(h.finishedAt).toLocaleString("pt-BR")}
                  </p>
                </div>
                <p className="font-mono text-xs text-muted">{h.years.join(" · ")}</p>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={clearHistory}
            className="mt-8 text-xs text-muted hover:text-fg"
          >
            Limpar histórico
          </button>
        </>
      )}
    </Shell>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-[var(--radius-lg)] bg-surface p-4 shadow-[var(--shadow-border)]">
      <dt className="text-[11px] uppercase tracking-[0.14em] text-muted">{k}</dt>
      <dd className="mt-1 font-display text-2xl tabular-nums">{v}</dd>
    </div>
  );
}
