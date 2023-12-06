type CastCredit = {
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
	character: string;
	credit_id: string;
	order: number;
	media_type: string;
	name: string;
	first_air_date: string;
};

type PeopleCreditsData = {
	cast: CastCredit[];
	crew: CastCredit[];
};
