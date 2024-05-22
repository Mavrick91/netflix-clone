"use client";

import React from "react";
import NetflixLogo from "../NetflixLogo";
import Link from "next/link";
import classNames from "classnames";
import { usePathname } from "next/navigation";

const navLinks = [
	{ href: "/browse", label: "Home" },
	{ href: "/browse/genre/83", label: "TV Shows" },
	{ href: "/browse/genre/34399", label: "Movies" },
	{ href: "/latest", label: "New & Popular" },
	{ href: "/browse/my-list", label: "My List" },
	{ href: "/browse/original-audio", label: "Browse by Languages" },
];

const MainHeader = () => {
	const pathname = usePathname();

	const getLinkClasses = (path: string) =>
		classNames("text-primary-white-hover", {
			"text-white font-medium": pathname === path,
		});

	return (
		<header
			className="flex h-[68px] items-center px-14"
			style={{
				backgroundImage: "linear-gradient(180deg,rgba(0,0,0,.7) 10%,transparent)",
			}}
		>
			<div className="flex items-center">
				<NetflixLogo />
				<nav className="ml-6">
					<ul className="flex space-x-6 text-sm">
						{navLinks.map(({ href, label }) => (
							<li key={href}>
								<Link href={href} className={getLinkClasses(href)}>
									{label}
								</Link>
							</li>
						))}
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default MainHeader;
