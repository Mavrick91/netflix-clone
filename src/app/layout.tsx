import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Providers from "@/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Netflix Clone",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Providers>{children}</Providers>
				<div id="modal-root" />
			</body>
		</html>
	);
}
