import { d as byId, h as itaNota, o as SUBJECTS, p as emptyCounts, u as buildSession } from "./button-CbAFKTpb.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-hKAclIWw.js
function uid() {
	return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
function grade(questionId, chosen) {
	const q = byId(questionId);
	if (!q) return false;
	if (q.annulled) return chosen !== null;
	return chosen !== null && chosen === q.answer;
}
var useRampa = create()(persist((set, get) => ({
	session: null,
	history: [],
	start: (config) => {
		const questions = buildSession(config);
		if (questions.length === 0) return false;
		set({ session: {
			id: uid(),
			startedAt: Date.now(),
			mode: config.mode,
			questionIds: questions.map((q) => q.id),
			index: 0,
			attempts: {},
			revealed: {},
			config
		} });
		return true;
	},
	choose: (alt) => {
		const s = get().session;
		if (!s) return;
		const id = s.questionIds[s.index];
		if (!id) return;
		if (s.mode === "treino" && s.revealed[id]) return;
		set({ session: {
			...s,
			attempts: {
				...s.attempts,
				[id]: {
					questionId: id,
					chosen: alt,
					correct: grade(id, alt)
				}
			}
		} });
	},
	reveal: () => {
		const s = get().session;
		if (!s) return;
		const id = s.questionIds[s.index];
		if (!id) return;
		if (!s.attempts[id]) return;
		set({ session: {
			...s,
			revealed: {
				...s.revealed,
				[id]: true
			}
		} });
	},
	next: () => {
		const s = get().session;
		if (!s) return;
		if (s.index < s.questionIds.length - 1) set({ session: {
			...s,
			index: s.index + 1
		} });
	},
	prev: () => {
		const s = get().session;
		if (!s) return;
		if (s.index > 0) set({ session: {
			...s,
			index: s.index - 1
		} });
	},
	goTo: (index) => {
		const s = get().session;
		if (!s) return;
		if (index < 0 || index >= s.questionIds.length) return;
		set({ session: {
			...s,
			index
		} });
	},
	finish: () => {
		const s = get().session;
		if (!s) return null;
		const bySubject = Object.fromEntries(SUBJECTS.map((sub) => [sub, {
			hits: 0,
			total: 0,
			nota: 0
		}]));
		let hits = 0;
		for (const id of s.questionIds) {
			const q = byId(id);
			if (!q) continue;
			bySubject[q.subject].total += 1;
			if (s.attempts[id]?.correct ?? false) {
				hits += 1;
				bySubject[q.subject].hits += 1;
			}
		}
		for (const sub of SUBJECTS) bySubject[sub].nota = itaNota(bySubject[sub].hits, bySubject[sub].total);
		const scored = SUBJECTS.filter((sub) => bySubject[sub].total > 0 && sub !== "ingles");
		const media = scored.length === 0 ? 0 : Math.round(scored.reduce((a, sub) => a + bySubject[sub].nota, 0) / scored.length * 1e3) / 1e3;
		const entry = {
			id: s.id,
			finishedAt: Date.now(),
			mode: s.mode,
			total: s.questionIds.length,
			hits,
			years: s.config.years,
			bySubject,
			media
		};
		set({
			session: {
				...s,
				finishedAt: entry.finishedAt
			},
			history: [entry, ...get().history].slice(0, 40)
		});
		return entry;
	},
	clearSession: () => set({ session: null }),
	clearHistory: () => set({ history: [] })
}), {
	name: "rampa-ita",
	skipHydration: true
}));
function defaultConfig() {
	return {
		years: [
			2023,
			2024,
			2025
		],
		difficulties: [
			"facil",
			"medio",
			"dificil"
		],
		counts: {
			...emptyCounts(),
			matematica: 4,
			fisica: 4,
			quimica: 4,
			ingles: 3
		},
		mode: "treino"
	};
}
//#endregion
export { useRampa as n, defaultConfig as t };
