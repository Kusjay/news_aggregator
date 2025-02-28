import { Button } from '@/components/ui/button';
import { useNewsStore } from '@/lib/store/useNewsStore';

interface PaginationProps {
	totalPages: number;
}

export function Pagination({ totalPages }: PaginationProps) {
	const { searchParams, setSearchParams } = useNewsStore();
	const currentPage = searchParams.page || 1;

	const goToPage = (page: number) => {
		if (page < 1 || page > totalPages) return;
		setSearchParams({ page });
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const renderPageButtons = () => {
		const buttons = [];
		const maxButtonsToShow = 5;

		let startPage = Math.max(1, currentPage - Math.floor(maxButtonsToShow / 2));
		const endPage = Math.min(totalPages, startPage + maxButtonsToShow - 1);

		if (endPage - startPage + 1 < maxButtonsToShow) {
			startPage = Math.max(1, endPage - maxButtonsToShow + 1);
		}

		for (let i = startPage; i <= endPage; i++) {
			buttons.push(
				<Button
					key={i}
					variant={i === currentPage ? 'default' : 'outline'}
					size='sm'
					onClick={() => goToPage(i)}
					className='w-10 h-10'
				>
					{i}
				</Button>
			);
		}

		return buttons;
	};

	if (totalPages <= 1) return null;

	return (
		<div className='flex justify-center items-center space-x-2 py-8'>
			<Button
				variant='outline'
				size='sm'
				onClick={() => goToPage(currentPage - 1)}
				disabled={currentPage === 1}
			>
				Previous
			</Button>

			{renderPageButtons()}

			<Button
				variant='outline'
				size='sm'
				onClick={() => goToPage(currentPage + 1)}
				disabled={currentPage === totalPages}
			>
				Next
			</Button>
		</div>
	);
}
