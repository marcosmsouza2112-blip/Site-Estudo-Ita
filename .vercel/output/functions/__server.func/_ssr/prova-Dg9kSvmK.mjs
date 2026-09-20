import { i as __toESM } from "../_runtime.mjs";
import { v as Link, y as useNavigate, z as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { d as byId, f as cn, n as Button } from "./button-CbAFKTpb.mjs";
import { d as ChevronLeft, l as Flag, u as ChevronRight } from "../_libs/lucide-react.mjs";
import { t as QuestionView } from "./question-view-BtE01QjL.mjs";
import { n as useRampa } from "./store-hKAclIWw.mjs";
import { t as useHydrated } from "./hydrate-CsDGa8PY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/prova-Dg9kSvmK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
	(0, import_react.useEffect)(() => {
		function onKey(e) {
			if (!session) return;
			const k = e.key.toUpperCase();
			if ([
				"A",
				"B",
				"C",
				"D",
				"E"
			].includes(k)) choose(k);
			if (e.key === "ArrowRight") next();
			if (e.key === "ArrowLeft") prev();
			if (e.key === "Enter") {
				const id = session.questionIds[session.index];
				if (id && session.mode === "treino" && session.attempts[id] && !session.revealed[id]) reveal();
			}
		}
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [
		session,
		choose,
		next,
		prev,
		reveal
	]);
	if (!hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted",
			children: "Carregando sessão…"
		})
	});
	if (!session) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-4 px-4 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted",
			children: "Nenhuma sessão em andamento."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/treino",
				children: "Montar treino"
			})
		})]
	});
	const id = session.questionIds[session.index];
	const q = byId(id);
	if (!q) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Questão não encontrada." })
	});
	const attempt = session.attempts[id];
	const revealed = session.mode === "treino" && !!session.revealed[id];
	const last = session.index === session.questionIds.length - 1;
	const answered = session.questionIds.filter((qid) => session.attempts[qid]).length;
	function end() {
		finish();
		nav({ to: "/resultado" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex min-h-dvh max-w-3xl flex-col px-4 py-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mb-5 flex items-center justify-between gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/treino",
						className: "text-sm text-muted hover:text-fg",
						children: "Sair"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-sm tabular-nums text-muted",
						children: [
							session.index + 1,
							" / ",
							session.questionIds.length
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: end,
						className: "inline-flex min-h-11 items-center gap-1.5 text-sm text-muted hover:text-fg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { className: "size-3.5" }), " Encerrar"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-5 h-1 overflow-hidden rounded-full bg-elevated",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full bg-accent transition-[width] duration-200 ease-[var(--ease-out)]",
					style: { width: `${(session.index + 1) / session.questionIds.length * 100}%` }
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuestionView, {
				q,
				chosen: attempt?.chosen ?? null,
				revealed,
				onChoose: choose,
				onReveal: session.mode === "treino" ? reveal : void 0
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "ghost",
					onClick: prev,
					disabled: session.index === 0,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" }), " Anterior"]
				}), last ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: end,
					children: "Ver resultado"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: revealed || session.mode === "simulado" ? "primary" : "ghost",
					onClick: next,
					children: ["Próxima ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-8 flex flex-wrap gap-1.5 pb-8",
				children: session.questionIds.map((qid, i) => {
					const a = session.attempts[qid];
					const r = session.mode === "treino" && session.revealed[qid];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => goTo(i),
						className: cn("grid size-9 place-items-center rounded-[var(--radius-xs)] font-mono text-xs tabular-nums shadow-[var(--shadow-border)]", i === session.index && "bg-accent text-accent-fg", i !== session.index && !a && "bg-elevated text-muted", i !== session.index && a && !r && "bg-surface text-fg", i !== session.index && r && a?.correct && "bg-success/20 text-success", i !== session.index && r && a && !a.correct && "bg-danger/20 text-danger"),
						children: i + 1
					}) }, qid);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "pb-6 text-xs text-subtle",
				children: [answered, " respondidas · teclas A–E, setas e Enter"]
			})
		]
	});
}
//#endregion
export { ProvaPage as component };
