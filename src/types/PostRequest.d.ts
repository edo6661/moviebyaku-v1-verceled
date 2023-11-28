interface ResponsePOST {
	success: boolean;
	status_code: number;
	status_message: string;
}
interface AddFavorite {
	account_id: string;
	media_type: string;
	media_id: string;
	favorite: boolean;
}
interface AddWatchList {
	account_id: string;
	media_type: string;
	media_id: string;
	watchlist: boolean;
}
interface AddRating {
	value: number;
	id: string;
	session_id?: string;
	guest_session_id: string;
}

interface DeleteRating {
	id: string;
	session_id?: string;
	guest_session_id: string;
}

interface;
