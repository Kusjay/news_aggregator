import axios from 'axios';
import { Article, SearchParams } from './types';

const API_KEY = process.env.NEXT_PUBLIC_NEWSAPI_KEY || '';
const BASE_URL = 'https://newsapi.org/v2';

export async function fetchNewsApiArticles(
	params: SearchParams
): Promise<Article[]> {
	try {
		const endpoint = params.category ? 'top-headlines' : 'everything';

		const requestParams: Record<string, string | number | undefined> = {
			apiKey: API_KEY,
			pageSize: params.pageSize || 10,
			page: params.page || 1,
		};

		if (endpoint === 'top-headlines') {
			requestParams.category = params.category?.toLowerCase();

			if (!params.category) requestParams.country = 'us';

			if (params.query) requestParams.q = params.query;
		} else {
			requestParams.q = params.query || 'news';
			requestParams.sortBy = 'publishedAt';
			if (params.fromDate) requestParams.from = params.fromDate;
			if (params.toDate) requestParams.to = params.toDate;
		}

		const response = await axios.get(`${BASE_URL}/${endpoint}`, {
			params: requestParams,
		});

		return response.data.articles.map(
			(article: {
				source: { id: string | null; name: string };
				title: string;
				description: string;
				content: string;
				author: string | null;
				url: string;
				urlToImage: string | null;
				publishedAt: string;
			}) => ({
				id: `newsapi-${article.source.id || ''}-${new Date(
					article.publishedAt
				).getTime()}`,
				title: article.title,
				description: article.description || '',
				content: article.content || '',
				author: article.author || 'Unknown',
				source: article.source.name,
				url: article.url,
				imageUrl: article.urlToImage || '',
				publishedAt: article.publishedAt,
				category: params.category || 'General',
			})
		);
	} catch (error) {
		console.error('Error fetching from NewsAPI:', error);
		return [];
	}
}
