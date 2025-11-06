import { create } from "zustand";

interface PuterUser {
  name?: string;
  email?: string;
  id?: string;
}

const getPuter = (): typeof window.puter | null =>
  typeof window !== "undefined" && window.puter ? window.puter : null;

interface PuterStore {
  isLoading: boolean;
  error: string | null;
  puterReady: boolean;
  auth: {
    user: PuterUser | null;
    isAuthenticated: boolean;
    signIn: () => Promise<void>;
    signOut: () => Promise<void>;
    refreshUser: () => Promise<void>;
    checkAuthStatus: () => Promise<boolean>;
  };
  init: () => void;
  clearError: () => void;
}

export const usePuterStore = create<PuterStore>((set, get) => {
  const setError = (msg: string) =>
    set({
      error: msg,
      isLoading: false,
    });

  const checkAuthStatus = async (): Promise<boolean> => {
    const puter = getPuter();
    if (!puter) {
      setError("Puter.js not available");
      return false;
    }

    try {
      const isSignedIn = await puter.auth.isSignedIn();
      if (isSignedIn) {
        const user = await puter.auth.getUser();
        set({
          auth: {
            ...get().auth,
            //user,
            isAuthenticated: true,
          },
          isLoading: false,
        });
        return true;
      } else {
        set({
          auth: {
            ...get().auth,
            user: null,
            isAuthenticated: false,
          },
          isLoading: false,
        });
        return false;
      }
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Failed to check auth status";
      setError(msg);
      return false;
    }
  };

  const signIn = async () => {
    const puter = getPuter();
    if (!puter) return setError("Puter.js not available");
    set({ isLoading: true });
    try {
      await puter.auth.signIn();
      await checkAuthStatus();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed");
    }
  };

  const signOut = async () => {
    const puter = getPuter();
    if (!puter) return setError("Puter.js not available");
    set({ isLoading: true });
    try {
      await puter.auth.signOut();
      set({
        auth: {
          ...get().auth,
          user: null,
          isAuthenticated: false,
        },
        isLoading: false,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign out failed");
    }
  };

  const refreshUser = async () => {
    const puter = getPuter();
    if (!puter) return setError("Puter.js not available");
    try {
      const user = await puter.auth.getUser();
      set({
        auth: {
          ...get().auth,
          //user,
          isAuthenticated: true,
        },
      });
    } catch {
      setError("Failed to refresh user");
    }
  };

  const init = () => {
    const puter = getPuter();
    if (puter) {
      set({ puterReady: true });
      checkAuthStatus();
      return;
    }

    const interval = setInterval(() => {
      if (getPuter()) {
        clearInterval(interval);
        set({ puterReady: true });
        checkAuthStatus();
      }
    }, 200);
  };

  return {
    isLoading: false,
    error: null,
    puterReady: false,
    auth: {
      user: null,
      isAuthenticated: false,
      signIn,
      signOut,
      refreshUser,
      checkAuthStatus,
    },
    init,
    clearError: () => set({ error: null }),
  };
});
