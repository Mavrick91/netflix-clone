"use client";

import { Button } from "@/components/Button";
import FormInput from "@/components/input/FormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
	customer: z
		.string({
			required_error: "Please enter your email address.",
		})
		.email("Please enter a valid email address.")
		.transform((val) => val.trim().toLowerCase()),
	password: z
		.string({
			required_error: "Please enter your password.",
		})
		.min(4, "Password must be at least 4 characters long")
		.max(60, "Password must be less than 60 characters long"),
});

type FormData = z.infer<typeof formSchema>;

const LoginForm = () => {
	const methods = useForm<FormData>({
		resolver: zodResolver(formSchema),
	});

	const { handleSubmit } = methods;

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		console.log("🚀 ~ data:", data);
	};

	return (
		<div className="flex max-h-[707px] flex-col rounded-md bg-[#000000b3] px-16 py-12">
			<header>
				<h1 className="mb-7 text-3xl font-bold">Sign In</h1>
			</header>
			<FormProvider {...methods}>
				<form className="flex w-80 flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
					<FormInput name="customer">
						<FormInput.Text label="Email address" type="email" />
					</FormInput>
					<FormInput name="password">
						<FormInput.Text label="Password" type="password" />
					</FormInput>

					<Button type="submit">Submit</Button>

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
