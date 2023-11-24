type AuthorDetails = {
	name: string;
	username: string;
	avatar_path: string | null;
	rating: number;
};

type Result = {
	author: string;
	author_details: AuthorDetails;
	content: string;
	created_at: string;
	id: string;
	updated_at: string;
	url: string;
};

type ReviewsMovie = {
	id: number;
	page: number;
	results: Result[];
};
