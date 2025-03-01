import axios from 'axios';
import { Article, SearchParams } from './types';
import {
	getApiSpecificCategory,
	mapToStandardCategory,
} from '../utils/categoryMapping';

const API_KEY = process.env.NEXT_PUBLIC_GUARDIAN_API_KEY || '';
const BASE_URL = 'https://content.guardianapis.com/search';

export async function fetchGuardianArticles(
	params: SearchParams
): Promise<Article[]> {
	try {
		const queryParams = new URLSearchParams({
			'api-key': API_KEY,
			'show-fields': 'all',
			'page-size': (params.pageSize || 10).toString(),
			page: (params.page || 1).toString(),
		});

		if (params.query) queryParams.append('q', params.query);

		if (params.category) {
			const guardianCategory = getApiSpecificCategory(
				params.category,
				'guardian'
			);
			if (guardianCategory) {
				queryParams.append('section', guardianCategory);
			}
		}

		if (params.fromDate) queryParams.append('from-date', params.fromDate);
		if (params.toDate) queryParams.append('to-date', params.toDate);

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
				category: mapToStandardCategory(article.sectionName, 'The Guardian'),
			})
		);
	} catch (error) {
		console.error('Error fetching from The Guardian API:', error);
		return [];
	}
}
