import type { PropsWithChildren } from "react";

import ApolloProvider from "./ApolloProvider";
import SessionProvider from "./SessionProvider";
import MantineProvider from "./MantineProvider";

export default function Providers(props: PropsWithChildren) {
  const { children } = props;
  return (
    <ApolloProvider>
      <MantineProvider>
        <SessionProvider>{children}</SessionProvider>
      </MantineProvider>
    </ApolloProvider>
  );
}
