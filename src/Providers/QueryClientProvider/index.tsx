"use client";

import {
	QueryClient,
	QueryClientProvider as Provider,
} from "@tanstack/react-query";
import dynamic from "next/dynamic";

const ReactQueryDevtools = dynamic(
	() =>
		import("@tanstack/react-query-devtools").then(
			(mod) => mod.ReactQueryDevtools,
		),
	{ ssr: false },
);

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false,
		},
	},
});

function QueryClientProvider({ children }: { children: React.ReactNode }) {
	return (
		<Provider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			{children}
		</Provider>
	);
}

export default QueryClientProvider;
