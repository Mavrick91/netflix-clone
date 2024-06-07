import { FieldErrors, FieldValues } from "react-hook-form";

export const getNestedError = (
	errors: FieldErrors<FieldValues>,
	name: string,
): string | undefined => {
	const error = name
		.split(".")
		.reduce<
			FieldErrors<FieldValues> | undefined
		>((prev, curr) => (prev && prev[curr] instanceof Object ? (prev[curr] as FieldErrors<FieldValues>) : undefined), errors);

	return error ? (error.message as unknown as string) : undefined;
};
