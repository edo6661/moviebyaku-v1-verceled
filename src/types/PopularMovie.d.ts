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
}

interface ResultPopularMovie {
	movie: ResultFirstSectionMovie[];
}
