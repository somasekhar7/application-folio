import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, confirmPassword: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (from localStorage for mock)
    const savedUser = localStorage.getItem('mockUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Mock authentication - accept any email/password
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    
    const mockUser: User = {
      id: '1',
      email,
      name: email.split('@')[0],
    };
    
    setUser(mockUser);
    localStorage.setItem('mockUser', JSON.stringify(mockUser));
    setIsLoading(false);
    return true;
  };

  const signup = async (email: string, password: string, confirmPassword: string): Promise<boolean> => {
    setIsLoading(true);
    
    if (password !== confirmPassword) {
      setIsLoading(false);
      return false;
    }
    
    // Mock signup - accept any valid email
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    
    const mockUser: User = {
      id: '1',
      email,
      name: email.split('@')[0],
    };
    
    setUser(mockUser);
    localStorage.setItem('mockUser', JSON.stringify(mockUser));
    setIsLoading(false);
    return true;
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    setIsLoading(true);
    
    // Mock Google login
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    
    const mockUser: User = {
      id: '1',
      email: 'user@gmail.com',
      name: 'Google User',
    };
    
    setUser(mockUser);
    localStorage.setItem('mockUser', JSON.stringify(mockUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mockUser');
  };

  const value = {
    user,
    login,
    signup,
    loginWithGoogle,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};