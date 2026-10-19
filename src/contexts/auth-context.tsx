import { loginApi } from '@/api/login';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '@/types';
import { Token } from '@/types/auth';
import { ToastContext } from './toast-context';
import { jwtDecode } from 'jwt-decode';

interface CallbackParams {
  code?: string | null;
  message?: string | null;
  client_id?: string | null;
}

interface JwtPayload {
  exp: number;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: () => Promise<void>;
  logout: () => void;
  register: () => Promise<void>;
  callback: (params: CallbackParams) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { showToast } = useContext(ToastContext)!;
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = async () => {
    try {
      await loginApi.login();
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || 'Đăng nhập thất bại';
      showToast(errorMessage, 'error');
    }
  };

  const register = async () => {
    try {
      await loginApi.register();
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || 'Đăng ký thất bại';
      showToast(errorMessage, 'error');
    }
  };

  const callback = async ({ code, message }: CallbackParams) => {
    if (message) showToast(message, 'success');
    if (!code) {
      navigate('/');
      return;
    }

    try {
      const data = await loginApi.loginCallback(code);
      if (data?.token) {
        if (typeof data.token !== 'string' || !data.token.includes('.')) {
          throw new Error('Token không đúng định dạng JWT');
        }

        setIsAuthenticated(true);
        setUser(data);
        setToken(data.token);
        sessionStorage.setItem("user", JSON.stringify(data));
        sessionStorage.setItem('token', JSON.stringify(data.token));
        showToast('Đăng nhập thành công', 'success');
        navigate('/');
      } else {
        showToast('Dữ liệu token không hợp lệ', 'error');
        logout();
      }
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || 'Callback thất bại';
      showToast(errorMessage, 'error');
      logout();
    }
  };

  useEffect(() => {
    const initializeAuth = () => {
      const storedUser = sessionStorage.getItem('user');
      const storedToken = sessionStorage.getItem('token');

      if (!storedUser || !storedToken) {
        setIsAuthenticated(false);
        setUser(null);
        setToken(null);
        return;
      }

      try {
       
        const parsedUser = JSON.parse(storedUser);
        const parsedToken = JSON.parse(storedToken);

        // Kiểm tra xem token có phải là chuỗi và đúng định dạng JWT không
        if (typeof parsedToken !== 'string' || !parsedToken.includes('.')) {
          throw new Error('Token không đúng định dạng JWT');
        }

        // Giải mã token
        const decoded: JwtPayload = jwtDecode(parsedToken);

        if (decoded.exp * 1000 < Date.now()) {
          showToast('Phiên đăng nhập đã hết hạn', 'error');
          logout();
          return;
        }

        setUser(parsedUser);
        setToken(parsedToken);
        setIsAuthenticated(true);
      } catch (error: any) {
        console.error('Lỗi khi khôi phục trạng thái đăng nhập:', {
          message: error.message,
          storedUser,
          storedToken,
        });
        showToast('Không thể khôi phục phiên đăng nhập', 'error');
        setIsAuthenticated(false);
        setUser(null);
        setToken(null);
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
      }
    };

    initializeAuth();
  }, [navigate, showToast]);

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout, register, callback }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};