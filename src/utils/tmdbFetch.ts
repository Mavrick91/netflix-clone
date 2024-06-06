const TMDB_API_KEY = process.env.TMDB_API_KEY;

const buildUrlWithParams = (
	endpoint: string,
	params: Record<string, string> = {},
) => {
	const url = new URL(`https://api.themoviedb.org/3${endpoint}`);

	url.searchParams.append("api_key", TMDB_API_KEY!);

	Object.keys(params).forEach((key) =>
		url.searchParams.append(key, params[key]),
	);

	return url.toString();
};

const tmdbFetch = async (
	endpoint: string,
	options: RequestInit = {},
	params: Record<string, string> = {},
) => {
	const url = buildUrlWithParams(endpoint, params);
	console.log("🚀 ~ url:", url);

	const response = await fetch(url, {
		...options,
		headers: {
			...options.headers,
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error("An error occurred: 623");
	}

	return response.json();
};

export default tmdbFetch;
