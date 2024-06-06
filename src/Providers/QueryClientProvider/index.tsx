import {
	QueryClient,
	QueryClientProvider as Provider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
