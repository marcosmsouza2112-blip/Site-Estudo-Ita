import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, LayoutGrid, LineChart, PenLine } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { to: "/", label: "Início", icon: LayoutGrid },
  { to: "/treino", label: "Treino", icon: PenLine },
  { to: "/banco", label: "Banco", icon: BookOpen },
  { to: "/desempenho", label: "Desempenho", icon: LineChart },
] as const;

export function Shell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="min-h-dvh flex flex-col">
      <header className="sticky top-0 z-30 border-b border-border bg-bg/85 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-3 px-4">
          <Link to="/" className="flex items-center gap-2.5 min-h-11">
            <span className="grid size-8 place-items-center rounded-[var(--radius-sm)] bg-elevated shadow-[var(--shadow-border)]">
              <svg viewBox="0 0 32 32" className="size-4" aria-hidden>
                <polygon fill="currentColor" className="text-accent" points="4,26 28,26 28,6" />
              </svg>
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-[1.05rem] tracking-tight">Rampa</span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-muted">1ª fase ITA</span>
            </span>
          </Link>
          <nav className="flex items-center gap-0.5">
            {LINKS.map((l) => {
              const active = pathname === l.to;
              const Icon = l.icon;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={cn(
                    "flex min-h-11 items-center gap-1.5 rounded-[var(--radius-sm)] px-2.5 text-sm transition-[color,background-color] duration-150",
                    active ? "bg-elevated text-fg" : "text-muted hover:text-fg",
                  )}
                >
                  <Icon className="size-4" strokeWidth={1.75} />
                  <span className="hidden sm:inline">{l.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:py-10">{children}</main>
    </div>
  );
}
