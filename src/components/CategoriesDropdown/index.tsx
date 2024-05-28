"use client";

import classNames from "classnames";
import { useParams } from "next/navigation";
import { useMemo } from "react";

import useClickOutside from "@/hooks/useClickOutside";

import { CategoriesItem } from "../../../types";
import LinkComponent from "../LinkComponent";

type CategoriesDropdown = {
  categories: CategoriesItem[];
};

const CategoriesDropdown = ({ categories }: CategoriesDropdown) => {
  const params = useParams();
  const genreId = params?.genreId?.[0];
  const { buttonRef, dropdownRef, toggleDropdown, isDropdownOpen } =
    useClickOutside();

  const categorySelected = useMemo(() => {
    if (!genreId) return;

    return categories.find((category) => `${category.id}` === genreId);
  }, [categories, genreId]);

  return (
    <div className="relative z-10 mt-16 flex items-center border-white p-2">
      <div
        className={classNames("flex items-center shrink-0 ", {
          "text-white text-4xl font-bold": !categorySelected,
          "text-lg text-gray-300": categorySelected,
        })}
      >
        {categorySelected ? (
          <LinkComponent className="flex items-center" href={`/browse/genre`}>
            TV Shows<div className="pl-2">{`>`}</div>
          </LinkComponent>
        ) : (
          `TV Shows`
        )}
      </div>

      {categorySelected ? (
        <div className="ml-3 text-3xl font-bold text-white">
          {categorySelected.name}
        </div>
      ) : (
        <div className="relative ml-10 w-full">
          <button
            type="button"
            ref={buttonRef}
            onClick={toggleDropdown}
            className={classNames(
              "text-white border transition-all relative border-white pr-14 py-1 pl-2 font-bold text-lg bg-black hover:bg-transparent",
              {
                "bg-transparent": isDropdownOpen,
              },
            )}
          >
            Genres
            <div className="arrow-down" />
          </button>

          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute left-0 top-full flex max-w-[622px] bg-black py-1 text-sm text-white"
            >
              <ul className="grid grid-cols-3 py-2">
                {categories.map((category) => (
                  <LinkComponent
                    href={`/browse/genre/${category.id}`}
                    className="col-span-1 px-3 py-1 underline-offset-2 hover:underline"
                    key={category.id}
                  >
                    {category.name}
                  </LinkComponent>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoriesDropdown;
