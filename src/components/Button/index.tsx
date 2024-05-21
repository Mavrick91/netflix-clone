import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/utils";
import LoadingSpinner from "@/assets/images/svg/LoadingSpinner";

const buttonVariants = cva(
	"inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				default: "bg-primary-red text-primary-white hover:bg-primary-red-hover",
				destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
				outline: "border-input bg-background hover:bg-accent hover:text-accent-foreground border",
				secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
				ghost: "hover:text-primary-link-hover text-primary !h-auto bg-transparent !p-0",
				link: "text-primary !h-auto !p-0 underline-offset-4 hover:underline",
				gray: "bg-secondary-button-background hover:bg-secondary-button-hover text-primary-text font-semibold",
				"blue-link": "text-ig-blue hover:text-ig-blue-dark",
				blue: "bg-primary-button hover:bg-primary-hover text-white",
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
	}
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
	loading?: boolean;
	onClick?: () => void;
}

const Button = ({ className, variant, size, loading = false, ...props }: ButtonProps) => {
	return (
		<button type="button" className={cn(buttonVariants({ variant, size, className }))} disabled={loading} {...props}>
			{props.children}
			{loading ? <LoadingSpinner className="ml-2 size-4 animate-spin" /> : null}
		</button>
	);
};
Button.displayName = "Button";

export { Button, buttonVariants };
