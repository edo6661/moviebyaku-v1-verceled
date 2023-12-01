type Provider = {
	logo_path: string;
	provider_id: number;
	provider_name: string;
	display_priority: number;
};

type Country = {
	link: string;
	buy: Provider[];
};

type WatchProviders = {
	id: number;
	results: Record<string, Country>;
};
