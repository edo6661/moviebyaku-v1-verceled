type AlternativeTitle = {
	iso_3166_1: string;
	title: string;
	type: string;
};

type AlternativeTitlesData = {
	id: number;
	results: AlternativeTitle[];
	titles: AlternativeTitle[];
};
