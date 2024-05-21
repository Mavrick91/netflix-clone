"use client";

import { Button } from "@/components/Button";
import Link from "next/link";
import { useState } from "react";
import Step1 from "./_components/Step1";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Step2 from "./_components/Step2";

const steps = [
	{
		id: "Step 1",
		fields: ["offer"],
	},
	{
		id: "Step 2",
		fields: ["email", "password"],
	},
	{ id: "Step 3", name: "Complete" },
];

const formSchema = z.object({
	"plan-select": z.string(),
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
		.min(4, "Password must be at least 4 characters long")
		.max(60, "Password must be less than 60 characters long"),
});

type FormData = z.infer<typeof formSchema>;

const SignUpPage = () => {
	const [currentStep, setCurrentStep] = useState(1);

	const methods = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			"plan-select": "1",
			email: "",
			password: "",
		},
	});
	const {
		handleSubmit,
		reset,
		trigger,
		formState: { errors },
		watch,
	} = methods;
	console.log("🚀 ~ watch:", watch());

	type FieldName = keyof FormData;

	const processForm: SubmitHandler<FormData> = (data) => {
		console.log(data);
		reset();
	};

	const next = async () => {
		const fields = steps[currentStep].fields;
		const output = await trigger(fields as FieldName[], { shouldFocus: true });

		if (!output) return;

		if (currentStep < steps.length - 1) {
			if (currentStep === steps.length - 2) {
				await handleSubmit(processForm)();
			}
			setCurrentStep((step) => step + 1);
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
					{currentStep === 0 && (
						<div className="mx-auto flex max-w-[1100px] flex-col px-8 pb-16 pt-5" tabIndex={0}>
							<Step1 />
							<Button tabIndex={0} className="mx-auto mt-6 h-auto w-full max-w-[340px] py-5 text-2xl" size="lg" onClick={next}>
								Next
							</Button>
						</div>
					)}
					{currentStep === 1 && (
						<div className="mx-auto flex max-w-[440px] flex-col px-8 pb-16 pt-5" tabIndex={0}>
							<Step2 />
							<Button tabIndex={0} className="mx-auto mt-6 h-auto w-full py-5 text-2xl" size="lg" onClick={next}>
								Next
							</Button>
						</div>
					)}
				</form>
			</FormProvider>
		</div>
	);
};

export default SignUpPage;
