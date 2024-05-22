"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";
import { TMDBContextType } from "../../../types";
import { createSession, getRequestToken } from "@/actions/tmdb";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../AuthProvider";

const TMDBContext = createContext<TMDBContextType | undefined>(undefined);

interface TMDBProviderProps {
	children: ReactNode;
}

export const TMDBProvider = ({ children }: TMDBProviderProps) => {
	const { currentUser } = useAuth();
	const [sessionId, setSessionId] = useState<string | null | undefined>(currentUser?.tmdbSessionId);
	const [requestToken, setRequestToken] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const searchParams = useSearchParams();
	const router = useRouter();
	console.log("🚀 ~ currentUser:", currentUser);

	const fetchRequestToken = useCallback(async () => {
		try {
			const token = await getRequestToken();
			setRequestToken(token);
			if (token) {
				window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=http://localhost:3000/browse`;
			}
		} catch (err) {
			setError("Failed to get request token");
		}
	}, []);

	const createSessionHandler = useCallback(
		async (token: string) => {
			try {
				const session = await createSession(token, currentUser?.uid!);
				setSessionId(session);
				router.push("/browse");
			} catch (err) {
				console.error("Failed to create session:", err);
				setError("Failed to create session");
			}
		},
		[currentUser?.uid, router]
	);

	useEffect(() => {
		const initialize = async () => {
			if (!searchParams.get("request_token") && !searchParams.get("approved") && !sessionId) {
				await fetchRequestToken();
			}
		};

		if (!sessionId) initialize();
	}, [fetchRequestToken, searchParams, sessionId]);

	useEffect(() => {
		const handleSessionCreation = async () => {
			if (searchParams.get("request_token") && searchParams.get("approved")) {
				const token = searchParams.get("request_token");
				const approved = searchParams.get("approved");

				if (token && approved === "true") {
					createSessionHandler(token);
				}
			}
		};

		handleSessionCreation();
	}, [searchParams, createSessionHandler]);

	if (!sessionId) return null;

	return <TMDBContext.Provider value={{ sessionId, requestToken, error, fetchRequestToken, createSession: createSessionHandler }}>{children}</TMDBContext.Provider>;
};

export const useTMDB = () => {
	const context = useContext(TMDBContext);
	if (context === undefined) {
		throw new Error("useTMDB must be used within a TMDBProvider");
	}
	return context;
};
