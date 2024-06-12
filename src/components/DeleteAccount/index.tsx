"use client";

import { useMutation } from "@tanstack/react-query";

import { deleteCustomer } from "@/actions/stripe";
import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import ProfileSectionLayout from "@/layout/ProfileSectionLayout";

import { Button } from "../Button";

const DeleteAccount = () => {
	const { user, logout } = useAuthenticatedUser();

	const { mutate: handleDeleteAccount, isPending } = useMutation({
		mutationFn: async () => {
			await deleteCustomer(user.uid, user?.stripeCustomerId);
			await logout();
		},
	});

	return (
		<ProfileSectionLayout title="DELETE ACCOUNT">
			<div className="flex flex-col sm:flex-row md:justify-end">
				<Button loading={isPending} onClick={handleDeleteAccount}>
					Delete account
				</Button>
			</div>
		</ProfileSectionLayout>
	);
};

export default DeleteAccount;
