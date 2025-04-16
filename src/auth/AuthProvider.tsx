import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  User,
  UserCredential,
} from "firebase/auth";
import { auth } from "../api/firebase";
import LoadingScreen from "../presentation/components/LoadingScreen";

// Define la forma del contexto
interface AuthContextType {
  user: User | null;
  signup: (email: string, password: string) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  signout: () => Promise<void>;
}

// Crear contexto tipado
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Props para el AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signup = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signout = () => signOut(auth);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider value={{ user, signup, login, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado con validación del contexto
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

/**
 import React, {createContext, useContext, useEffect, useState} from "react";
import {onAuthStateChanged} from "firebase/auth";
import {
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword,
} from "firebase/auth";
import {auth} from "../api/firebase.ts";
import LoadingScreen from "../presentation/components/LoadingScreen.tsx";

const AuthContext = createContext();

export function AuthProvider({children}: { children: React.ReactNode }) {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signup = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const login = (email: string, password: string) =>
        signInWithEmailAndPassword(auth, email, password);

    const signout = () => signOut(auth);

    if (loading) {
        return <LoadingScreen/>;
    }

    return (
        <AuthContext.Provider value={{user, signup, login, signout}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
 */
