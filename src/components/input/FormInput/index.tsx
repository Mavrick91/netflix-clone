"use client";

import {
	createContext,
	InputHTMLAttributes,
	ReactNode,
	useContext,
} from "react";
import {
	Control,
	Controller,
	ControllerProps,
	FieldValues,
	useFormContext,
} from "react-hook-form";

import ErrorMessage from "@/components/ErrorMessage";
import { getNestedError } from "@/utils/form";

import RadioGroup from "../Radio";
import Text from "../Text";

type FormInputContextProps = {
	name: string;
	error: string | undefined;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	control: Control<FieldValues, any>;
	disabled?: boolean;
};

const FormInputContext = createContext<FormInputContextProps | undefined>(
	undefined,
);

type FormInputProps = {
	name: string;
	children: ReactNode;
	disabled?: boolean;
};

export default function FormInput({
	name,
	children,
	disabled,
}: FormInputProps) {
	const {
		control,
		formState: { errors },
	} = useFormContext();

	const error = getNestedError(errors, name);

	return (
		<div className="flex flex-col">
			<FormInputContext.Provider value={{ name, error, control, disabled }}>
				{children}
			</FormInputContext.Provider>
			<ErrorMessage error={error} />
		</div>
	);
}

type TextProps = {
	label: string;
	mode?: "light" | "dark";
} & InputHTMLAttributes<HTMLInputElement> &
	Omit<ControllerProps, "render" | "name">;

const RHFText = ({ shouldUnregister, ...props }: TextProps) => {
	const { name, control, disabled } = useContext(FormInputContext)!;

	return (
		<Controller
			shouldUnregister={shouldUnregister}
			name={name}
			control={control}
			render={({ field }) => (
				<Text
					{...field}
					{...props}
					type={props.type ? props.type : "text"}
					disabled={disabled}
					id={name}
				/>
			)}
		/>
	);
};

FormInput.Text = RHFText;

type RadioProps = InputHTMLAttributes<HTMLInputElement> &
	Omit<ControllerProps, "render" | "name">;

const RHFRadio = ({ shouldUnregister, ...props }: RadioProps) => {
	const { name, control } = useContext(FormInputContext)!;

	return (
		<Controller
			shouldUnregister={shouldUnregister}
			name={name}
			control={control}
			render={({ field }) => {
				return (
					<RadioGroup
						{...field}
						{...props}
						checked={field.value === props.value}
					/>
				);
			}}
		/>
	);
};

FormInput.Radio = RHFRadio;
