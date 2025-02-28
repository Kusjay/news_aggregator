'use client';

import { NewsGrid } from '@/components/news-grid';
import { Pagination } from '@/components/pagination';
import { SearchFilters } from '@/components/search-filters';
import { UserPreferences } from '@/components/user-preferences';
import { fetchAllArticles } from '@/lib/api';
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

				if (!params.query && !params.category && !params.source) {
					if (userPreferences.preferredSources.length > 0) {
						params.source = userPreferences.preferredSources[0];
					}

					if (userPreferences.preferredCategories.length > 0) {
						params.category = userPreferences.preferredCategories[0];
					}
				}

				const fetchedArticles = await fetchAllArticles(params);
				setArticles(fetchedArticles);
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
