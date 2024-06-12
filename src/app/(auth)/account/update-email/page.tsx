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

const schema = z.object({
	newEmail: z.string().email("Invalid email address"),
});

type FormData = z.infer<typeof schema>;

const UpdateEmail = () => {
	const showToast = useToast();
	const { user, updateUser } = useAuthenticatedUser();
	const router = useRouter();
	const methods = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			newEmail: user.email || "",
		},
	});
	const { handleSubmit } = methods;

	const { mutate, isPending } = useMutation({
		mutationFn: async (data: FormData) => {
			await updateFirebaseUser(user.uid, { email: data.newEmail });
			updateUser({ email: data.newEmail });
		},
		onError: (error: unknown) => {
			const errorMessage = getErrorMessage(error);
			logError(errorMessage);

			showToast("Error while updating your email", "error");
		},
		onSuccess: async () => {
			showToast("Email updated successfully", "success");
			router.push("/account");
		},
	});

	const onSubmit = (data: FormData) => {
		mutate(data);
	};

	return (
		<div className="flex flex-col bg-gray-100">
			<ProfileSectionLayout title="UPDATE YOUR EMAIL">
				<FormProvider {...methods}>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="mt-3 flex flex-col md:m-0 md:gap-3"
					>
						<div className="mb-4 md:mb-0">
							<FormInput name="newEmail">
								<FormInput.Text
									autoFocus
									label="New email address"
									mode="light"
								/>
							</FormInput>
						</div>
						<Button type="submit" className="w-full py-2" loading={isPending}>
							Update Email
						</Button>
					</form>
				</FormProvider>
			</ProfileSectionLayout>
		</div>
	);
};

export default UpdateEmail;
