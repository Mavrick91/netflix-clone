import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

import { adminDb } from "@/firebaseAdmin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: "2024-04-10",
});

export async function POST(req: NextRequest) {
	const { subscriptionId } = await req.json();

	if (!subscriptionId) {
		return NextResponse.json(
			{ message: "Subscription ID is required" },
			{ status: 400 },
		);
	}

	try {
		const deletedSubscription =
			await stripe.subscriptions.cancel(subscriptionId);

		const userId = deletedSubscription.metadata?.userId;
		if (userId) {
			const userRef = adminDb.collection("users").doc(userId);
			await userRef.update({ status: "canceled" });
		}

		return NextResponse.json({ success: true, deletedSubscription });
	} catch (error: any) {
		console.error("Error canceling subscription:", error.message);
		return NextResponse.json(
			{ message: `Error canceling subscription: ${error.message}` },
			{ status: 500 },
		);
	}
}
