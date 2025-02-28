export interface Article {
	id: string;
	title: string;
	description: string;
	content: string;
	author: string;
	source: string;
	url: string;
	imageUrl: string;
	publishedAt: string;
	category: string;
}

export interface SearchParams {
	query?: string;
	category?: string;
	source?: string;
	fromDate?: string;
	toDate?: string;
	page?: number;
	pageSize?: number;
}
