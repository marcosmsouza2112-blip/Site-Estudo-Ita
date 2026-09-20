import { i as __toESM } from "../_runtime.mjs";
import { z as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as QUESTIONS, c as YEARS, f as cn, i as DIFFICULTY_META, m as filterBank, o as SUBJECTS, r as DIFFICULTIES, s as SUBJECT_META } from "./button-CbAFKTpb.mjs";
import { t as X } from "../_libs/lucide-react.mjs";
import { t as Shell } from "./shell-BJGDfo6b.mjs";
import { t as QuestionView } from "./question-view-BtE01QjL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/banco-CqLamo3p.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function BancoPage() {
	const [years, setYears] = (0, import_react.useState)([...YEARS]);
	const [subs, setSubs] = (0, import_react.useState)([...SUBJECTS]);
	const [diffs, setDiffs] = (0, import_react.useState)([...DIFFICULTIES]);
	const [openId, setOpenId] = (0, import_react.useState)(null);
	const [picked, setPicked] = (0, import_react.useState)({});
	const [revealed, setRevealed] = (0, import_react.useState)({});
	const list = (0, import_react.useMemo)(() => filterBank({
		years,
		subjects: subs,
		difficulties: diffs
	}), [
		years,
		subs,
		diffs
	]);
	const open = list.find((q) => q.id === openId) ?? null;
	function toggle(arr, v, fallback) {
		const next = arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
		return next.length ? next : fallback;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs uppercase tracking-[0.2em] text-muted",
			children: "Banco"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-1 font-display text-3xl tracking-tight",
			children: "Cadernos 2019–2025"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-2 max-w-xl text-sm text-muted",
			children: [
				list.length,
				" de ",
				QUESTIONS.length,
				" questões oficiais no filtro. Abra para ver o enunciado real e corrigir."
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 flex flex-col gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterRow, {
					label: "Ano",
					items: YEARS.map((y) => ({
						id: y,
						label: String(y),
						on: years.includes(y)
					})),
					onToggle: (id) => setYears((p) => toggle(p, id, [...YEARS]))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterRow, {
					label: "Matéria",
					items: SUBJECTS.map((s) => ({
						id: s,
						label: SUBJECT_META[s].short,
						on: subs.includes(s)
					})),
					onToggle: (id) => setSubs((p) => toggle(p, id, [...SUBJECTS]))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterRow, {
					label: "Nível",
					items: DIFFICULTIES.map((d) => ({
						id: d,
						label: DIFFICULTY_META[d].label,
						on: diffs.includes(d)
					})),
					onToggle: (id) => setDiffs((p) => toggle(p, id, [...DIFFICULTIES]))
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-6 divide-y divide-border rounded-[var(--radius-lg)] bg-surface shadow-[var(--shadow-border)]",
			children: list.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setOpenId(q.id),
				className: "flex min-h-14 w-full items-center gap-3 px-4 py-3 text-left hover:bg-elevated",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "w-16 shrink-0 font-mono text-xs text-muted",
						children: q.year
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "w-10 shrink-0 font-mono text-xs",
						children: SUBJECT_META[q.subject].short
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "min-w-0 flex-1 truncate text-sm",
						children: [
							"nº ",
							q.number,
							" · ",
							q.topic
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden text-xs text-muted sm:inline",
						children: DIFFICULTY_META[q.difficulty].label
					})
				]
			}) }, q.id))
		}),
		open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed inset-0 z-40 flex items-end justify-center bg-bg/70 p-0 sm:items-center sm:p-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-h-[92dvh] w-full max-w-3xl overflow-y-auto rounded-t-[var(--radius-xl)] bg-bg p-4 shadow-[var(--shadow-border)] sm:rounded-[var(--radius-xl)] sm:p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-4 flex justify-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "grid size-11 place-items-center rounded-[var(--radius-sm)] bg-elevated",
						onClick: () => setOpenId(null),
						"aria-label": "Fechar",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuestionView, {
					q: open,
					chosen: picked[open.id] ?? null,
					revealed: !!revealed[open.id],
					onChoose: (a) => setPicked((p) => ({
						...p,
						[open.id]: a
					})),
					onReveal: () => setRevealed((p) => ({
						...p,
						[open.id]: true
					}))
				})]
			})
		})
	] });
}
function FilterRow({ label, items, onToggle }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap items-center gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "w-14 text-xs text-muted",
			children: label
		}), items.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => onToggle(it.id),
			className: cn("min-h-9 rounded-full px-3 text-xs shadow-[var(--shadow-border)]", it.on ? "bg-accent text-accent-fg" : "bg-elevated text-muted"),
			children: it.label
		}, String(it.id)))]
	});
}
//#endregion
export { BancoPage as component };
