import { v as Link, z as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Button, o as SUBJECTS, s as SUBJECT_META } from "./button-CbAFKTpb.mjs";
import { t as Shell } from "./shell-BJGDfo6b.mjs";
import { n as useRampa } from "./store-hKAclIWw.mjs";
import { t as useHydrated } from "./hydrate-CsDGa8PY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/desempenho-pE_YvyIv.js
var import_jsx_runtime = require_jsx_runtime();
function DesempenhoPage() {
	const history = useRampa((s) => s.history);
	const clearHistory = useRampa((s) => s.clearHistory);
	if (!useHydrated()) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-muted",
		children: "Carregando…"
	}) });
	const totals = SUBJECTS.map((s) => {
		let hits = 0;
		let total = 0;
		for (const h of history) {
			hits += h.bySubject[s].hits;
			total += h.bySubject[s].total;
		}
		return {
			s,
			hits,
			total,
			nota: total ? 10 * hits / total : 0
		};
	});
	const allHits = history.reduce((a, h) => a + h.hits, 0);
	const allTotal = history.reduce((a, h) => a + h.total, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs uppercase tracking-[0.2em] text-muted",
			children: "Desempenho"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-1 font-display text-3xl tracking-tight",
			children: "Seu histórico neste aparelho"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 max-w-xl text-sm text-muted",
			children: "As sessões ficam só neste navegador — sem conta. A média das exatas segue a regra da 1ª fase (Matemática, Física e Química em 0–10)."
		}),
		history.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-10 rounded-[var(--radius-lg)] bg-surface p-8 text-center shadow-[var(--shadow-border)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted",
				children: "Nenhuma sessão ainda."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/treino",
					children: "Montar treino"
				})
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: "Sessões",
						v: String(history.length)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: "Acertos",
						v: `${allHits}/${allTotal}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: "Aproveitamento",
						v: allTotal ? `${Math.round(100 * allHits / allTotal)}%` : "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: "Média exatas",
						v: totals.filter((t) => t.s !== "ingles" && t.total).length ? (totals.filter((t) => t.s !== "ingles" && t.total).reduce((a, t) => a + t.nota, 0) / totals.filter((t) => t.s !== "ingles" && t.total).length).toFixed(2) : "—"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid gap-3 sm:grid-cols-2",
				children: totals.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-[var(--radius-lg)] bg-surface p-4 shadow-[var(--shadow-border)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: SUBJECT_META[t.s].label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-display text-2xl tabular-nums",
							children: t.nota.toFixed(2)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted tabular-nums",
							children: [
								t.hits,
								"/",
								t.total
							]
						})
					]
				}, t.s))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-10 text-sm font-medium",
				children: "Sessões"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 flex flex-col gap-2",
				children: history.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex flex-wrap items-center justify-between gap-2 rounded-[var(--radius-md)] bg-surface px-4 py-3 shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm",
						children: [
							h.hits,
							"/",
							h.total,
							" · média ",
							h.media.toFixed(2)
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted",
						children: [
							h.mode === "treino" ? "Treino" : "Simulado",
							" ·",
							" ",
							new Date(h.finishedAt).toLocaleString("pt-BR")
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs text-muted",
						children: h.years.join(" · ")
					})]
				}, h.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: clearHistory,
				className: "mt-8 text-xs text-muted hover:text-fg",
				children: "Limpar histórico"
			})
		] })
	] });
}
function Stat({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[var(--radius-lg)] bg-surface p-4 shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-[11px] uppercase tracking-[0.14em] text-muted",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "mt-1 font-display text-2xl tabular-nums",
			children: v
		})]
	});
}
//#endregion
export { DesempenhoPage as component };
