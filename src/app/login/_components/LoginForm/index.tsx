"use client";

import { Button } from "@/components/Button";
import WarningError from "@/components/WarningError";
import FormInput from "@/components/input/FormInput";
import { auth } from "@/firebase";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

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

const LoginForm = () => {
	const router = useRouter();
	const methods = useForm<FormData>({
		resolver: zodResolver(formSchema),
	});

	const { handleSubmit, watch } = methods;

	const watchEmail = watch("email");

	const {
		mutate: signIn,
		isPending,
		error,
		isSuccess,
		data: userCredentials,
	} = useMutation({
		mutationFn: async ({ email, password }: { email: string; password: string }) => signInWithEmailAndPassword(auth, email, password),
	});

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		try {
			signIn({ email: data.email, password: data.password });
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		if (isSuccess) {
			router.push("/browse");
		}
	}, [isSuccess, router, userCredentials]);

	return (
		<div className="flex max-h-[707px] flex-col rounded-md bg-[#000000b3] px-16 py-12">
			<header>
				<h1 className="mb-7 text-3xl font-bold">Sign In</h1>
			</header>
			<FormProvider {...methods}>
				<form className="flex w-80 flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
					{error && (
						<WarningError>
							<b className="font-medium">Incorrect password for {watchEmail}</b>
						</WarningError>
					)}

					<FormInput name="email">
						<FormInput.Text label="Email address" type="email" />
					</FormInput>
					<FormInput name="password">
						<FormInput.Text label="Password" type="password" />
					</FormInput>

					<Button type="submit" loading={isPending}>
						Submit
					</Button>

					<Link className="text-center" href="/LoginHelp">
						<span className="underline-offset-2 hover:text-primary-white-hover hover:underline">Forgot password?</span>
					</Link>
				</form>
			</FormProvider>
			<footer className="mt-6">
				<p className="text-primary-white-hover">
					New to Netflix?{" "}
					<Link className="font-medium text-white underline-offset-2 hover:underline" target="_self" href="/signup">
						Sign up now
					</Link>
					.
				</p>
			</footer>
		</div>
	);
};

export default LoginForm;
