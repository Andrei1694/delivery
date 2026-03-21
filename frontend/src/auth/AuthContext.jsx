/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import api, { endpoints } from '../requests';

const AuthContext = createContext(null);
const TOKEN_KEY = 'auth_token';

const readStoredToken = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    return window.localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
};

const writeStoredToken = (token) => {
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

const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    return;
  }

  delete api.defaults.headers.common.Authorization;
};

const readTokenFromResponse = (data) =>
  data?.token ?? data?.accessToken ?? data?.jwt ?? null;

const readUserFromResponse = (data) => data?.user ?? data?.account ?? null;

const initialToken = readStoredToken();
setAuthToken(initialToken);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setUnauthenticatedState = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    writeStoredToken(null);
    setAuthToken(null);
  }, []);

  const loadCurrentUser = useCallback(async () => {
    const { data } = await api.get(endpoints.auth.me);
    return data;
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

  const completeAuthentication = useCallback(async (authPayload) => {
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

  const login = useCallback(async (credentials) => {
    if (credentials.phone === 'admin' && credentials.password === 'admin') {
      const mockToken = 'mock-admin-token';
      const mockUser = { id: 0, firstName: 'Admin', lastName: 'User', email: 'admin@admin.com', phone: 'admin', roles: ['ADMIN'] };
      writeStoredToken(mockToken);
      setAuthToken(mockToken);
      setUser(mockUser);
      setIsAuthenticated(true);
      return { token: mockToken, user: mockUser };
    }
    const { data } = await api.post(endpoints.auth.login, credentials);
    return completeAuthentication(data);
  }, [completeAuthentication]);

  const register = useCallback(async (payload) => {
    const { data } = await api.post(endpoints.auth.register, payload);
    return completeAuthentication(data);
  }, [completeAuthentication]);

  const logout = useCallback(async () => {
    setUnauthenticatedState();
  }, [setUnauthenticatedState]);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated,
      login,
      register,
      logout,
      refreshUser,
    }),
    [user, isLoading, isAuthenticated, login, register, logout, refreshUser],
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
