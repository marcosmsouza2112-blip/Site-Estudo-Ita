import { useEffect, useState } from "react";
import { useRampa } from "./store";

export function useHydrated() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    void Promise.resolve(useRampa.persist.rehydrate()).finally(() => setOk(true));
  }, []);
  return ok;
}
