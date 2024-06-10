"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { reload, updateEmail } from "firebase/auth";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/Button";
import FormInput from "@/components/input/FormInput";
import ProfileSectionLayout from "@/layout/ProfileSectionLayout";
import { useAuth } from "@/Providers/AuthProvider";

const schema = z.object({
	newEmail: z.string().email("Invalid email address"),
});

type FormData = z.infer<typeof schema>;

type UpdateEmailProps = {};

const UpdateEmail = ({}: UpdateEmailProps) => {
	const { user } = useAuth();
	const router = useRouter();
	const methods = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			newEmail: user?.email || "",
		},
	});
	const { handleSubmit } = methods;

	const { mutate, isPending } = useMutation({
		mutationFn: async (data: FormData) => {
			if (!user) return;
			await updateEmail(user, data.newEmail);
		},
		onError: (err: any) => {
			console.log("🚀 ~ onError: ~ err", err);
		},
		onSuccess: async () => {
			await reload(user!);
			router.push("/account");
		},
	});

	const onSubmit = (data: FormData) => {
		try {
			mutate(data);
		} catch (err: any) {
			console.log(err.message);
			throw new Error("Can't update your password. Try again later.");
		}
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
