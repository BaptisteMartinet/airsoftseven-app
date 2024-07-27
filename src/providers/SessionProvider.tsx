"use client";

import type { ReactNode } from "react";

import React from "react";
import { useStore } from "zustand";
import { createSessionStore, type SessionStore } from "@stores/session";

type SessionStoreApi = ReturnType<typeof createSessionStore>;

const SessionStoreContext = React.createContext<SessionStoreApi | null>(null);

interface SessionStoreProviderProps {
  children: ReactNode;
}

export default function SessionStoreProvider(props: SessionStoreProviderProps) {
  const { children } = props;
  const storeRef = React.useRef<SessionStoreApi>();
  if (!storeRef.current) storeRef.current = createSessionStore();
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
