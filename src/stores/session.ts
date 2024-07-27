import type { IdType } from "@core/api/types";

import { createStore } from "zustand";

interface Session {
  token: string;
  user: {
    id: IdType;
    username: string;
  };
}

interface SessionState {
  session: Session | null;
}

interface SessionActions {
  setSession: (newSession: Session) => void;
}

export type SessionStore = SessionState & SessionActions;

export function createSessionStore() {
  return createStore<SessionStore>()((set) => ({
    session: null,
    setSession: (newSession) => set(() => ({ session: newSession })),
  }));
}
