type PopularTv = {
	adult: boolean;
	backdrop_path: string;
	genre_ids: number[];
	id: number;
	origin_country: string[];
	original_language: string;
	original_name: string;
	overview: string;
	popularity: number;
	poster_path: string;
	first_air_date: string;
	name: string;
	vote_average: number;
	vote_count: number;
	title: string;
};

type PopularTvResult = {
	page: number;
	results: PopularTv[];
	total_pages: number;
	total_results: number;
};

type ResultPopularTv = {
	tv: PopularTv[];
};
