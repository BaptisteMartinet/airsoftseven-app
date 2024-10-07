"use client";
import type { FieldPolicy } from "@apollo/client";

import { HttpLink } from "@apollo/client";
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";
import { mergeOffsetPaginationResults } from "@/core/utils/apollo";

const OffsetPaginationFieldPolicy = {
  keyArgs: false,
  merge: (existing, incoming, { args }) => {
    const offset = args?.offset ?? 0;
    return mergeOffsetPaginationResults(existing, incoming, offset);
  },
} as const satisfies FieldPolicy;

function makeClient() {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_API_URI,
    fetchOptions: { cache: "no-store" },
    credentials: "include",
  });

  return new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            events: OffsetPaginationFieldPolicy,
          },
        },
        User: {
          fields: {
            events: OffsetPaginationFieldPolicy,
            clubs: OffsetPaginationFieldPolicy,
            fields: OffsetPaginationFieldPolicy,
          },
        },
      },
    }),
    link: httpLink,
  });
}

export default function ApolloProvider({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
