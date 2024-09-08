import type { PropsWithChildren } from "react";

import IntlProvider from "./IntlProvider";
import ApolloProvider from "./ApolloProvider";
import MantineProvider from "./MantineProvider";
import SessionProvider from "./SessionProvider";
import GoogleMapsProvider from "./GoogleMapsProvider";

export default function Providers(props: PropsWithChildren) {
  const { children } = props;
  return (
    <IntlProvider>
      <ApolloProvider>
        <GoogleMapsProvider>
          <MantineProvider>
            <SessionProvider>{children}</SessionProvider>
          </MantineProvider>
        </GoogleMapsProvider>
      </ApolloProvider>
    </IntlProvider>
  );
}
