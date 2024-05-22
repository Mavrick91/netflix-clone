import { TMDBProvider } from "@/Providers/TMBDProvider";
import MainHeader from "@/components/MainHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Home - Netflix clone",
	description: "Generated by create next app",
};

export default async function BrowseLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<TMDBProvider>
			<MainHeader />
			{children}
		</TMDBProvider>
	);
}
