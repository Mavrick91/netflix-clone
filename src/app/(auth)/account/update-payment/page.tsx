"use client";

import "./payment.css";

import {
	CardCvcElement,
	CardExpiryElement,
	CardNumberElement,
	Elements,
	useElements,
	useStripe,
} from "@stripe/react-stripe-js";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { updateCard } from "@/actions/stripe";
import { Button } from "@/components/Button";
import useToast from "@/hooks/useToast";
import ProfileSectionLayout from "@/layout/ProfileSectionLayout";
import { useAuth } from "@/Providers/AuthProvider";
import { getClientStripe } from "@/utils/stripeClient";

const stripe = getClientStripe();

const elementStyles = {
	base: {
		color: "#32325d",
		fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
		fontSmoothing: "antialiased",
		fontSize: "16px",
		"::placeholder": {
			color: "#aab7c4",
		},
		":-webkit-autofill": {
			color: "#e39f48",
		},
	},
	invalid: {
		color: "#fa755a",
		iconColor: "#fa755a",
	},
};

const UpdateCardForm = ({ customerId }: { customerId: string }) => {
	const { user } = useAuth();
	const showToast = useToast();
	const stripe = useStripe();
	const elements = useElements();
	const {
		handleSubmit,
		formState: { isSubmitting },
	} = useForm();
	const router = useRouter();

	const { mutate: updatePayment, isPending } = useMutation({
		mutationFn: async (paymentMethodId: string) =>
			updateCard(customerId, paymentMethodId),
		onError: (err: any) => {
			console.log("🚀 ~ onError: ~ err", err);
			showToast("Error while updating your payment method", "error");
		},
		onSuccess: async () => {
			showToast("Payment method updated successfully", "success");
			router.push("/account");
		},
	});

	const onSubmit = async () => {
		if (!stripe || !elements) return;

		const cardElement = elements.getElement(CardNumberElement);

		if (!cardElement) {
			return;
		}

		const { error: stripeError, paymentMethod } =
			await stripe.createPaymentMethod({
				type: "card",
				card: cardElement,
				metadata: {
					userId: user!.uid,
				},
			});

		if (stripeError) {
			return;
		}

		try {
			updatePayment(paymentMethod.id);
		} catch (err: any) {}
	};

	return (
		<ProfileSectionLayout title="UPDATE YOUR PAYMENT">
			<form
				onSubmit={handleSubmit(onSubmit)}
				autoComplete="off"
				className="mt-3 flex flex-col gap-3 md:m-0"
			>
				<div>
					<div className="wrapper-payment-input">
						<label>Card Number</label>
						<CardNumberElement options={{ style: elementStyles }} />
					</div>
					<div className="wrapper-payment-input">
						<label>Expiration Date</label>
						<CardExpiryElement options={{ style: elementStyles }} />
					</div>
					<div className="wrapper-payment-input">
						<label>CVC</label>
						<CardCvcElement options={{ style: elementStyles }} />
					</div>
				</div>
				<Button type="submit" loading={isPending || isSubmitting}>
					Update Card
				</Button>
			</form>
		</ProfileSectionLayout>
	);
};

const UpdateCardPage = () => {
	const { user } = useAuth();

	return (
		<Elements stripe={stripe}>
			<UpdateCardForm customerId={user?.stripeCustomerId!} />
		</Elements>
	);
};

export default UpdateCardPage;
