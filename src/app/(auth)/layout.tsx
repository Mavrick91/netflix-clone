"use client";

import { useSearchParams } from "next/navigation";

import Modal from "@/components/Modal";
import ModalMoreInfo from "@/components/Modal/ModalMoreInfo";
import useManageQueryParams from "@/hooks/useManageQueryParams";

export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const searchParams = useSearchParams()!;
	const mediaId = searchParams.get("jbv");
	const mediaType = searchParams.get("type") as "movie" | "tv" | undefined;
	const { removeQueryParams } = useManageQueryParams();

	if (mediaId && !mediaType) {
		removeQueryParams(["jbv"]);
	}

	if (mediaType && !["tv", "movie"].includes(mediaType)) {
		throw new Error("Invalid media type");
	}

	return (
		<div>
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
