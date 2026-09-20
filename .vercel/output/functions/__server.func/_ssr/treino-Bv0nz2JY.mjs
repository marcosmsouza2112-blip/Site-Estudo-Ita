import { i as __toESM } from "../_runtime.mjs";
import { y as useNavigate, z as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { c as YEARS, f as cn, i as DIFFICULTY_META, l as availableCounts, n as Button, o as SUBJECTS, r as DIFFICULTIES, s as SUBJECT_META } from "./button-CbAFKTpb.mjs";
import { i as Plus, o as Minus } from "../_libs/lucide-react.mjs";
import { t as Shell } from "./shell-BJGDfo6b.mjs";
import { n as useRampa, t as defaultConfig } from "./store-hKAclIWw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/treino-Bv0nz2JY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TreinoPage() {
	const nav = useNavigate();
	const start = useRampa((s) => s.start);
	const [years, setYears] = (0, import_react.useState)(defaultConfig().years);
	const [difficulties, setDifficulties] = (0, import_react.useState)(defaultConfig().difficulties);
	const [counts, setCounts] = (0, import_react.useState)(defaultConfig().counts);
	const [mode, setMode] = (0, import_react.useState)("treino");
	const [error, setError] = (0, import_react.useState)("");
	const max = (0, import_react.useMemo)(() => availableCounts(years, difficulties), [years, difficulties]);
	const total = SUBJECTS.reduce((a, s) => a + counts[s], 0);
	function toggleYear(y) {
		setYears((prev) => {
			const next = prev.includes(y) ? prev.filter((x) => x !== y) : [...prev, y].sort();
			return next.length ? next : prev;
		});
	}
	function toggleDiff(d) {
		setDifficulties((prev) => {
			const next = prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d];
			return next.length ? next : prev;
		});
	}
	function setCount(sub, n) {
		const capped = Math.max(0, Math.min(n, max[sub]));
		setCounts((c) => ({
			...c,
			[sub]: capped
		}));
	}
	function go() {
		const nextCounts = { ...counts };
		for (const s of SUBJECTS) nextCounts[s] = Math.min(nextCounts[s], max[s]);
		if (SUBJECTS.every((s) => nextCounts[s] === 0)) {
			setError("Escolha pelo menos uma questão.");
			return;
		}
		if (!start({
			years,
			difficulties,
			counts: nextCounts,
			mode
		})) {
			setError("Não há questões com esses filtros.");
			return;
		}
		nav({ to: "/prova" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-[0.2em] text-muted",
				children: "Montar sessão"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 font-display text-3xl tracking-tight",
				children: "Quantas de cada matéria"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-relaxed text-muted",
				children: "Recorte os cadernos, o nível e o tamanho do treino. No modo treino a correção abre na hora; no simulado, só no fim."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-medium",
					children: "Anos"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: YEARS.map((y) => {
						const on = years.includes(y);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => toggleYear(y),
							className: cn("min-h-11 rounded-full px-3.5 text-sm shadow-[var(--shadow-border)] transition-[background-color,color] duration-150", on ? "bg-accent text-accent-fg" : "bg-elevated text-muted hover:text-fg"),
							children: y
						}, y);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-medium",
					children: "Dificuldade"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 grid gap-2 sm:grid-cols-3",
					children: DIFFICULTIES.map((d) => {
						const on = difficulties.includes(d);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => toggleDiff(d),
							className: cn("rounded-[var(--radius-md)] p-3 text-left shadow-[var(--shadow-border)] transition-[background-color] duration-150 min-h-11", on ? "bg-elevated" : "bg-surface text-muted"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-sm font-medium text-fg",
								children: DIFFICULTY_META[d].label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-0.5 block text-xs text-muted",
								children: DIFFICULTY_META[d].hint
							})]
						}, d);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-medium",
					children: "Questões por matéria"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 flex flex-col gap-2",
					children: SUBJECTS.map((sub) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between gap-3 rounded-[var(--radius-lg)] bg-surface px-4 py-3 shadow-[var(--shadow-border)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium",
							children: SUBJECT_META[sub].label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted tabular-nums",
							children: [max[sub], " disponíveis no filtro"]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "grid size-11 place-items-center rounded-[var(--radius-sm)] bg-elevated",
									onClick: () => setCount(sub, counts[sub] - 1),
									"aria-label": `Menos ${SUBJECT_META[sub].label}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "w-8 text-center font-mono text-lg tabular-nums",
									children: Math.min(counts[sub], max[sub])
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "grid size-11 place-items-center rounded-[var(--radius-sm)] bg-elevated",
									onClick: () => setCount(sub, counts[sub] + 1),
									"aria-label": `Mais ${SUBJECT_META[sub].label}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
								})
							]
						})]
					}, sub))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-medium",
					children: "Modo"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 grid gap-2 sm:grid-cols-2",
					children: [[
						"treino",
						"Treino",
						"Corrige na hora, com resolução se errar."
					], [
						"simulado",
						"Simulado",
						"Gabarito só no encerramento, como na prova."
					]].map(([id, label, hint]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setMode(id),
						className: cn("rounded-[var(--radius-md)] p-4 text-left shadow-[var(--shadow-border)] min-h-11", mode === id ? "bg-elevated" : "bg-surface text-muted"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-sm font-medium text-fg",
							children: label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1 block text-xs text-muted",
							children: hint
						})]
					}, id))
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-danger",
				children: error
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted tabular-nums",
					children: [total, " questões nesta sessão"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: go,
					disabled: total === 0,
					children: "Começar"
				})]
			})
		]
	}) });
}
//#endregion
export { TreinoPage as component };
