type CollectionSearchResult = {
	adult: boolean;
	backdrop_path: string;
	id: number;
	name: string;
	original_language: string;
	original_name: string;
	overview: string;
	poster_path: string;
};

type CollectionSearchData = {
	page: number;
	results: CollectionResult[];
	total_pages: number;
	total_results: number;
};

type MultiSearchResult = {
	adult: boolean;
	backdrop_path: string;
	id: number;
	title: string;
	original_language: string;
	original_title: string;
	overview: string;
	poster_path: string;
	media_type: string;
	genre_ids: number[];
	popularity: number;
	release_date: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
};

type MultiSearchData = {
	page: number;
	results: MultiSearchResult[];
};

type MovieSearchResult = {
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
};

type MovieSearchData = {
	page: number;
	results: MovieSearchResult[];
	total_pages: number;
	total_results: number;
};

type TvSearchResult = {
	adult: boolean;
	backdrop_path: string | null;
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
};

type TvSearchData = {
	page: number;
	results: TvSearchResult[];
	total_pages: number;
	total_results: number;
};

type PersonSearchResult = {
	adult: boolean;
	gender: number;
	id: number;
	known_for_department: string;
	name: string;
	original_name: string;
	popularity: number;
	profile_path: string | null;
	known_for: string[];
};

type PersonSearchData = {
	page: number;
	results: PersonSearchResult[];
	total_pages: number;
	total_results: number;
};