import MainHeader from "@/components/MainHeader";

export default function SearchLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div>
			<MainHeader />
			{children}
		</div>
	);
}
