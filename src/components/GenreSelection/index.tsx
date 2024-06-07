"use client";

import classNames from "classnames";
import { useMemo } from "react";

import LinkComponent from "@/components/LinkComponent";
import MainDropdown from "@/components/MainDropdown";
import { MovieCategory, ShowTVCategory } from "@/constants/media-ids";
import { CategoriesItem } from "@/types";

type GenreSelectionProps = {
	categories: CategoriesItem[];
	genreIdSelected?: string | null;
	categoryId: typeof ShowTVCategory | typeof MovieCategory;
};

const GenreSelection: React.FC<GenreSelectionProps> = ({
	categories,
	genreIdSelected,
	categoryId,
}) => {
	const categorySelected = useMemo(() => {
		if (!genreIdSelected) {
			return;
		}
		return categories.find((category) => `${category.id}` === genreIdSelected);
	}, [categories, genreIdSelected]);

	const formattedCategories = useMemo(
		() =>
			categories.map((category) => ({
				...category,
				id: `/browse/genre/${category.id}?cb=${categoryId}`,
			})),
		[categories, categoryId],
	);

	const backUrl = useMemo(() => {
		if (categoryId === ShowTVCategory) {
			return `/browse/genre/${ShowTVCategory}`;
		}
		return `/browse/genre/${MovieCategory}`;
	}, [categoryId]);

	const label = useMemo(() => {
		if (categoryId === ShowTVCategory) {
			return "TV Shows";
		}
		return "Movies";
	}, [categoryId]);

	return (
		<div className="relative z-10 flex items-center border-white py-2">
			<div
				className={classNames("flex items-center shrink-0 mr-5 lg:mr-10", {
					"text-white text-sm sm:text-lg md:text-2xl lg:text-4xl font-bold":
						!categorySelected,
					"text-lg text-gray-300 leading-6": categorySelected,
				})}
			>
				{categorySelected ? (
					<LinkComponent className="flex items-center" href={backUrl}>
						{label}
						<div className="pl-2">{`>`}</div>
					</LinkComponent>
				) : (
					label
				)}
			</div>

			{categorySelected ? (
				<div className="ml-3 text-sm font-medium text-white lg:text-3xl lg:font-bold">
					{categorySelected.name}
				</div>
			) : (
				<MainDropdown
					items={formattedCategories}
					label="Genres"
					numberOfColumn={3}
				/>
			)}
		</div>
	);
};

export default GenreSelection;
