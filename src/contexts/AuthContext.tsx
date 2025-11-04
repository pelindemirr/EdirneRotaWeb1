"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User } from "@/types";

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  showLogin: boolean;
  setIsLoggedIn: (logged: boolean) => void;
  setUser: (user: User | null) => void;
  setShowLogin: (show: boolean) => void;
  login: (userData: User) => void;
  isFirstLogin: () => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export { AuthContext };

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedInState] = useState(false);
  const [user, setUserState] = useState<User | null>(null);
  const [showLogin, setShowLogin] = useState(false);

  // Helper to check if this is the user's first login
  const isFirstLogin = () => {
    return localStorage.getItem("firstLoginDone") !== "true";
  };

  // Persist login state in localStorage
  useEffect(() => {
    const storedLogin = localStorage.getItem("isLoggedIn");
    const storedUser = localStorage.getItem("user");
    if (storedLogin === "true") {
      setIsLoggedInState(true);
      if (storedUser) {
        try {
          setUserState(JSON.parse(storedUser));
        } catch {}
      }
    }
  }, []);

  const setIsLoggedIn = (logged: boolean) => {
    setIsLoggedInState(logged);
    localStorage.setItem("isLoggedIn", logged ? "true" : "false");
    if (!logged) localStorage.removeItem("user");
  };

  const setUser = (user: User | null) => {
    setUserState(user);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  };

  const login = (userData: User) => {
    setUser(userData);
    setIsLoggedIn(true);
    setShowLogin(false);
    // Mark first login as done
    if (localStorage.getItem("firstLoginDone") !== "true") {
      localStorage.setItem("firstLoginDone", "true");
    }
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  const value = {
    isLoggedIn,
    user,
    showLogin,
    setIsLoggedIn,
    setUser,
    setShowLogin,
    login,
    logout,
    isFirstLogin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
