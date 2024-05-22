"use client";

import { useAuth } from "@/Providers/AuthProvider";
import ImageClient from "@/components/ImageClient";
import NetflixLogo from "@/components/NetflixLogo";
import React from "react";

const BrowsePage = () => {
	const { logout } = useAuth();
	return (
		<div>
			BrowsePage
			<NetflixLogo />
			<button onClick={() => logout()}>logout</button>
		</div>
	);
};

export default BrowsePage;
