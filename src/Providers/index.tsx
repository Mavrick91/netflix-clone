import { AuthProvider } from "./AuthProvider";
import QueryClientProvider from "./QueryClientProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<QueryClientProvider>
			<AuthProvider>{children}</AuthProvider>
		</QueryClientProvider>
	);
};

export default Providers;
