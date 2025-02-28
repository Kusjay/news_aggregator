import axios from 'axios';
import { Article, SearchParams } from './types';

const API_KEY = process.env.NEXT_PUBLIC_NEWSAPI_KEY || '';
const BASE_URL = 'https://newsapi.org/v2';

export async function fetchNewsApiArticles(
	params: SearchParams
): Promise<Article[]> {
	try {
		const response = await axios.get(`${BASE_URL}/everything`, {
			params: {
				q: params.query || 'technology',
				from: params.fromDate,
				to: params.toDate,
				sortBy: 'publishedAt',
				pageSize: params.pageSize || 10,
				page: params.page || 1,
				apiKey: API_KEY,
			},
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
				description: article.description,
				content: article.content,
				author: article.author || 'Unknown',
				source: article.source.name,
				url: article.url,
				imageUrl: article.urlToImage,
				publishedAt: article.publishedAt,
				category: 'General',
			})
		);
	} catch (error) {
		console.error('Error fetching from NewsAPI:', error);
		return [];
	}
}
