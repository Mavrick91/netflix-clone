"use client";

import { clearToken, setCookie } from "@/actions/cookie";
import { auth } from "@/firebase";
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter, useSearchParams } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

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

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			console.log("🚀 ~ user:", user);
			if (user) {
				const token = await user.getIdToken();

				await setCookie(token);
			} else await clearToken();

			setCurrentUser(user);
			setLoading(false);
		});

		return unsubscribe;
	}, []);

	const logout = async () => {
		await clearToken();
		await signOut(auth);
		router.push("/");
	};

	if (loading) {
		return null;
	}

	return <AuthContext.Provider value={{ currentUser, logout }}>{children}</AuthContext.Provider>;
};
