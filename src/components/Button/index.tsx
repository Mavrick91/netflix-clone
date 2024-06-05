import { cva, type VariantProps } from "class-variance-authority";

import LoadingSpinner from "@/assets/images/svg/LoadingSpinner";
import { cn } from "@/utils/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				default: "bg-primary-red text-primary-white hover:bg-primary-red-hover",
				white: "bg-white text-black hover:bg-white/80",
			},
			size: {
				default: "h-10 px-4 py-2",
				xs: "h-8 rounded-md px-4",
				sm: "h-9 rounded-md px-3",
				lg: "h-11 rounded-md px-8",
				icon: "size-10",
				none: "h-auto w-min",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	loading?: boolean;
	onClick?: () => void;
}

const Button = ({
	className,
	variant,
	size,
	loading = false,
	...props
}: ButtonProps) => {
	return (
		<button
			type="button"
			className={cn(buttonVariants({ variant, size, className }))}
			disabled={loading}
			{...props}
		>
			{props.children}
			{loading ? <LoadingSpinner className="ml-2 size-4 animate-spin" /> : null}
		</button>
	);
};
Button.displayName = "Button";

export { Button, buttonVariants };
