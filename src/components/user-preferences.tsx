import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNewsStore } from '@/lib/store/useNewsStore';
import { useState } from 'react';

const availableSources = ['NewsAPI', 'The Guardian', 'New York Times'];
const availableCategories = [
	'Business',
	'Entertainment',
	'General',
	'Health',
	'Science',
	'Sports',
	'Technology',
];

export function UserPreferences() {
	const { userPreferences, updateUserPreferences } = useNewsStore();
	const [localPreferences, setLocalPreferences] = useState({
		preferredSources: [...userPreferences.preferredSources],
		preferredCategories: [...userPreferences.preferredCategories],
	});
	const [open, setOpen] = useState(false);

	const handleSavePreferences = () => {
		updateUserPreferences(localPreferences);
		setOpen(false);
	};

	const toggleSource = (source: string) => {
		setLocalPreferences((prev) => {
			const sources = prev.preferredSources.includes(source)
				? prev.preferredSources.filter((s) => s !== source)
				: [...prev.preferredSources, source];
			return { ...prev, preferredSources: sources };
		});
	};

	const toggleCategory = (category: string) => {
		setLocalPreferences((prev) => {
			const categories = prev.preferredCategories.includes(category)
				? prev.preferredCategories.filter((c) => c !== category)
				: [...prev.preferredCategories, category];
			return { ...prev, preferredCategories: categories };
		});
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant='outline'>Customize Feed</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-md'>
				<DialogHeader>
					<DialogTitle>Customize Your News Feed</DialogTitle>
				</DialogHeader>
				<Tabs defaultValue='sources' className='w-full'>
					<TabsList className='grid w-full grid-cols-2'>
						<TabsTrigger value='sources'>News Sources</TabsTrigger>
						<TabsTrigger value='categories'>Categories</TabsTrigger>
					</TabsList>
					<TabsContent value='sources' className='space-y-4 py-4'>
						<div className='space-y-4'>
							{availableSources.map((source) => (
								<div key={source} className='flex items-center space-x-2'>
									<Checkbox
										id={`source-${source}`}
										checked={localPreferences.preferredSources.includes(source)}
										onCheckedChange={() => toggleSource(source)}
									/>
									<Label
										htmlFor={`source-${source}`}
										className='text-sm font-normal'
									>
										{source}
									</Label>
								</div>
							))}
						</div>
					</TabsContent>
					<TabsContent value='categories' className='space-y-4 py-4'>
						<div className='space-y-4'>
							{availableCategories.map((category) => (
								<div key={category} className='flex items-center space-x-2'>
									<Checkbox
										id={`category-${category}`}
										checked={localPreferences.preferredCategories.includes(
											category
										)}
										onCheckedChange={() => toggleCategory(category)}
									/>
									<Label
										htmlFor={`category-${category}`}
										className='text-sm font-normal'
									>
										{category}
									</Label>
								</div>
							))}
						</div>
					</TabsContent>
				</Tabs>
				<div className='flex justify-end space-x-2'>
					<Button variant='outline' onClick={() => setOpen(false)}>
						Cancel
					</Button>
					<Button onClick={handleSavePreferences}>Save Preferences</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
