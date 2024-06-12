"use client";

import { signOut, User as FirebaseUser } from "firebase/auth";
import { useRouter } from "next/navigation";
import {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useReducer,
} from "react";

import { clearToken, getToken } from "@/actions/cookie";
import { getUser } from "@/actions/firebase";
import { auth } from "@/firebase";
import { getErrorMessage, logError } from "@/utils/utils";

export interface User extends FirebaseUser {
	stripeCustomerId?: string;
	stripeSubscriptionId?: string;
	plan?: string;
	status?: string;
	last4?: string;
	cardBrand?: string;
	current_period_end?: number;
}

export interface AuthContextType {
	user: User | null;
	loading: boolean;
	logout: () => Promise<void>;
	updateUser: (userData: Partial<User>) => void;
	initializeUser: (token?: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
	user: null,
	loading: true,
	logout: async () => {},
	updateUser: () => {},
	initializeUser: async () => {},
});

const AuthActionTypes = {
	SET_USER: "SET_USER",
	SET_LOADING: "SET_LOADING",
	LOGOUT: "LOGOUT",
	UPDATE_USER: "UPDATE_USER",
} as const;

type AuthActionTypes = (typeof AuthActionTypes)[keyof typeof AuthActionTypes];

export interface User extends FirebaseUser {
	stripeCustomerId?: string;
	stripeSubscriptionId?: string;
	plan?: string;
	status?: string;
	last4?: string;
	cardBrand?: string;
	current_period_end?: number;
}

interface AuthState {
	user: User | null;
	loading: boolean;
}

interface SetUserAction {
	type: typeof AuthActionTypes.SET_USER;
	payload: User | null;
}

interface SetLoadingAction {
	type: typeof AuthActionTypes.SET_LOADING;
	payload: boolean;
}

interface LogoutAction {
	type: typeof AuthActionTypes.LOGOUT;
}

interface UpdateUserAction {
	type: typeof AuthActionTypes.UPDATE_USER;
	payload: Partial<User>;
}

type AuthAction =
	| SetUserAction
	| SetLoadingAction
	| LogoutAction
	| UpdateUserAction;

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
	switch (action.type) {
		case AuthActionTypes.SET_USER:
			return { ...state, user: action.payload, loading: false };
		case AuthActionTypes.SET_LOADING:
			return { ...state, loading: action.payload };
		case AuthActionTypes.LOGOUT:
			return { ...state, user: null, loading: false };
		case AuthActionTypes.UPDATE_USER:
			return { ...state, user: { ...state.user, ...action.payload } as User };
		default:
			return state;
	}
};

const initialState = {
	user: null,
	loading: true,
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(authReducer, initialState);
	const router = useRouter();

	const initializeUser = async (token?: string) => {
		const tokenCookie = token || (await getToken());
		if (tokenCookie) {
			try {
				const user = await getUser(tokenCookie);
				const userParsed = JSON.parse(user);

				dispatch({
					type: AuthActionTypes.SET_USER,
					payload: userParsed as User,
				});
			} catch (error: unknown) {
				const errorMessage = getErrorMessage(error);
				logError(errorMessage);
				dispatch({ type: AuthActionTypes.SET_USER, payload: null });
			}
		} else {
			dispatch({ type: AuthActionTypes.SET_LOADING, payload: false });
		}
	};

	useEffect(() => {
		initializeUser();
	}, []);

	const logout = useCallback(async () => {
		await clearToken();
		await signOut(auth);
		dispatch({ type: AuthActionTypes.LOGOUT });
		router.push("/");
	}, [router]);

	const updateUser = useCallback((userData: Partial<User>) => {
		dispatch({ type: AuthActionTypes.UPDATE_USER, payload: userData });
	}, []);

	const contextValue = useMemo(
		() => ({
			user: state.user,
			loading: state.loading,
			logout,
			updateUser,
			initializeUser,
		}),
		[state.user, state.loading, logout, updateUser],
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
