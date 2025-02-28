import { Article } from '@/lib/api/types';
import { ArticleCard } from './ui/article-card';

interface NewsGridProps {
	articles: Article[];
	isLoading: boolean;
}

export function NewsGrid({ articles, isLoading }: NewsGridProps) {
	if (isLoading) {
		return (
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				{Array.from({ length: 6 }).map((_, index) => (
					<div
						key={index}
						className='h-96 rounded-lg bg-slate-100 animate-pulse'
					/>
				))}
			</div>
		);
	}

	if (articles.length === 0) {
		return (
			<div className='text-center py-12'>
				<h3 className='text-xl font-medium text-slate-600'>
					No articles found
				</h3>
				<p className='text-slate-500 mt-2'>
					Try adjusting your search or filters to find what you are looking for.
				</p>
			</div>
		);
	}

	const uniqueArticles = articles.map((article, index) => {
		return {
			...article,
			_uniqueKey: `${article.id}-${index}`,
		};
	});

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
			{uniqueArticles.map((article) => (
				<ArticleCard key={article._uniqueKey} article={article} />
			))}
		</div>
	);
}
