"use client";

import React from "react";
import QueryClientProvider from "./QueryClientProvider";
import { AuthProvider } from "./AuthProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<QueryClientProvider>
			<AuthProvider>{children}</AuthProvider>
		</QueryClientProvider>
	);
};

export default Providers;
