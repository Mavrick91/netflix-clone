import FormInput from "@/components/input/FormInput";
import React from "react";

const Step1 = () => {
	return (
		<div className="mt-10">
			<div className="text-3xl">{`Create your account`}</div>
			<div className="my-5 flex flex-col gap-3">
				<FormInput name="email">
					<FormInput.Text label="Email" type="email" mode="light" />
				</FormInput>

				<FormInput name="password">
					<FormInput.Text label="Add a password" type="password" mode="light" />
				</FormInput>
			</div>
		</div>
	);
};

export default Step1;
