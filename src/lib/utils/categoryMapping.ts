const guardianCategoryMap: Record<string, string> = {
	'uk-news': 'General',
	'us-news': 'General',
	world: 'General',
	politics: 'Politics',
	environment: 'Science',
	business: 'Business',
	money: 'Business',
	science: 'Science',
	tech: 'Technology',
	'global-development': 'General',
	sport: 'Sports',
	football: 'Sports',
	culture: 'Entertainment',
	books: 'Entertainment',
	film: 'Entertainment',
	music: 'Entertainment',
	travel: 'Lifestyle',
	lifestyle: 'Lifestyle',
	fashion: 'Lifestyle',
};

const nytimesCategoryMap: Record<string, string> = {
	World: 'General',
	'U.S.': 'General',
	Politics: 'Politics',
	Business: 'Business',
	Opinion: 'Opinion',
	Technology: 'Technology',
	Science: 'Science',
	Health: 'Health',
	Sports: 'Sports',
	Arts: 'Entertainment',
	Books: 'Entertainment',
	Style: 'Lifestyle',
	Food: 'Lifestyle',
	Travel: 'Lifestyle',
};

const newsApiCategoryMap: Record<string, string> = {
	business: 'Business',
	entertainment: 'Entertainment',
	general: 'General',
	health: 'Health',
	science: 'Science',
	sports: 'Sports',
	technology: 'Technology',
};

export function mapToStandardCategory(
	category: string,
	source: string
): string {
	if (!category) return 'General';

	let standardCategory;

	switch (source.toLowerCase()) {
		case 'the guardian':
			standardCategory = guardianCategoryMap[category.toLowerCase()];
			break;
		case 'new york times':
			standardCategory = nytimesCategoryMap[category];
			break;
		case 'newsapi':
		default:
			standardCategory = newsApiCategoryMap[category.toLowerCase()];
			break;
	}

	return standardCategory || 'General';
}

export function getApiSpecificCategory(
	standardCategory: string,
	apiName: string
): string {
	if (!standardCategory) return '';

	const standardCat = standardCategory.toLowerCase();

	switch (apiName.toLowerCase()) {
		case 'guardian':
			return (
				Object.entries(guardianCategoryMap).find(
					([, value]) => value.toLowerCase() === standardCat
				)?.[0] || ''
			);

		case 'nytimes':
			return (
				Object.entries(nytimesCategoryMap).find(
					([, value]) => value.toLowerCase() === standardCat
				)?.[0] || ''
			);

		case 'newsapi':
			return (
				Object.entries(newsApiCategoryMap).find(
					([, value]) => value.toLowerCase() === standardCat
				)?.[0] || ''
			);

		default:
			return standardCategory;
	}
}

export const standardizedCategories = [
	'General',
	'Business',
	'Technology',
	'Entertainment',
	'Sports',
	'Science',
	'Health',
	'Politics',
	'Lifestyle',
	'Opinion',
];
