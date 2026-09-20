import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { Button } from "@/components/ui/button";
import { QUESTIONS, SUBJECT_META, SUBJECTS, YEARS } from "@/lib/questions";
import { useHydrated } from "@/lib/hydrate";
import { useRampa } from "@/lib/store";
import { ArrowRight, BookOpen, Gauge, Target } from "lucide-react";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const history = useRampa((s) => s.history);
  const hydrated = useHydrated();
  const last = hydrated ? history[0] : undefined;
  const bySubject = Object.fromEntries(
    SUBJECTS.map((sub) => [sub, QUESTIONS.filter((q) => q.subject === sub).length]),
  ) as Record<string, number>;

  return (
    <Shell>
      <section className="flex flex-col gap-10">
        <div className="max-w-2xl">
          <p className="mb-3 text-xs uppercase tracking-[0.22em] text-muted">Cadernos oficiais 2019–2025</p>
          <h1 className="font-display text-4xl leading-[1.1] tracking-tight sm:text-5xl">
            A rampa da primeira fase.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
            Enunciados reais do ITA, gabarito oficial e correção no erro. Monte o treino com o número de
            questões de cada matéria e o nível que você quer enfrentar.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link to="/treino">
                Montar treino
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="ghost" asChild>
              <Link to="/banco">Ver banco</Link>
            </Button>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { k: "Questões", v: String(QUESTIONS.length) },
            { k: "Provas", v: `${YEARS.length} anos` },
            { k: "Matérias", v: "4" },
            { k: "Gabarito", v: "Oficial" },
          ].map((s) => (
            <div key={s.k} className="rounded-[var(--radius-lg)] bg-surface p-4 shadow-[var(--shadow-border)]">
              <dt className="text-[11px] uppercase tracking-[0.16em] text-muted">{s.k}</dt>
              <dd className="mt-1 font-display text-2xl tabular-nums tracking-tight">{s.v}</dd>
            </div>
          ))}
        </dl>

        {last && (
          <div className="rounded-[var(--radius-lg)] bg-elevated p-4 shadow-[var(--shadow-border)]">
            <p className="text-xs uppercase tracking-[0.16em] text-muted">Última sessão</p>
            <p className="mt-1 text-lg">
              {last.hits}/{last.total} acertos · média {last.media.toFixed(1)}
            </p>
            <Link to="/desempenho" className="mt-2 inline-flex text-sm text-accent hover:underline">
              Ver desempenho
            </Link>
          </div>
        )}

        <div className="grid gap-3 sm:grid-cols-2">
          {SUBJECTS.map((sub) => (
            <div key={sub} className="rounded-[var(--radius-lg)] bg-surface p-5 shadow-[var(--shadow-border)]">
              <p className="font-mono text-xs text-muted">{SUBJECT_META[sub].short}</p>
              <h2 className="mt-1 font-display text-xl">{SUBJECT_META[sub].label}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{SUBJECT_META[sub].blurb}</p>
              <p className="mt-3 font-mono text-sm tabular-nums text-fg">{bySubject[sub]} questões</p>
            </div>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              icon: BookOpen,
              t: "Enunciado real",
              d: "Recorte do caderno oficial — figuras, alternativas e notação iguais à prova.",
            },
            {
              icon: Gauge,
              t: "Dificuldade à sua medida",
              d: "Filtre fácil, médio e difícil. Ajuste quantas questões de cada matéria entram.",
            },
            {
              icon: Target,
              t: "Nota e correção",
              d: "Pontuação no formato ITA (0 a 10 por matéria). Errou? Abre gabarito e resolução.",
            },
          ].map((f) => (
            <div key={f.t} className="rounded-[var(--radius-lg)] p-1">
              <f.icon className="size-4 text-muted" strokeWidth={1.75} />
              <h3 className="mt-3 font-medium">{f.t}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{f.d}</p>
            </div>
          ))}
        </div>
      </section>
    </Shell>
  );
}
