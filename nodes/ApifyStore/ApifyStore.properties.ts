import { IExecuteFunctions, INodeProperties } from 'n8n-workflow';

/**
 * Build the Apify Actor input from node parameters.
 * Only the real Actor inputs are sent; the Output / Fields parameters shape the
 * data we return, they are not part of the Actor input. Optional fields are only
 * sent when the user provides a value so the Actor keeps its own defaults.
 */
export function buildActorInput(
	context: IExecuteFunctions,
	itemIndex: number,
	defaultInput: Record<string, any>,
): Record<string, any> {
	const input: Record<string, any> = {
		...defaultInput,
		maxItems: context.getNodeParameter('maxItems', itemIndex),
	};

	const search = context.getNodeParameter('search', itemIndex, '') as string;
	const category = context.getNodeParameter('category', itemIndex, '') as string;
	const pricingModel = context.getNodeParameter('pricingModel', itemIndex, '') as string;
	const username = context.getNodeParameter('username', itemIndex, '') as string;
	const sortBy = context.getNodeParameter('sortBy', itemIndex, '') as string;
	const offset = context.getNodeParameter('offset', itemIndex, 0) as number;
	const includeDetails = context.getNodeParameter('includeDetails', itemIndex, false) as boolean;

	if (search) input.search = search;
	if (category) input.category = category;
	if (pricingModel) input.pricingModel = pricingModel;
	if (username) input.username = username;
	if (sortBy) input.sortBy = sortBy;
	if (offset) input.offset = offset;
	if (includeDetails) input.includeDetails = includeDetails;

	return input;
}

const resourceProperties: INodeProperties[] = [
	{
		displayName: 'Resource',
		name: 'resource',
		type: 'options',
		noDataExpression: true,
		options: [
			{
				name: 'Actor',
				value: 'actor',
			},
		],
		default: 'actor',
	},
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['actor'],
			},
		},
		options: [
			{
				name: 'Search',
				value: 'search',
				action: 'Search store actors',
				description: 'Search the Apify Store and return one item per Actor',
			},
		],
		default: 'search',
	},
];

const actorProperties: INodeProperties[] = [
	{
		displayName: 'Search Keyword',
		name: 'search',
		type: 'string',
		default: '',
		placeholder: 'e.g. instagram',
		description:
			'Filter Actors by keyword across title, name, description, developer, and README. Leave empty to match all Actors.',
		displayOptions: { show: { resource: ['actor'], operation: ['search'] } },
	},
	{
		displayName: 'Category',
		name: 'category',
		type: 'options',
		default: '',
		description: 'Return only Actors in this Apify Store category',
		displayOptions: { show: { resource: ['actor'], operation: ['search'] } },
		options: [
			{ name: 'Agents', value: 'AGENTS' },
			{ name: 'AI', value: 'AI' },
			{ name: 'Any', value: '' },
			{ name: 'Automation', value: 'AUTOMATION' },
			{ name: 'Business', value: 'BUSINESS' },
			{ name: 'Covid-19', value: 'COVID_19' },
			{ name: 'Developer Examples', value: 'DEVELOPER_EXAMPLES' },
			{ name: 'Developer Tools', value: 'DEVELOPER_TOOLS' },
			{ name: 'E-Commerce', value: 'ECOMMERCE' },
			{ name: 'Education', value: 'EDUCATION' },
			{ name: 'For Creators', value: 'FOR_CREATORS' },
			{ name: 'Games', value: 'GAMES' },
			{ name: 'Integrations', value: 'INTEGRATIONS' },
			{ name: 'Jobs', value: 'JOBS' },
			{ name: 'Lead Generation', value: 'LEAD_GENERATION' },
			{ name: 'Marketing', value: 'MARKETING' },
			{ name: 'MCP Servers', value: 'MCP_SERVERS' },
			{ name: 'News', value: 'NEWS' },
			{ name: 'Open Source', value: 'OPEN_SOURCE' },
			{ name: 'Other', value: 'OTHER' },
			{ name: 'Real Estate', value: 'REAL_ESTATE' },
			{ name: 'SEO Tools', value: 'SEO_TOOLS' },
			{ name: 'Social Media', value: 'SOCIAL_MEDIA' },
			{ name: 'Sports', value: 'SPORTS' },
			{ name: 'Travel', value: 'TRAVEL' },
			{ name: 'Videos', value: 'VIDEOS' },
		],
	},
	{
		displayName: 'Pricing Model',
		name: 'pricingModel',
		type: 'options',
		default: '',
		description: 'Return only Actors on this pricing model',
		displayOptions: { show: { resource: ['actor'], operation: ['search'] } },
		options: [
			{ name: 'Any', value: '' },
			{ name: 'Flat Monthly Price', value: 'FLAT_PRICE_PER_MONTH' },
			{ name: 'Free', value: 'FREE' },
			{ name: 'Pay Per Event', value: 'PAY_PER_EVENT' },
			{ name: 'Price Per Dataset Item', value: 'PRICE_PER_DATASET_ITEM' },
		],
	},
	{
		displayName: 'Developer Username',
		name: 'username',
		type: 'string',
		default: '',
		placeholder: 'e.g. apify',
		description: 'Return only Actors published by this developer handle. Optional.',
		displayOptions: { show: { resource: ['actor'], operation: ['search'] } },
	},
	{
		displayName: 'Sort By',
		name: 'sortBy',
		type: 'options',
		default: 'relevance',
		description: 'How to order the returned Actors',
		displayOptions: { show: { resource: ['actor'], operation: ['search'] } },
		options: [
			{ name: 'Last Updated', value: 'lastUpdate' },
			{ name: 'Newest', value: 'newest' },
			{ name: 'Popularity', value: 'popularity' },
			{ name: 'Relevance', value: 'relevance' },
		],
	},
	{
		displayName: 'Maximum Actors',
		name: 'maxItems',
		type: 'number',
		default: 100,
		typeOptions: { minValue: 0 },
		description: 'How many Actors to return. Set to 0 to return the entire store.',
		displayOptions: { show: { resource: ['actor'], operation: ['search'] } },
	},
	{
		displayName: 'Start Offset',
		name: 'offset',
		type: 'number',
		default: 0,
		typeOptions: { minValue: 0 },
		description: 'Skip this many Actors before returning results. Use to resume or shard a large run.',
		displayOptions: { show: { resource: ['actor'], operation: ['search'] } },
	},
	{
		displayName: 'Include Full README and Input Schema',
		name: 'includeDetails',
		type: 'boolean',
		default: false,
		description:
			'Whether to enrich each Actor with its full README and input schema (1-2 extra API calls per Actor). Use only with small result sets.',
		displayOptions: { show: { resource: ['actor'], operation: ['search'] } },
	},
];

const outputProperties: INodeProperties[] = [
	{
		displayName: 'Output',
		name: 'output',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['actor'], operation: ['search'] } },
		options: [
			{
				name: 'Raw',
				value: 'raw',
				description: 'Return every field the API produces for each Actor',
			},
			{
				name: 'Selected Fields',
				value: 'selected',
				description: 'Choose exactly which fields to return',
			},
			{
				name: 'Simplified',
				value: 'simplified',
				description: 'Return a compact set of the most useful Actor fields',
			},
		],
		default: 'simplified',
		description: 'How much data to return for each Actor',
	},
	{
		displayName: 'Fields to Include',
		name: 'fields',
		type: 'multiOptions',
		displayOptions: {
			show: { resource: ['actor'], operation: ['search'], output: ['selected'] },
		},
		options: [
			{ name: 'Actor ID', value: 'actorId' },
			{ name: 'Apify Margin %', value: 'apifyMarginPercentage' },
			{ name: 'Bookmarks', value: 'bookmarkCount' },
			{ name: 'Captured At', value: 'scrapedAt' },
			{ name: 'Categories', value: 'categories' },
			{ name: 'Description', value: 'description' },
			{ name: 'Developer Name', value: 'userFullName' },
			{ name: 'Developer Username', value: 'username' },
			{ name: 'Last Run Started At', value: 'lastRunStartedAt' },
			{ name: 'Monthly Users', value: 'monthlyUsers' },
			{ name: 'Name Slug', value: 'name' },
			{ name: 'Price Per Unit USD', value: 'pricePerUnitUsd' },
			{ name: 'Pricing Events', value: 'pricingEvents' },
			{ name: 'Pricing Model', value: 'pricingModel' },
			{ name: 'Review Count', value: 'reviewCount' },
			{ name: 'Review Rating', value: 'reviewRating' },
			{ name: 'Runs 30d Aborted', value: 'runs30DaysAborted' },
			{ name: 'Runs 30d Failed', value: 'runs30DaysFailed' },
			{ name: 'Runs 30d Succeeded', value: 'runs30DaysSucceeded' },
			{ name: 'Runs 30d Timed Out', value: 'runs30DaysTimedOut' },
			{ name: 'Runs 30d Total', value: 'runs30DaysTotal' },
			{ name: 'Store URL', value: 'url' },
			{ name: 'Success Rate 30d %', value: 'successRate30Days' },
			{ name: 'Title', value: 'title' },
			{ name: 'Total Builds', value: 'totalBuilds' },
			{ name: 'Total Runs', value: 'totalRuns' },
			{ name: 'Total Users', value: 'totalUsers' },
			{ name: 'Users 30d', value: 'totalUsers30Days' },
			{ name: 'Users 7d', value: 'totalUsers7Days' },
			{ name: 'Users 90d', value: 'totalUsers90Days' },
		],
		default: ['title', 'username', 'pricingModel', 'monthlyUsers', 'successRate30Days', 'url'],
		description: 'Which fields to return when Output is set to Selected Fields',
	},
];

const authenticationProperties: INodeProperties[] = [
	{
		displayName: 'Authentication',
		name: 'authentication',
		type: 'options',
		options: [
			{
				name: 'API Key',
				value: 'apifyApi',
			},
			{
				name: 'OAuth2',
				value: 'apifyOAuth2Api',
			},
		],
		default: 'apifyApi',
		description: 'Choose which authentication method to use',
	},
];

export const properties: INodeProperties[] = [
	...resourceProperties,
	...actorProperties,
	...outputProperties,
	...authenticationProperties,
];
