import type { ComponentType } from "react";

import withAuthRedirect from "./withAuthRedirect";

export default function withoutAuth<PropsType extends {}>(
  WrappedComponent: ComponentType<PropsType>
) {
  return withAuthRedirect(WrappedComponent, (session) => !!session, "/");
}
