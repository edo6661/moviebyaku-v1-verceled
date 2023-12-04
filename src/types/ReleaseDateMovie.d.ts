interface ReleaseDate {
	certification: string;
	descriptors: string[];
	iso_639_1: string;
	note: string;
	release_date: string;
	type: number;
}

interface Result {
	iso_3166_1: string;
	release_dates: ReleaseDate[];
}

interface ReleaseDateData {
	id: number;
	results: Result[];
}
