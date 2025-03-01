import axios from 'axios';
import { Article, SearchParams } from './types';
import {
	getApiSpecificCategory,
	mapToStandardCategory,
} from '../utils/categoryMapping';

const API_KEY = process.env.NEXT_PUBLIC_NYTIMES_API_KEY || '';
const BASE_URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
const MOST_POPULAR_URL =
	'https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json';

export async function fetchNyTimesArticles(
	params: SearchParams
): Promise<Article[]> {
	try {
		const queryParams = new URLSearchParams({
			'api-key': API_KEY,
		});

		const useSearchApi =
			params.query || params.category || params.fromDate || params.toDate;

		if (useSearchApi) {
			if (params.query) {
				queryParams.append('q', params.query);
			}

			if (params.fromDate) {
				queryParams.append('begin_date', params.fromDate.replace(/-/g, ''));
			}

			if (params.toDate) {
				queryParams.append('end_date', params.toDate.replace(/-/g, ''));
			}

			if (params.page) {
				queryParams.append('page', params.page.toString());
			}

			queryParams.append('sort', 'newest');

			if (params.category) {
				const nytCategory = getApiSpecificCategory(params.category, 'nytimes');
				if (nytCategory) {
					queryParams.append('fq', `section_name:"${nytCategory}"`);
				}
			}

			const url = `${BASE_URL}?${queryParams.toString()}`;
			console.log('NYT Search URL:', url);

			const response = await axios.get(url);

			return response.data.response.docs.map(
				(article: {
					_id: string;
					headline: { main: string };
					abstract: string;
					snippet: string;
					lead_paragraph: string;
					byline: { original: string };
					web_url: string;
					multimedia: { url: string }[];
					pub_date: string;
					section_name: string;
					news_desk: string;
				}) => ({
					id: `nyt-${article._id}`,
					title: article.headline.main,
					description: article.abstract || article.snippet,
					content: article.lead_paragraph || '',
					author:
						article.byline?.original?.replace('By ', '') || 'New York Times',
					source: 'New York Times',
					url: article.web_url,
					imageUrl: article.multimedia?.[0]?.url
						? `https://www.nytimes.com/${article.multimedia[0].url}`
						: '',
					publishedAt: article.pub_date,
					category: mapToStandardCategory(
						article.section_name || article.news_desk,
						'New York Times'
					),
				})
			);
		} else {
			const url = `${MOST_POPULAR_URL}?${queryParams.toString()}`;
			console.log('NYT Popular URL:', url);

			const response = await axios.get(url);

			return response.data.results.map(
				(article: {
					id: number;
					title: string;
					abstract: string;
					byline: string;
					url: string;
					media: { 'media-metadata': { url: string }[] }[];
					published_date: string;
					section: string;
				}) => ({
					id: `nyt-popular-${article.id}`,
					title: article.title,
					description: article.abstract,
					content: article.abstract,
					author: article.byline.replace('By ', '') || 'New York Times',
					source: 'New York Times',
					url: article.url,
					imageUrl: article.media?.[0]?.['media-metadata']?.[2]?.url || '',
					publishedAt: article.published_date,
					category: mapToStandardCategory(article.section, 'New York Times'),
				})
			);
		}
	} catch (error) {
		console.error('Error fetching from NY Times API:', error);
		return [];
	}
}
