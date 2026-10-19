import { authApi, axiosClient, onResponse, onResponseError } from '@/api';
import { TOKEN_KEY } from '@/constants';
import useLocalStorage from '@/hooks/useLocalStorage';
import { ReactProps, UserInfo } from '@/types';
import { clearLoginStorage } from '@/utils';
import React, { useEffect, useState } from 'react';

interface AuthState {
  user: UserInfo | null;
}

const initialState: AuthState = {
  user: null
};

export const AuthContext = React.createContext<
  AuthState & {
    signIn?: (token: string) => void;
    signOut?: () => void;
    fetchInfo?: () => void;
  }
>(initialState);

const AuthProvider = (props: ReactProps) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [token, setToken] = useLocalStorage(TOKEN_KEY);
  const signIn = (token: string) => {
    if (!token) return;
    setToken(token);
  };

  const signOut = () => {
    clearLoginStorage();
  };

  async function fetchInfo() {
    try {
      const response = await authApi.getUserInfo();
      if (!response.result) return;
      setUser(response.result);
    } catch (error) {
      signOut();
      console.log(error);
    }
  }

  useEffect(() => {
    axiosClient.interceptors.response.use(onResponse, (error) =>
      onResponseError(error, () => {
        if (error?.code === 'ERR_CANCELED') return;
        if (error.status === 401) return signOut();
      })
    );
  }, []);

  useEffect(() => {
    if (!token) return setUser(null);
    fetchInfo();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        fetchInfo
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
