import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	output: 'standalone',
	images: {
		domains: [
			'www.nytimes.com',
			'static01.nyt.com',
			'media.guim.co.uk',
			'i.guim.co.uk',
			'images.unsplash.com',
			'static.guim.co.uk',
			'biztoc.com',
		],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
			},
		],
	},
};

export default nextConfig;
