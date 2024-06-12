"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { updateFirebaseUser } from "@/actions/firebase";
import { Button } from "@/components/Button";
import FormInput from "@/components/input/FormInput";
import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import useToast from "@/hooks/useToast";
import ProfileSectionLayout from "@/layout/ProfileSectionLayout";
import { getErrorMessage, logError } from "@/utils/utils";

const schema = z
	.object({
		currentPassword: z
			.string()
			.min(6, "Password must be at least 6 characters long"),
		newPassword: z
			.string()
			.min(6, "Password must be at least 6 characters long"),
		confirmNewPassword: z
			.string()
			.min(6, "Password must be at least 6 characters long"),
	})
	.refine((data) => data.newPassword === data.confirmNewPassword, {
		message: "Passwords do not match",
		path: ["confirmNewPassword"], // Path to indicate where the error should be displayed
	});

type FormData = z.infer<typeof schema>;

const UpdatePassword = () => {
	const { user } = useAuthenticatedUser();
	const showToast = useToast();
	const router = useRouter();
	const methods = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			currentPassword: "",
			newPassword: "",
			confirmNewPassword: "",
		},
	});
	const { handleSubmit } = methods;

	const { mutate, isPending } = useMutation({
		mutationFn: async (data: FormData) => {
			await updateFirebaseUser(user.uid, { password: data.newPassword });
		},
		onError: (error: unknown) => {
			const errorMessage = getErrorMessage(error);
			logError(errorMessage);

			showToast("Error while updating your password", "error");
		},
		onSuccess: async () => {
			showToast("Password updated successfully", "success");
			router.push("/account");
		},
	});

	const onSubmit = (data: FormData) => {
		mutate(data);
	};

	return (
		<div className="flex flex-col bg-gray-100">
			<ProfileSectionLayout title="UPDATE YOUR PASSWORD">
				<FormProvider {...methods}>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="mt-3 flex flex-col md:m-0 md:gap-3"
					>
						<div className="mb-4 md:mb-0">
							<FormInput name="currentPassword">
								<FormInput.Text
									type="password"
									autoFocus
									label="Current password"
									mode="light"
								/>
							</FormInput>
						</div>
						<div className="mb-4 md:mb-0">
							<FormInput name="newPassword">
								<FormInput.Text
									type="password"
									label="New password"
									mode="light"
								/>
							</FormInput>
						</div>
						<div className="mb-4 md:mb-0">
							<FormInput name="confirmNewPassword">
								<FormInput.Text
									type="password"
									label="Confirm new password"
									mode="light"
								/>
							</FormInput>
						</div>
						<Button type="submit" className="w-full py-2" loading={isPending}>
							Update Password
						</Button>
					</form>
				</FormProvider>
			</ProfileSectionLayout>
		</div>
	);
};

export default UpdatePassword;
