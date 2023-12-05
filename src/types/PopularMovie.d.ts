interface FirstSectionMovie {
	page: number;
	results: ResultFirstSectionMovie[];
	total_pages: number;
	total_results: number;
}

interface ResultFirstSectionMovie {
	adult: boolean;
	backdrop_path: string;
	genre_ids: number[];
	original_language: string;
	original_title: string;
	overview: string;
	id: number;
	popularity: number;
	poster_path: string;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
	name: string;
	original_name: string;
	origin_country: string;
	original_name: string;
	first_air_date: string;
}

interface ResultPopularMovie {
	movie: ResultFirstSectionMovie[];
}
