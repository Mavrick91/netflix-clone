"use client";

import { Button } from "@/components/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import Step1 from "./_components/Step1";
import { auth } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { useEffect } from "react";

const formSchema = z.object({
	email: z
		.string({
			required_error: "Please enter your email address.",
		})
		.email("Please enter a valid email address.")
		.transform((val) => val.trim().toLowerCase()),
	password: z
		.string({
			required_error: "Please enter your password.",
		})
		.min(6, "Password must be at least 6 characters long")
		.max(60, "Password must be less than 60 characters long"),
});

type FormData = z.infer<typeof formSchema>;

const SignUpPage = () => {
	const router = useRouter();
	const methods = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});
	const { handleSubmit } = methods;
	const {
		mutate: signUp,
		isPending,
		error,
		isSuccess,
	} = useMutation({
		mutationFn: async ({ email, password }: { email: string; password: string }) => createUserWithEmailAndPassword(auth, email, password),
	});

	useEffect(() => {
		if (isSuccess) {
			router.push("/");
		}
	}, [isSuccess, router]);

	const processForm: SubmitHandler<FormData> = async (data) => {
		try {
			signUp({ email: data.email, password: data.password });
		} catch (error) {
			console.error("Error signing up:", error);
		}
	};

	return (
		<div className="flex h-dvh flex-col">
			<div className="relative flex h-[90px] shrink-0 items-center justify-between border border-[#e6e6e6] bg-primary-white">
				<Link href="/" className="">
					Netflix
				</Link>
				<Link href="/login" className="mx-11 text-xl font-medium underline-offset-2 hover:underline">
					Sign In
				</Link>
			</div>
			<FormProvider {...methods}>
				<form onSubmit={handleSubmit(processForm)} className="grow bg-primary-white">
					<div className="mx-auto flex w-[500px] flex-col px-8 pb-16 pt-5" tabIndex={0}>
						{error && (
							<div className="mt-8 rounded-md bg-[#d89d31] p-4">
								<div className="flex items-center">
									<Icon icon="material-symbols:warning" className="mr-4 shrink-0 text-2xl text-black" />
									<div className="text-base">
										<span id="" data-uia="">
											Sorry, we are unable to complete the sign-up process now. Please try again later.
										</span>
									</div>
								</div>
							</div>
						)}

						<Step1 />
						<Button loading={isPending} type="submit" tabIndex={0} className="mx-auto mt-6 h-auto w-full py-4 text-2xl" size="lg">
							Create account
						</Button>
					</div>
				</form>
			</FormProvider>
		</div>
	);
};

export default SignUpPage;