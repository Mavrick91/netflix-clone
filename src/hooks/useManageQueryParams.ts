import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface UseManageQueryParams {
	addQueryParams: (params: Record<string, string>) => void;
	removeQueryParams: (keys: string[]) => void;
}

const useManageQueryParams = (): UseManageQueryParams => {
	const searchParams = useSearchParams();

	const addQueryParams = useCallback(
		(params: Record<string, string>) => {
			const current = new URLSearchParams(Array.from(searchParams.entries()));

			Object.entries(params).forEach(([key, value]) => {
				current.set(key, value);
			});

			const newQueryString = current.toString();
			const newUrl = `${window.location.pathname}?${newQueryString}`;
			window.history.pushState(null, "", newUrl);
		},
		[searchParams],
	);

	const removeQueryParams = useCallback(
		(keys: string[]) => {
			const current = new URLSearchParams(Array.from(searchParams.entries()));

			keys.forEach((key) => {
				current.delete(key);
			});

			const newQueryString = current.toString();
			const newUrl = `${window.location.pathname}?${newQueryString}`;
			window.history.pushState(null, "", newUrl);
		},
		[searchParams],
	);

	return { addQueryParams, removeQueryParams };
};

export default useManageQueryParams;
