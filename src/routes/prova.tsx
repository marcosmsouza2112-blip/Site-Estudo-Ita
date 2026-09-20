import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { QuestionView } from "@/components/question-view";
import { Button } from "@/components/ui/button";
import { byId } from "@/lib/questions";
import { useHydrated } from "@/lib/hydrate";
import { useRampa } from "@/lib/store";
import type { Alternative } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Flag } from "lucide-react";

export const Route = createFileRoute("/prova")({ component: ProvaPage });

function ProvaPage() {
  const nav = useNavigate();
  const session = useRampa((s) => s.session);
  const choose = useRampa((s) => s.choose);
  const reveal = useRampa((s) => s.reveal);
  const next = useRampa((s) => s.next);
  const prev = useRampa((s) => s.prev);
  const goTo = useRampa((s) => s.goTo);
  const finish = useRampa((s) => s.finish);
  const hydrated = useHydrated();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!session) return;
      const k = e.key.toUpperCase();
      if (["A", "B", "C", "D", "E"].includes(k)) choose(k as Alternative);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Enter") {
        const id = session.questionIds[session.index];
        if (id && session.mode === "treino" && session.attempts[id] && !session.revealed[id]) {
          reveal();
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [session, choose, next, prev, reveal]);

  if (!hydrated) {
    return (
      <div className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center px-4">
        <p className="text-muted">Carregando sessão…</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="text-muted">Nenhuma sessão em andamento.</p>
        <Button asChild>
          <Link to="/treino">Montar treino</Link>
        </Button>
      </div>
    );
  }

  const id = session.questionIds[session.index]!;
  const q = byId(id);
  if (!q) {
    return (
      <div className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center px-4">
        <p>Questão não encontrada.</p>
      </div>
    );
  }

  const attempt = session.attempts[id];
  const revealed = session.mode === "treino" && !!session.revealed[id];
  const last = session.index === session.questionIds.length - 1;
  const answered = session.questionIds.filter((qid) => session.attempts[qid]).length;

  function end() {
    finish();
    nav({ to: "/resultado" });
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-3xl flex-col px-4 py-4">
      <header className="mb-5 flex items-center justify-between gap-3">
        <Link to="/treino" className="text-sm text-muted hover:text-fg">
          Sair
        </Link>
        <p className="font-mono text-sm tabular-nums text-muted">
          {session.index + 1} / {session.questionIds.length}
        </p>
        <button
          type="button"
          onClick={end}
          className="inline-flex min-h-11 items-center gap-1.5 text-sm text-muted hover:text-fg"
        >
          <Flag className="size-3.5" /> Encerrar
        </button>
      </header>

      <div className="mb-5 h-1 overflow-hidden rounded-full bg-elevated">
        <div
          className="h-full bg-accent transition-[width] duration-200 ease-[var(--ease-out)]"
          style={{ width: `${((session.index + 1) / session.questionIds.length) * 100}%` }}
        />
      </div>

      <QuestionView
        q={q}
        chosen={attempt?.chosen ?? null}
        revealed={revealed}
        onChoose={choose}
        onReveal={session.mode === "treino" ? reveal : undefined}
      />

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <Button variant="ghost" onClick={prev} disabled={session.index === 0}>
          <ChevronLeft className="size-4" /> Anterior
        </Button>
        {last ? (
          <Button onClick={end}>Ver resultado</Button>
        ) : (
          <Button variant={revealed || session.mode === "simulado" ? "primary" : "ghost"} onClick={next}>
            Próxima <ChevronRight className="size-4" />
          </Button>
        )}
      </div>

      <ol className="mt-8 flex flex-wrap gap-1.5 pb-8">
        {session.questionIds.map((qid, i) => {
          const a = session.attempts[qid];
          const r = session.mode === "treino" && session.revealed[qid];
          return (
            <li key={qid}>
              <button
                type="button"
                onClick={() => goTo(i)}
                className={cn(
                  "grid size-9 place-items-center rounded-[var(--radius-xs)] font-mono text-xs tabular-nums shadow-[var(--shadow-border)]",
                  i === session.index && "bg-accent text-accent-fg",
                  i !== session.index && !a && "bg-elevated text-muted",
                  i !== session.index && a && !r && "bg-surface text-fg",
                  i !== session.index && r && a?.correct && "bg-success/20 text-success",
                  i !== session.index && r && a && !a.correct && "bg-danger/20 text-danger",
                )}
              >
                {i + 1}
              </button>
            </li>
          );
        })}
      </ol>
      <p className="pb-6 text-xs text-subtle">{answered} respondidas · teclas A–E, setas e Enter</p>
    </div>
  );
}
