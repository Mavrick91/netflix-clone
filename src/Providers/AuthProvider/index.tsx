"use client";

import { onAuthStateChanged, signOut,User } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

import { clearToken, setCookie } from "@/actions/cookie";
import { AUTH_PATHS } from "@/constans/route";
import { auth } from "@/firebase";

interface AuthContextType {
  currentUser: User | null;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const handleAuthStateChange = async (
  user: User | null,
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  pathname: string,
  router: any,
) => {
  console.log("🚀 ~ user:", user);
  if (user) {
    const token = await user.getIdToken();
    await setCookie(token);

    if (AUTH_PATHS.includes(pathname)) {
      router.push("/browse");
    }
  } else {
    await clearToken();
  }

  setCurrentUser(user);
  setLoading(false);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      handleAuthStateChange(user, setCurrentUser, setLoading, pathname, router);
    });

    return unsubscribe;
  }, [pathname, router]);

  const logout = async () => {
    await clearToken();
    await signOut(auth);
    router.push("/");
  };

  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ currentUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
