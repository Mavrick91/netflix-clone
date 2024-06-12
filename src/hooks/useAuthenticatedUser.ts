import { AuthContextType, useAuth, User } from "@/Providers/AuthProvider";

interface AuthenticatedUserRtn extends AuthContextType {
	user: User;
}

function useAuthenticatedUser(): AuthenticatedUserRtn {
	const auth = useAuth();

	if (!auth.user) {
		auth.logout();
	}

	return auth as AuthenticatedUserRtn;
}

export default useAuthenticatedUser;
