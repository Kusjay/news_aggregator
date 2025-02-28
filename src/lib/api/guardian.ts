import axios from 'axios';
import { Article, SearchParams } from './types';

const API_KEY = process.env.NEXT_PUBLIC_GUARDIAN_API_KEY || '';
const BASE_URL = 'https://content.guardianapis.com/search';

export async function fetchGuardianArticles(
	params: SearchParams
): Promise<Article[]> {
	try {
		// Build query parameters directly in the URL format
		const queryParams = new URLSearchParams({
			'api-key': API_KEY,
			q: params.query || '',
			page: (params.page || 1).toString(),
			'page-size': (params.pageSize || 10).toString(),
			'show-fields': 'all',
		});

		// Add optional parameters only if they exist
		if (params.category) queryParams.append('section', params.category);
		if (params.fromDate) queryParams.append('from-date', params.fromDate);
		if (params.toDate) queryParams.append('to-date', params.toDate);

		// Make the request with the URL and parameters appended
		const url = `${BASE_URL}?${queryParams.toString()}`;
		const response = await axios.get(url);

		return response.data.response.results.map(
			(article: {
				id: string;
				webTitle: string;
				fields?: {
					trailText?: string;
					bodyText?: string;
					byline?: string;
					thumbnail?: string;
				};
				webUrl: string;
				webPublicationDate: string;
				sectionName: string;
			}) => ({
				id: `guardian-${article.id}`,
				title: article.webTitle,
				description: article.fields?.trailText || '',
				content: article.fields?.bodyText || '',
				author: article.fields?.byline || 'The Guardian',
				source: 'The Guardian',
				url: article.webUrl,
				imageUrl: article.fields?.thumbnail || '',
				publishedAt: article.webPublicationDate,
				category: article.sectionName,
			})
		);
	} catch (error) {
		console.error('Error fetching from The Guardian API:', error);
		return [];
	}
}
