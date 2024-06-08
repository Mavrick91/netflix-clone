import { Suspense } from "react";

import { AuthProvider } from "./AuthProvider";
import QueryClientProvider from "./QueryClientProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<QueryClientProvider>
			<AuthProvider>
				<Suspense fallback={<div />}>{children}</Suspense>
			</AuthProvider>
		</QueryClientProvider>
	);
};

export default Providers;
