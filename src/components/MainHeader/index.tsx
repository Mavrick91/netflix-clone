"use client";

import classNames from "classnames";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import GenreSelection from "@/components/GenreSelection";
import LinkComponent from "@/components/LinkComponent";
import MainDropdown from "@/components/MainDropdown";
import NetflixLogo from "@/components/NetflixLogo";
import { MovieCategory, ShowTVCategory } from "@/constants/media-ids";
import { NAV_LINKS } from "@/constants/route";
import { useAuth } from "@/Providers/AuthProvider";
import { CategoriesItem } from "@/types";

import SearchMedia from "./SearchMedia";

const paddingClasses = "px-[4%]";

type MainHeaderProps = {
	categories?: CategoriesItem[];
	categoryId?: typeof ShowTVCategory | typeof MovieCategory;
	genreIdSelected?: string | null;
	isError?: boolean;
};

const MainHeader: React.FC<MainHeaderProps> = ({
	categories,
	genreIdSelected,
	categoryId,
	isError,
}) => {
	const pathname = usePathname();
	const { logout } = useAuth();
	const [isScrolled, setIsScrolled] = useState(false);

	const isSearchPage = pathname.includes("/search");

	const getActiveLink = useCallback(
		(path: string, name: string) => {
			if (categoryId === ShowTVCategory && name === NAV_LINKS[1].name) {
				return true;
			} else if (categoryId === MovieCategory && name === NAV_LINKS[2].name) {
				return true;
			}
			return pathname === path;
		},
		[categoryId, pathname],
	);

	const getLinkClasses = (path: string, name: string) =>
		classNames("text-primary-white-hover", {
			"text-white font-medium": getActiveLink(path, name),
		});

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(document.documentElement.scrollTop > 0);
		};

		document.addEventListener("scroll", handleScroll);

		return () => {
			document.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<div className="fixed top-0 z-[60] flex w-full flex-col">
			<header
				className={classNames(
					paddingClasses,
					"py-4 flex flex-col justify-center h-[41px] md:h-[54px] lg:h-[68px] w-full transition-colors duration-500",
					{
						"bg-black bg-opacity-100": isScrolled || categories || isSearchPage,
						"bg-gradient-to-b from-black/70 to-transparent bg-opacity-70":
							!isScrolled && !categories && !isSearchPage,
					},
				)}
			>
				<div className="flex items-center justify-between">
					<div className="flex items-center">
						<button type="button" onClick={() => logout()}>
							<NetflixLogo />
						</button>
						{!isError && (
							<nav className="ml-14 hidden lg:flex">
								<ul className="flex space-x-6 text-sm">
									{NAV_LINKS.map(({ id, name }) => (
										<li key={id} className={getLinkClasses(id, name)}>
											<LinkComponent href={id}>{name}</LinkComponent>
										</li>
									))}
								</ul>
							</nav>
						)}
						{!isError && (
							<div className="ml-5 lg:ml-10 lg:hidden">
								<MainDropdown items={NAV_LINKS} label="Browse" />
							</div>
						)}
					</div>
					{!isError && (
						<div className="hidden text-white sm:flex">
							<SearchMedia />
						</div>
					)}
				</div>
			</header>
			{categories && categoryId && !isError && (
				<div
					className={classNames(
						paddingClasses,
						"py-1.5 transition-all duration-500",
						{
							"bg-black/100": isScrolled || isSearchPage,
							"bg-black/0": !isScrolled,
						},
					)}
				>
					<GenreSelection
						categories={categories}
						categoryId={categoryId}
						genreIdSelected={genreIdSelected}
					/>
				</div>
			)}
		</div>
	);
};

export default MainHeader;
