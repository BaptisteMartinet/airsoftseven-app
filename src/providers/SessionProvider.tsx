"use client";

import type { ReactNode } from "react";
import type { TypedDocumentNode } from "@apollo/client";
import type { IdType } from "@/core/api/types";

import React from "react";
import { useStore } from "zustand";
import { gql, useApolloClient } from "@apollo/client";
import { createSessionStore, type SessionStore } from "@stores/session";

const SessionQuery: TypedDocumentNode<{
  session: {
    id: IdType;
    token: string;
    user: {
      id: IdType;
      username: string;
    };
  };
}> = gql`
  query GetSession {
    session {
      id
      token
      user {
        id
        username
      }
    }
  }
`;

type SessionStoreApi = ReturnType<typeof createSessionStore>;

const SessionStoreContext = React.createContext<SessionStoreApi | null>(null);

interface SessionStoreProviderProps {
  children: ReactNode;
}

export default function SessionStoreProvider(props: SessionStoreProviderProps) {
  const { children } = props;
  const client = useApolloClient();

  const storeRef = React.useRef<SessionStoreApi>();
  if (!storeRef.current) storeRef.current = createSessionStore();

  React.useEffect(() => {
    async function initSession() {
      const session = await client.query({ query: SessionQuery });
      storeRef.current?.setState({ session: session.data.session }, true);
    }
    initSession().catch(console.error);
  }, [client]);

  return (
    <SessionStoreContext.Provider value={storeRef.current}>
      {children}
    </SessionStoreContext.Provider>
  );
}

export function useSessionStore<T>(selector: (store: SessionStore) => T): T {
  const sessionStoreCtx = React.useContext(SessionStoreContext);
  if (!sessionStoreCtx)
    throw new Error(`useCounterStore must be used within CounterStoreProvider`);
  return useStore(sessionStoreCtx, selector);
}
