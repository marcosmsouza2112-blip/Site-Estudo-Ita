import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as useRampa } from "./store-hKAclIWw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/hydrate-CsDGa8PY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useHydrated() {
	const [ok, setOk] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		Promise.resolve(useRampa.persist.rehydrate()).finally(() => setOk(true));
	}, []);
	return ok;
}
//#endregion
export { useHydrated as t };
