/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["image.tmdb.org"],
	},
	// reactStrictMode: false,
	logging: {
		fetches: {
			// fullUrl: true,
		},
	},
};

export default nextConfig;
