type AuthorDetails = {
	name: string;
	username: string;
	avatar_path: string | null;
	rating: number;
};

type MovieReview = {
	author: string;
	author_details: AuthorDetails;
	content: string;
	created_at: string;
	id: string;
	updated_at: string;
	url: string;
};

type MovieReviews = {
	id: number;
	page: number;
	results: MovieReview[];
	total_pages: number;
	total_results: number;
};
