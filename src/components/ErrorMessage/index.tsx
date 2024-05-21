import { Icon } from "@iconify/react";

type Props = {
	error?: string;
};

export default function ErrorMessage({ error }: Props) {
	if (!error) return null;

	return (
		<p className="mt-1 flex items-center gap-1 text-sm text-[#eb3942]" data-testid="error-message">
			<Icon icon="carbon:close-outline" className="inline-block shrink-0 text-lg" />
			<span className="inline-block">{error}</span>
		</p>
	);
}
