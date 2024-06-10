import "./globals.css";

import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

import Providers from "@/Providers";

const SpeedInsights = dynamic(
	() => import("@vercel/speed-insights/next").then((mod) => mod.SpeedInsights),
	{ ssr: false },
);
const Analytics = dynamic(
	() => import("@vercel/analytics/react").then((mod) => mod.Analytics),
	{ ssr: false },
);

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
	title: "Netflix Clone",
	description: "A Netflix clone built with Next.js and Tailwind CSS",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Providers>
					{children}
					<SpeedInsights />
					<Analytics />
					<div id="modal-root" />
					<Toaster />
				</Providers>
			</body>
		</html>
	);
}
