import { headers as getNextHeaders } from "next/headers";
import { createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";

// Apollo client for server-side fetching

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_API_URI,
    fetchOptions: { cache: "no-store" },
  });

  const headersForwardLink = setContext((_, { headers }) => {
    const newHeaders = Object.fromEntries(getNextHeaders().entries());
    return {
      headers: {
        ...headers,
        ...newHeaders,
      },
    };
  });

  return new ApolloClient({
    link: headersForwardLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
});
