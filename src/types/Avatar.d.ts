interface Avatar {
	gravatar: {
		hash: string;
	};
	tmdb: {
		avatar_path: string | null;
	};
}

interface ResponseAccount {
	avatar: Avatar;
	id: number;
	iso_639_1: string;
	iso_3166_1: string;
	name: string;
	include_adult: boolean;
	username: string;
}

interface GetAccount {
	guest_session_id: string;
	session_id: string;
}
