"use client";

import classNames from "classnames";
import React, { useMemo } from "react";

import { TVCategory, TVShowsIds } from "@/constans/media-ids";

import { CategoriesItem } from "../../../types";
import LinkComponent from "../LinkComponent";
import MainDropdown from "../MainDropdown";

type GenreSelectionProps = {
  categories: CategoriesItem[];
  genreId?: string;
};

const GenreSelection: React.FC<GenreSelectionProps> = ({
  categories,
  genreId,
}) => {
  const categorySelected = useMemo(() => {
    if (!genreId || genreId === TVCategory) return;
    return categories.find((category) => `${category.id}` === genreId);
  }, [categories, genreId]);

  const formattedCategories = useMemo(
    () =>
      categories.map((category) => ({
        ...category,
        id: `/browse/genre/${category.id}`,
      })),
    [categories],
  );

  const backUrl = useMemo(() => {
    if (genreId && TVShowsIds.includes(genreId)) {
      return `/browse/genre/${TVCategory}`;
    }
    return "/";
  }, [genreId]);

  return (
    <div className="relative z-10 flex items-center border-white py-2">
      <div
        className={classNames("flex items-center shrink-0", {
          "text-white text-sm sm:text-lg md:text-2xl lg:text-4xl font-bold":
            !categorySelected,
          "text-lg text-gray-300 leading-6": categorySelected,
        })}
      >
        {categorySelected ? (
          <LinkComponent className="flex items-center" href={backUrl}>
            TV Shows<div className="pl-2">{`>`}</div>
          </LinkComponent>
        ) : (
          `TV Shows`
        )}
      </div>

      {categorySelected ? (
        <div className="ml-3 text-sm font-medium text-white lg:text-3xl lg:font-bold">
          {categorySelected.name}
        </div>
      ) : (
        <MainDropdown items={formattedCategories} label="Genres" />
      )}
    </div>
  );
};

export default GenreSelection;
