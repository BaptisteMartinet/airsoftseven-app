"use client";

import type { ComponentType } from "react";
import type { Session } from "@/stores/session";

import React from "react";
import { useRouter } from "@/navigation";
import { useSessionStore } from "@/providers";

export default function withAuthRedirect<PropsType extends {}>(
  WrappedComponent: ComponentType<PropsType>,
  redirectCondition: (session: Session | null) => boolean,
  location: string
) {
  function WithAuthRedirectWrapper(props: PropsType) {
    const router = useRouter();
    const session = useSessionStore((state) => state.session);
    const shouldRediret =
      session !== undefined ? redirectCondition(session) : null;

    React.useEffect(() => {
      if (shouldRediret) router.replace(location);
    }, [shouldRediret, router]);

    if (shouldRediret === null) return "loading..."; // TODO improve loading page
    if (shouldRediret) return "redirecting..."; // TODO improve redirect page?

    return <WrappedComponent {...props} />;
  }
  return WithAuthRedirectWrapper;
}
