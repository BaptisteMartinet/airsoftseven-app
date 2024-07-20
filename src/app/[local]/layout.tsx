import type { LocalPageParams } from "./shared";

// todo setup local ctx

export default function LocalLayout(
  props: Readonly<{ children: React.ReactNode; params: LocalPageParams }>
) {
  const { children, params } = props;
  const { local } = params;
  console.log(local);
  return children;
}
