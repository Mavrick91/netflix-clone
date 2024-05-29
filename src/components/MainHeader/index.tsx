"use client";

import classNames from "classnames";
import { usePathname } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

import { NAV_LINKS } from "@/constans/route";
import { useAuth } from "@/Providers/AuthProvider";
import { isTVShowCategory } from "@/utils/media";

import { CategoriesItem } from "../../../types";
import GenreSelection from "../GenreSelection";
import LinkComponent from "../LinkComponent";
import MainDropdown from "../MainDropdown";
import NetflixLogo from "../NetflixLogo";

const paddingClasses = "px-[4%]";

type MainHeaderProps = {
  categories?: CategoriesItem[];
  genreId?: string;
};

const MainHeader: React.FC<MainHeaderProps> = ({ categories, genreId }) => {
  const pathname = usePathname();
  const { logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  const getActiveLink = useCallback(
    (path: string) => {
      if (genreId) {
        if (isTVShowCategory(genreId) && path.match(/^\/browse\/genre./)) {
          return true;
        }
      }
      return pathname === path;
    },
    [genreId, pathname],
  );

  const getLinkClasses = (path: string) =>
    classNames("text-primary-white-hover", {
      "text-white font-medium": getActiveLink(path),
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
            "bg-black bg-opacity-100": isScrolled || categories,
            "bg-gradient-to-b from-black/70 to-transparent bg-opacity-70":
              !isScrolled && !categories,
          },
        )}
      >
        <div className="flex items-center">
          <button type="button" onClick={() => logout()}>
            <NetflixLogo />
          </button>
          <nav className="ml-6 hidden lg:flex">
            <ul className="flex space-x-6 text-sm">
              {NAV_LINKS.map(({ id, name }) => (
                <li key={id} className={getLinkClasses(id)}>
                  <LinkComponent href={id}>{name}</LinkComponent>
                </li>
              ))}
            </ul>
          </nav>
          <div className="lg:hidden">
            <MainDropdown items={NAV_LINKS} label="Browse" />
          </div>
        </div>
      </header>
      <div
        className={classNames(
          paddingClasses,
          "py-1.5 transition-all duration-500",
          {
            "bg-black/100": isScrolled,
            "bg-black/0": !isScrolled,
          },
        )}
      >
        {categories && (
          <GenreSelection categories={categories} genreId={genreId} />
        )}
      </div>
    </div>
  );
};

export default MainHeader;
