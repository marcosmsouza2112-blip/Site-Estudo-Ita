import { v as Link, z as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as QUESTIONS, c as YEARS, n as Button, o as SUBJECTS, s as SUBJECT_META } from "./button-CbAFKTpb.mjs";
import { c as Gauge, g as ArrowRight, m as BookOpen, r as Target } from "../_libs/lucide-react.mjs";
import { t as Shell } from "./shell-BJGDfo6b.mjs";
import { n as useRampa } from "./store-hKAclIWw.mjs";
import { t as useHydrated } from "./hydrate-CsDGa8PY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CpitTmC4.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const history = useRampa((s) => s.history);
	const last = useHydrated() ? history[0] : void 0;
	const bySubject = Object.fromEntries(SUBJECTS.map((sub) => [sub, QUESTIONS.filter((q) => q.subject === sub).length]));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "flex flex-col gap-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-3 text-xs uppercase tracking-[0.22em] text-muted",
						children: "Cadernos oficiais 2019–2025"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl leading-[1.1] tracking-tight sm:text-5xl",
						children: "A rampa da primeira fase."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-xl text-base leading-relaxed text-muted",
						children: "Enunciados reais do ITA, gabarito oficial e correção no erro. Monte o treino com o número de questões de cada matéria e o nível que você quer enfrentar."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-7 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "lg",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/treino",
								children: ["Montar treino", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "lg",
							variant: "ghost",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/banco",
								children: "Ver banco"
							})
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
				className: "grid grid-cols-2 gap-3 sm:grid-cols-4",
				children: [
					{
						k: "Questões",
						v: String(QUESTIONS.length)
					},
					{
						k: "Provas",
						v: `${YEARS.length} anos`
					},
					{
						k: "Matérias",
						v: "4"
					},
					{
						k: "Gabarito",
						v: "Oficial"
					}
				].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-[var(--radius-lg)] bg-surface p-4 shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-[11px] uppercase tracking-[0.16em] text-muted",
						children: s.k
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1 font-display text-2xl tabular-nums tracking-tight",
						children: s.v
					})]
				}, s.k))
			}),
			last && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-[var(--radius-lg)] bg-elevated p-4 shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-[0.16em] text-muted",
						children: "Última sessão"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-lg",
						children: [
							last.hits,
							"/",
							last.total,
							" acertos · média ",
							last.media.toFixed(1)
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/desempenho",
						className: "mt-2 inline-flex text-sm text-accent hover:underline",
						children: "Ver desempenho"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: SUBJECTS.map((sub) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-[var(--radius-lg)] bg-surface p-5 shadow-[var(--shadow-border)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs text-muted",
							children: SUBJECT_META[sub].short
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1 font-display text-xl",
							children: SUBJECT_META[sub].label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-muted",
							children: SUBJECT_META[sub].blurb
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 font-mono text-sm tabular-nums text-fg",
							children: [bySubject[sub], " questões"]
						})
					]
				}, sub))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-3",
				children: [
					{
						icon: BookOpen,
						t: "Enunciado real",
						d: "Recorte do caderno oficial — figuras, alternativas e notação iguais à prova."
					},
					{
						icon: Gauge,
						t: "Dificuldade à sua medida",
						d: "Filtre fácil, médio e difícil. Ajuste quantas questões de cada matéria entram."
					},
					{
						icon: Target,
						t: "Nota e correção",
						d: "Pontuação no formato ITA (0 a 10 por matéria). Errou? Abre gabarito e resolução."
					}
				].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-[var(--radius-lg)] p-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, {
							className: "size-4 text-muted",
							strokeWidth: 1.75
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-3 font-medium",
							children: f.t
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm leading-relaxed text-muted",
							children: f.d
						})
					]
				}, f.t))
			})
		]
	}) });
}
//#endregion
export { Home as component };
