import type { DependencyList, EffectCallback } from "react";

import React from "react";

export default function useEffectAfterMount(
  effect: EffectCallback,
  deps?: DependencyList
) {
  const firstRender = React.useRef(true);

  React.useEffect(() => {
    if (!firstRender.current) return effect();
    firstRender.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
