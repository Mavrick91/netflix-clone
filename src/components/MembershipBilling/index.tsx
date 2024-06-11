"use client";

import { useMutation } from "@tanstack/react-query";

import { Button } from "@/components/Button";
import LinkComponent from "@/components/LinkComponent";
import { handleSubscriptionCancellation } from "@/helpers/subscriptionHelpers";
import ProfileSectionLayout from "@/layout/ProfileSectionLayout";
import { useAuth } from "@/Providers/AuthProvider";

const MembershipBilling: React.FC = () => {
	const { user, setUser } = useAuth();

	const { mutate: deleteSubscription, isPending } = useMutation({
		mutationFn: async () => {
			if (user) {
				await handleSubscriptionCancellation(user, setUser);
			}
		},
	});

	const renderChangeAccountLinks = (className: string) => (
		<>
			<LinkComponent href="/account/update-email" className={className}>
				Change account email
			</LinkComponent>
			<LinkComponent href="/account/update-password" className={className}>
				Change password
			</LinkComponent>
		</>
	);

	const subTitle = (
		<div className="mt-3 hidden flex-col sm:flex md:col-span-3">
			<Button
				loading={isPending}
				onClick={deleteSubscription}
				disabled={!user?.plan || user?.status === "canceled"}
				className="text-black"
				style={{
					backgroundColor: "#e6e6e6",
					backgroundImage: "linear-gradient(180deg,#e6e6e6,#ddd)",
					boxShadow: "0 1px 0 rgba(0,0,0,.2)",
				}}
			>
				Cancel Membership
			</Button>
		</div>
	);

	return (
		<ProfileSectionLayout title="MEMBERSHIP & BILLING" subTitle={subTitle}>
			<div className="flex flex-col gap-3 sm:hidden">
				<p className="font-medium text-[#333]">{user?.email}</p>
				<p className="text-[#737373]">Password: ********</p>
				{renderChangeAccountLinks(
					"border-t border-[#ccc] pb-1 pt-4 font-light",
				)}
			</div>
			<div className="mt-5 hidden w-full flex-col gap-3 sm:flex md:mt-0">
				<div className="flex items-center justify-between gap-10">
					<p className="break-all font-medium text-[#333]">{user?.email}</p>
					{renderChangeAccountLinks(
						"whitespace-nowrap text-[#0073e6] underline-offset-2 hover:underline",
					)}
				</div>
				<div className="flex items-center justify-between">
					<p className="text-[#737373]">Password: ********</p>
					{renderChangeAccountLinks(
						"text-[#0073e6] underline-offset-2 hover:underline",
					)}
				</div>
			</div>
		</ProfileSectionLayout>
	);
};

export default MembershipBilling;
