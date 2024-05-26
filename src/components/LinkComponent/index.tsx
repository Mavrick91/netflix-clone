"use client";

import React, { forwardRef } from "react";
import Link, { LinkProps } from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
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

export default React.memo(LinkComponent);
