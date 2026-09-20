import { v as Link, z as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as byId, f as cn, n as Button, o as SUBJECTS, s as SUBJECT_META } from "./button-CbAFKTpb.mjs";
import { f as Check, t as X } from "../_libs/lucide-react.mjs";
import { t as Shell } from "./shell-BJGDfo6b.mjs";
import { n as reviewTopics } from "./explain-CBEOhRsr.mjs";
import { n as useRampa } from "./store-hKAclIWw.mjs";
import { t as useHydrated } from "./hydrate-CsDGa8PY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/resultado-xoJ9Hdei.js
var import_jsx_runtime = require_jsx_runtime();
function ResultadoPage() {
	const session = useRampa((s) => s.session);
	const last = useRampa((s) => s.history)[0];
	if (!useHydrated()) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-muted",
		children: "Carregando resultado…"
	}) });
	if (!session?.finishedAt || !last) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-muted",
		children: "Nenhum resultado para mostrar."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		asChild: true,
		className: "mt-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/treino",
			children: "Montar treino"
		})
	})] });
	const wrong = session.questionIds.map((id) => byId(id)).filter((q) => Boolean(q)).filter((q) => !(session.attempts[q.id]?.correct ?? false));
	const topics = reviewTopics(wrong);
	const mediaOk = last.media >= 5;
	const mins = SUBJECTS.filter((s) => last.bySubject[s].total > 0).every((s) => {
		const b = last.bySubject[s];
		return b.total === 0 || b.hits / b.total >= 5 / 12;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs uppercase tracking-[0.2em] text-muted",
			children: "Sessão encerrada"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
			className: "mt-1 font-display text-4xl tracking-tight tabular-nums",
			children: [last.hits, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-muted",
				children: ["/", last.total]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-2 text-muted",
			children: [
				"Média das exatas ",
				last.media.toFixed(2),
				" / 10",
				mediaOk && mins ? " — corte da 1ª fase, neste recorte." : " — abaixo do corte 5,0 neste recorte."
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 grid gap-3 sm:grid-cols-2",
			children: SUBJECTS.filter((s) => last.bySubject[s].total > 0).map((s) => {
				const b = last.bySubject[s];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-[var(--radius-lg)] bg-surface p-4 shadow-[var(--shadow-border)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-[0.14em] text-muted",
							children: SUBJECT_META[s].label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-display text-2xl tabular-nums",
							children: b.nota.toFixed(2)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted tabular-nums",
							children: [
								b.hits,
								"/",
								b.total,
								" acertos"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 h-1 rounded-full bg-elevated",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full rounded-full bg-accent",
								style: { width: `${b.total ? b.hits / b.total * 100 : 0}%` }
							})
						})
					]
				}, s);
			})
		}),
		topics.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-sm font-medium",
				children: "Revisar depois do erro"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 flex flex-wrap gap-2",
				children: topics.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "rounded-full bg-elevated px-3 py-1.5 text-xs text-muted shadow-[var(--shadow-border)]",
					children: t
				}, t))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-sm font-medium",
				children: "Correção questão a questão"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-3 flex flex-col gap-2",
				children: session.questionIds.map((id, i) => {
					const q = byId(id);
					if (!q) return null;
					const a = session.attempts[id];
					const ok = a?.correct ?? false;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-start gap-3 rounded-[var(--radius-md)] bg-surface p-3 shadow-[var(--shadow-border)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("mt-0.5 grid size-7 shrink-0 place-items-center rounded-full", ok ? "bg-success/15 text-success" : "bg-danger/15 text-danger"),
							children: ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm",
								children: [
									i + 1,
									". ",
									SUBJECT_META[q.subject].short,
									" ",
									q.year,
									" nº ",
									q.number,
									q.annulled ? " · anulada" : ""
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted",
								children: [
									q.topic,
									a?.chosen ? ` · você: ${a.chosen}` : " · em branco",
									q.answer ? ` · gabarito: ${q.answer}` : ""
								]
							})]
						})]
					}, id);
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 flex flex-wrap gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/treino",
					children: "Novo treino"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/desempenho",
					children: "Desempenho"
				})
			})]
		})
	] });
}
//#endregion
export { ResultadoPage as component };
