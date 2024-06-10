"use client";

import { useSearchParams } from "next/navigation";

import LoadingSpinner from "@/assets/images/svg/LoadingSpinner";
import Modal from "@/components/Modal";
import ModalMoreInfo from "@/components/Modal/ModalMoreInfo";
import useManageQueryParams from "@/hooks/useManageQueryParams";
import { useAuth } from "@/Providers/AuthProvider";

export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { loading } = useAuth();
	const searchParams = useSearchParams()!;
	const mediaId = searchParams.get("jbv");
	const mediaType = searchParams.get("type") as "movie" | "tv" | null;
	const { removeQueryParams } = useManageQueryParams();

	if (mediaId && !mediaType) {
		removeQueryParams(["jbv"]);
	}

	if (mediaType && !["tv", "movie"].includes(mediaType)) {
		throw new Error("Invalid media type");
	}

	if (loading) {
		return (
			<div className="flex size-full items-center justify-center">
				<LoadingSpinner className="size-16 text-white" />
			</div>
		);
	}

	return (
		<div className="h-full">
			{children}

			<Modal
				isOpen={!!mediaId}
				onClose={() => removeQueryParams(["jbv", "type"])}
			>
				<ModalMoreInfo
					mediaId={parseInt(mediaId!, 10)}
					mediaType={mediaType!}
				/>
			</Modal>
		</div>
	);
}
