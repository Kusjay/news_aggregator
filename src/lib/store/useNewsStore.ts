import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Article, SearchParams } from '@/lib/api/types';

interface NewsState {
	articles: Article[];
	isLoading: boolean;
	searchParams: SearchParams;
	userPreferences: {
		preferredSources: string[];
		preferredCategories: string[];
		preferredAuthors: string[];
	};
	setArticles: (articles: Article[]) => void;
	setLoading: (isLoading: boolean) => void;
	setSearchParams: (params: Partial<SearchParams>) => void;
	resetSearchParams: () => void;
	updateUserPreferences: (
		preferences: Partial<NewsState['userPreferences']>
	) => void;
}

export const defaultSearchParams: SearchParams = {
	query: '',
	category: '',
	source: '',
	fromDate: '',
	toDate: '',
	page: 1,
	pageSize: 10,
};

export const useNewsStore = create<NewsState>()(
	persist(
		(set) => ({
			articles: [],
			isLoading: false,
			searchParams: { ...defaultSearchParams },
			userPreferences: {
				preferredSources: [],
				preferredCategories: [],
				preferredAuthors: [],
			},
			setArticles: (articles) => set({ articles }),
			setLoading: (isLoading) => set({ isLoading }),
			setSearchParams: (params) =>
				set((state) => ({
					searchParams: { ...state.searchParams, ...params },
				})),
			resetSearchParams: () =>
				set({ searchParams: { ...defaultSearchParams } }),
			updateUserPreferences: (preferences) =>
				set((state) => ({
					userPreferences: { ...state.userPreferences, ...preferences },
				})),
		}),
		{
			name: 'news-preferences',
			partialize: (state) => ({ userPreferences: state.userPreferences }),
		}
	)
);
