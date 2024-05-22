"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";
import { setCookie, clearToken } from "@/actions/cookie";

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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			setCurrentUser(user);
			setLoading(false);

			if (user) {
				const token = await user.getIdToken();

				await setCookie(token);
				router.push("/browse");
			} else {
				await clearToken();
			}
		});

		return unsubscribe;
	}, [router]);

	const logout = async () => {
		await signOut(auth);
		router.push("/");
	};

	return <AuthContext.Provider value={{ currentUser, logout }}>{!loading && children}</AuthContext.Provider>;
};
