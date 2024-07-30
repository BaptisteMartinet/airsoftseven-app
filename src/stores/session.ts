import type { IdType } from "@core/api/types";

import { createStore } from "zustand";

interface Session {
  token: string;
  user: {
    id: IdType;
    username: string;
  };
}

const AccessTokenKey = "accessToken";

interface SessionState {
  session: Session | null | undefined;
}

interface SessionActions {
  setSession: (newSession: Session) => void;
}

export type SessionStore = SessionState & SessionActions;

export function createSessionStore() {
  return createStore<SessionStore>()((set) => ({
    session: undefined,
    setSession: (newSession) => {
      localStorage.setItem(AccessTokenKey, newSession.token);
      set(() => ({ session: newSession }));
    },
  }));
}
