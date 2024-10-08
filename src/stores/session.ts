import type { IdType } from "@core/api/types";

import { createStore } from "zustand";

export interface Session {
  id: IdType;
  expireAt: Date;
  user: {
    id: IdType;
    slug: string;
    username: string;
  };
}

interface SessionState {
  session: Session | null | undefined;
}

interface SessionActions {
  setSession: (newSession: Session | null) => void;
}

export type SessionStore = SessionState & SessionActions;

export function createSessionStore() {
  return createStore<SessionStore>()((set) => ({
    session: undefined,
    setSession: (newSession) => set(() => ({ session: newSession })),
  }));
}
