import { ReactNode } from 'react';

export interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  login: () => void;
  logout: () => void;
}

export const AuthProvider: React.FC<{ children: ReactNode }>;
export const useAuth: () => AuthContextType;
export default AuthProvider;