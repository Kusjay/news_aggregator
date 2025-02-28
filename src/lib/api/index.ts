import { fetchNewsApiArticles } from './newsapi';
import { fetchGuardianArticles } from './guardian';
import { fetchNyTimesArticles } from './nytimes';
import { Article, SearchParams } from './types';

export async function fetchAllArticles(
	params: SearchParams
): Promise<Article[]> {
	try {
		const [newsApiArticles, guardianArticles, nyTimesArticles] =
			await Promise.all([
				fetchNewsApiArticles(params),
				fetchGuardianArticles(params),
				fetchNyTimesArticles(params),
			]);

		const allArticles = [
			...newsApiArticles,
			...guardianArticles,
			...nyTimesArticles,
		];
		return allArticles.sort(
			(a, b) =>
				new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
		);
	} catch (error) {
		console.error('Error fetching all articles:', error);
		return [];
	}
}

export { fetchNewsApiArticles, fetchGuardianArticles, fetchNyTimesArticles };
export type { Article, SearchParams };
