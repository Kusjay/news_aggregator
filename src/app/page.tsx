'use client';
import { NewsGrid } from '@/components/news-grid';
import { Pagination } from '@/components/pagination';
import { SearchFilters } from '@/components/search-filters';
import { UserPreferences } from '@/components/user-preferences';
import {
	fetchAllArticles,
	fetchGuardianArticles,
	fetchNewsApiArticles,
	fetchNyTimesArticles,
} from '@/lib/api';
import { Article } from '@/lib/api/types';
import { useNewsStore } from '@/lib/store/useNewsStore';
import { useEffect } from 'react';

export default function Home() {
	const {
		articles,
		setArticles,
		isLoading,
		setLoading,
		searchParams,
		userPreferences,
	} = useNewsStore();

	useEffect(() => {
		const loadArticles = async () => {
			setLoading(true);
			try {
				const params = { ...searchParams };
				let fetchedArticles: Article[] = [];

				if (params.source) {
					switch (params.source) {
						case 'NewsAPI':
							fetchedArticles = await fetchNewsApiArticles(params);
							break;
						case 'The Guardian':
							fetchedArticles = await fetchGuardianArticles(params);
							break;
						case 'New York Times':
							fetchedArticles = await fetchNyTimesArticles(params);
							break;
						default:
							fetchedArticles = await fetchAllArticles(params);
					}
				} else {
					fetchedArticles = await fetchAllArticles(params);
				}

				let filteredArticles = [...fetchedArticles];

				const shouldFilterByPreferredSources =
					userPreferences.preferredSources.length > 0;
				const shouldFilterByPreferredCategories =
					userPreferences.preferredCategories.length > 0;

				if (
					shouldFilterByPreferredSources ||
					shouldFilterByPreferredCategories
				) {
					filteredArticles = filteredArticles.filter((article) => {
						const matchesSource =
							!shouldFilterByPreferredSources ||
							userPreferences.preferredSources.includes(article.source);
						const matchesCategory =
							!shouldFilterByPreferredCategories ||
							userPreferences.preferredCategories.includes(article.category);
						return matchesSource && matchesCategory;
					});
				}

				if (params.category) {
					filteredArticles = filteredArticles.filter(
						(article) => article.category === params.category
					);
				}

				if (params.fromDate || params.toDate) {
					filteredArticles = filteredArticles.filter((article) => {
						const articleDate = new Date(article.publishedAt);
						let withinRange = true;

						if (params.fromDate) {
							const fromDate = new Date(params.fromDate);
							fromDate.setHours(0, 0, 0, 0);
							withinRange = withinRange && articleDate >= fromDate;
						}

						if (params.toDate) {
							const toDate = new Date(params.toDate);
							toDate.setHours(23, 59, 59, 999);
							withinRange = withinRange && articleDate <= toDate;
						}

						return withinRange;
					});
				}

				console.log(
					`Showing ${filteredArticles.length} of ${fetchedArticles.length} articles after filtering`
				);

				if (filteredArticles.length === 0 && fetchedArticles.length > 0) {
					console.log('No articles matched filters, showing all articles');
					filteredArticles = fetchedArticles;
				}

				setArticles(filteredArticles);
			} catch (error) {
				console.error('Failed to fetch articles:', error);
			} finally {
				setLoading(false);
			}
		};

		loadArticles();
	}, [searchParams, userPreferences, setArticles, setLoading]);

	return (
		<main className='container mx-auto px-4 py-8'>
			<div className='mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center'>
				<div>
					<h1 className='text-4xl font-bold tracking-tight'>News Aggregator</h1>
					<p className='mt-2 text-slate-600'>
						Your personalized news feed from multiple sources
					</p>
				</div>
				<UserPreferences />
			</div>
			<div className='mb-8'>
				<SearchFilters />
			</div>
			<NewsGrid articles={articles} isLoading={isLoading} />
			<Pagination totalPages={10} />
		</main>
	);
}
