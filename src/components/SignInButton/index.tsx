import Link from "next/link";
import React from "react";

const SignInButton = () => {
	return (
		<Link className="rounded-md bg-red-button px-4 py-1.5 text-sm font-medium" href="/login">
			Sign In
		</Link>
	);
};

export default SignInButton;
