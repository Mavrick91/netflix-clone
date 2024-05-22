"use client";

import { createSession, getRequestToken } from "@/actions/tmdb";
import { useSearchParams } from "next/navigation";
import { ReactNode, useCallback, useEffect } from "react";
import { useAuth } from "../../Providers/AuthProvider";

interface TMDBSessionManagerProps {
	children: ReactNode;
}

export const TMDBSessionManager = ({ children }: TMDBSessionManagerProps) => {
	const { currentUser } = useAuth();
	const searchParams = useSearchParams();

	const fetchRequestToken = useCallback(async () => {
		try {
			const token = await getRequestToken();
			if (token) {
				window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=http://localhost:3000/browse`;
			}
		} catch (err) {
			throw new Error("Failed to get request token");
		}
	}, []);

	const createSessionHandler = useCallback(
		async (token: string) => {
			try {
				await createSession(token, currentUser?.uid!);
				window.location.reload();
			} catch (err) {
				console.error("Failed to create session:", err);

				throw new Error("Failed to create session");
			}
		},
		[currentUser?.uid]
	);

	useEffect(() => {
		const initialize = async () => {
			if (!searchParams.get("request_token") && !searchParams.get("approved")) {
				await fetchRequestToken();
			}
		};

		if (!currentUser?.tmdb?.sessionId) initialize();
	}, [currentUser?.tmdb?.sessionId, fetchRequestToken, searchParams]);

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

	if (!currentUser?.tmdb?.sessionId) return null;

	return children;
};
