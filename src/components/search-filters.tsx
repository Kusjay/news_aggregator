import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { SearchParams } from '@/lib/api/types';
import { useNewsStore } from '@/lib/store/useNewsStore';
import { FormEvent, useState } from 'react';

const categories = [
	'All Categories',
	'Business',
	'Entertainment',
	'General',
	'Health',
	'Science',
	'Sports',
	'Technology',
	'Politics',
	'Lifestyle',
	'Opinion',
];

const sources = ['All Sources', 'NewsAPI', 'The Guardian', 'New York Times'];

export function SearchFilters() {
	const { searchParams, setSearchParams, resetSearchParams } = useNewsStore();
	const [localParams, setLocalParams] = useState<SearchParams>({
		...searchParams,
	});

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		setSearchParams(localParams);
	};

	const handleReset = () => {
		resetSearchParams();
		setLocalParams({
			query: '',
			category: '',
			source: '',
			fromDate: '',
			toDate: '',
			page: 1,
			pageSize: 10,
		});
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='space-y-4 bg-white p-4 rounded-lg shadow-sm border'
		>
			<div className='flex flex-col md:flex-row gap-4'>
				<div className='flex-1'>
					<Label htmlFor='search' className='text-sm font-medium'>
						Search
					</Label>
					<Input
						id='search'
						placeholder='Search for news...'
						value={localParams.query || ''}
						onChange={(e) =>
							setLocalParams({ ...localParams, query: e.target.value })
						}
						className='mt-1'
					/>
				</div>

				<div className='md:w-1/4'>
					<Label htmlFor='category' className='text-sm font-medium'>
						Category
					</Label>
					<Select
						value={localParams.category || ''}
						onValueChange={(value) =>
							setLocalParams({
								...localParams,
								category: value === 'All Categories' ? '' : value,
							})
						}
					>
						<SelectTrigger id='category' className='mt-1'>
							<SelectValue placeholder='All Categories' />
						</SelectTrigger>
						<SelectContent>
							{categories.map((category) => (
								<SelectItem key={category} value={category}>
									{category}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<div className='md:w-1/4'>
					<Label htmlFor='source' className='text-sm font-medium'>
						Source
					</Label>
					<Select
						value={localParams.source || ''}
						onValueChange={(value) =>
							setLocalParams({
								...localParams,
								source: value === 'All Sources' ? '' : value,
							})
						}
					>
						<SelectTrigger id='source' className='mt-1'>
							<SelectValue placeholder='All Sources' />
						</SelectTrigger>
						<SelectContent>
							{sources.map((source) => (
								<SelectItem key={source} value={source}>
									{source}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>

			<div className='flex flex-col md:flex-row gap-4'>
				<div className='md:w-1/4'>
					<Label htmlFor='fromDate' className='text-sm font-medium'>
						From Date
					</Label>
					<Input
						id='fromDate'
						type='date'
						value={localParams.fromDate || ''}
						onChange={(e) =>
							setLocalParams({ ...localParams, fromDate: e.target.value })
						}
						className='mt-1'
					/>
				</div>

				<div className='md:w-1/4'>
					<Label htmlFor='toDate' className='text-sm font-medium'>
						To Date
					</Label>
					<Input
						id='toDate'
						type='date'
						value={localParams.toDate || ''}
						onChange={(e) =>
							setLocalParams({ ...localParams, toDate: e.target.value })
						}
						className='mt-1'
					/>
				</div>

				<div className='flex items-end space-x-2 md:ml-auto'>
					<Button type='submit' className='mt-1'>
						Search
					</Button>
					<Button
						type='button'
						variant='outline'
						onClick={handleReset}
						className='mt-1'
					>
						Reset
					</Button>
				</div>
			</div>
		</form>
	);
}
