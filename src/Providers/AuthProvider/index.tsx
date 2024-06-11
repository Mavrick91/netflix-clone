"use client";

import {
	onAuthStateChanged,
	signOut,
	User as FirebaseUser,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";

import { clearToken } from "@/actions/cookie";
import { auth, db } from "@/firebase";

export interface User extends FirebaseUser {
	stripeCustomerId?: string;
	stripeSubscriptionId?: string;
	plan?: string;
	status?: string;
}

interface AuthContextProps {
	user: User | null;
	loading: boolean;
	logout: () => Promise<void>;
	setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextProps>({
	user: null,
	loading: true,
	logout: async () => {},
	setUser: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
			if (firebaseUser) {
				const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
				const userData = userDoc.exists() ? userDoc.data() : {};
				setUser({ ...firebaseUser, ...userData });
			} else {
				setUser(null);
			}
			setLoading(false);
		});

		return () => unsubscribe();
	}, []);

	const logout = useCallback(async () => {
		await clearToken();
		await signOut(auth);
		router.push("/");
	}, [router]);

	const contextValue = useMemo(
		() => ({ user, loading, logout, setUser }),
		[user, loading, logout, setUser],
	);

	return (
		<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
