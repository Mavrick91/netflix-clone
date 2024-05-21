import FormInput from "@/components/input/FormInput";
import React from "react";

const Step2 = () => {
	return (
		<div>
			<div className="mb-2 mt-6">
				<span className="text-xs">
					STEP <b>2</b> OF <b>3</b>
				</span>
				<h1 className="mb-3 text-3xl font-medium">{`Create a password to start your membership`}</h1>
			</div>

			<div>
				<div className="text-xl">{`Just a few more steps and you're done!`}</div>
				<span className="text-xl">{`We hate paperwork, too.`}</span>
				<div className="my-5 flex flex-col gap-3">
					<FormInput name="email">
						<FormInput.Text label="Email" type="email" mode="light" />
					</FormInput>

					<FormInput name="password">
						<FormInput.Text label="Add a password" type="password" mode="light" />
					</FormInput>
				</div>
			</div>
		</div>
	);
};

export default Step2;
