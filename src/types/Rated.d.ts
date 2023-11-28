interface RatedResult {
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
	rating: number;
}

interface RatedData {
	page: number;
	results: Result[];
	total_pages: number;
	total_results: number;
}

type RatedMovie = {
	adult: boolean;
	backdrop_path: string;
	genre_ids: number[];
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
	rating: number;
};

type GetRatedMoviesResponse = {
	page: number;
	results: RatedMovie[];
	total_pages: number;
	total_results: number;
};
