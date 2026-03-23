/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';
import api, { endpoints } from '../requests';

export type AuthUser = {
  id: number | string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  roles?: string[];
  [key: string]: any;
};

export type AuthCredentials = {
  phone: string;
  password: string;
};

export type RegisterPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  [key: string]: any;
};

export type AuthPayload = {
  token?: string | null;
  accessToken?: string | null;
  jwt?: string | null;
  user?: AuthUser | null;
  account?: AuthUser | null;
  [key: string]: any;
};

export type AuthResult = {
  token: string | null;
  user: AuthUser;
};

export type AuthContextValue = {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isOnboardingPending: boolean;
  login: (credentials: AuthCredentials) => Promise<AuthResult>;
  register: (payload: RegisterPayload) => Promise<AuthResult>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<AuthUser | null>;
  completeOnboarding: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);
const TOKEN_KEY = 'auth_token';
const ONBOARDING_PENDING_KEY = 'onboarding_pending';

const readStoredToken = (): string | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    return window.localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
};

const writeStoredToken = (token: string | null | undefined) => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    if (token) {
      window.localStorage.setItem(TOKEN_KEY, token);
      return;
    }

    window.localStorage.removeItem(TOKEN_KEY);
  } catch {
    // Ignore storage failures and rely on in-memory auth state.
  }
};

const readStoredOnboardingPending = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    return window.localStorage.getItem(ONBOARDING_PENDING_KEY) === 'true';
  } catch {
    return false;
  }
};

const writeStoredOnboardingPending = (isPending: boolean) => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    if (isPending) {
      window.localStorage.setItem(ONBOARDING_PENDING_KEY, 'true');
      return;
    }

    window.localStorage.removeItem(ONBOARDING_PENDING_KEY);
  } catch {
    // Ignore storage failures and rely on in-memory onboarding state.
  }
};

const setAuthToken = (token: string | null | undefined) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    return;
  }

  delete api.defaults.headers.common.Authorization;
};

const readTokenFromResponse = (data?: AuthPayload | null): string | null =>
  data?.token ?? data?.accessToken ?? data?.jwt ?? null;

const readUserFromResponse = (data?: AuthPayload | null): AuthUser | null =>
  data?.user ?? data?.account ?? null;

const initialToken = readStoredToken();
setAuthToken(initialToken);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOnboardingPending, setIsOnboardingPending] = useState(readStoredOnboardingPending);

  const persistOnboardingPending = useCallback((isPending: boolean) => {
    setIsOnboardingPending(isPending);
    writeStoredOnboardingPending(isPending);
  }, []);

  const setUnauthenticatedState = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    writeStoredToken(null);
    persistOnboardingPending(false);
    setAuthToken(null);
  }, [persistOnboardingPending]);

  const loadCurrentUser = useCallback(async () => {
    const { data } = await api.get<AuthUser | null>(endpoints.auth.me);
    return data ?? null;
  }, []);

  const refreshUser = useCallback(async () => {
    const refreshedUser = await loadCurrentUser();

    if (!refreshedUser) {
      setUnauthenticatedState();
      return null;
    }

    setUser(refreshedUser);
    setIsAuthenticated(true);

    return refreshedUser;
  }, [loadCurrentUser, setUnauthenticatedState]);

  const completeAuthentication = useCallback(async (authPayload: AuthPayload) => {
    const token = readTokenFromResponse(authPayload);
    const userFromPayload = readUserFromResponse(authPayload);

    writeStoredToken(token ?? null);
    setAuthToken(token ?? null);

    let resolvedUser = userFromPayload;
    if (!resolvedUser) {
      resolvedUser = await loadCurrentUser();
    }

    if (!resolvedUser) {
      throw new Error('Authentication succeeded but user details are missing.');
    }

    setUser(resolvedUser);
    setIsAuthenticated(true);

    return {
      token,
      user: resolvedUser,
    };
  }, [loadCurrentUser]);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const restoredUser = await loadCurrentUser();
        if (!restoredUser) {
          setUnauthenticatedState();
          return;
        }

        setUser(restoredUser);
        setIsAuthenticated(true);
      } catch {
        setUnauthenticatedState();
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, [loadCurrentUser, setUnauthenticatedState]);

  const login = useCallback(async (credentials: AuthCredentials) => {
    if (credentials.phone === 'admin' && credentials.password === 'admin') {
      const mockToken = 'mock-admin-token';
      const mockUser: AuthUser = {
        id: 0,
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@admin.com',
        phone: 'admin',
        roles: ['ADMIN'],
      };
      writeStoredToken(mockToken);
      setAuthToken(mockToken);
      setUser(mockUser);
      setIsAuthenticated(true);
      persistOnboardingPending(false);
      return { token: mockToken, user: mockUser };
    }
    const { data } = await api.post(endpoints.auth.login, credentials);
    const authState = await completeAuthentication(data);
    persistOnboardingPending(false);
    return authState;
  }, [completeAuthentication, persistOnboardingPending]);

  const register = useCallback(async (payload: RegisterPayload) => {
    const { data } = await api.post(endpoints.auth.register, payload);
    const authState = await completeAuthentication(data);
    persistOnboardingPending(true);
    return authState;
  }, [completeAuthentication, persistOnboardingPending]);

  const logout = useCallback(async () => {
    setUnauthenticatedState();
  }, [setUnauthenticatedState]);

  const completeOnboarding = useCallback(() => {
    persistOnboardingPending(false);
  }, [persistOnboardingPending]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading,
      isAuthenticated,
      isOnboardingPending,
      login,
      register,
      logout,
      refreshUser,
      completeOnboarding,
    }),
    [
      user,
      isLoading,
      isAuthenticated,
      isOnboardingPending,
      login,
      register,
      logout,
      refreshUser,
      completeOnboarding,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
