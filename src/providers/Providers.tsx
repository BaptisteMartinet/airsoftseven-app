import type { PropsWithChildren } from "react";

import IntlProvider from "./IntlProvider";
import ApolloProvider from "./ApolloProvider";
import MantineProvider from "./MantineProvider";
import SessionProvider from "./SessionProvider";

export default function Providers(props: PropsWithChildren) {
  const { children } = props;
  return (
    <IntlProvider>
      <ApolloProvider>
        <MantineProvider>
          <SessionProvider>{children}</SessionProvider>
        </MantineProvider>
      </ApolloProvider>
    </IntlProvider>
  );
}
