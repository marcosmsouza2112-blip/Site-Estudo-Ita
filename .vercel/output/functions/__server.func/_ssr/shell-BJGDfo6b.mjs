import { d as useRouterState, v as Link, z as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as cn } from "./button-CbAFKTpb.mjs";
import { a as PenLine, m as BookOpen, p as ChartLine, s as LayoutGrid } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shell-BJGDfo6b.js
var import_jsx_runtime = require_jsx_runtime();
var LINKS = [
	{
		to: "/",
		label: "Início",
		icon: LayoutGrid
	},
	{
		to: "/treino",
		label: "Treino",
		icon: PenLine
	},
	{
		to: "/banco",
		label: "Banco",
		icon: BookOpen
	},
	{
		to: "/desempenho",
		label: "Desempenho",
		icon: ChartLine
	}
];
function Shell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh flex flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "sticky top-0 z-30 border-b border-border bg-bg/85 backdrop-blur-md",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex h-14 max-w-5xl items-center justify-between gap-3 px-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-center gap-2.5 min-h-11",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-8 place-items-center rounded-[var(--radius-sm)] bg-elevated shadow-[var(--shadow-border)]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
							viewBox: "0 0 32 32",
							className: "size-4",
							"aria-hidden": true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
								fill: "currentColor",
								className: "text-accent",
								points: "4,26 28,26 28,6"
							})
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex flex-col leading-none",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-[1.05rem] tracking-tight",
							children: "Rampa"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] uppercase tracking-[0.18em] text-muted",
							children: "1ª fase ITA"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "flex items-center gap-0.5",
					children: LINKS.map((l) => {
						const active = pathname === l.to;
						const Icon = l.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: l.to,
							className: cn("flex min-h-11 items-center gap-1.5 rounded-[var(--radius-sm)] px-2.5 text-sm transition-[color,background-color] duration-150", active ? "bg-elevated text-fg" : "text-muted hover:text-fg"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								className: "size-4",
								strokeWidth: 1.75
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden sm:inline",
								children: l.label
							})]
						}, l.to);
					})
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:py-10",
			children
		})]
	});
}
//#endregion
export { Shell as t };
