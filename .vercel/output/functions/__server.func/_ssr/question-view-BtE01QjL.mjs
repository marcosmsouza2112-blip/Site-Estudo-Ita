import { z as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as cn, i as DIFFICULTY_META, n as Button, s as SUBJECT_META, t as ALTERNATIVES } from "./button-CbAFKTpb.mjs";
import { f as Check, h as Ban, t as X } from "../_libs/lucide-react.mjs";
import { t as explain } from "./explain-CBEOhRsr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/question-view-BtE01QjL.js
var import_jsx_runtime = require_jsx_runtime();
function QuestionView({ q, chosen, revealed, onChoose, onReveal }) {
	const meta = SUBJECT_META[q.subject];
	const diff = DIFFICULTY_META[q.difficulty];
	const showKey = revealed && chosen !== null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "flex flex-col gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2 text-xs text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "rounded-full bg-elevated px-2.5 py-1 text-fg shadow-[var(--shadow-border)]",
						children: [
							meta.short,
							" · ITA ",
							q.year,
							" · nº ",
							q.number
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full bg-elevated px-2.5 py-1 shadow-[var(--shadow-border)]",
						children: diff.label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full bg-elevated px-2.5 py-1 shadow-[var(--shadow-border)]",
						children: q.topic
					}),
					q.annulled && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1 rounded-full bg-warn/15 px-2.5 py-1 text-warn",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, { className: "size-3" }), " Anulada"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-[var(--radius-xl)] bg-paper p-2 shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-hidden rounded-[var(--radius-lg)] bg-paper",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: q.image,
						alt: `Enunciado oficial ITA ${q.year}, ${meta.label} questão ${q.number}`,
						width: q.width,
						height: q.height,
						className: "block w-full h-auto bg-paper"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "px-3 py-2 text-[11px] tracking-wide text-ink-muted",
					children: [
						"Caderno oficial ITA ",
						q.year,
						" · 1ª fase · enunciado reproduzido integralmente"
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-5 gap-2",
				children: ALTERNATIVES.map((alt) => {
					const isChosen = chosen === alt;
					const isCorrect = q.annulled ? isChosen : alt === q.answer;
					const state = !showKey ? isChosen ? "picked" : "idle" : isCorrect ? "right" : isChosen ? "wrong" : "idle";
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => onChoose(alt),
						disabled: showKey,
						className: cn("min-h-12 rounded-[var(--radius-md)] font-mono text-base font-medium shadow-[var(--shadow-border)] transition-[background-color,color,transform] duration-150 ease-[var(--ease-out)] active:not-disabled:scale-[0.96]", state === "idle" && "bg-elevated text-fg hover:bg-surface", state === "picked" && "bg-accent text-accent-fg", state === "right" && "bg-success text-accent-fg", state === "wrong" && "bg-danger text-paper"),
						children: alt
					}, alt);
				})
			}),
			!showKey && onReveal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: onReveal,
				disabled: !chosen,
				className: "w-full sm:w-auto",
				children: "Corrigir"
			}),
			showKey && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Correction, {
				q,
				chosen
			})
		]
	});
}
function Correction({ q, chosen }) {
	const ok = q.annulled || chosen === q.answer;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[var(--radius-lg)] bg-elevated p-4 shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 flex items-center gap-2",
			children: [ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4 text-success" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4 text-danger" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium",
				children: q.annulled ? "Anulada — ponto concedido" : ok ? "Correto" : `Incorreto — gabarito ${q.answer}`
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "whitespace-pre-wrap text-sm leading-relaxed text-muted",
			children: explain(q)
		})]
	});
}
//#endregion
export { QuestionView as t };
