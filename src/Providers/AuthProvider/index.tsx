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
	last4?: string;
	cardBrand?: string;
	current_period_end?: number;
}

interface AuthContextProps {
	user: User | null;
	loading: boolean;
	logout: () => Promise<void>;
	setUser: (user: User | null) => void;
	updateUser: (userData: Partial<User>) => void;
	reloadUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
	user: null,
	loading: true,
	logout: async () => {},
	setUser: () => {},
	updateUser: () => {},
	reloadUser: async () => {},
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

				const userWithPrototype = Object.assign(
					Object.create(Object.getPrototypeOf(firebaseUser)),
					firebaseUser,
					userData,
				);

				setUser(userWithPrototype as User);
			} else {
				setUser(null);
			}
			setLoading(false);
		});

		return () => {
			unsubscribe();
		};
	}, []);

	const logout = useCallback(async () => {
		await clearToken();
		await signOut(auth);
		router.push("/");
	}, [router]);

	const updateUser = useCallback(
		(userData: Partial<User>) => {
			if (user) {
				const updatedUser = Object.assign(
					Object.create(Object.getPrototypeOf(user)),
					user,
					userData,
				);
				setUser(updatedUser);
			}
		},
		[user],
	);

	const reloadUser = useCallback(async () => {
		const currentUser = auth.currentUser;
		if (currentUser) {
			await currentUser.reload();
			const refreshedUser = auth.currentUser;
			if (refreshedUser) {
				const userDoc = await getDoc(doc(db, "users", refreshedUser.uid));
				const userData = userDoc.exists() ? userDoc.data() : {};

				const userWithPrototype = Object.assign(
					Object.create(Object.getPrototypeOf(refreshedUser)),
					refreshedUser,
					userData,
				);

				setUser(userWithPrototype as User);
			}
		}
	}, []);

	const contextValue = useMemo(
		() => ({ user, loading, logout, setUser, updateUser, reloadUser }),
		[user, loading, logout, setUser, updateUser, reloadUser],
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
