declare module '../contexts/AuthContext' {
  export interface AuthContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
    login: () => void;
    logout: () => void;
  }

  export const AuthProvider: React.FC<{ children: React.ReactNode }>;
  export const useAuth: () => AuthContextType;
  export default AuthProvider;
} 