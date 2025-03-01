import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Article } from '@/lib/api/types';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';

interface ArticleCardProps {
	article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
	return (
		<Card className='h-full flex flex-col transition-all hover:shadow-md'>
			<CardHeader className='p-4'>
				<div className='flex justify-between items-start'>
					<div className='flex items-center space-x-2'>
						<span className='text-xs font-medium bg-slate-100 px-2 py-1 rounded-full'>
							{article.source}
						</span>
						<span className='text-xs text-slate-500'>
							{dayjs(article.publishedAt).format('MMM D, YYYY')}
						</span>
					</div>
					<span className='text-xs bg-slate-100 px-2 py-1 rounded-full'>
						{article.category}
					</span>
				</div>
				<CardTitle className='text-lg mt-2 line-clamp-2'>
					<Link
						href={article.url}
						target='_blank'
						className='hover:text-blue-600'
					>
						{article.title}
					</Link>
				</CardTitle>
				<CardDescription className='line-clamp-2 mt-1'>
					{article.description}
				</CardDescription>
			</CardHeader>
			{article.imageUrl && (
				<div className='px-4 relative h-48 w-full overflow-hidden'>
					<Image
						src={article.imageUrl}
						alt={article.title}
						fill
						className='object-cover rounded-md'
						onError={(e) => {
							console.log(`Failed to load image: ${article.imageUrl}`);
							(e.target as HTMLImageElement).src =
								'/public/placeholder-image.jpg';
						}}
						unoptimized={article.imageUrl.includes('biztoc.com')}
					/>
				</div>
			)}
			<CardContent className='flex-grow p-4 pt-4'>
				<p className='text-sm line-clamp-3'>{article.content}</p>
			</CardContent>
			<CardFooter className='p-4 pt-0 flex justify-between'>
				<div className='text-xs text-slate-500'>By {article.author}</div>
				<Link
					href={article.url}
					target='_blank'
					className='text-xs text-blue-600 hover:underline'
				>
					Read more
				</Link>
			</CardFooter>
		</Card>
	);
}
