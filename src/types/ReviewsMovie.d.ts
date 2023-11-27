type AuthorDetails = {
	name: string;
	username: string;
	avatar_path: string;
	rating: number;
};

type ReviewResult = {
	author: string;
	author_details: AuthorDetails;
	content: string;
	created_at: string;
	id: string;
	updated_at: string;
	url: string;
};

type ReviewsResult = {
	adult: boolean;
	also_known_as: string[];
	biography: string;
	birthday: string | null;
	deathday: string | null;
	gender: number;
	homepage: string | null;
	id: number;
	imdb_id: string;
	known_for_department: string;
	name: string;
	place_of_birth: string | null;
	popularity: number;
	profile_path: string | null;
	reviews: ReviewResult[];
};

type ReviewsData = {
	page: number;
	results: PersonSearchResult[];
	total_pages: number;
	total_results: number;
};
