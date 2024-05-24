"use client";

import React, { useEffect, useState } from "react";
import NetflixLogo from "../NetflixLogo";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import { useAuth } from "@/Providers/AuthProvider";
import LinkComponent from "../LinkComponent";

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
	const { logout } = useAuth();
	const [isScrolled, setIsScrolled] = useState(false);

	const getLinkClasses = (path: string) =>
		classNames("text-primary-white-hover", {
			"text-white font-medium": pathname === path,
		});

	useEffect(() => {
		const handleScroll = () => {
			if (document.documentElement.scrollTop > 0) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};

		document.addEventListener("scroll", () => handleScroll());

		return () => {
			document.removeEventListener("scroll", () => handleScroll());
		};
	}, []);

	return (
		<header
			className={classNames("fixed top-0 z-20 flex md:h-[54px] lg:h-[68px] w-full items-center md:px-7 lg:px-12 transition-colors duration-500", {
				"bg-black bg-opacity-100": isScrolled,
				"bg-gradient-to-b from-black/70 to-transparent bg-opacity-70": !isScrolled,
			})}
		>
			<div className="flex items-center">
				<button type="button" onClick={() => logout()}>
					<NetflixLogo />
				</button>
				<nav className="ml-6 hidden lg:block">
					<ul className="flex space-x-6 text-sm">
						{navLinks.map(({ href, label }) => (
							<li key={href} className={getLinkClasses(href)}>
								<LinkComponent href={href}>{label}</LinkComponent>
							</li>
						))}
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default MainHeader;
