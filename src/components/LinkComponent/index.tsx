"use client";

import Link, { LinkProps } from "next/link";
import { forwardRef, memo } from "react";

type Props = {
	href: string;
	children: React.ReactNode;
	className?: string;
	target?: string;
} & LinkProps;

const LinkComponent = forwardRef<HTMLAnchorElement, Props>(
	({ href, children, ...props }, ref) => {
		return (
			<Link href={href} ref={ref} {...props}>
				{children}
			</Link>
		);
	},
);

LinkComponent.displayName = "LinkComponent";

export default memo(LinkComponent);
